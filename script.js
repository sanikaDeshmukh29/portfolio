// ===== Configuration =====
const GITHUB_USERNAME = 'sanikaDeshmukh29';
const TYPING_SPEED = 100; // ms per character
const TYPING_DELETE_SPEED = 50;
const TYPING_PAUSE = 2000;

// ===== Typing Animation for Hero Title =====
const titles = ['Full Stack Developer', 'Java & Spring Boot Expert', 'Angular Developer', 'AI Engineering Enthusiast'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-title');

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? TYPING_DELETE_SPEED : TYPING_SPEED;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = TYPING_PAUSE;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next title
    }
    
    setTimeout(typeTitle, typeSpeed);
}

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

// ===== GitHub Projects API Integration =====
async function fetchGitHubProjects() {
    const container = document.getElementById('github-projects-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        const repos = await response.json();
        
        if (repos.length === 0) {
            container.innerHTML = '<div class="empty-state">No GitHub projects found</div>';
            return;
        }
        
        // Get all unique languages for filters
        const languages = [...new Set(repos.map(repo => repo.language).filter(lang => lang))];
        
        let html = `
            <div class="project-filters">
                <button class="filter-btn active" data-filter="all">All</button>
                ${languages.map(lang => `<button class="filter-btn" data-filter="${lang.toLowerCase()}">${lang}</button>`).join('')}
            </div>
            <div class="projects-grid" id="github-projects-grid">
        `;
        
        repos.forEach(repo => {
            const repoLanguage = repo.language ? repo.language.toLowerCase() : 'other';
            html += `
                <div class="project-card github-project-card" data-category="${repoLanguage}" onclick="window.open('${repo.html_url}', '_blank')">
                    <div class="project-image">
                        <div class="placeholder-image">📂</div>
                    </div>
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available'}</p>
                        <div class="project-tech">
                            ${repo.language ? `<span>${repo.language}</span>` : ''}
                            ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span>${topic}</span>`).join('') : ''}
                        </div>
                        <div class="project-stats">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                            <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add filter functionality for GitHub projects
        const filterBtns = container.querySelectorAll('.filter-btn');
        const projectCards = container.querySelectorAll('.github-project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
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
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        container.innerHTML = '<div class="error-state">Failed to load GitHub projects</div>';
    }
}

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
    typeTitle();
    updateVisitorCount();
    fetchGitHubProjects();
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
