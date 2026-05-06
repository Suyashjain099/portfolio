gsap.registerPlugin(ScrollTrigger, TextPlugin);

// 1. Typing Animation (Hero)
const words = ["Software Engineer.", "Full Stack Dev.", "System Designer."];
let mainTimeline = gsap.timeline({ repeat: -1 });

words.forEach((word) => {
    let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
    tl.to('.typing-text', { duration: 1.5, text: word, ease: "none" });
    mainTimeline.add(tl);
});

// Cursor blinking
gsap.to('.cursor', { opacity: 0, ease: "power2.inOut", repeat: -1 });


// 2. Counting Animation (Stats)
gsap.utils.toArray('.counter').forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isFloat = target % 1 !== 0; // Check if it needs decimals (like 9.16)

    gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: isFloat ? 0.01 : 1 }, // Snap to integer or 2 decimals
        scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        onUpdate: function () {
            counter.innerText = isFloat ? this.targets()[0].innerText : Math.ceil(this.targets()[0].innerText);
        }
    });
});


// 3. Hero Animations
const tlHero = gsap.timeline();

tlHero.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
})
    .from('.hero-greeting', {
        opacity: 0,
        x: -20,
        duration: 0.8
    })
    .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1
    }, "-=0.5")
    .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1
    }, "-=0.8")
    .from('.hero-visual', {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1.5,
        ease: 'back.out(1.7)'
    }, "-=1.5");


// 4. Scroll Reveal Animations
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

gsap.from('.glass-container', {
    scrollTrigger: {
        trigger: '#about',
        start: "top 75%"
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// 5. Project Reveals
gsap.utils.toArray('.project-item').forEach((item, i) => {
    const isEven = i % 2 === 0;

    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%"
        },
        x: isEven ? -50 : 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
});

// 6. Service Cards Stagger
gsap.set('.service-card', { opacity: 1 }); // Ensure visible by default
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: "top 80%",
        once: true
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
});

// 7. Skills Ecosystem Stagger
gsap.set('.skill-category', { opacity: 1 }); // Ensure visible by default
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-ecosystem',
        start: "top 85%",
        once: true
    },
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
});

// 8. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = `${scrollPx / winHeightPx * 100}%`;
    const progressBar = document.getElementById("scrollProgressBar");
    if(progressBar) progressBar.style.width = scrolled;
});

// 9. 3D Tilt Effect for Cards
const tiltElements = document.querySelectorAll('.service-card, .project-visual, .achievement-card, .skill-category');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'none';
        el.style.zIndex = '10';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease';
        el.style.zIndex = '1';
    });
});

// 10. Hero Parallax Effect
document.addEventListener('mousemove', (e) => {
    const heroImg = document.querySelector('.hero-img');
    if (!heroImg) return;
    
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    
    gsap.to(heroImg, {
        x: x,
        y: y,
        rotationY: x,
        rotationX: -y,
        ease: "power2.out",
        duration: 1
    });
});

// 11. Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileBtnIcon = document.querySelector('.mobile-menu-btn i');

function openNav() {
    navLinks.classList.add('active');
    document.body.classList.add('nav-open');
    if (mobileBtnIcon) mobileBtnIcon.className = 'fas fa-times';
}

function closeNav() {
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
    if (mobileBtnIcon) mobileBtnIcon.className = 'fas fa-bars';
}

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeNav() : openNav();
    });

    // Close when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close when clicking the overlay (outside the nav)
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileBtn.contains(e.target)) {
            closeNav();
        }
    });
}
