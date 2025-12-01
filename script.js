// script.js - Улучшенная версия с оптимизацией и новыми функциями
class SerbiaWebsite {
    constructor() {
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupHeaderEffects();
        this.setupBackToTop();
        this.setupCardAnimations();
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupImageLazyLoading();
        this.setupInteractiveElements();
        this.setupPerformanceOptimizations();
        
        this.bindEvents();
    }

    // Плавная прокрутка
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        const headerHeight = 80;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Навигация и активные состояния
    setupNavigation() {
        this.sections = document.querySelectorAll('section');
        this.navDots = document.querySelectorAll('.nav-dot');

        // Клик по точкам навигации
        this.navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.dataset.section;
                this.scrollToSection(sectionId);
            });
        });

        this.updateActiveSection();
    }

    updateActiveSection = () => {
        const scrollPos = window.scrollY + 100;
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.id;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Обновляем активную точку навигации
        this.navDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === currentSection);
        });
    }

    // Эффекты для хедера
    setupHeaderEffects() {
        this.header = document.querySelector('header');
    }

    handleHeaderScroll = () => {
        const scrollTop = window.pageYOffset;
        this.scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';

        // Показ/скрытие хедера
        if (scrollTop > 200 && this.scrollDirection === 'down') {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }

        // Изменение фона хедера
        if (scrollTop > 100) {
            this.header.style.background = 'rgba(10, 10, 10, 0.98)';
            this.header.style.backdropFilter = 'blur(20px)';
        } else {
            this.header.style.background = 'rgba(10, 10, 10, 0.95)';
            this.header.style.backdropFilter = 'blur(15px)';
        }

        this.lastScrollTop = scrollTop;
    }

    // Кнопка "Наверх"
    setupBackToTop() {
        this.backToTop = document.createElement('button');
        this.backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        this.backToTop.className = 'back-to-top';
        this.backToTop.setAttribute('aria-label', 'Вернуться наверх');
        
        this.applyBackToTopStyles();
        document.body.appendChild(this.backToTop);

        this.backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });

        this.setupBackToTopHover();
    }

    applyBackToTopStyles() {
        Object.assign(this.backToTop.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, var(--serbia-red), var(--gold-accent))',
            border: 'none',
            borderRadius: '50%',
            color: 'var(--dark-bg)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(198, 54, 60, 0.5)',
            transition: 'all 0.3s ease',
            zIndex: '1000',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transform: 'scale(0.8)'
        });
    }

    setupBackToTopHover() {
        this.backToTop.addEventListener('mouseenter', () => {
            this.backToTop.style.transform = 'translateY(-5px) scale(1.1)';
            this.backToTop.style.boxShadow = '0 0 30px rgba(198, 54, 60, 0.8)';
        });

        this.backToTop.addEventListener('mouseleave', () => {
            this.backToTop.style.transform = 'translateY(0) scale(1)';
            this.backToTop.style.boxShadow = '0 0 20px rgba(198, 54, 60, 0.5)';
        });
    }

    toggleBackToTop = () => {
        const shouldShow = window.pageYOffset > 300;
        
        if (shouldShow) {
            this.backToTop.style.display = 'flex';
            setTimeout(() => {
                this.backToTop.style.opacity = '1';
                this.backToTop.style.transform = 'scale(1)';
            }, 10);
        } else {
            this.backToTop.style.opacity = '0';
            this.backToTop.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    this.backToTop.style.display = 'none';
                }
            }, 300);
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Анимации карточек
    setupCardAnimations() {
        this.cards = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card');
        
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover);
            card.addEventListener('mouseleave', this.handleCardLeave);
        });
    }

    handleCardHover = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.zIndex = '10';
    }

    handleCardLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-5px) scale(1)';
        card.style.zIndex = '';
    }

    // Анимации при скролле
    setupScrollAnimations() {
        this.fadeElements = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card, .price-category');
        
        this.fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.fadeElements.forEach(element => {
            element.classList.add('fade-in-hidden');
            this.fadeObserver.observe(element);
        });
    }

    // Параллакс эффект
    setupParallax() {
        this.hero = document.querySelector('.hero');
    }

    handleParallax = () => {
        if (!this.hero) return;
        
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        this.hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Ленивая загрузка изображений
    setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Интерактивные элементы
    setupInteractiveElements() {
        // Анимация клика по кнопкам
        const buttons = document.querySelectorAll('.cta-button, .pearl-button');
        buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick);
            button.addEventListener('mousedown', this.handleButtonPress);
            button.addEventListener('mouseup', this.handleButtonRelease);
            button.addEventListener('mouseleave', this.handleButtonRelease);
        });

        // Интерактивные статистические карточки
        this.setupStatsInteractions();
    }

    handleButtonClick = (e) => {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    handleButtonPress = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
    }

    handleButtonRelease = (e) => {
        e.currentTarget.style.transform = '';
    }

    setupStatsInteractions() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('stat-expanded');
            });
        });
    }

    // Оптимизации производительности
    setupPerformanceOptimizations() {
        this.debouncedScroll = this.debounce(() => {
            this.handleScrollActions();
        }, 10);

        this.throttledParallax = this.throttle(() => {
            this.handleParallax();
        }, 16);
    }

    handleScrollActions() {
        this.updateActiveSection();
        this.handleHeaderScroll();
        this.toggleBackToTop();
    }

    // Привязка событий
    bindEvents() {
        window.addEventListener('scroll', () => {
            this.debouncedScroll();
            this.throttledParallax();
        });

        window.addEventListener('resize', this.debounce(() => {
            this.updateActiveSection();
        }, 250));

        // Предзагрузка критичных ресурсов
        window.addEventListener('load', () => {
            this.preloadImportantImages();
        });

        // Управление видимостью страницы
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    // Вспомогательные функции
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Дополнительные функции
    preloadImportantImages() {
        const importantImages = [
            'images/serbia-main.jpg',
            'images/belgrade-fortress.jpg'
        ];

        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    // Анимация счетчиков (если понадобится)
    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Анимация текста (дополнительная функция)
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Добавляем CSS стили для анимаций
function injectStyles() {
    const styles = `
        /* Анимации появления */
        .fade-in-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Анимация кнопки "Наверх" */
        .back-to-top {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        
        .back-to-top:hover {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) scale(1.1);
            }
            40% {
                transform: translateY(-5px) scale(1.1);
            }
            60% {
                transform: translateY(-2px) scale(1.1);
            }
        }
        
        /* Плавные переходы для карточек */
        .culture-card,
        .place-card, 
        .food-card,
        .fact-card,
        .stat-card,
        .price-category {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        
        /* Анимация для расширенных статистических карточек */
        .stat-expanded {
            transform: scale(1.05) !important;
            z-index: 20 !important;
        }
        
        /* Оптимизация анимаций */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Стили для ленивой загрузки */
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.lazy-loaded {
            opacity: 1;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Внедряем стили
    injectStyles();
    
    // Инициализируем основное приложение
    new SerbiaWebsite();
    
    // Добавляем обработчик ошибок
    window.addEventListener('error', (e) => {
        console.error('Ошибка на сайте:', e.error);
    });
});

// Экспорт для использования в других модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SerbiaWebsite;
}