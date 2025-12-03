/* ======================
   MOBILE MENU
====================== */
const navToggle = document.getElementById("mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !expanded);
    });
}

/* ======================
   SIDE DOT NAVIGATION
====================== */
const dots = document.querySelectorAll(".nav-dot");

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        const sectionId = dot.dataset.section;
        const section = document.getElementById(sectionId);

        if (section) section.scrollIntoView({ behavior: "smooth" });

        dots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
    });
});

/* ======================
   OBSERVER FADE-IN
====================== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Для таймлайна — пульсация точки
            if (entry.target.classList.contains("timeline-item")) {
                entry.target.classList.add("pulse");
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-target").forEach(el => observer.observe(el));

/* ======================
   ANIMATED NUMBERS
====================== */
function animateCounter(el, start, end, duration) {
    let startTime = null;

    function animate(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        el.textContent = value.toLocaleString();

        if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ======================
   UPDATE SIDE DOTS WHILE SCROLLING
====================== */
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
            const id = sec.getAttribute("id");

            dots.forEach(dot => {
                dot.classList.toggle("active", dot.dataset.section === id);
            });
        }
    });
});

/* ======================
   PARALLAX HERO (soft)
====================== */
document.addEventListener("mousemove", e => {
    const elements = document.querySelectorAll(".float");

    elements.forEach(el => {
        const speed = parseFloat(el.getAttribute("data-speed")) || 0.04;
        const x = (window.innerWidth / 2 - e.clientX) * speed;
        const y = (window.innerHeight / 2 - e.clientY) * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});
