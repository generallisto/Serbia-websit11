// script.js - Оранжево-черный минимализм с анимациями
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🇷🇸 Сербия | Минималистичный сайт', 'font-size: 20px; font-weight: bold; color: #ff5e00;');
    console.log('%cСтиль: Оранжево-черный минимализм', 'color: #666;');

    // Инициализация LiquidChrome фона
    initLiquidChrome();

    // Smooth scroll для навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Добавляем эффект подсветки при клике
                this.style.color = '#ff5e00';
                setTimeout(() => {
                    this.style.color = '';
                }, 300);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Активное состояние секций и точек навигации
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');

    function setActiveSection() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
                section.classList.add('active');
                
                // Эффект появления секции
                if (!section.classList.contains('animated')) {
                    section.classList.add('animated');
                    section.style.animation = 'fadeInUp 0.8s ease-out';
                }
            } else {
                section.classList.remove('active');
            }
        });

        // Обновляем активную точку навигации
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
                
                // Эффект пульсации для активной точки
                if (!dot.classList.contains('pulsing')) {
                    dot.classList.add('pulsing');
                    setTimeout(() => dot.classList.remove('pulsing'), 600);
                }
            }
        });
    }

    // Клик по точкам навигации
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                // Эффект клика
                this.style.transform = 'scale(1.8)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация хедера при скролле
    const header = document.querySelector('.glass-header');
    let lastScrollTop = 0;

    function headerScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottom = '1px solid rgba(255, 94, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.7)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(255, 94, 0, 0.2)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Кнопка "Наверх" в стиле минимализма
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Вернуться наверх');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        background: rgba(255, 94, 0, 0.9);
        border: 1px solid rgba(255, 94, 0, 0.3);
        border-radius: 8px;
        color: #000;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(255, 94, 0, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(20px);
    `;
    document.body.appendChild(backToTop);

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
        this.style.boxShadow = '0 8px 32px rgba(255, 94, 0, 0.4)';
        this.style.background = 'rgba(255, 94, 0, 1)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(255, 94, 0, 0.3)';
        this.style.background = 'rgba(255, 94, 0, 0.9)';
    });

    backToTop.addEventListener('click', function() {
        // Эффект нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавное появление кнопки "Наверх"
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            setTimeout(() => {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            }, 10);
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 300);
        }
    }

    // Анимация карточек при наведении
    const cards = document.querySelectorAll('.glass-card, .card, .place-card, .food-card, .fact-card, .feature');
    
    cards.forEach(card => {
        // Добавляем свечение при наведении
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: inherit;
            background: linear-gradient(45deg, rgba(255,94,0,0.3), rgba(255,94,0,0));
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
        `;
        card.style.position = 'relative';
        card.appendChild(glow);

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(255, 94, 0, 0.15)';
            this.style.borderColor = 'rgba(255, 94, 0, 0.3)';
            glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '';
            this.style.borderColor = 'rgba(255, 94, 0, 0.2)';
            glow.style.opacity = '0';
        });
    });

    // Эффект для кнопки CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Добавляем эффект свечения
        const ctaGlow = document.createElement('div');
        ctaGlow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 8px;
            background: linear-gradient(45deg, rgba(255,94,0,0.4), rgba(255,94,0,0));
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
            filter: blur(4px);
        `;
        ctaButton.style.position = 'relative';
        ctaButton.appendChild(ctaGlow);

        ctaButton.addEventListener('mouseenter', function() {
            ctaGlow.style.opacity = '1';
        });

        ctaButton.addEventListener('mouseleave', function() {
            ctaGlow.style.opacity = '0';
        });

        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Эффект пульсации при клике
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            // Плавный скролл к секции about
            const targetSection = document.getElementById('about');
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 200);
            }
        });
    }

    // Параллакс эффект для героя
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.opacity = `${1 - scrolled * 0.001}`;
        }
    }

    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.glass-card, .card, .feature, .stat-item, .price-item');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем небольшую задержку между элементами
                if (entry.target.classList.contains('stat-item') || 
                    entry.target.classList.contains('price-item')) {
                    const index = Array.from(fadeElements).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Изначально скрываем элементы
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        fadeObserver.observe(element);
    });

    // Анимация цифр в статистике
    function animateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const value = parseInt(stat.textContent);
                        if (!isNaN(value)) {
                            animateCounter(stat, 0, value, 2000);
                        }
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }

    // Анимация курсора
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            background: #ff5e00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.3s;
        `;
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.id = 'cursor-follower';
        cursorFollower.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 24px;
            height: 24px;
            border: 1px solid rgba(255, 94, 0, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.15s ease-out;
            opacity: 0;
        `;
        document.body.appendChild(cursorFollower);

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });

        function animateCursor() {
            // Основной курсор
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
            
            // Второй курсор с запаздыванием
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Эффекты при наведении на интерактивные элементы
        const interactiveElements = document.querySelectorAll('a, button, .nav-dot, .glass-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '16px';
                cursor.style.height = '16px';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderColor = 'rgba(255, 94, 0, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '8px';
                cursor.style.height = '8px';
                cursorFollower.style.width = '24px';
                cursorFollower.style.height = '24px';
                cursorFollower.style.borderColor = 'rgba(255, 94, 0, 0.5)';
            });
        });
    }

    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        /* Анимация ripple эффекта */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Анимация появления */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Пульсация активной точки */
        @keyframes pulseDot {
            0%, 100% {
                transform: scale(1.5);
                box-shadow: 0 0 0 0 rgba(255, 94, 0, 0.7);
            }
            50% {
                transform: scale(1.8);
                box-shadow: 0 0 0 10px rgba(255, 94, 0, 0);
            }
        }
        
        .nav-dot.pulsing {
            animation: pulseDot 0.6s ease-out;
        }
        
        /* Анимация свечения */
        @keyframes glowPulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 94, 0, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(255, 94, 0, 0.6);
            }
        }
        
        /* Плавное появление секций */
        section.active {
            animation: fadeInUp 0.8s ease-out;
        }
        
        /* Эффект для навигационных ссылок */
        .nav-link.active {
            color: #ff5e00 !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Анимация карточек */
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Эффект для чисел */
        .counting {
            position: relative;
        }
        
        .counting::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, rgba(255,94,0,0.2), transparent);
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .counting.animating::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Инициализация всех функций
    function init() {
        setActiveSection();
        toggleBackToTop();
        animateStats();
        initCustomCursor();
        
        // Слушатели событий
        window.addEventListener('scroll', function() {
            setActiveSection();
            headerScroll();
            toggleBackToTop();
            parallaxEffect();
        });

        window.addEventListener('resize', setActiveSection);
        
        // Запускаем анимацию при загрузке
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Запускаем инициализацию
    init();

    // Дебаунс для оптимизации
    function debounce(func, wait, immediate) {
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
});

// Анимация счетчика для чисел
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    element.classList.add('counting', 'animating');
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            setTimeout(() => {
                element.classList.remove('animating');
            }, 300);
        }
    };
    window.requestAnimationFrame(step);
}

// Инициализация LiquidChrome фона
function initLiquidChrome() {
    const bgContainer = document.getElementById('liquid-bg');
    if (!bgContainer) return;
    
    // Создаем минималистичную реализацию LiquidChrome
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
    `;
    bgContainer.appendChild(canvas);
    
    let time = 0;
    const particles = [];
    
    // Создаем частицы для минималистичного эффекта
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: i % 3 === 0 ? '#ff5e00' : i % 3 === 1 ? '#ff8a3d' : '#000'
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.01;
        
        // Рисуем волны
        ctx.strokeStyle = 'rgba(255, 94, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += 20) {
            const y = canvas.height / 2 + Math.sin(time + i * 0.01) * 100;
            ctx.lineTo(i, y);
        }
        ctx.stroke();
        
        // Обновляем и рисуем частицы
        particles.forEach(particle => {
            particle.x += particle.speedX + Math.sin(time + particle.y * 0.01) * 0.5;
            particle.y += particle.speedY + Math.cos(time + particle.x * 0.01) * 0.5;
            
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Соединяем близкие частицы
            particles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 94, 0, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    animate();
    
    // Эффект при движении мыши
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Слегка перемещаем частицы к курсору
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                particle.x += dx * 0.001;
                particle.y += dy * 0.001;
            }
        });
    });
}

// Прелоадер (опционально)
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 94, 0, 0.3);
        border-top: 3px solid #ff5e00;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    // Добавляем анимацию вращения
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});
