// Toggle hamburger menu and navbar visibility
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navbar && navLinks) {
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Toggle dropdown on mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent navigation on first click
            dropdown.classList.toggle('active');
        }
    });
});

// Smooth scroll for nav links (only for anchor links)
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                navbar.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        }
    });
});

// Slider functionality
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    showSlide(currentSlide);
}

// Rules functionality (for rules.html)
document.querySelectorAll('.copyText').forEach(button => {
    button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        navigator.clipboard.writeText(window.location.origin + '/' + link)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    });
});

// Force download function
function forceDownload(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// PDF viewer functionality
document.querySelectorAll('.view-pdf').forEach(button => {
    button.addEventListener('click', () => {
        const pdfUrl = button.getAttribute('data-pdf');
        const pdfViewer = button.closest('.pdf-section').querySelector('.pdf-viewer');
        if (pdfViewer.style.display === 'none' || pdfViewer.style.display === '') {
            pdfViewer.src = pdfUrl;
            pdfViewer.style.display = 'block';
            button.textContent = 'Hide PDF';
        } else {
            pdfViewer.style.display = 'none';
            button.textContent = 'View PDF';
        }
    });
});

// Scroll animations for highlights and stats
const elementsToAnimate = document.querySelectorAll('.highlight-card, .stat-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

elementsToAnimate.forEach(element => observer.observe(element));

// CTA button actions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Explore Our Work') {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        } else if (button.textContent === 'Get Involved') {
            alert('Join us! Contact info: housingdevelopment2017@gmail.com');
        }
    });
});