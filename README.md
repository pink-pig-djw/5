# Eidolon

静态动漫角色档案：626 位角色、23 部作品。无需构建步骤。

- `index.html`：页面结构；`css/style.css`：原有样式。
- `js/app.js`：原有交互、本地保存与导入导出。
- `data/characters.js`：完整角色目录、图片相对路径及旧目录迁移基线。
- `assets/characters/`：从原 HTML 无损提取的图片，按角色 slug 和内容哈希命名；相同图片去重。
- `js/download.js` 与 `js/jszip.min.js`：下载完整离线网站 ZIP；JSZip 许可见 `js/JSZIP-LICENSE.txt`。

本地预览：在仓库根目录运行 `python -m http.server 8000`。也可完整下载并解压网站包后打开 `index.html`。

Cloudflare Workers Builds 监听 `main`，使用 `npx wrangler deploy`；`wrangler.jsonc` 指向根目录静态资源，`.assetsignore` 排除开发文件。不要再将图片内嵌回 HTML 或数据文件。所有部署资源必须小于 25 MiB。

本地存储仍使用 `eizou.character.archive.v1` 和 `eizou.character.preferences.v1`，schemaVersion 1 / catalogVersion 3 不变。旧 `seedImageRef` 自动解析为独立资源；已有用户上传的 Base64 图片、评分、备注、自定义档案和删除记录保留。JSON 备份内的内置图片使用相对路径，上传图片保留原有数据格式。

网站 ZIP 包含预置目录和所有资源；个人修改仍请另行导出 JSON。离线副本与在线站点的浏览器存储相互独立。
`node scripts/check-assets.mjs` 检查资源路径、目录 ID、Base64 误嵌入与文件大小。Wrangler 部署时会自动运行此检查。
