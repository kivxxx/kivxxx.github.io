# Kivxxx 個人網站 🌟

這是一個專為 GitHub Pages 優化的個人網站，展示 DIY 專案和程式作品。採用莫蘭迪色調設計，提供優雅舒適的瀏覽體驗。

## 🚀 快速開始

### 部署到 GitHub Pages
1. Fork 此儲存庫到您的 GitHub 帳號
2. 在儲存庫設定中啟用 GitHub Pages
3. 選擇 `main` 分支作為來源
4. 網站將在 `https://yourusername.github.io` 上線

### 自訂您的網站
1. **更換個人照片**：將您的照片命名為 `photo.png` 並替換根目錄的檔案
2. **修改個人資訊**：編輯 `js/config.js` 檔案
3. **新增專案**：編輯 `data/projects.json` 檔案
4. **更新動態**：編輯 `data/updates.json` 檔案

## 📁 專案結構

```
├── index.html          # 首頁
├── about.html          # 關於我頁面
├── diy.html           # DIY 專案頁面
├── project.html       # 程式作品頁面
├── style.css          # 主要樣式檔案
├── photo.png          # 個人照片
├── js/                # JavaScript 檔案
│   ├── config.js      # 網站設定
│   ├── app.js         # 主應用程式
│   ├── components.js  # 元件系統
│   ├── projects.js    # 專案管理
│   └── updates.js     # 更新管理
└── data/              # 資料檔案
    ├── projects.json  # 專案資料
    └── updates.json   # 更新資料
```

## 🎨 主要特色

- **響應式設計**：適配所有裝置尺寸
- **莫蘭迪色調**：優雅舒適的視覺體驗
- **SEO 優化**：完整的 meta 標籤和結構化資料
- **GitHub Pages 友好**：純靜態檔案，無需建置步驟
- **模組化架構**：易於維護和擴展

## 📝 內容管理

### 新增專案
編輯 `data/projects.json` 檔案，按照以下格式新增專案：

```json
{
  "id": "unique-project-id",
  "type": "diy",
  "title": "專案標題",
  "description": "專案描述...",
  "techStack": ["技術1", "技術2"],
  "date": "2024-01-01",
  "status": "completed",
  "category": "electronics",
  "icon": "fas fa-microchip",
  "featured": true
}
```

### 更新動態
編輯 `data/updates.json` 檔案來新增最新動態。

### 修改個人資訊
編輯 `js/config.js` 檔案更新：
- 個人資訊
- 導航選單
- 聯絡方式

## 🛠️ 技術說明

- **純前端**：使用 HTML、CSS、JavaScript
- **無框架依賴**：輕量化設計
- **相對路徑**：確保在 GitHub Pages 正常運作
- **漸進式增強**：JavaScript 失敗時仍可正常瀏覽

## 📞 支援

如果遇到問題：
1. 檢查瀏覽器開發者工具的錯誤訊息
2. 確認 GitHub Pages 已正確啟用
3. 檢查 JSON 檔案格式是否正確

## 📄 授權

MIT License - 歡迎自由使用和修改

---

**提示**：建議定期備份 `data/` 資料夾的內容！
