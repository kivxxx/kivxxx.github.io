// 主应用程序类
class App {
    constructor() {
        this.isInitialized = false;
        this.modules = new Map();
    }

    // 注册模块
    registerModule(name, module) {
        this.modules.set(name, module);
    }

    // 获取模块
    getModule(name) {
        return this.modules.get(name);
    }

    // 初始化应用程序
    async init() {
        if (this.isInitialized) return;

        try {
            // 显示加载状态
            this.showPageLoading();

            // 初始化组件系统
            await componentManager.renderCommonComponents();

            // 根据页面类型初始化特定功能
            await this.initPageSpecificFeatures();

            // 初始化通用功能
            this.initCommonFeatures();

            // 隐藏加载状态
            this.hidePageLoading();

            this.isInitialized = true;
            console.log('App initialized successfully');
        } catch (error) {
            console.error('App initialization failed:', error);
            this.showErrorMessage('應用程序初始化失敗，請重新整理頁面。');
        }
    }

    // 初始化页面特定功能
    async initPageSpecificFeatures() {
        const currentPage = this.getCurrentPage();

        switch (currentPage) {
            case 'index.html':
                await this.initHomePage();
                break;
            case 'about.html':
                await this.initAboutPage();
                break;
            case 'diy.html':
                await this.initDiyPage();
                break;            case 'project.html':
                await this.initProjectPage();
                break;
        }
    }

    // 初始化首页
    async initHomePage() {
        // 初始化更新系统
        if (typeof updatesManager !== 'undefined') {
            await updatesManager.init();
        }

        // 渲染联系方式
        const contactSection = document.querySelector('#contact .contact-links');
        if (contactSection) {
            contactSection.outerHTML = await componentManager.render('contactLinks');
        }
    }

    // 初始化关于页面
    async initAboutPage() {
        // 渲染联系方式
        const contactSection = document.querySelector('#contact-about .contact-links');
        if (contactSection) {
            contactSection.outerHTML = await componentManager.render('contactLinks');
        }

        // 添加技能标签动画
        this.animateSkillTags();
    }    // 初始化DIY页面
    async initDiyPage() {
        // 初始化專案管理器
        if (typeof projectManager !== 'undefined') {
            await projectManager.init();
            projectManager.renderProjects('diy');
        }
        this.initProjectFilters();
    }

    // 初始化項目頁面
    async initProjectPage() {
        // 初始化專案管理器
        if (typeof projectManager !== 'undefined') {
            await projectManager.init();
            projectManager.renderProjects('project');
        }
        this.initProjectStats();
    }

    // 初始化通用功能
    initCommonFeatures() {
        // 平滑滚动
        this.initSmoothScroll();
        
        // 响应式导航
        this.initResponsiveNav();
        
        // 懒加载图片
        this.initLazyLoading();
        
        // 返回顶部按钮
        this.initBackToTop();
    }

    // 获取当前页面
    getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    // 显示页面加载状态
    showPageLoading() {
        const body = document.body;
        if (!document.querySelector('.page-loader')) {
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>載入中...</p>
                </div>
            `;
            body.appendChild(loader);
        }
    }

    // 隐藏页面加载状态
    hidePageLoading() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }

    // 显示错误消息
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'app-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="window.location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i> 重新整理
                </button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    // 初始化平滑滚动
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 初始化响应式导航
    initResponsiveNav() {
        const nav = document.querySelector('nav');
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
        
        const header = document.querySelector('header .container');
        if (header && window.innerWidth <= 768) {
            header.appendChild(navToggle);
        }
    }

    // 初始化懒加载
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // 初始化返回顶部按钮
    initBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    // 技能标签动画
    animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag, .learning-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // 项目筛选器
    initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // 项目统计动画
    initProjectStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent);
                    this.animateNumber(target, 0, finalNumber, 2000);
                    observer.unobserve(target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // 数字动画
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = current + (element.textContent.includes('+') ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }
}

// 创建全局应用程序实例
const app = new App();

// DOM 加载完成后初始化应用程序
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
