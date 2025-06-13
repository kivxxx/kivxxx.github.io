// 更新动态管理器
class UpdatesManager {
    constructor() {
        this.updates = [];
    }    // 获取更新数据 (GitHub Pages 優化版)
    async fetchUpdates() {
        try {
            // 使用相對路徑
            const response = await fetch('./data/updates.json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updates = data.updates || [];
            return this.updates;
        } catch (error) {
            console.error('Error fetching updates:', error);
            // GitHub Pages 備用方案
            return this.getFallbackUpdates();
        }
    }

    // 備用更新資料
    getFallbackUpdates() {
        console.log('🔄 使用備用更新資料...');
        this.updates = [
            {
                "id": "update-1",
                "title": "專案管理系統上線",
                "description": "新增了動態專案管理功能，支援 DIY 和程式專案的分類展示。",
                "date": "2025-06-13",
                "type": "code",
                "link": "project.html",
                "tags": ["網站更新", "功能"]
            },
            {
                "id": "update-2", 
                "title": "個人照片整合完成",
                "description": "首頁現在顯示個人照片，提升了網站的個人化程度。",
                "date": "2025-06-12",
                "type": "design",
                "link": "index.html",
                "tags": ["設計", "個人化"]
            }
        ];
        return this.updates;
    }

    // 显示更新内容
    displayUpdates(container, updates = this.updates) {
        if (!container) return;

        container.classList.remove('loading');
        container.innerHTML = updates.map(update => this.createUpdateCard(update)).join('');
    }

    // 创建更新卡片
    createUpdateCard(update) {
        const iconClass = this.getIconClass(update.type);
        return `
            <div class="update-card" data-type="${update.type}">
                <div class="update-icon ${update.type}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="update-content">
                    <h4><a href="${update.link}">${update.title}</a></h4>
                    <p>${update.description}</p>
                    <span class="date">${formatDate(update.date)}</span>
                </div>
            </div>
        `;
    }

    // 获取图标类名
    getIconClass(type) {
        const iconMap = {
            'diy': 'fas fa-tools',
            'code': 'fas fa-code',
            'design': 'fas fa-palette',
            'blog': 'fas fa-edit'
        };
        return iconMap[type] || 'fas fa-info-circle';
    }

    // 显示加载状态
    showLoading(container) {
        if (!container) return;
        container.classList.add('loading');
        container.innerHTML = '';
    }

    // 显示错误信息
    showError(container, message = '無法載入最新動態。請稍後再試。') {
        if (!container) return;
        container.classList.remove('loading');
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
                <button onclick="updatesManager.init()" class="retry-btn">
                    <i class="fas fa-redo"></i> 重試
                </button>
            </div>
        `;
    }

    // 按类型筛选更新
    filterByType(type) {
        return this.updates.filter(update => update.type === type);
    }

    // 获取最新的 N 个更新
    getLatest(count = 3) {
        return this.updates
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count);
    }

    // 初始化更新系统
    async init() {
        const container = document.querySelector('.updates-grid');
        if (!container) return;

        this.showLoading(container);

        try {
            await delay(500); // 模拟加载时间
            await this.fetchUpdates();
            this.displayUpdates(container);
        } catch (error) {
            this.showError(container);
        }
    }
}

// 创建全局更新管理器实例
const updatesManager = new UpdatesManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updatesManager.init();
});
