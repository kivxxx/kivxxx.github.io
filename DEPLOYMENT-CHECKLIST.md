# GitHub Pages 部署檢查清單

## 📋 部署前檢查

### ✅ 必要檔案檢查
- [ ] `index.html` - 首頁存在且可正常載入
- [ ] `style.css` - 樣式檔案存在
- [ ] `photo.png` - 個人照片存在
- [ ] `data/projects.json` - 專案資料檔案格式正確
- [ ] `data/updates.json` - 更新資料檔案格式正確
- [ ] `_config.yml` - GitHub Pages 配置檔案
- [ ] `sitemap.xml` - 搜尋引擎地圖
- [ ] `robots.txt` - 搜尋引擎指示

### ✅ 內容檢查
- [ ] 個人資訊已更新 (`js/config.js`)
- [ ] 專案資料已填入 (`data/projects.json`)
- [ ] 聯絡方式已設定正確
- [ ] 所有連結都是有效的
- [ ] 圖片和檔案路徑使用相對路徑

### ✅ SEO 檢查
- [ ] 所有頁面都有適當的 title 標籤
- [ ] meta description 已設定
- [ ] Open Graph 標籤已設定
- [ ] JSON-LD 結構化資料已設定
- [ ] canonical URL 已設定

### ✅ 效能檢查
- [ ] 圖片檔案大小合理 (< 1MB)
- [ ] CSS 和 JS 檔案大小合理
- [ ] 沒有不必要的大型檔案
- [ ] 快取設定已配置 (`_headers`)

## 🚀 GitHub Pages 部署步驟

### 1. 儲存庫設定
```bash
# 1. 創建 GitHub 儲存庫
# 2. 將檔案上傳到儲存庫
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 啟用 GitHub Pages
1. 前往儲存庫的 Settings 頁面
2. 滾動到 "Pages" 區段
3. 在 "Source" 選擇 "Deploy from a branch"
4. 選擇 `main` 分支
5. 資料夾選擇 `/ (root)`
6. 點擊 "Save"

### 3. 等待部署
- GitHub Pages 需要 5-10 分鐘來建置網站
- 可在 Actions 頁面查看建置狀態
- 成功後會在 `https://yourusername.github.io` 上線

### 4. 自訂網域（可選）
如果你有自己的網域：
1. 在儲存庫根目錄創建 `CNAME` 檔案
2. 在檔案中輸入你的網域（如：`www.example.com`）
3. 在網域提供商設定 DNS：
   - CNAME 記錄：`www` → `yourusername.github.io`
   - A 記錄：`@` → GitHub Pages IP

## 🔧 部署後維護

### 內容更新流程
1. 編輯 `data/projects.json` 新增/修改專案
2. 編輯 `data/updates.json` 新增最新動態
3. 提交變更到 GitHub
4. GitHub Pages 自動重新建置

### 故障排除
如果網站無法正常顯示：
1. 檢查 GitHub Actions 是否建置成功
2. 檢查瀏覽器開發者工具的錯誤訊息
3. 確認所有檔案路徑都是相對路徑
4. 檢查 JSON 檔案格式是否正確

### 效能監控
- 使用 Google PageSpeed Insights 檢查載入速度
- 使用 Google Search Console 監控 SEO 表現
- 定期檢查連結是否有效

## 📊 SEO 優化建議

### 提交到搜尋引擎
1. 提交 sitemap 到 Google Search Console
2. 提交 sitemap 到 Bing Webmaster Tools
3. 在社群媒體分享連結

### 持續優化
- 定期更新內容
- 優化圖片 alt 標籤
- 提升頁面載入速度
- 增加內部連結

---

**部署完成後記得測試所有功能是否正常運作！**
