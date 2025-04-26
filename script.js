document.addEventListener('DOMContentLoaded', function() {
    // Generate stars
    generateStars();
    
    // Custom cursor
    initCustomCursor();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Initialize animations
    initScrollAnimations();
    
    // Interactive elements
    initInteractiveElements();
    
    // Initialize solar system
    initSolarSystem();
    
    // Initialize fade-in animations
    initFadeInAnimations();
});

// Generate random stars for the background
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) {
        const starsDiv = document.createElement('div');
        starsDiv.classList.add('stars');
        document.body.appendChild(starsDiv);
        
        const starCount = window.innerWidth < 768 ? 100 : 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random star properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--delay', `${delay}s`);
            
            starsDiv.appendChild(star);
        }
    }
}

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .cosmic-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        observer.observe(card);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Tilt effect for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const itemCenterY = itemRect.top + itemRect.height / 2;
            
            const mouseX = e.clientX - itemCenterX;
            const mouseY = e.clientY - itemCenterY;
            
            const rotateX = (mouseY / (itemRect.height / 2)) * -5;
            const rotateY = (mouseX / (itemRect.width / 2)) * 5;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim() && input.hasAttribute('required')) {
                    isValid = false;
                    input.style.borderColor = 'var(--nebula-pink)';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulate form submission success
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = 'Message Sent!';
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Animated counting for achievement numbers
    const animateCounter = (element, target) => {
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        const animate = () => {
            count += increment;
            if (count > target) count = target;
            
            element.textContent = Math.floor(count);
            
            if (count < target) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    };
    
    // Find and animate counters when they come into view
    const counterElements = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.cosmic-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        function typeText() {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing when page loads
        setTimeout(typeText, 500);
    }
}

// Logo meteor enhancements
function initLogoMeteors() {
    // This function is now replaced by initSolarSystem
}

// Helper function to create additional meteors
function createAdditionalMeteors(logoElement, baseClass, count) {
    // This function is now replaced by createStarParticles
}

// Initialize the solar system
function initSolarSystem() {
    // Add star particles to the solar system
    createStarParticles();
    
    // Get logo elements
    const logo1 = document.querySelector('.logo-orbit-1 .logo-img');
    const logo2 = document.querySelector('.logo-orbit-2 .logo-img');
    const solarCenter = document.querySelector('.solar-center');
    
    if (logo1 && logo2 && solarCenter) {
        // Add hover and interaction effects to logos
        [logo1, logo2].forEach(logo => {
            // Hover effect
            logo.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 30px rgba(108, 99, 255, 0.8))';
                this.classList.add('logo-pulse');
                
                // Slow down orbit animation on hover
                const orbitElement = this.closest('.logo-orbit-1, .logo-orbit-2');
                if (orbitElement) {
                    orbitElement.style.animationPlayState = 'paused';
                    setTimeout(() => {
                        orbitElement.style.animationPlayState = 'running';
                    }, 200);
                }
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.filter = '';
                this.classList.remove('logo-pulse');
            });
            
            // Click effect
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create burst effect
                const burst = document.createElement('div');
                burst.classList.add('logo-burst');
                burst.style.position = 'absolute';
                burst.style.top = '50%';
                burst.style.left = '50%';
                burst.style.transform = 'translate(-50%, -50%)';
                burst.style.width = '10px';
                burst.style.height = '10px';
                burst.style.borderRadius = '50%';
                burst.style.backgroundColor = this === logo1 ? 'var(--nebula-blue)' : 'var(--nebula-pink)';
                burst.style.boxShadow = this === logo1 
                    ? '0 0 30px 20px rgba(0, 151, 255, 0.8)' 
                    : '0 0 30px 20px rgba(255, 25, 140, 0.8)';
                burst.style.animation = 'burst 1s forwards';
                burst.style.zIndex = '10';
                
                this.parentElement.appendChild(burst);
                
                // Add pulse to solar center
                solarCenter.style.animation = 'none';
                setTimeout(() => {
                    solarCenter.style.animation = 'pulse 4s ease-in-out infinite';
                }, 10);
                
                // Create ripple effect in the orbits
                createRippleEffect(this === logo1 ? 'var(--nebula-blue)' : 'var(--nebula-pink)');
                
                // Remove burst element after animation completes
                setTimeout(() => {
                    if (burst.parentElement) {
                        burst.parentElement.removeChild(burst);
                    }
                }, 1000);
            });
        });
        
        // Add interaction effect to the solar center
        solarCenter.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 60px rgba(108, 99, 255, 0.9), 0 0 100px rgba(255, 25, 140, 0.5)';
            document.querySelectorAll('.orbit').forEach(orbit => {
                orbit.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
        });
        
        solarCenter.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            document.querySelectorAll('.orbit').forEach(orbit => {
                orbit.style.borderColor = '';
            });
        });
        
        // Add click effect to solar center
        solarCenter.addEventListener('click', function() {
            // Create explosion effect
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 100px rgba(108, 99, 255, 1), 0 0 150px rgba(255, 25, 140, 0.8)';
            
            // Affect the orbits
            document.querySelectorAll('.orbit').forEach(orbit => {
                orbit.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                orbit.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
            });
            
            // Speed up the logo orbits temporarily
            document.querySelector('.logo-orbit-1').style.animationDuration = '5s';
            document.querySelector('.logo-orbit-2').style.animationDuration = '8s';
            
            // Create ripple effect
            createRippleEffect('rgba(255, 255, 255, 0.8)');
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                document.querySelectorAll('.orbit').forEach(orbit => {
                    orbit.style.borderColor = '';
                    orbit.style.boxShadow = '';
                });
                
                document.querySelector('.logo-orbit-1').style.animationDuration = '';
                document.querySelector('.logo-orbit-2').style.animationDuration = '';
            }, 1500);
        });
    }
}

// Function to create star particles in the solar system
function createStarParticles() {
    const solarSystem = document.querySelector('.solar-system');
    if (!solarSystem) return;
    
    // Add small star particles
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        
        // Random position around the orbits
        const angle = Math.random() * 360;
        const distance = 100 + Math.random() * 200;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        star.style.left = `calc(50% + ${x}px)`;
        star.style.top = `calc(50% + ${y}px)`;
        
        // Random size
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity
        star.style.opacity = 0.4 + Math.random() * 0.6;
        
        // Pulse animation
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 5}s`;
        
        solarSystem.appendChild(star);
    }
}

// Function to create ripple effect in the solar system
function createRippleEffect(color) {
    const solarSystem = document.querySelector('.solar-system');
    if (!solarSystem) return;
    
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = `2px solid ${color}`;
    ripple.style.backgroundColor = 'transparent';
    ripple.style.zIndex = '1';
    ripple.style.opacity = '1';
    
    // Add animation
    ripple.style.animation = 'ripple 2s linear forwards';
    
    // Add keyframes dynamically if not present
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 10px;
                    height: 10px;
                    opacity: 1;
                }
                100% {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    solarSystem.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentElement) {
            ripple.parentElement.removeChild(ripple);
        }
    }, 2000);
}

// Add cosmic theme to body
document.body.classList.add('cosmic-theme');

// Add fade-in animations to elements on scroll
function initFadeInAnimations() {
    // Add fade-in class to elements that should animate
    const fadeElements = document.querySelectorAll('.cosmic-card, .cosmic-title, .achievement-card, .gallery-item, .info-card, .form-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Add visible class to all sections when they come into view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('.cosmic-section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add premium hover effects to buttons
    document.querySelectorAll('.cosmic-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
} 