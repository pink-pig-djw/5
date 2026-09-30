import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const html = await fs.readFile(new URL('index.html', root), 'utf8');
const source = await fs.readFile(new URL('data/characters.js', root), 'utf8');
const catalog = vm.runInNewContext(source + '\nEIDOLON_DATA');
const limit = 25 * 1024 * 1024;
const excluded = new Set(['.git', 'node_modules', '.wrangler']);
let largest = {path: '', bytes: 0};
let files = 0;
async function visit(directory) {
  for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
    if (excluded.has(entry.name)) continue;
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) await visit(path);
    else {
      const {size} = await fs.stat(path);
      assert(size < limit, `File exceeds 25 MiB: ${fileURLToPath(path)}`);
      if (size > largest.bytes) largest = {path: fileURLToPath(path), bytes: size};
      files++;
    }
  }
}
await visit(root);
assert(Buffer.byteLength(html) < 5 * 1024 * 1024, 'Keep index.html below 5 MiB');
assert(!/data:image\/[^;]+;base64,/.test(html + source), 'Do not inline catalog images');
assert.equal(new Set(catalog.seedData.map(c => c.id)).size, catalog.seedData.length, 'Duplicate IDs');
const paths = new Set(Object.values(catalog.assetData));
for (const match of html.matchAll(/(?:src|href)="((?:css|js|data)\/[^"?#]+)"/g)) paths.add(match[1]);
for (const c of catalog.seedData) {
  const image = c.image || catalog.assetData[c.imageAsset] || c.imageUrl;
  const full = c.fullImage || catalog.assetData[c.fullImageAsset] || c.fullImageUrl || image;
  assert(image && full, `Missing portrait: ${c.id}`);
  paths.add(image); paths.add(full);
}
// Files referenced from any linked stylesheet (fonts); inline data: URIs are not files.
for (const [, sheet] of html.matchAll(/href="(css\/[^"?#]+\.css)"/g)) {
  const sheetUrl = new URL(sheet, root);
  const css = (await fs.readFile(sheetUrl, 'utf8')).replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/g, '');
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) paths.add(new URL(match[1], sheetUrl).href.slice(root.href.length));
}
for (const path of paths) {
  assert(!path.startsWith('/') && !path.includes('..') && !/^[a-z]+:/i.test(path), `Not relative: ${path}`);
  assert((await fs.stat(new URL(path, root))).isFile(), `Missing resource: ${path}`);
}
// Every skin must define each design token the shared stylesheet reads without a fallback,
// and be reachable from the skin menu; otherwise part of the UI would silently lose its colours.
const strip = text => text.replace(/\/\*[\s\S]*?\*\//g, '');
const foundation = strip(await fs.readFile(new URL('css/style.css', root), 'utf8'));
const ownTokens = new Set([...foundation.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
const requiredTokens = [...new Set([...foundation.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map(m => m[1]))].filter(t => !ownTokens.has(t));
const skins = (await fs.readdir(new URL('css/', root))).map(f => /^theme-(\w+)\.css$/.exec(f)?.[1]).filter(Boolean);
assert(skins.length >= 1, 'No theme-*.css skins found');
for (const skin of skins) {
  const declared = new Set([...strip(await fs.readFile(new URL(`css/theme-${skin}.css`, root), 'utf8')).matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
  const missing = requiredTokens.filter(t => !declared.has(t));
  assert(!missing.length, `Skin "${skin}" is missing tokens: ${missing.join(', ')}`);
  assert(html.includes(`href="css/theme-${skin}.css"`), `index.html does not link css/theme-${skin}.css`);
  assert(html.includes(`data-theme-choice="${skin}"`), `Skin "${skin}" is not offered in the skin menu`);
}
console.log(JSON.stringify({status: 'passed', characters: catalog.seedData.length,
  works: new Set(catalog.seedData.map(c => c.work)).size, images: Object.keys(catalog.assetData).length,
  htmlBytes: Buffer.byteLength(html), skins, tokens: requiredTokens.length, files, largest}, null, 2));
