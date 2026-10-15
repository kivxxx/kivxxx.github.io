/* ============================================================
 *  網站內容設定檔：只要改這個檔案，就能更新作品 / 聯繫方式 / 技能
 * ============================================================ */
const SITE = {
  name: "Kiv",
  roles: [
    "Python / SQL / Java Engineer",
    "NVIDIA Omniverse Digital Twin Developer",
    "Robotics & AMR Path Planning",
    "Automated Logistics & Semiconductor AMHS",
    "Full-stack Web (HTML / JS)",
  ],
  bio: "國立臺灣科技大學資訊管理系畢業。專注於機器人、自動化物流與半導體廠 (OHT / AMHS) 的系統開發，" +
       "從演算法、資料庫到數位孿生 (Omniverse) 與全端網頁，一條龍打造能實際落地的系統。",
  email: "tung.charon@gmail.com",
  // 沒有的連結留空字串 "" 即可自動隱藏
  links: [
    { label: "GitHub", icon: "🐙", href: "https://github.com/kivxxx", note: "程式碼與開源專案" },
    { label: "LinkedIn", icon: "💼", href: "", note: "職涯經歷" },
    { label: "Resume", icon: "📄", href: "", note: "下載履歷 (PDF)" },
  ],
  stats: [
    { n: 5, suffix: "+", label: "技術領域" },
    { n: 10, suffix: "+", label: "完成專案 (可自行修改)" },
    { n: 1, suffix: "", label: "OHT 路徑規劃引擎" },
  ],
  timeline: [
    { when: "Now", text: "系統開發工程師：自動化物流 / 機器人 / 數位孿生" },
    { when: "Past", text: "多項系統建置、全端網頁與 AI 應用專案的技術負責" },
    { when: "Edu", text: "國立臺灣科技大學 資訊管理系" },
  ],
};

const SKILLS = [
  { group: "Languages", items: [["Python", 92], ["SQL", 88], ["Java", 78], ["HTML / CSS / JS", 82]] },
  { group: "Robotics & Logistics", chips: ["AMR", "OHT", "AMHS", "A* / Dijkstra", "Fleet Scheduling", "Path Planning", "ROS (可調整)"] },
  { group: "Simulation / 3D", chips: ["NVIDIA Omniverse", "USD", "Digital Twin", "Isaac Sim (可調整)"] },
  { group: "Data & Backend", chips: ["MS SQL", "PostgreSQL (可調整)", "REST API", "JSON Topology", "Golang", "C#"] },
  { group: "Domain", chips: ["半導體 Fab 自動化", "物流倉儲", "MES / 派工", "Layout Editor"] },
];

/* 作品清單：新增作品就複製一個物件貼進來。
 * page: 專屬頁面(選填)  img: 截圖(選填)  link/demo: 外部連結(選填) */
const PROJECTS = [
  {
    id: "oht", title: "OHT Layout Creation System", emoji: "🏭",
    cat: ["Robotics", "Semiconductor", "Python"],
    summary: "以網狀拓撲 (JSON) + A* 動態規劃取代傳統預算式 SQL 路徑儲存的 OHT 佈局系統。",
    detail: [
      "傳統 OHT 系統預先計算所有路徑組合，造成效能浪費且難以擴充。",
      "改用 mesh topology map (JSON) 搭配 A* 演算法，即時計算最佳路徑，把「靜態固定路徑」升級為「動態彈性網路」。",
    ],
    features: ["圖形化路徑編輯器", "動態 A* 尋路", "路段權重設定", "不再依賴 SQL 儲存路徑"],
    img: "assets/image/oht_layout_system_01.png", page: "projects/oht_layout_system.html",
  },
  {
    id: "tkt", title: "TKT NTUST School System", emoji: "🎓",
    cat: ["Mobile", "Web"],
    summary: "整合 iOS 小工具與鬧鐘的校園系統，主動推播課表、成績與停車資訊。",
    detail: ["暑假期間獨立開發，補足既有 TAT 系統缺少 Widget 的缺口，讓資訊主動送到使用者眼前。"],
    features: ["iOS Widget & Alarm", "成績查詢", "課表匯入", "公告檢視", "停車位查詢", "主動上課提醒"],
    img: "assets/image/tkt_01.png", page: "projects/tkt_ntust_school_system.html",
  },
  {
    id: "omni", title: "Omniverse Digital Twin（範例待補）", emoji: "🧊",
    cat: ["Omniverse", "Robotics", "Python"],
    summary: "在 Omniverse 中建立產線 / 倉儲數位孿生，同步機器人與搬運狀態。",
    detail: ["這是預留的範例卡片，請在 data.js 填入真實內容與截圖 / 影片連結。"],
    features: ["USD 場景", "Python Extension", "即時資料同步"],
  },
  {
    id: "agv", title: "AMR Fleet Scheduler（範例待補）", emoji: "🤖",
    cat: ["Robotics", "Java", "SQL"],
    summary: "多台 AMR 派工、避碰與交通管制的排程服務。",
    detail: ["預留範例，可放架構圖、Demo GIF 或 GitHub 連結。"],
    features: ["任務佇列", "衝突偵測", "SQL 任務紀錄"],
  },
];
