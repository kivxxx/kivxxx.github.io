/**
 * 專案內容管理系統 (GitHub Pages 優化版)
 * 負責載入、渲染和管理 DIY 及專案作品內容
 */
class ProjectManager {
    constructor() {
        this.projects = [];
        this.categories = {};
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.isGitHubPages = true; // GitHub Pages 標記
    }

    /**
     * 初始化專案管理器
     */
    async init() {
        try {
            await this.loadProjects();
            this.setupEventListeners();
        } catch (error) {
            console.error('專案管理器初始化失敗:', error);
            this.showError('載入專案資料時發生錯誤，正在嘗試備用方案...');
            // GitHub Pages 備用方案
            await this.loadProjectsFallback();
        }
    }

    /**
     * 載入專案資料
     */
    async loadProjects() {
        try {
            // 使用相對路徑，適合 GitHub Pages
            const response = await fetch('./data/projects.json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache' // 確保獲取最新資料
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.projects = data.projects || [];
            this.categories = data.categories || {};
            
            console.log(`✅ 成功載入 ${this.projects.length} 個專案`);
        } catch (error) {
            console.error('載入專案資料失敗:', error);
            throw error;
        }
    }

    /**
     * 備用載入方案 (內嵌資料)
     */
    async loadProjectsFallback() {
        console.log('🔄 使用備用資料載入方案...');
        
        // 內嵌的備用資料
        const fallbackData = {
            "projects": [
                {
                    "id": "file-manager-tool",
                    "type": "project",
                    "title": "檔案管理自動化工具",
                    "description": "一個幫助整理桌面文件的 Python 工具，可以根據檔案類型自動分類到不同資料夾，並提供圖形化介面讓使用者自訂規則。",
                    "techStack": ["Python", "tkinter", "os"],
                    "features": ["圖形介面", "自動分類", "自訂規則"],
                    "date": "2025-05-20",
                    "status": "completed",
                    "category": "python",
                    "icon": "fab fa-python",
                    "image": "",
                    "links": {
                        "demo": "",
                        "github": "https://github.com/kivxx/file-organizer",
                        "documentation": ""
                    },
                    "featured": true
                },
                {
                    "id": "diy-temp-monitor",
                    "type": "diy",
                    "title": "智慧家庭溫濕度監測器",
                    "description": "結合 Arduino 和 ESP32 的 IoT 專案，可以即時監測室內溫濕度並透過網頁顯示歷史數據。",
                    "techStack": ["Arduino", "ESP32", "DHT22", "WiFi"],
                    "features": ["即時監測", "網頁介面", "資料記錄"],
                    "date": "2025-06-10",
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
            ],
            "categories": {
                "diy": {
                    "electronics": { "name": "電子製作", "icon": "fas fa-microchip", "color": "#FF6B6B" },
                    "woodwork": { "name": "木工製作", "icon": "fas fa-hammer", "color": "#4ECDC4" },
                    "3dprinting": { "name": "3D列印", "icon": "fas fa-cube", "color": "#45B7D1" }
                },
                "project": {
                    "python": { "name": "Python", "icon": "fab fa-python", "color": "#3776AB" },
                    "web": { "name": "網頁開發", "icon": "fas fa-globe", "color": "#61DAFB" },
                    "tool": { "name": "實用工具", "icon": "fas fa-tools", "color": "#6C5CE7" }
                }
            }
        };
        
        this.projects = fallbackData.projects;
        this.categories = fallbackData.categories;
        console.log(`✅ 備用方案載入 ${this.projects.length} 個專案`);
    }

    /**
     * 根據頁面類型渲染專案列表
     * @param {string} pageType - 頁面類型 ('diy' 或 'project')
     */
    renderProjects(pageType) {
        const filteredProjects = this.projects.filter(project => 
            project.type === pageType && 
            (this.currentFilter === 'all' || project.category === this.currentFilter)
        );

        const sortedProjects = this.sortProjects(filteredProjects);

        if (pageType === 'diy') {
            this.renderDIYProjects(sortedProjects);
        } else if (pageType === 'project') {
            this.renderCodeProjects(sortedProjects);
        }
    }

    /**
     * 渲染 DIY 專案
     */
    renderDIYProjects(projects) {
        const container = document.querySelector('.project-list');
        if (!container) return;

        // 清空現有內容（保留標題）
        const title = container.querySelector('h3');
        container.innerHTML = '';
        if (title) container.appendChild(title);

        // 添加篩選器
        this.renderFilter(container, 'diy');

        // 渲染專案
        projects.forEach(project => {
            const projectElement = this.createDIYProjectElement(project);
            container.appendChild(projectElement);
        });

        if (projects.length === 0) {
            this.showEmptyState(container);
        }
    }

    /**
     * 渲染程式專案
     */
    renderCodeProjects(projects) {
        // 精選專案
        const featuredProjects = projects.filter(p => p.featured);
        this.renderFeaturedProjects(featuredProjects);

        // 所有專案
        const allProjectsContainer = document.querySelector('#all-projects .projects-grid');
        if (allProjectsContainer) {
            allProjectsContainer.innerHTML = '';
            
            projects.forEach(project => {
                const projectElement = this.createCodeProjectElement(project);
                allProjectsContainer.appendChild(projectElement);
            });

            if (projects.length === 0) {
                this.showEmptyState(allProjectsContainer);
            }
        }
    }

    /**
     * 渲染精選專案
     */
    renderFeaturedProjects(projects) {
        const container = document.querySelector('#featured-projects .projects-grid');
        if (!container) return;

        container.innerHTML = '';
        projects.forEach(project => {
            const projectElement = this.createCodeProjectElement(project, true);
            container.appendChild(projectElement);
        });
    }

    /**
     * 創建 DIY 專案元素
     */
    createDIYProjectElement(project) {
        const categoryInfo = this.categories.diy[project.category] || {};
        
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <div class="project-header">
                <div class="project-icon diy-${project.category}">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-meta">
                    <h4>${project.title}</h4>
                    <span class="tech-stack">${project.techStack.join(' • ')}</span>
                    <span class="project-date">${this.formatDate(project.date)}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-features">
                ${project.features.map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            ${this.createProjectLinks(project.links)}
        `;
        
        return projectDiv;
    }

    /**
     * 創建程式專案元素
     */
    createCodeProjectElement(project, isFeatured = false) {
        const categoryInfo = this.categories.project[project.category] || {};
        
        const projectDiv = document.createElement('div');
        projectDiv.className = `project-card${isFeatured ? ' featured' : ''}`;
        projectDiv.innerHTML = `
            <div class="project-header">
                <div class="project-icon ${project.category}">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-meta">
                    <h4>${project.title}</h4>
                    <span class="tech-stack">${project.techStack.join(' • ')}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-features">
                ${project.features.map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            ${this.createProjectLinks(project.links)}
        `;
        
        return projectDiv;
    }

    /**
     * 創建專案連結
     */
    createProjectLinks(links) {
        const linkElements = [];
        
        if (links.demo) {
            linkElements.push(`<a href="${links.demo}" class="project-link demo">
                <i class="fas fa-play"></i> Demo
            </a>`);
        }
        
        if (links.github) {
            linkElements.push(`<a href="${links.github}" class="project-link github">
                <i class="fab fa-github"></i> GitHub
            </a>`);
        }
        
        if (links.documentation) {
            linkElements.push(`<a href="${links.documentation}" class="project-link docs">
                <i class="fas fa-book"></i> 文件
            </a>`);
        }

        return linkElements.length > 0 ? 
            `<div class="project-links">${linkElements.join('')}</div>` : '';
    }

    /**
     * 渲染篩選器
     */
    renderFilter(container, type) {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'project-filter';
        
        const categories = this.categories[type] || {};
        const filterOptions = ['all', ...Object.keys(categories)];
        
        const filterHTML = filterOptions.map(category => {
            const categoryInfo = categories[category] || { name: '全部', icon: 'fas fa-list' };
            const isActive = this.currentFilter === category ? ' active' : '';
            
            return `<button class="filter-btn${isActive}" data-filter="${category}">
                <i class="${categoryInfo.icon}"></i>
                ${category === 'all' ? '全部' : categoryInfo.name}
            </button>`;
        }).join('');
        
        filterDiv.innerHTML = `
            <div class="filter-controls">
                <div class="filter-buttons">${filterHTML}</div>
                <div class="sort-controls">
                    <select class="sort-select">
                        <option value="date">按日期排序</option>
                        <option value="title">按標題排序</option>
                        <option value="category">按類別排序</option>
                    </select>
                </div>
            </div>
        `;
        
        container.appendChild(filterDiv);
    }

    /**
     * 設置事件監聽器
     */
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                this.handleFilterChange(e.target);
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.matches('.sort-select')) {
                this.handleSortChange(e.target.value);
            }
        });
    }

    /**
     * 處理篩選變更
     */
    handleFilterChange(button) {
        // 更新按鈕狀態
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');

        // 更新篩選條件並重新渲染
        this.currentFilter = button.dataset.filter;
        const pageType = this.getCurrentPageType();
        this.renderProjects(pageType);
    }

    /**
     * 處理排序變更
     */
    handleSortChange(sortType) {
        this.currentSort = sortType;
        const pageType = this.getCurrentPageType();
        this.renderProjects(pageType);
    }

    /**
     * 排序專案
     */
    sortProjects(projects) {
        return projects.sort((a, b) => {
            switch (this.currentSort) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });
    }

    /**
     * 獲取當前頁面類型
     */
    getCurrentPageType() {
        const path = window.location.pathname;
        if (path.includes('diy.html')) return 'diy';
        if (path.includes('project.html')) return 'project';
        return 'project'; // 預設
    }

    /**
     * 格式化日期
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW');
    }

    /**
     * 顯示空狀態
     */
    showEmptyState(container) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.innerHTML = `
            <div class="empty-icon">
                <i class="fas fa-search"></i>
            </div>
            <h4>目前沒有符合條件的專案</h4>
            <p>試試調整篩選條件或新增一些專案吧！</p>
        `;
        container.appendChild(emptyDiv);
    }

    /**
     * 顯示錯誤訊息
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h4>載入失敗</h4>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">重新載入</button>
        `;
        
        const container = document.querySelector('main');
        if (container) {
            container.appendChild(errorDiv);
        }
    }    /**
     * 新增專案 (GitHub Pages 模擬功能)
     */
    addProject(projectData) {
        if (this.isGitHubPages) {
            alert('⚠️ GitHub Pages 不支援新增功能\n\n請直接編輯 data/projects.json 檔案，然後提交到 GitHub 儲存庫。');
            return;
        }
        
        // 原本的新增邏輯
        const newId = this.generateProjectId(projectData.title);
        const newProject = {
            id: newId,
            ...projectData,
            date: new Date().toISOString().split('T')[0]
        };
        
        this.projects.push(newProject);
        this.renderProjects(projectData.type);
    }

    /**
     * 編輯專案 (GitHub Pages 模擬功能)
     */
    editProject(projectId, updatedData) {
        if (this.isGitHubPages) {
            alert('⚠️ GitHub Pages 不支援編輯功能\n\n請直接編輯 data/projects.json 檔案，然後提交到 GitHub 儲存庫。');
            return;
        }
        
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedData };
            this.renderProjects(this.projects[index].type);
        }
    }

    /**
     * 刪除專案 (GitHub Pages 模擬功能)
     */
    deleteProject(projectId) {
        if (this.isGitHubPages) {
            alert('⚠️ GitHub Pages 不支援刪除功能\n\n請直接編輯 data/projects.json 檔案，然後提交到 GitHub 儲存庫。');
            return;
        }
        
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            const projectType = this.projects[index].type;
            this.projects.splice(index, 1);
            this.renderProjects(projectType);
        }
    }

    /**
     * 生成專案 ID
     */
    generateProjectId(title) {
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            + '-' + Date.now();
    }    /**
     * 儲存專案資料 (GitHub Pages 說明)
     */
    saveProjects() {
        if (this.isGitHubPages) {
            console.log('ℹ️ GitHub Pages 環境 - 無法直接儲存資料');
            console.log('請編輯 data/projects.json 檔案並提交到 GitHub');
            return;
        }
        
        // 原本只是模擬儲存
        console.log('專案資料已更新:', this.projects);
    }
}

// 全域專案管理器實例
window.projectManager = new ProjectManager();
