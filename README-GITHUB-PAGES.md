# Kivxx 個人網站 - GitHub Pages 版

這是專為 GitHub Pages 優化的個人網站，展示 DIY 專案和程式作品。

## 🚀 GitHub Pages 部署指南

### 快速部署
1. Fork 或下載此儲存庫
2. 在 GitHub 儲存庫設定中啟用 GitHub Pages
3. 選擇 `main` 分支作為來源
4. 網站將在 `https://yourusername.github.io` 上線

### 自訂網域（可選）
1. 在儲存庫根目錄創建 `CNAME` 檔案
2. 在檔案中寫入你的網域名稱，例如：`www.example.com`
3. 在你的網域提供商設定 DNS 記錄指向 GitHub Pages

## 📝 內容管理

### 新增/編輯專案
1. 編輯 `data/projects.json` 檔案
2. 按照現有格式新增專案資料
3. 提交變更到 GitHub
4. GitHub Pages 會自動更新網站

### 範例專案資料格式
```json
{
  "id": "unique-project-id",
  "type": "diy", // 或 "project"
  "title": "專案標題",
  "description": "專案描述...",
  "techStack": ["技術1", "技術2"],
  "features": ["功能1", "功能2"],
  "date": "2025-06-13",
  "status": "completed",
  "category": "electronics", // 參考categories定義
  "icon": "fas fa-microchip",
  "links": {
    "demo": "Demo連結",
    "github": "GitHub連結",
    "documentation": "文件連結"
  },
  "featured": true // 是否為精選專案
}
```

### 更新最新動態
編輯 `data/updates.json` 檔案來新增最新動態。

### 修改個人資訊
編輯 `js/config.js` 來更新：
- 個人資訊
- 導航選單
- 聯絡方式
- 社群媒體連結

## 🎨 客製化

### 更換個人照片
1. 將新照片命名為 `photo.png`
2. 替換根目錄的現有檔案
3. 建議尺寸：180x180 像素

### 修改主題色彩
編輯 `style.css` 中的 CSS 變數：
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### 新增頁面
1. 創建新的 HTML 檔案
2. 包含相同的 meta 標籤和 JavaScript 引用
3. 在 `js/config.js` 中新增導航項目

## 🔧 技術特色

- **響應式設計**：適配所有裝置
- **SEO 優化**：完整的 meta 標籤和結構化資料
- **漸進式增強**：JavaScript 失敗時仍可正常瀏覽
- **快取優化**：透過 `_headers` 檔案設定快取策略
- **模組化架構**：易於維護和擴展

## 📊 效能優化

### GitHub Pages 特別優化
- 使用相對路徑確保在任何網域都能正常運作
- 內建備用資料載入機制
- 最小化 CORS 問題
- 靜態資源快取優化

### 載入速度優化
- CSS 和 JavaScript 檔案壓縮
- 圖片格式優化
- 字體載入優化
- 懶載入圖片（如適用）

## 🐛 問題排解

### 網站無法正常載入
1. 檢查 GitHub Pages 是否已啟用
2. 確認分支設定正確
3. 檢查瀏覽器控制台是否有錯誤訊息

### 專案資料不顯示
1. 檢查 `data/projects.json` 格式是否正確
2. 使用 JSON 驗證工具檢查語法
3. 檢查檔案路徑是否使用相對路徑

### 樣式顯示異常
1. 清除瀏覽器快取
2. 檢查 CSS 檔案是否正確載入
3. 確認字體和圖示資源能正常存取

## 📞 技術支援

如遇到技術問題，請：
1. 檢查瀏覽器開發者工具的錯誤訊息
2. 參考 GitHub Pages 官方文件
3. 在 GitHub Issues 中回報問題

## 📄 授權

此專案採用 MIT 授權條款，歡迎自由使用和修改。

---

**提示**：記得定期備份你的 `data/` 資料夾內容！
