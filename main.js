// Coding Journey Website JavaScript
// Author: Your Name
// Last Updated: June 2025

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Coding Journey Website Loaded!');
    
    // Initialize all functionality
    initProgressBars();
    initLoadMoreButton();
    initSmoothScrolling();
    initSkillAnimations();
    initTypingEffect();
    initStatsCounter();
    initMobileNavigation();
    initThemeToggle();
    initFormHandling();
    
    // Show loading complete message
    setTimeout(() => {
        console.log('✅ All features initialized successfully!');
    }, 1000);
});

// =====================================
// PROGRESS BAR ANIMATIONS
// =====================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress, .skill-progress');
    
    const animateProgressBar = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || bar.getAttribute('data-width');
                
                // Reset width then animate
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    };
    
    const progressObserver = new IntersectionObserver(animateProgressBar, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        // Store original width as data attribute
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        progressObserver.observe(bar);
    });
}

// =====================================
// LOAD MORE FUNCTIONALITY
// =====================================
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (!loadMoreBtn) return;
    
    const logEntries = document.querySelector('.log-entries');
    let currentEntries = 3; // Show 3 entries initially
    
    // Sample additional log entries (you can replace with real data)
    const additionalEntries = [
        {
            date: 'May 30, 2025',
            title: 'JavaScript Functions Deep Dive',
            tags: ['JavaScript', 'Functions', 'ES6'],
            content: 'Explored arrow functions, closures, and higher-order functions. Built a mini calculator using function composition.',
            highlight: 'Understanding closures finally clicked!'
        },
        {
            date: 'May 29, 2025',
            title: 'CSS Flexbox vs Grid',
            tags: ['CSS', 'Layout', 'Responsive'],
            content: 'Compared Flexbox and Grid for different layout scenarios. Created examples of when to use each.',
            highlight: 'Grid for 2D layouts, Flexbox for 1D - got it!'
        },
        {
            date: 'May 28, 2025',
            title: 'Python Data Structures',
            tags: ['Python', 'Data Structures', 'Algorithms'],
            content: 'Learned about dictionaries, sets, and tuples. Practiced with real-world data manipulation exercises.',
            highlight: 'Dictionary comprehensions are so powerful!'
        }
    ];
    
    loadMoreBtn.addEventListener('click', function() {
        const button = this;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            additionalEntries.forEach((entry, index) => {
                if (index < 2) { // Load 2 more entries at a time
                    const entryHTML = createLogEntry(entry);
                    logEntries.insertAdjacentHTML('beforeend', entryHTML);
                }
            });
            
            currentEntries += 2;
            
            // Update button
            if (currentEntries >= additionalEntries.length + 3) {
                button.textContent = 'No more entries';
                button.disabled = true;
            } else {
                button.textContent = 'Load More Entries';
                button.disabled = false;
            }
            
            // Add animation to new entries
            const newEntries = logEntries.querySelectorAll('.log-entry:nth-last-child(-n+2)');
            newEntries.forEach((entry, index) => {
                entry.style.opacity = '0';
                entry.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.style.transition = 'all 0.5s ease';
                    entry.style.opacity = '1';
                    entry.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 1000);
    });
}

function createLogEntry(entry) {
    const tagsHTML = entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <article class="log-entry">
            <div class="log-date">${entry.date}</div>
            <h3>${entry.title}</h3>
            <div class="log-tags">${tagsHTML}</div>
            <p>${entry.content}</p>
            <div class="log-highlights">
                <strong>💡 Key Learning:</strong> ${entry.highlight}
            </div>
        </article>
    `;
}

// =====================================
// SMOOTH SCROLLING NAVIGATION
// =====================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100; // Account for sticky header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
    });
}

// =====================================
// SKILL ANIMATIONS
// =====================================
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillItem = skillBar.closest('.skill-item');
                
                // Add pulse animation to skill name
                if (skillItem) {
                    const skillName = skillItem.querySelector('.skill-name');
                    skillName.style.animation = 'pulse 0.6s ease-in-out';
                }
                
                observer.unobserve(skillBar);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// =====================================
// TYPING EFFECT FOR HERO
// =====================================
function initTypingEffect() {
    const heroText = document.querySelector('.hero p');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    const typingSpeed = 50;
    let currentIndex = 0;
    
    // Only run on first visit (you can store this in sessionStorage if needed)
    if (sessionStorage.getItem('heroAnimated')) return;
    
    heroText.textContent = '';
    heroText.style.borderRight = '2px solid white';
    
    function typeText() {
        if (currentIndex < originalText.length) {
            heroText.textContent += originalText.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroText.style.borderRight = 'none';
                sessionStorage.setItem('heroAnimated', 'true');
            }, 1000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
}

// =====================================
// STATS COUNTER ANIMATION
// =====================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number, .highlight-number');
    
    const animateCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, '')) || 0;
                
                if (target > 0) {
                    animateNumber(counter, 0, target, 2000);
                }
                
                observer.unobserve(counter);
            }
        });
    };
    
    const counterObserver = new IntersectionObserver(animateCounter, {
        threshold: 0.5
    });
    
    statNumbers.forEach(counter => counterObserver.observe(counter));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    const originalText = element.textContent;
    const hasSymbol = originalText.includes('∞') || originalText.includes('+');
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(start + (range * progress));
        
        if (hasSymbol) {
            if (originalText.includes('∞')) {
                element.textContent = '∞';
                return;
            } else if (originalText.includes('+')) {
                element.textContent = currentNumber + '+';
            }
        } else {
            element.textContent = currentNumber;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// =====================================
// MOBILE NAVIGATION
// =====================================
function initMobileNavigation() {
    // Add mobile menu button (you'll need to add this to your HTML)
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Insert before nav ul
    const navUl = nav.querySelector('ul');
    nav.insertBefore(mobileMenuBtn, navUl);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('mobile-menu-open');
        this.textContent = navUl.classList.contains('mobile-menu-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navUl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('mobile-menu-open');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// =====================================
// THEME TOGGLE (BONUS FEATURE)
// =====================================
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// =====================================
// FORM HANDLING (FOR FUTURE CONTACT FORM)
// =====================================
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message (you can replace with actual form submission)
            showMessage('Thank you! Your message has been received.', 'success');
            
            // Reset form
            this.reset();
        });
    });
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Show notification messages
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1002;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .mobile-menu-btn:hover {
        background: rgba(102, 126, 234, 0.1);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        nav ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 15px 15px;
        }
        
        nav ul.mobile-menu-open {
            display: flex;
        }
        
        nav li {
            width: 100%;
            text-align: center;
        }
        
        nav a {
            display: block;
            padding: 1rem;
            border-bottom: 1px solid #f0f0f0;
        }
        
        nav a:last-child {
            border-bottom: none;
        }
    }
    
    .dark-theme {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .dark-theme img,
    .dark-theme video,
    .dark-theme iframe {
        filter: invert(1) hue-rotate(180deg);
    }
`;

document.head.appendChild(style);

// =====================================
// DEVELOPMENT HELPERS
// =====================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode detected');
    
    // Add development helpers
    window.debugInfo = function() {
        console.log('📊 Website Debug Info:');
        console.log('- Sections:', document.querySelectorAll('section').length);
        console.log('- Progress bars:', document.querySelectorAll('.progress, .skill-progress').length);
        console.log('- Navigation links:', document.querySelectorAll('nav a').length);
        console.log('- Project cards:', document.querySelectorAll('.project-card').length);
    };
    
    // Show debug info after 2 seconds
    setTimeout(() => {
        console.log('💡 Tip: Type debugInfo() in console for website statistics');
    }, 2000);
}