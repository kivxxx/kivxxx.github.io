/**
 * 專案內容管理系統
 * 負責載入、渲染和管理 DIY 及專案作品內容
 */
class ProjectManager {
    constructor() {
        this.projects = [];
        this.categories = {};
        this.currentFilter = 'all';
        this.currentSort = 'date';
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
            this.showError('載入專案資料時發生錯誤，請稍後再試');
        }
    }

    /**
     * 載入專案資料
     */
    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.projects = data.projects || [];
            this.categories = data.categories || {};
        } catch (error) {
            console.error('載入專案資料失敗:', error);
            throw error;
        }
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
    }

    /**
     * 新增專案 (管理功能)
     */
    addProject(projectData) {
        // 生成新的 ID
        const newId = this.generateProjectId(projectData.title);
        const newProject = {
            id: newId,
            ...projectData,
            date: new Date().toISOString().split('T')[0]
        };
        
        this.projects.push(newProject);
        this.saveProjects();
        this.renderProjects(projectData.type);
    }

    /**
     * 編輯專案 (管理功能)
     */
    editProject(projectId, updatedData) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedData };
            this.saveProjects();
            this.renderProjects(this.projects[index].type);
        }
    }

    /**
     * 刪除專案 (管理功能)
     */
    deleteProject(projectId) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            const projectType = this.projects[index].type;
            this.projects.splice(index, 1);
            this.saveProjects();
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
    }

    /**
     * 儲存專案資料 (實際專案中需要後端支援)
     */
    saveProjects() {
        // 這裡只是模擬，實際需要呼叫 API 儲存到伺服器
        console.log('專案資料已更新:', this.projects);
        // localStorage.setItem('projects', JSON.stringify(this.projects));
    }
}

// 全域專案管理器實例
window.projectManager = new ProjectManager();
