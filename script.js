// SUPER_JS.js - МЕГА АНИМАЦИИ И ИНТЕРАКТИВ 
class SerbiaExplorer {
    constructor() {
        this.isScrolling = false;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.createParticles();
        this.setupLoadingScreen();
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupAnimations();
        this.setupInteractiveElements();
        this.setupHeaderEffects();
        this.setupBackToTop();
        this.setupCounters();
        this.setupImageEffects();
        this.setupParallax();
        this.setupThemeToggle();
        
        this.bindEvents();
        
        // Запуск начальных анимаций
        setTimeout(() => {
            this.animateHero();
        }, 1000);
    }

    // 🎭 PARTICLE SYSTEM
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные свойства
            const size = Math.random() * 4 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            const color = Math.random() > 0.5 ? 'var(--gold-accent)' : 'var(--serbia-red)';
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}%`,
                top: `${posY}%`,
                background: color,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
            });
            
            particlesContainer.appendChild(particle);
        }
    }

    // ⏳ LOADING SCREEN
    setupLoadingScreen() {
        const loading = document.getElementById('loading');
        
        // Симуляция загрузки
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                this.triggerInitialAnimations();
            }, 500);
        }, 2000);
    }

    triggerInitialAnimations() {
        // Анимация появления элементов
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }

    // 🎯 SMOOTH SCROLL
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Анимация клика
                this.animateButtonClick(link);
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

    // 🧭 NAVIGATION
    setupNavigation() {
        this.sections = document.querySelectorAll('section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.navLinks = document.querySelectorAll('.nav-link');

        // Клик по точкам навигации
        this.navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.dataset.section;
                this.scrollToSection(sectionId);
                this.animateElement(dot, 'pulse');
            });
        });

        // Активное состояние навигации
        this.updateActiveNavigation();
    }

    updateActiveNavigation = () => {
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

        // Обновляем точки навигации
        this.navDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === currentSection);
        });

        // Обновляем ссылки в хедере
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    // 🎬 ANIMATIONS SYSTEM
    setupAnimations() {
        // Intersection Observer для анимаций при скролле
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, this.observerOptions);

        // Наблюдаем за всеми анимируемыми элементами
        document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card, .price-category').forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    animateOnScroll(element) {
        element.classList.add('visible');
        
        // Добавляем задержку для разных элементов
        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, delay);
    }

    // 🎮 INTERACTIVE ELEMENTS
    setupInteractiveElements() {
        // Анимация кнопок
        const buttons = document.querySelectorAll('.cta-button, .nav-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.animateButtonHover(button));
            button.addEventListener('mouseleave', () => this.animateButtonLeave(button));
            button.addEventListener('mousedown', () => this.animateButtonPress(button));
            button.addEventListener('mouseup', () => this.animateButtonRelease(button));
        });

        // Интерактивные карточки
        const cards = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCardHover(card));
            card.addEventListener('mouseleave', () => this.animateCardLeave(card));
            card.addEventListener('click', () => this.animateCardClick(card));
        });

        // Эффекты для изображений
        this.setupImageHoverEffects();
    }

    // 🎪 BUTTON ANIMATIONS
    animateButtonHover(button) {
        button.style.transform = 'translateY(-3px) scale(1.05)';
        button.style.boxShadow = '0 15px 30px rgba(198, 54, 60, 0.4)';
    }

    animateButtonLeave(button) {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 10px 25px rgba(198, 54, 60, 0.3)';
    }

    animateButtonPress(button) {
        button.style.transform = 'translateY(2px) scale(0.95)';
    }

    animateButtonRelease(button) {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    }

    animateButtonClick(button) {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // 🃏 CARD ANIMATIONS
    animateCardHover(card) {
        card.style.transform = 'translateY(-15px) scale(1.03) rotateY(5deg)';
        card.style.zIndex = '100';
    }

    animateCardLeave(card) {
        card.style.transform = 'translateY(-5px) scale(1) rotateY(0)';
        card.style.zIndex = '';
    }

    animateCardClick(card) {
        this.animateElement(card, 'pulse');
    }

    // 🖼️ IMAGE EFFECTS
    setupImageHoverEffects() {
        const images = document.querySelectorAll('.image-container');
        
        images.forEach(container => {
            const img = container.querySelector('img');
            
            container.addEventListener('mouseenter', () => {
                container.style.transform = 'translateY(-10px) scale(1.02)';
                if (img) {
                    img.style.transform = 'scale(1.1) rotate(1deg)';
                }
            });
            
            container.addEventListener('mouseleave', () => {
                container.style.transform = 'translateY(0) scale(1)';
                if (img) {
                    img.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }

    setupImageEffects() {
        // Lazy loading с анимацией
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        
                        // Анимация появления
                        setTimeout(() => {
                            img.style.opacity = '1';
                            img.style.transform = 'scale(1)';
                        }, 200);
                        
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'all 0.6s ease';
                imageObserver.observe(img);
            });
        }
    }

    // 🏔️ HERO ANIMATIONS
    animateHero() {
        const hero = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroStats = document.querySelectorAll('.hero-stat');
        const heroActions = document.querySelector('.hero-actions');

        if (hero) {
            // Анимация появления элементов с задержкой
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 500);

            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 1000);

            heroStats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 1500 + index * 200);
            });

            setTimeout(() => {
                heroActions.style.opacity = '1';
                heroActions.style.transform = 'translateY(0)';
            }, 2200);
        }
    }

    // 📊 ANIMATED COUNTERS
    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current).toLocaleString();
        }, 16);
    }

    // 🎠 PARALLAX EFFECTS
    setupParallax() {
        this.hero = document.querySelector('.hero');
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
    }

    handleParallax = () => {
        const scrolled = window.pageYOffset;
        
        // Параллакс для героя
        if (this.hero) {
            const speed = 0.5;
            this.hero.style.transform = `translateY(${scrolled * speed}px)`;
        }

        // Параллакс для других элементов
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // 🏗️ HEADER EFFECTS
    setupHeaderEffects() {
        this.header = document.getElementById('header');
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

        // Изменение стилей хедера
        if (scrollTop > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScrollTop = scrollTop;
    }

    // ⬆️ BACK TO TOP
    setupBackToTop() {
        this.backToTop = document.getElementById('backToTop');
    }

    toggleBackToTop = () => {
        const shouldShow = window.pageYOffset > 300;
        
        if (shouldShow) {
            this.backToTop.classList.add('show');
            this.backToTop.style.opacity = '1';
            this.backToTop.style.transform = 'scale(1)';
        } else {
            this.backToTop.style.opacity = '0';
            this.backToTop.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    this.backToTop.classList.remove('show');
                }
            }, 300);
        }
    }

    // 🎨 THEME TOGGLE
    setupThemeToggle() {
        this.themeToggle = document.getElementById('themeToggle');
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                this.animateElement(this.themeToggle, 'spin');
            });
        }
    }

    // 🎪 UTILITY ANIMATIONS
    animateElement(element, animationType) {
        element.classList.add(`animate-${animationType}`);
        setTimeout(() => {
            element.classList.remove(`animate-${animationType}`);
        }, 600);
    }

    // ⚡ PERFORMANCE OPTIMIZATIONS
    setupPerformance() {
        this.debouncedScroll = this.debounce(() => {
            this.handleScrollActions();
        }, 10);

        this.throttledParallax = this.throttle(() => {
            this.handleParallax();
        }, 16);
    }

    handleScrollActions() {
        this.updateActiveNavigation();
        this.handleHeaderScroll();
        this.toggleBackToTop();
    }

    // 🛠️ UTILITY FUNCTIONS
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

    // 📡 EVENT BINDING
    bindEvents() {
        // Оптимизированные слушатели скролла
        window.addEventListener('scroll', () => {
            this.debouncedScroll();
            this.throttledParallax();
        });

        window.addEventListener('resize', this.debounce(() => {
            this.updateActiveNavigation();
        }, 250));

        // Back to top click
        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => {
                this.scrollToTop();
                this.animateElement(this.backToTop, 'bounce');
            });
        }

        // Page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Preload critical images
        window.addEventListener('load', () => {
            this.preloadImportantImages();
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    preloadImportantImages() {
        const importantImages = [
            'images/serbia-main.jpg',
            'images/belgrade-fortress.jpg',
            'images/culture-music.jpg'
        ];

        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// 🚀 INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Inject additional styles
    const additionalStyles = `
        .animate-pulse {
            animation: pulse 0.6s ease-in-out;
        }
        .animate-bounce {
            animation: bounce 0.6s ease-in-out;
        }
        .animate-spin {
            animation: spin 0.6s ease-in-out;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .light-theme {
            --dark-bg: #ffffff;
            --text-primary: #1a1a1a;
            --text-secondary: #666666;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // Initialize the main application
    new SerbiaExplorer();
});

// 🎯 ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('SerbiaExplorer Error:', e.error);
});

// 📊 PERFORMANCE MONITORING
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }, 0);
    });
}
