/**
 * SERBIA TRAVEL PREMIUM - CORE ENGINE
 * Version: 2.0
 * Optimized for: Glassmorphism UI, High Performance
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GLOBAL CONFIG & STATE ---
    const state = {
        lastScrollY: 0,
        isMobile: window.innerWidth < 992,
        currencyRates: {
            RSD: 1,
            EUR: 0.0085, // Примерный курс: 117 RSD = 1 EUR
            USD: 0.0093,
            RUB: 0.85
        },
        currentCurrency: 'RSD'
    };

    // --- 2. SMOOTH SCROLL & NAVIGATION ---
    const initNavigation = () => {
        const header = document.querySelector('.site-header');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navOverlay = document.createElement('div');
        
        // Создаем оверлей для мобильного меню динамически (если его нет в HTML)
        if (!document.querySelector('.nav-overlay')) {
            navOverlay.className = 'nav-overlay';
            // Копируем ссылки для мобильной версии
            const links = document.querySelector('.desktop-nav').innerHTML;
            navOverlay.innerHTML = `<nav class="flex-column gap-md items-center">${links}</nav>`;
            document.body.appendChild(navOverlay);
        } else {
             // Если уже есть в верстке (как в CSS media query)
             // Просто выбираем его
        }
        
        const overlayEl = document.querySelector('.nav-overlay');

        // Логика Бургер-меню
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const isOpen = overlayEl.classList.toggle('open');
                mobileToggle.classList.toggle('active'); // Можно добавить анимацию крестика в CSS
                document.body.style.overflow = isOpen ? 'hidden' : '';
                
                // Анимация ссылок внутри меню
                if (isOpen) {
                    const links = overlayEl.querySelectorAll('a');
                    links.forEach((link, idx) => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            link.style.transition = 'all 0.4s ease';
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, 100 + (idx * 50));
                    });
                }
            });
        }

        // Закрытие мобильного меню при клике на ссылку
        overlayEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                overlayEl.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Плавный скролл для всех якорей
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const elementPosition = targetElem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Умный Хедер (Smart Header)
        const handleHeaderScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Добавляем фон при скролле
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Скрываем хедер при скролле вниз, показываем при скролле вверх
            if (currentScrollY > state.lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            state.lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', () => requestAnimationFrame(handleHeaderScroll));
    };

    // --- 3. PARALLAX HERO EFFECT ---
    const initParallax = () => {
        const heroBg = document.querySelector('.hero-bg');
        const heroContent = document.querySelector('.hero-content');

        if (!heroBg) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > window.innerHeight) return; // Оптимизация: не считать, если не видно

            requestAnimationFrame(() => {
                // Фон движется медленнее (эффект глубины)
                heroBg.style.transform = `translateY(${scrollY * 0.5}px) scale(1.1)`; 
                // Контент уходит чуть быстрее и прозрачнее
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrollY / 700);
                }
            });
        });
    };

    // --- 4. SCROLL REVEAL (Intersection Observer) ---
    // Находит все элементы с классом .reveal и добавляет .active при появлении
    const initScrollReveal = () => {
        // Добавляем класс .reveal к основным блокам, если их нет в HTML
        const sections = document.querySelectorAll('.card, .bento-item, .section-title, .about-text, .stat-item');
        sections.forEach(el => el.classList.add('reveal'));

        const observerOptions = {
            threshold: 0.15, // Срабатывает, когда 15% элемента видно
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Запускаем анимацию только один раз
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    };

    // --- 5. ANIMATED NUMBERS (Stats) ---
    const initCounters = () => {
        const stats = document.querySelectorAll('.stat-number');
        
        const startCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target') || el.innerText.replace(/\D/g,'')); // Берем число из текста, если нет data-attr
            const duration = 2000; // 2 секунды
            const step = Math.ceil(target / (duration / 16)); // 60 FPS
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    el.innerText = current.toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    el.innerText = target.toLocaleString() + (el.innerText.includes('+') ? '+' : '');
                }
            };
            update();
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));
    };

    // --- 6. CURRENCY CONVERTER ---
    const initConverter = () => {
        const btns = document.querySelectorAll('.currency-btn');
        const prices = document.querySelectorAll('.price-val');
        
        // Сохраняем базовые цены (в RSD) при инициализации
        prices.forEach(price => {
            if (!price.dataset.base) {
                // Очищаем текст от валюты и пробелов, берем только число
                const val = parseFloat(price.innerText.replace(/[^0-9.]/g, ''));
                price.dataset.base = val;
            }
        });

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Update
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Logic Update
                const currency = btn.innerText;
                const rate = state.currencyRates[currency];
                
                prices.forEach(price => {
                    const basePrice = parseFloat(price.dataset.base);
                    const converted = Math.round(basePrice * rate);
                    
                    // Эффект плавного изменения цифр
                    price.style.opacity = '0';
                    setTimeout(() => {
                        price.innerText = `${converted.toLocaleString()} ${currency}`;
                        price.style.opacity = '1';
                    }, 200);
                });
            });
        });
    };

    // --- 7. MICRO-INTERACTIONS (Magnetic Buttons) ---
    // Эффект притяжения кнопки к курсору
    const initMagneticButtons = () => {
        if (state.isMobile) return; // Отключаем на тач-устройствах

        const buttons = document.querySelectorAll('.btn-primary, .nav-link');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Вычисляем смещение (центр кнопки - 0,0)
                const xMove = (x - rect.width / 2) / 4; // Делитель регулирует силу магнита
                const yMove = (y - rect.height / 2) / 4;

                btn.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    };

    // --- 8. INITIALIZATION ---
    const init = () => {
        initNavigation();
        initParallax();
        initScrollReveal();
        initCounters();
        initConverter();
        initMagneticButtons();
        
        console.log('🇷🇸 Serbia Premium Experience Loaded');
    };

    init();
});
