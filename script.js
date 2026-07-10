// ===== Dark/Light Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Visitor Counter =====
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = 0;
    }
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // Animate the count
    const counterElement = document.getElementById('visitor-count');
    let current = 0;
    const increment = Math.ceil(count / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
            counterElement.textContent = count;
            clearInterval(timer);
        } else {
            counterElement.textContent = current;
        }
    }, 20);
}

// ===== Scroll Progress Bar =====
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollTopBtn() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Project Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
    }
    
    // For now, just show a success message
    // In production, you would send this to Formspree or your backend
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// ===== Resume Download (Placeholder) =====
const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Please add your resume.pdf file to the assets folder to enable download!');
});

// ===== Event Listeners =====
window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleScrollTopBtn();
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCount();
});

// ===== Smooth scroll for navigation links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
