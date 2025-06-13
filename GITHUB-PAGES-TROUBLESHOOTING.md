# GitHub Pages 路徑問題解決指南

## 🚨 問題：網站載入沒有 CSS 樣式

這是 GitHub Pages 最常見的問題，通常是因為路徑設定不正確。

## 🔍 診斷步驟

### 1. 確認 Repository 名稱
```
如果您的 repository 名稱是 kivxx.github.io，網站會部署到：
https://kivxx.github.io/kivxx.github.io/
```

### 2. 使用測試頁面檢查
訪問 `https://您的網址/test-paths.html` 來檢查各項資源載入狀況。

### 3. 確認設定檔案

#### `_config.yml` 設定：
```yaml
url: "https://kivxx.github.io"
baseurl: "/kivxx.github.io"  # 如果 repo 名稱不是 username.github.io
```

#### HTML 檔案中的資源路徑：
```html
<!-- ✅ 正確 - 使用相對路徑 -->
<link rel="stylesheet" href="./style.css">
<script src="./js/app.js"></script>

<!-- ❌ 錯誤 - 絕對路徑會找不到檔案 -->
<link rel="stylesheet" href="/style.css">
```

#### Meta 標籤中的完整網址：
```html
<!-- ✅ 正確 - 完整網址 -->
<meta property="og:url" content="https://kivxx.github.io/kivxx.github.io/">
<meta property="og:image" content="https://kivxx.github.io/kivxx.github.io/photo.png">

<!-- ❌ 錯誤 - 相對路徑在 meta 標籤中無效 -->
<meta property="og:image" content="./photo.png">
```

## 🛠️ 解決方案

### 方案 1：修正 Repository 名稱（推薦）
1. 將 repository 重新命名為 `kivxx.github.io`
2. 修改 `_config.yml`：
   ```yaml
   baseurl: ""
   ```
3. 更新所有 meta 標籤中的網址為 `https://kivxx.github.io/`

### 方案 2：保持現有名稱
1. 確認 `_config.yml` 中 `baseurl` 設定正確
2. 所有資源路徑使用相對路徑（`./`）
3. Meta 標籤使用完整網址

## 📝 部署後檢查清單

- [ ] CSS 樣式正常載入
- [ ] JavaScript 功能正常
- [ ] 圖片正常顯示
- [ ] JSON 資料正常載入
- [ ] 導航功能正常
- [ ] 手機版響應式正常

## 🔗 有用的連結

- [GitHub Pages 官方文件](https://docs.github.com/en/pages)
- [Jekyll 配置文件](https://jekyllrb.com/docs/configuration/)
- [GitHub Pages 故障排除](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)

## 💡 小提示

1. 部署後可能需要等待 5-10 分鐘才會生效
2. 瀏覽器快取可能會影響顯示，嘗試硬重新整理（Ctrl+F5）
3. 使用瀏覽器開發者工具檢查資源載入錯誤
4. GitHub Pages 支援自訂網域，但需要額外設定

---

**如果問題仍未解決，請檢查 GitHub repository 的 Pages 設定頁面，確認部署來源和狀態。**
