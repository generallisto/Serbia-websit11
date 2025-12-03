/* ======================
   MOBILE MENU
====================== */
const navToggle = document.getElementById("mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

/* ======================
   SCROLL FADE-UP
====================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("shown");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section, .culture-card, .place-card, .fact-card, .food-card, .price-category, .stat-card")
    .forEach(el => {
        el.classList.add("fade-up");
        observer.observe(el);
    });

/* ======================
   SIDE DOT NAVIGATION
====================== */
const dots = document.querySelectorAll(".nav-dot");
const sections = document.querySelectorAll("section[id]");

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        const id = dot.dataset.section;
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    });
});

window.addEventListener("scroll", () => {
    let pos = window.scrollY + window.innerHeight / 2;

    sections.forEach(sec => {
        if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
            let id = sec.getAttribute("id");
            dots.forEach(d => d.classList.toggle("active", d.dataset.section === id));
        }
    });
});

/* ======================
   FLOATING GOLD PARTICLES
====================== */
const particles = document.createElement("div");
particles.className = "gold-particles";
document.body.appendChild(particles);

for (let i = 0; i < 25; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = 4 + Math.random() * 6 + "s";
    p.style.opacity = 0.3 + Math.random() * 0.7;
    particles.appendChild(p);
}

/* ======================
   PARALLAX (soft gold)
====================== */
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".parallax").forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.03;
        const x = (window.innerWidth / 2 - e.clientX) * speed;
        const y = (window.innerHeight / 2 - e.clientY) * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});
