'use strict';
// Package the static site without converting its images back to Base64.
async function downloadWebsite() {
  const button = document.getElementById('downloadHtml');
  button.disabled = true;
  try {
    if (location.protocol === 'file:') {
      toast('你已在离线网站中。请复制整个解压目录；个人修改请导出 JSON。');
      return;
    }
    toast('正在打包完整网站，图片较多，请稍候…');
    const files = [...new Set([
      'index.html', 'css/style.css', 'css/theme-paper.css', 'css/theme-night.css', 'css/theme-manga.css',
      'data/characters.js', 'js/app.js', 'js/download.js', 'js/jszip.min.js', 'js/JSZIP-LICENSE.txt',
      'assets/fonts/instrument-serif-latin-400.woff2', 'assets/fonts/instrument-serif-latin-400-italic.woff2', 'assets/fonts/anton-latin-400.woff2',
      'assets/fonts/OFL-InstrumentSerif.txt', 'assets/fonts/OFL-Anton.txt',
      ...Object.values(EIDOLON_DATA.assetData),
      ...[EIDOLON_DATA.seedData, EIDOLON_DATA.catalogBaseline, EIDOLON_DATA.catalogImageBaseline]
        .flatMap(list => list.flatMap(c => [c.image, c.fullImage, c.imageUrl, c.fullImageUrl]))
        .filter(path => typeof path === 'string' && path.startsWith('assets/characters/'))
    ])];
    const zip = new JSZip();
    let next = 0;
    await Promise.all(Array.from({length: 6}, async () => {
      while (next < files.length) {
        const path = files[next++];
        const response = await fetch(new URL(path, document.baseURI));
        if (!response.ok) throw Error(path + ' 下载失败 (' + response.status + ')');
        zip.file(path, await response.arrayBuffer());
      }
    }));
    const blob = await zip.generateAsync({type: 'blob', compression: 'STORE'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Eidolon_完整网站.zip';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast('完整网站 ZIP 已下载，请完整解压。个人修改请另行导出 JSON。');
  } catch (error) {
    toast('网站打包失败：' + error.message + '。请检查网络后重试。');
  } finally {
    button.disabled = false;
  }
}
