// 组件管理器
class ComponentManager {
    constructor() {
        this.components = {};
    }

    // 注册组件
    register(name, component) {
        this.components[name] = component;
    }

    // 渲染组件
    async render(name, container, props = {}) {
        if (this.components[name]) {
            const html = await this.components[name](props);
            if (container) {
                container.innerHTML = html;
            }
            return html;
        }
        console.error(`Component '${name}' not found`);
        return '';
    }

    // 渲染所有页面通用组件
    async renderCommonComponents() {
        await this.renderHeader();
        await this.renderFooter();
    }

    // 渲染导航栏
    async renderHeader() {
        const header = document.querySelector('header');
        if (header) {
            await this.render('header', header);
        }
    }

    // 渲染页脚
    async renderFooter() {
        const footer = document.querySelector('footer');
        if (footer) {
            await this.render('footer', footer);
        }
    }
}

// 创建全局组件管理器实例
const componentManager = new ComponentManager();

// 导航栏组件
componentManager.register('header', (props = {}) => {
    const currentPage = props.currentPage || '';
    
    return `
        <div class="container">
            <h1><i class="${SITE_CONFIG.siteIcon}"></i> ${SITE_CONFIG.siteName}</h1>
            <nav>
                <ul>
                    ${NAV_ITEMS.map(item => `
                        <li>
                            <a href="${item.href}" class="${currentPage === item.href ? 'active' : ''}">
                                <i class="${item.icon}"></i> ${item.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        </div>
    `;
});

// 页脚组件
componentManager.register('footer', () => {
    const currentYear = new Date().getFullYear();
    return `
        <div class="container">
            <p>&copy; ${currentYear} ${SITE_CONFIG.author}. All rights reserved. | 用 ❤️ 和 ☕ 製作</p>
        </div>
    `;
});

// 联系方式组件
componentManager.register('contactLinks', () => {
    return `
        <div class="contact-links contact-links-decorated">
            <div class="contact-link-card">
                <i class="fas fa-envelope"></i>
                <span>Email：</span>
                <span class="contact-value">tung.charon@email.com</span>
            </div>
            <div class="contact-link-card">
                <i class="fab fa-github"></i>
                <span>GitHub：</span>
                <span class="contact-value">kivxxx</span>
            </div>
        </div>
    `;
});

// 加载状态组件
componentManager.register('loading', () => {
    return `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>載入中...</p>
        </div>
    `;
});

// 错误信息组件
componentManager.register('error', (props = {}) => {
    const message = props.message || '發生錯誤，請稍後再試。';
    return `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
});

// 页面初始化函数
async function initializePage() {
    // 获取当前页面
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 渲染通用组件
    await componentManager.renderHeader({ currentPage });
    await componentManager.renderFooter();
    
    // 设置活动导航项样式
    setActiveNavItem(currentPage);
}

// 设置活动导航项
function setActiveNavItem(currentPage) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 工具函数：格式化日期
function formatDate(dateStr, locale = 'zh-TW') {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateStr).toLocaleDateString(locale, options);
}

// 工具函数：延迟执行
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// DOM 加载完成后初始化页面
document.addEventListener('DOMContentLoaded', initializePage);
