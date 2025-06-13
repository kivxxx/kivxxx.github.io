# Kivxx 個人網站

這是一個現代化的個人網站，採用模組化架構設計，支援動態內容管理和響應式設計。

## 🚀 功能特色

- **模組化架構**：組件化設計，易於維護和擴展
- **動態內容管理**：基於 JSON 的內容管理系統
- **響應式設計**：適配各種螢幕尺寸
- **現代化 UI**：使用現代 CSS 技術和動畫效果
- **易於維護**：簡單的管理界面，支援 CRUD 操作

## 📁 專案結構

```
Kivxx.github.io/
├── index.html          # 首頁
├── about.html          # 關於我頁面
├── diy.html           # DIY 專案頁面
├── project.html       # 程式專案頁面
├── admin.html         # 管理界面
├── style.css          # 主要樣式表
├── photo.png          # 個人照片
├── js/                # JavaScript 檔案
│   ├── config.js      # 網站配置
│   ├── components.js  # 組件管理
│   ├── updates.js     # 動態更新管理
│   ├── projects.js    # 專案管理系統 ⭐
│   └── app.js         # 主應用程式
├── data/              # 資料檔案
│   ├── updates.json   # 最新動態資料
│   └── projects.json  # 專案資料 ⭐
├── templates/         # 模板檔案
│   └── base.html      # 基礎模板
└── components/        # 組件檔案
```

## 🔧 專案管理系統

### 新的架構優勢

1. **資料驅動**：所有專案內容存放在 `data/projects.json`
2. **動態渲染**：使用 JavaScript 動態生成頁面內容
3. **統一管理**：一個 JSON 檔案管理所有 DIY 和程式專案
4. **易於維護**：提供管理界面進行 CRUD 操作

### 如何新增專案

#### 方法一：使用管理界面（推薦）
1. 開啟 `admin.html` 頁面
2. 點擊「新增專案」按鈕
3. 填寫專案資訊
4. 儲存即可

#### 方法二：直接編輯 JSON 檔案
編輯 `data/projects.json`，新增專案物件：

```json
{
  "id": "unique-project-id",
  "type": "diy", // 或 "project"
  "title": "專案標題",
  "description": "專案描述",
  "techStack": ["技術1", "技術2"],
  "features": ["功能1", "功能2"],
  "date": "2025-06-13",
  "status": "completed",
  "category": "electronics",
  "icon": "fas fa-microchip",
  "image": "",
  "links": {
    "demo": "",
    "github": "",
    "documentation": ""
  },
  "featured": false
}
```

### 專案類別

#### DIY 專案類別
- `electronics`: 電子製作
- `woodwork`: 木工製作
- `3dprinting`: 3D列印
- `mechanical`: 機械製作

#### 程式專案類別
- `python`: Python
- `javascript`: JavaScript
- `web`: 網頁開發
- `tool`: 實用工具

### 如何編輯專案

1. 開啟 `admin.html`
2. 在專案列表中點擊「編輯」按鈕
3. 修改資訊後儲存

### 如何刪除專案

1. 開啟 `admin.html`
2. 在專案列表中點擊「刪除」按鈕
3. 確認刪除

## 🎨 樣式自訂

### 新增專案類別

1. 在 `data/projects.json` 的 `categories` 區塊新增類別
2. 在 `style.css` 中新增對應的樣式類別

### 修改主題色彩

在 `style.css` 中修改 CSS 變數：

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* 其他色彩變數 */
}
```

## 🎨 設計理念

### 莫蘭迪色調
網站採用優雅的莫蘭迪色調設計，營造舒適、柔和的視覺體驗：

- **主要色彩**：柔和灰色系，提供穩重的基調
- **輔助色彩**：暖褐色、柔和藍色，增加層次感  
- **強調色彩**：柔和綠色、粉色、黃色，突出重點內容
- **背景色彩**：米白色系，確保良好的可讀性

### 設計特色
- 高對比度文字，確保可讀性
- 柔和的陰影和邊框效果
- 一致的圓角和間距設計
- 優雅的漸變和過渡效果

### 測試頁面
訪問 `morandi-test.html` 查看完整的色彩配置和組件測試。

## 📱 響應式設計

網站支援以下裝置：
- 桌面電腦 (>1200px)
- 平板電腦 (768px-1200px)
- 手機 (<768px)

## 🔄 資料備份與還原

### 備份資料
1. 開啟 `admin.html`
2. 點擊「匯出資料」按鈕
3. 下載 JSON 備份檔案

### 還原資料
1. 開啟 `admin.html`
2. 點擊「匯入資料」按鈕
3. 選擇備份檔案並確認匯入

## 🚀 部署

### GitHub Pages
1. 將所有檔案推送到 GitHub 儲存庫
2. 在儲存庫設定中啟用 GitHub Pages
3. 選擇 main 分支作為來源

### 本地開發
```bash
# 啟動本地伺服器（Python）
python -m http.server 8000

# 或使用 Node.js
npx http-server

# 瀏覽器開啟 http://localhost:8000
```

## 📝 最新更新

### v2.0.0 (2025-06-13)
- ✨ 新增專案管理系統
- ✨ 資料驅動的內容管理
- ✨ 管理界面支援 CRUD 操作
- ✨ 專案篩選和排序功能
- ✨ 資料備份與還原功能
- 🎨 個人照片整合
- 🔧 程式碼重構和優化

### v1.0.0 (2025-06-12)
- 🎉 初始版本發布
- 📱 響應式設計
- 🎨 現代化 UI
- 📋 模組化架構
- 🔄 動態內容載入

## 📞 聯絡資訊

如有任何問題或建議，歡迎聯絡我！

---

**注意**：管理界面 (`admin.html`) 僅供本地開發使用，部署到正式環境時建議移除或加上存取限制。
│   └── base.html              # 基础模板
└── components/                # 组件目录（备用）
```

## 🧩 组件系统

### 核心组件
1. **导航栏组件 (Header)**
   - 动态渲染导航菜单
   - 自动高亮当前页面
   - 响应式设计

2. **页脚组件 (Footer)**
   - 统一的版权信息
   - 动态年份更新

3. **联系方式组件 (ContactLinks)**
   - 可复用的联系方式链接
   - 统一的样式和行为

4. **加载状态组件 (Loading)**
   - 统一的加载动画
   - 错误状态显示

### 使用方法

#### 1. 配置文件 (config.js)
```javascript
// 修改网站基本信息
const SITE_CONFIG = {
    siteName: "Your Site Name",
    siteIcon: "fas fa-code",
    author: "Your Name",
    email: "your@email.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile"
};

// 修改导航菜单
const NAV_ITEMS = [
    { href: "index.html", icon: "fas fa-home", text: "首頁" },
    // 添加更多菜单项...
];
```

#### 2. 组件注册 (components.js)
```javascript
// 注册新组件
componentManager.register('newComponent', (props) => {
    return `<div>组件HTML内容</div>`;
});

// 使用组件
await componentManager.render('newComponent', container, props);
```

#### 3. 数据管理 (updates.json)
```json
{
    "updates": [
        {
            "id": 1,
            "title": "项目标题",
            "description": "项目描述",
            "date": "2025-06-13",
            "type": "diy|code|design|blog",
            "link": "project-link.html"
        }
    ]
}
```

## 🔄 页面生命周期

### 初始化流程
1. **DOM 加载完成**
2. **应用程序初始化** (app.js)
3. **渲染通用组件** (导航栏、页脚)
4. **初始化页面特定功能**
5. **初始化通用功能** (平滑滚动、返回顶部等)

### 页面特定初始化
- **首页**: 加载最新动态、渲染联系方式
- **关于页面**: 技能标签动画、联系方式
- **DIY页面**: 项目筛选器
- **代码页面**: 统计数字动画

## 🎨 样式系统

### CSS 架构
- **基础样式**: 通用样式和变量
- **组件样式**: 独立的组件样式
- **页面样式**: 特定页面的样式
- **响应式样式**: 移动端适配

### 主要特性
- **模块化CSS**: 组件化的样式管理
- **响应式设计**: 适配多种设备
- **动画系统**: 统一的动画效果
- **主题支持**: 易于扩展主题

## 🚀 新增功能

### 1. 页面加载器
- 页面加载时显示加载动画
- 优化用户体验

### 2. 错误处理
- 统一的错误信息显示
- 重试机制

### 3. 导航增强
- 活动页面高亮
- 响应式导航菜单

### 4. 返回顶部
- 滚动时自动显示/隐藏
- 平滑滚动效果

### 5. 性能优化
- 懒加载图片
- 防抖处理
- 组件缓存

## 📝 开发指南

### 添加新页面
1. 复制 `templates/base.html`
2. 替换 `{{PAGE_TITLE}}` 和 `{{PAGE_CONTENT}}`
3. 在 `app.js` 中添加页面初始化逻辑

### 添加新组件
1. 在 `components.js` 中注册组件
2. 添加相应的 CSS 样式
3. 在需要的地方调用组件

### 修改配置
1. 编辑 `js/config.js` 文件
2. 重新部署网站

## 🔧 维护说明

### 更新动态
- 直接编辑 `data/updates.json` 文件
- 无需修改 HTML 代码

### 修改样式
- 主要样式在 `style.css` 中
- 组件样式按功能分组

### 添加功能
- 在 `app.js` 中添加新的功能模块
- 遵循现有的代码结构

## 🌟 优势

1. **维护性**: 代码模块化，易于维护
2. **可扩展性**: 组件化设计，易于扩展
3. **性能**: 优化加载和渲染性能
4. **用户体验**: 统一的交互和视觉体验
5. **开发效率**: 可复用组件，提高开发效率

## 📞 技术支持

如有任何问题或建议，请通过以下方式联系：
- 查看代码注释了解详细实现
- 参考现有组件的实现方式
- 遵循既定的代码规范和架构模式
