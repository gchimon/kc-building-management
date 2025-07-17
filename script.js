/**
 * KC Building Management Website
 * Enhanced JavaScript functionality with modern animations and interactions
 */

// Hero random image - single size
const heroImages = [
  "media/hero-bg-1.jpeg",
  "media/hero-bg-2.png",
  "media/hero-bg-3.png",
  "media/hero-bg-4.png"
];

// Set hero image function
function setHeroImage() {
    const heroImg = document.querySelector('.hero-image-bg img');
    if (heroImg) {
        heroImg.classList.add('hero-image-transition');
        // Keep only the first image
        heroImg.src = heroImages[0];
    }
}

// Footer background slideshow
function initFooterSlideshow() {
    const footerImages = document.querySelectorAll('.footer-bg-image');
    let currentIndex = 0;
    
    if (footerImages.length > 1) {
        setInterval(() => {
            footerImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % footerImages.length;
            footerImages[currentIndex].classList.add('active');
        }, 5000); // Change every 5 seconds
    }
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
    });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu and restore scrolling
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger counter animations for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .about-card, .member, .value-card, .contact-item, .team-stat');
    animateElements.forEach(el => observer.observe(el));

    // Observe stats for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
}

// Counter animations
function animateCounter(element) {
    if (element.dataset.animated) return;
    
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.dataset.animated = 'true';
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements, .hero-pattern');
        
        parallaxElements.forEach(element => {
            element.classList.add('parallax-element');
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced animations
function initAnimations() {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Building animations
    const buildings = document.querySelectorAll('.building');
    buildings.forEach((building, index) => {
        building.style.opacity = '0';
        building.style.transform = 'scale(0.5) translateY(50px)';
        setTimeout(() => {
            building.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            building.style.opacity = '1';
            building.style.transform = 'scale(1) translateY(0)';
        }, 1000 + index * 200);
    });

    // Floating elements animations
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1) rotate(0deg)';
        }, 1500 + index * 300);
    });
}

// Hover effects
function initHoverEffects() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
    });

    // Value cards hover effect
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> שליחה...';
            submitBtn.disabled = true;
            
            // Build email body with all form data
            const emailBody = buildEmailBody(data);
            
            // Create mailto link with all data
            const mailtoLink = `mailto:info@kc-building.co.il?subject=פנייה חדשה מאתר KC Building Management&body=${encodeURIComponent(emailBody)}`;
            
            // Show success message
            showToast('הטופס מאושר! נפתחת תוכנת המייל שלך...', 'success');
            
            // Reset form immediately
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Open email client after a short delay
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 500);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// Form validation
function validateForm(data) {
    let isValid = true;
    
    // Required fields
    const requiredFields = ['name', 'phone', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'שדה זה הוא חובה');
            isValid = false;
        }
    });
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        showFieldError('phone', 'מספר טלפון לא תקין');
        isValid = false;
    }
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'כתובת אימייל לא תקינה');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(fieldName);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldName, 'שדה זה הוא חובה');
        return false;
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        showFieldError(fieldName, 'מספר טלפון לא תקין');
        return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldName, 'כתובת אימייל לא תקינה');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Build email body with all form data
function buildEmailBody(data) {
    const serviceNames = {
        'cleaning': 'ניקיון פוליש איכותי',
        'gardening': 'עבודות גינון וטיפוח',
        'maintenance': 'תחזוקה שוטפת',
        'renovation': 'שיפוצים',
        'pest-control': 'הדברה',
        'pigeon-control': 'הרחקת יונים'
    };
    
    let body = 'שלום,\n\n';
    body += 'התקבלה פנייה חדשה מאתר KC Building Management:\n\n';
    body += `שם מלא: ${data.name || 'לא צוין'}\n`;
    body += `מספר טלפון: ${data.phone || 'לא צוין'}\n`;
    body += `כתובת אימייל: ${data.email || 'לא צוין'}\n`;
    body += `סוג שירות: ${serviceNames[data.service] || 'לא נבחר'}\n`;
    body += `תיאור השירות: ${data.message || 'לא צוין'}\n\n`;
    body += 'תאריך הפנייה: ' + new Date().toLocaleDateString('he-IL') + '\n';
    body += 'שעת הפנייה: ' + new Date().toLocaleTimeString('he-IL') + '\n\n';
    body += 'בברכה,\n';
    body += 'מערכת האתר - KC Building Management';
    
    return body;
}

// Toast notifications
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast class for styling
    toast.classList.add(`toast-${type}`);
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    toast.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}



// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Enter key for buttons
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });
    
    // Focus management is now handled by CSS
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'דלג לתוכן הראשי';
    skipLink.className = 'skip-link';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Perform scroll-based operations here
        }, 16); // ~60fps
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Theme management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Update toggle button icon
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Show toast notification
            const message = newTheme === 'dark' ? 'עיצוב כהה מופעל' : 'עיצוב בהיר מופעל';
            showToast(message, 'success');
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(() => {
    initTheme();
    initNavigation();
    initScrollEffects();
    initParallaxEffects();
    initAnimations();
    initHoverEffects();
    initContactForm();
    initBackToTop();
    initLoadingAnimations();
    initAccessibility();
    initPerformanceOptimizations();
        setHeroImage();
        initFooterSlideshow();
        // Add scroll-down button functionality
        const heroScrollBtn = document.querySelector('.hero-scroll');
        const aboutSection = document.getElementById('about');
        if (heroScrollBtn && aboutSection) {
            heroScrollBtn.addEventListener('click', function() {
                const offsetTop = aboutSection.offsetTop - 60; // adjust for nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            });
        }
    }, 100);
});

// All styles have been moved to style.css

// Export functions for potential external use
window.KCWebsite = {
    showToast,
    validateForm,
    animateCounter
};
