// 更新动态管理器
class UpdatesManager {
    constructor() {
        this.updates = [];
    }

    async fetchUpdatesFromProjects(count = 3) {
        try {
            const response = await fetch('./data/projects.json', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-cache'
            });
            if (!response.ok) throw new Error('HTTP error');
            const data = await response.json();
            // 依日期排序，取最新 count 筆
            this.updates = (data.projects || [])
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, count)
                .map(project => ({
                    title: project.title,
                    description: project.description,
                    date: project.date,
                    type: project.type,
                    link: project.type === 'diy' ? 'diy.html' : 'project.html'
                }));
            return this.updates;
        } catch (error) {
            console.error('Error fetching projects for updates:', error);
            return [];
        }
    }

    displayUpdates(container, updates = this.updates) {
        if (!container) return;
        container.classList.remove('loading');
        container.innerHTML = updates.map(update => this.createUpdateCard(update)).join('');
    }

    createUpdateCard(update) {
        const iconClass = update.type === 'diy' ? 'fas fa-tools' : 'fas fa-laptop-code';
        return `
            <div class="update-card" data-type="${update.type}">
                <div class="update-icon ${update.type}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="update-content">
                    <h4><a href="${update.link}">${update.title}</a></h4>
                    <p>${update.description}</p>
                    <span class="date">${update.date}</span>
                </div>
            </div>
        `;
    }

    async init() {
        const container = document.querySelector('.updates-grid');
        if (!container) return;
        container.classList.add('loading');
        container.innerHTML = '';
        const updates = await this.fetchUpdatesFromProjects(3);
        this.displayUpdates(container, updates);
    }
}

const updatesManager = new UpdatesManager();
document.addEventListener('DOMContentLoaded', () => {
    updatesManager.init();
});
