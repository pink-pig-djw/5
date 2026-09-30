import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Exercise the actual storage migration without opening or altering anyone's browser data.
const root = new URL('../', import.meta.url);
const EIDOLON_DATA = vm.runInNewContext(await fs.readFile(new URL('data/characters.js', root), 'utf8') + '\nEIDOLON_DATA');
const app = await fs.readFile(new URL('js/app.js', root), 'utf8');
const context = vm.createContext({EIDOLON_DATA, URL, console, crypto: globalThis.crypto,
  document: {querySelectorAll: () => [], getElementById: () => null}});
vm.runInContext(app.slice(0, app.indexOf('function notice(')), context);
const run = code => vm.runInContext(code, context);
const plain = value => JSON.parse(JSON.stringify(value));
const additions = plain(run('SEED.filter(c => c.catalogIntroducedVersion === 4)'));
assert.equal(additions.length, 185);
assert.equal(new Set(additions.map(c => c.work)).size, 10);
assert(additions.every(c => c.bio.length >= 180 && c.bio.includes('\n\n') && c.imageFit === 'contain'));
assert(additions.every(c => c.rating === null && c.notes === '' && c.image.startsWith('assets/characters/')));

// Simulate a v3 library with prior deletions, edits, uploaded art and a custom character.
const older = plain(run('SEED.filter(c => (c.catalogIntroducedVersion || 1) < 4).map((c,i) => normalize(c,i))'));
const deleted = older.splice(0, 2).map(c => c.id);
older[0] = {...older[0], bio: '我的自定义简介', notes: '保留评分和备注', rating: 9,
  tags: ['个人标签'], cv: '我编辑的声优', work: '我编辑的作品', height: '自定义身高'};
older[1] = {...older[1], seedImageRef: older[1].id, imageFit: 'cover',
  imageKind: '作品视觉图', imageSourceUrl: 'https://example.com/my-source',
  fullImage: 'https://example.com/my-full-image.png'};
delete older[1].image;
const upload = 'data:image/png;base64,iVBORw0KGgo=';
older[2] = {...older[2], image: upload, fullImage: upload, notes: '上传图片'};
older.push({...older[0], id: 'user-created-fixture', nameZh: '自建角色', image: upload, fullImage: upload});
context.fixture = older;
const before = plain(run('fixture.map((c,i) => normalize(expandStored(c),i))'));
const migrated = plain(run('migrateCatalog(fixture,3)'));
assert.equal(migrated.length, older.length + additions.length);
assert.deepEqual(migrated.slice(0, older.length), before, 'v4 must preserve every normalized v3 field');
assert(deleted.every(id => !migrated.some(c => c.id === id)), 'Do not restore deleted old characters');
assert(additions.every(c => migrated.some(n => n.id === c.id)));
context.migrated = migrated;
const stored = plain(run('storageEnvelope(migrated)'));
assert.equal(stored.schemaVersion, 1);
assert.equal(stored.catalogVersion, 4);
context.stored = stored;
assert.deepEqual(plain(run('migrateCatalog(stored.characters,4)')), migrated, 'Storage round trip');
assert.deepEqual(plain(run('migrateCatalog(migrated,4)')), migrated, 'Idempotent migration');

// Deleting a new character must also survive a reload of an already-upgraded library.
context.withNewDeletion = migrated.filter(c => c.id !== additions[0].id);
assert.equal(run('migrateCatalog(withNewDeletion,4).length'), migrated.length - 1);
assert.equal(run('migrateCatalog([],3).length'), additions.length, 'Empty old archive only gains new entries');
assert.equal(run('migrateCatalog([],4).length'), 0, 'An empty current archive remains empty');

// Users upgrading directly from v1/v2 still receive all later additions without reviving deletions.
for (const version of [1, 2]) {
  context.version = version;
  const seed = plain(run('SEED.filter(c => (c.catalogIntroducedVersion || 1) <= version).map((c,i) => normalize(c,i))'));
  const removed = seed.shift().id;
  seed[0].notes = `v${version} notes`;
  seed[0].rating = 7;
  seed[0].image = upload;
  seed[0].fullImage = upload;
  context.legacy = seed;
  const result = plain(run('migrateCatalog(legacy,version)'));
  assert.equal(result.length, EIDOLON_DATA.seedData.length - 1);
  assert(!result.some(c => c.id === removed));
  assert.equal(result[0].notes, `v${version} notes`);
  assert.equal(result[0].rating, 7);
  assert.equal(result[0].image, upload);
}
assert.equal(run('KEY'), 'eizou.character.archive.v1');
assert.equal(run('PREF'), 'eizou.character.preferences.v1');
console.log('Catalog v1/v2/v3/v4 migrations, custom fields, uploads, deletions and round trips passed.');
