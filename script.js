(function() {
    // Initialize AOS for scroll animations
    AOS.init({ duration: 800, once: true, offset: 80 });
    
    // Rotating words effect
    const wordsArray = ["PROCESS", "GRIND", "JOURNEY", "GROWTH", "DISCIPLINE", "CONSISTENCY"];
    let wordIndex = 0;
    const dynamicWordSpan = document.getElementById('changingWord');
    
    function changeWord() {
        if (!dynamicWordSpan) return;
        dynamicWordSpan.style.animation = 'none';
        dynamicWordSpan.offsetHeight; // Force reflow
        dynamicWordSpan.style.animation = 'fadeWord 0.5s ease';
        wordIndex = (wordIndex + 1) % wordsArray.length;
        dynamicWordSpan.textContent = wordsArray[wordIndex];
    }
    setInterval(changeWord, 2500);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a, .join-btn, .primary-btn, .secondary-btn, .plan-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            let hash = this.getAttribute('href');
            if (hash && hash.startsWith('#') && hash !== '#') {
                e.preventDefault();
                let target = document.querySelector(hash);
                if (target) {
                    let offset = 90;
                    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                    history.pushState(null, null, hash);
                }
            }
        });
    });

    // Initialize Swiper for trainers carousel
    if (typeof Swiper !== 'undefined') {
        new Swiper('.trainer-swiper', {
            slidesPerView: 1,
            spaceBetween: 25,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 
                640: { slidesPerView: 2 }, 
                1024: { slidesPerView: 3 } 
            },
            loop: true,
            autoplay: { delay: 2800, disableOnInteraction: false }
        });
    }

    // Animated stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const animateStats = () => {
        if (statsAnimated) return;
        statsAnimated = true;
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            let current = 0;
            const hasPercent = el.innerText.includes('%');
            const hasPlus = el.innerText.includes('+');
            const increment = Math.ceil(target / 55);
            
            const update = () => {
                current += increment;
                if (current >= target) {
                    if (hasPercent) el.innerText = target + '%';
                    else if (hasPlus) el.innerText = target + '+';
                    else el.innerText = target;
                    return;
                }
                if (hasPercent) el.innerText = current + '%';
                else if (hasPlus) el.innerText = current + '+';
                else el.innerText = current;
                requestAnimationFrame(update);
            };
            update();
        });
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                animateStats(); 
                statsObserver.disconnect(); 
            } 
        });
    }, { threshold: 0.4 });
    
    const statsSection = document.querySelector('.stats-modern');
    if (statsSection) statsObserver.observe(statsSection);
// EmailJS
emailjs.init("a0kug0obyBcIElY8Q");

const form = document.getElementById('alphaContactForm');

if (form) {
    form.addEventListener('submit', function(e) {

        e.preventDefault();

        emailjs.send(
            "service_6kqs70q",
            "template_poavs2u",
            {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                message: document.getElementById("message").value
            }
        )
        .then(() => {

            alert("✅ Message Sent Successfully!");

            form.reset();

        })
        .catch((error) => {

            console.log(error);

            alert("❌ Failed To Send Message");

        });

    });
}

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
})();