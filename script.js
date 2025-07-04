// Smooth scrolling for navigation links
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

// Add scroll effect to header
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.review-card, .blog-post, .presales-table tr').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effects to table rows
document.querySelectorAll('.presales-table tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.zIndex = '10';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// Dynamic timestamp updates for blog posts
function updateTimestamps() {
    const blogPosts = document.querySelectorAll('.blog-post time');
    blogPosts.forEach(timeElement => {
        const dateTime = new Date(timeElement.getAttribute('datetime'));
        const now = new Date();
        const diffInHours = Math.floor((now - dateTime) / (1000 * 60 * 60));
        
        if (diffInHours < 24) {
            const timeText = timeElement.textContent;
            if (!timeText.includes('hours ago') && !timeText.includes('minutes ago')) {
                timeElement.textContent = `${diffInHours} hours ago`;
            }
        }
    });
}

// Update timestamps every minute
setInterval(updateTimestamps, 60000);

// Add loading animation for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.textContent.includes('View Presale')) {
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = 'View Presale';
                this.style.opacity = '1';
            }, 2000);
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize tooltips for ratings
document.querySelectorAll('.rating-score').forEach(score => {
    score.setAttribute('title', 'Rating based on team, technology, tokenomics, and market potential');
});

// Add live update indicator animation
const liveIndicators = document.querySelectorAll('.live-indicator');
liveIndicators.forEach(indicator => {
    setInterval(() => {
        indicator.style.opacity = '0.5';
        setTimeout(() => {
            indicator.style.opacity = '1';
        }, 500);
    }, 2000);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Add search functionality (basic implementation)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tokens...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 0.5rem 1rem;
        border: 1px solid #4a5568;
        border-radius: 6px;
        background: rgba(45, 55, 72, 0.8);
        color: #e2e8f0;
        font-size: 0.9rem;
        width: 200px;
        margin-left: 1rem;
    `;
    
    // Add to navigation (commented out for now)
    // document.querySelector('.nav').appendChild(searchInput);
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.presales-table tbody tr');
        
        rows.forEach(row => {
            const tokenName = row.querySelector('.token-name').textContent.toLowerCase();
            const tokenSymbol = row.querySelector('.token-symbol').textContent.toLowerCase();
            
            if (tokenName.includes(searchTerm) || tokenSymbol.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect to hero section
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(30px)';
    hero.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
    
    // Initialize search (commented out for now)
    // initSearch();
    
    console.log('Arcadeum.io loaded successfully!');
});