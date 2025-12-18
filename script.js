/**
 * SRBIJA GOLD - PREMIUM INTERACTIVE ENGINE
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. КОНФИГУРАЦИЯ И КУРСЫ ВАЛЮТ ---
    const config = {
        rates: {
            RSD: 1,
            EUR: 0.0085,
            RUB: 0.82
        },
        currentCurrency: 'RSD'
    };

    // --- 2. АНИМАЦИЯ ЗВЕЗДНОГО НЕБА (CANVAS) ---
    const initStarfield = () => {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let stars = [];
        let fallingStars = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars();
        };

        const createStars = () => {
            stars = [];
            const count = Math.floor((canvas.width * canvas.height) / 3000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5,
                    opacity: Math.random(),
                    speed: Math.random() * 0.02
                });
            }
        };

        const createFallingStar = () => {
            if (Math.random() < 0.02) {
                fallingStars.push({
                    x: Math.random() * canvas.width,
                    y: -20,
                    speed: Math.random() * 6 + 4,
                    length: Math.random() * 100 + 50,
                    width: Math.random() * 2 + 1,
                    opacity: 1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Статичные мерцающие звезды
            stars.forEach(s => {
                s.opacity += s.speed;
                if (s.opacity > 1 || s.opacity < 0) s.speed = -s.speed;
                
                ctx.globalAlpha = Math.abs(s.opacity);
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Падающие золотые звезды
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ffcc00";
            ctx.strokeStyle = "#ffcc00";
            
            fallingStars.forEach((fs, i) => {
                ctx.globalAlpha = fs.opacity;
                ctx.lineWidth = fs.width;
                ctx.beginPath();
                ctx.moveTo(fs.x, fs.y);
                ctx.lineTo(fs.x - fs.length * 0.5, fs.y + fs.length);
                ctx.stroke();

                fs.y += fs.speed;
                fs.x -= fs.speed * 0.5;
                if (fs.y > canvas.height + 100) fallingStars.splice(i, 1);
            });

            ctx.shadowBlur = 0;
            createFallingStar();
            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();
    };

    // --- 3. КОНВЕРТЕР ВАЛЮТ (УМНЫЙ) ---
    const initCurrency = () => {
        const buttons = document.querySelectorAll('.curr-btn');
        const priceElements = document.querySelectorAll('.price-tag');

        // Сохраняем базовую цену (в RSD) для каждого элемента
        priceElements.forEach(el => {
            if (!el.dataset.base) {
                const baseValue = parseFloat(el.innerText.replace(/[^0-9.]/g, ''));
                el.dataset.base = baseValue;
            }
        });

        const updatePrices = (currency) => {
            const rate = config.rates[currency];
            
            priceElements.forEach(el => {
                const baseValue = parseFloat(el.dataset.base);
                const convertedValue = (baseValue * rate);
                
                // Эффект плавного пересчета
                let displayValue;
                if (currency === 'RSD') {
                    displayValue = Math.round(convertedValue).toLocaleString();
                } else {
                    displayValue = convertedValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }

                // Анимация смены цифр
                el.style.opacity = '0';
                setTimeout(() => {
                    el.innerHTML = `${displayValue}<span class="currency-label">${currency}</span>`;
                    el.style.opacity = '1';
                }, 200);
            });
        };

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updatePrices(btn.dataset.curr.toUpperCase());
            });
        });
    };

    // --- 4. СКРОЛЛ-АНИМАЦИИ (REVEAL) ---
    const initReveal = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Дополнительная задержка для вложенных элементов, если нужно
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    // --- 5. ПОВЕДЕНИЕ ХЕДЕРА ---
    const initHeader = () => {
        const header = document.getElementById('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Фон при скролле
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Скрытие/показ при направлении скролла
            if (currentScroll > lastScroll && currentScroll > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    };

    // --- ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ ---
    const init = () => {
        initStarfield();
        initCurrency();
        initReveal();
        initHeader();
        
        console.log('Srbija Gold Interactive Initialized');
    };

    init();
});
