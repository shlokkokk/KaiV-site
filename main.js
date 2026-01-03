// KAI-VIDHYA Website Main JavaScript
// Premium Educational Institute Website

// Global variables
let particleSystem;
let mainAnimationsInitialized = false; // Renamed to avoid conflicts
let chartInitialized = false; // Flag for chart initialization

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMainAnimations(); // Renamed function
    initializeCarousels();
    initializeParticles();
    initializeCounters();
    initializeForms();
    initializeModals();
    initializeFilters();
    initializeScrollEffects();
    initializeExpandableCards();
    initializeLightbox();
    initializeScrollHighlight();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Sticky navigation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }
}

// Initialize scroll-triggered animations - RENAMED TO AVOID CONFLICTS
function initializeMainAnimations() {
    if (mainAnimationsInitialized) return;

    // Check if we're on the results page - if so, skip certain animations to avoid conflicts
    const isResultsPage = document.querySelector('#performance-chart') !== null;
    if (isResultsPage) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('animate-in');
        });
        mainAnimationsInitialized = true;
        return;
    }
    
    // Scroll reveal animations - only initialize if not on results page
    if (!isResultsPage) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize enhanced hero animations (only if hero exists)
    if (document.querySelector('.hero-bg')) {
        initializeHeroAnimations();
    }
    
    mainAnimationsInitialized = true;
}

// Enhanced hero section animations
function initializeHeroAnimations() {
    // Animate typewriter text
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        if (text) {
            setTimeout(() => {
                typewriterElement.textContent = text;
                typewriterElement.style.animation = 'typewriter 3s steps(20) forwards, blink 1s infinite';
            }, 1500);
        }
    }
    
    // Animate count-up numbers in hero
    const countUpElements = document.querySelectorAll('.animate-count-up');
    countUpElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        setTimeout(() => {
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(counter);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        }, 2500);
    });
    
    // Add floating animation to knowledge orbs
    const knowledgeOrbs = document.querySelectorAll('.knowledge-orb');
    knowledgeOrbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize carousels using Splide
function initializeCarousels() {
    // Testimonials carousel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialsCarousel) {
        new Splide(testimonialsCarousel, {
            type: 'loop',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            gap: '2rem',
            breakpoints: {
                768: {
                    perPage: 1
                }
            }
        }).mount();
    }

    // Results carousel
    const resultsCarousel = document.querySelector('.results-carousel');
    if (resultsCarousel) {
        new Splide(resultsCarousel, {
            type: 'loop',
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            arrows: true,
            pagination: false,
            perPage: 3,
            gap: '1.5rem',
            breakpoints: {
                1024: { perPage: 2 },
                768: { perPage: 1 }
            }
        }).mount();
    }

    // Infrastructure carousel
    const infrastructureCarousel = document.querySelector('.infrastructure-carousel');
    if (infrastructureCarousel) {
        new Splide(infrastructureCarousel, {
            type: 'loop',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            arrows: true,
            pagination: false,
            perPage: 1,
            cover: true,
            height: '400px'
        }).mount();
    }
}

// Initialize animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form handling and validation
function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    const inquiryForm = document.querySelector('.inquiry-form');

    function handleFormSubmit(form) {
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            });

            if (isValid) {

                const name    = data.name || '';
                const email   = data.email || '';
                const phone   = data.phone || 'Not provided';
                const course  = data.course || '';
                const message = data.message || '';

                const whatsappText =
                    "New Enquiry – KAI-VIDHYA\n\n" +
                    "Name: " + name + "\n" +
                    "Email: " + email + "\n" +
                    "Phone: " + phone + "\n" +
                    "Course: " + course + "\n\n" +
                    "Message:\n" + message;

                const encodedText = encodeURIComponent(whatsappText);

                const whatsappNumber = "9115557571";

                showNotification(
                  'Opening WhatsApp… Please tap Send to complete.',
                  'success'
                );
            
                setTimeout(() => {
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${encodedText}`,
                      '_blank'
                    );
                    form.reset();
                }, 800);
            }
            else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    handleFormSubmit(contactForm);
    handleFormSubmit(inquiryForm);
}

// Modal functionality
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            const modal = document.querySelector(`[data-modal="${modalId}"]`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Filter functionality for gallery and faculty
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('.filterable-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterableItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax background
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Initialize particle system with multiple layers
function initializeParticles() {
    const particleContainer = document.querySelector('#particle-background');
    if (!particleContainer) return;

    // Don't initialize particles on results page to avoid performance issues
    const isResultsPage = document.querySelector('#performance-chart') !== null;
    if (isResultsPage) return;

    // Advanced p5.js sketch with multiple animation layers
    const sketch = (p) => {
        let particles = [];
        let stationery = [];
       // let waves = [];
        let knowledgeNodes = [];
        const numParticles = 80;
       // const numWaves = 3;
        const numNodes = 12;
        //own logo start
        let logoImg;
        let pencilImg, rulerImg;

        p.preload = function () {
            logoImg = p.loadImage('/resources/logo.png');
            pencilImg = p.loadImage('/resources/pencil.png');
            rulerImg = p.loadImage('/resources/ruler.png');
        };
        // end 
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particle-background');
            
            // Create floating particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.3, 0.3),
                    vy: p.random(-0.3, 0.3),
                    size: p.random(1, 4),
                    opacity: p.random(0.05, 0.15),
                    color: p.random(['navy', 'gold', 'soft-blue'])
                });
            }
            for (let i = 0; i < 16; i++) {
                stationery.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(30, 44),
                    speed: p.random(0.2, 0.5),
                    rotation: p.random(p.TWO_PI),
                    rotationSpeed: p.random(-0.002, 0.002),
                    type: p.random() > 0.5 ? 'pencil' : 'ruler'
                });
            }

            
            // Create animated waves
           // for (let i = 0; i < numWaves; i++) {
           //     waves.push({
           //         x: p.random(p.width),
           //         y: p.random(p.height),
           //         amplitude: p.random(20, 60),
           //         frequency: p.random(0.01, 0.03),
           //         phase: p.random(p.TWO_PI),
           //         speed: p.random(0.5, 1.5)
           //     });
           // }
            
            // Create knowledge nodes (representing concepts)
            for (let i = 0; i < numNodes; i++) {
                knowledgeNodes.push({
                    x: p.random(100, p.width - 100),
                    y: p.random(100, p.height - 100),
                    size: p.random(24, 40),
                    pulse: p.random(0, p.TWO_PI),
                    pulseSpeed: p.random(0.008, 0.02),
                    rotationSpeed: p.random(-0.003, 0.003),
                    connections: []
                });
            }
            
            // Create connections between nearby nodes
            knowledgeNodes.forEach((node, i) => {
                knowledgeNodes.forEach((other, j) => {
                    if (i !== j) {
                        const distance = p.dist(node.x, node.y, other.x, other.y);
                        if (distance < 200) {
                            node.connections.push({node: other, strength: p.map(distance, 0, 200, 1, 0.1)});
                        }
                    }
                });
            });
        };

        p.draw = function() {
            p.clear();
            const time = p.millis() * 0.001;
            
            /*// Draw animated background waves
            waves.forEach((wave, index) => {
                p.noFill();
                p.stroke(26, 35, 126, 30);
                p.strokeWeight(1);
                
                p.beginShape();
                for (let x = 0; x < p.width; x += 10) {
                    const y = wave.y + p.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;
                    p.vertex(x, y);
                }
                p.endShape();
            }); */
            
            // Draw knowledge nodes with pulsing effect
            knowledgeNodes.forEach(node => {
                node.pulse += node.pulseSpeed;
                const pulseSize = node.size + p.sin(node.pulse) * 3;
                p.push();
                p.translate(node.x, node.y);
                p.rotate(node.pulse * node.rotationSpeed); // subtle motion
                p.tint(255, 80); 
                p.image(
                    logoImg,
                    -node.size / 2,
                    -node.size / 2,
                    node.size,
                    node.size
                );
                p.noTint();
                p.pop();
                
                /* // Node glow effect
                p.fill(255, 179, 0, 50);
                p.noStroke();
                p.ellipse(node.x, node.y, pulseSize * 2);
                
                // Main node
                p.fill(26, 35, 126, 200);
                p.stroke(255, 179, 0, 150);
                p.strokeWeight(2);
                p.ellipse(node.x, node.y, pulseSize);
                
                // Inner dot
                p.fill(255, 179, 0);
                p.noStroke();
                p.ellipse(node.x, node.y, pulseSize * 0.3); */
            }); 
            
            
            // Update and draw floating particles
            particles.forEach(particle => {
                // Update position with slight randomness
                particle.x += particle.vx + p.random(-0.1, 0.1);
                particle.y += particle.vy + p.random(-0.1, 0.1);
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Set color based on type
                if (particle.color === 'navy') {
                    p.fill(26, 35, 126, particle.opacity * 255);
                } else if (particle.color === 'gold') {
                    p.fill(255, 179, 0, particle.opacity * 255);
                } else {
                    p.fill(227, 242, 253, particle.opacity * 255);
                }
                
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            //  Draw floating stationery (pencils & rulers)
            stationery.forEach(item => {
    item.y -= item.speed;
    item.rotation += item.rotationSpeed;

    if (item.y < -60) {
        item.y = p.height + 60;
        item.x = p.random(p.width);
    }

    p.push();
    p.translate(item.x, item.y);
    p.rotate(item.rotation);

    if (item.type === 'ruler') {
        p.tint(255, 80);
        p.image(
            rulerImg,
            -item.size,
            -item.size / 4,
            item.size * 2.2,   // 👈 elongated width
            item.size * 0.5    // 👈 thinner height
        );
    } else {
        p.tint(255, 90);
        p.image(
            pencilImg,
            -item.size / 2,
            -item.size / 2,
            item.size,
            item.size
        );
    }

    p.noTint();
    p.pop();
});

            // Draw connections between knowledge nodes
            knowledgeNodes.forEach(node => {
                node.connections.forEach(connection => {
                    const alpha = connection.strength * 100;
                    p.stroke(26, 35, 126, alpha);
                    p.strokeWeight(1);
                    p.line(node.x, node.y, connection.node.x, connection.node.y);
                });
            });

            // Draw knowledge flow lines
           /* for (let i = 0; i < 3; i++) {
                const x1 = p.width * 0.1 + i * p.width * 0.3;
                const y1 = p.height * 0.2 + p.sin(time + i) * 50;
                const x2 = x1 + 100;
                const y2 = y1 + p.sin(time + i + 1) * 30;
                
                p.stroke(255, 179, 0, 100);
                p.strokeWeight(2);
                p.line(x1, y1, x2, y2);
                
                // Arrow head
                const angle = p.atan2(y2 - y1, x2 - x1);
                p.push();
                p.translate(x2, y2);
                p.rotate(angle);
                p.line(0, 0, -10, -5);
                p.line(0, 0, -10, 5);
                p.pop();
            } */
        };

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };

    new p5(sketch);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scroll to element
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
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

// Expandable cards functionality
function initializeExpandableCards() {
    const expandableCards = document.querySelectorAll('.expandable-card');
    
    expandableCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const expandedContent = card.querySelector('.expanded-content');
        
        if (expandBtn && expandedContent) {
            expandBtn.addEventListener('click', function() {
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    expandedContent.style.maxHeight = '0';
                    expandBtn.textContent = 'Read More';
                } else {
                    card.classList.add('expanded');
                    expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
                    expandBtn.textContent = 'Read Less';
                }
            });
        }
    });
}

// Lightbox functionality for gallery
function initializeLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];

    // Collect all gallery images
    galleryImages.forEach((img, index) => {
        images.push(img);
        img.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(this.src);
        });
    });

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    // Close on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
}
function initializeScrollHighlight() {
    const trigger = document.querySelector('a[href="#programs"]');
    const target = document.getElementById('programs');

    if (!trigger || !target) return;

    trigger.addEventListener('click', function () {
        // Highlight AFTER navigation scroll finishes
        setTimeout(() => {
            target.classList.add('scroll-highlight');

            setTimeout(() => {
                target.classList.remove('scroll-highlight');
            }, 1200);
        }, 700); // wait for smooth scroll
    });
}


console.log('KAI-VIDHYA Website loaded successfully!');
