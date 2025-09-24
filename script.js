// Neural Arc Helium AI Investor Deck JavaScript

class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 14;
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        
        this.init();
    }
    
    init() {
        this.updateSlideCounter();
        this.updateNavigationButtons();
        this.bindEvents();
        this.showSlide(1);
    }
    
    bindEvents() {
        // Navigation button events
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }
            }
            
            startX = 0;
            startY = 0;
        });
        
        // Mouse wheel navigation
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else if (e.deltaY < 0) {
                    this.previousSlide();
                }
            }, 100);
        });
        
        // Click navigation on slides (left/right areas)
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                const rect = slide.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const slideWidth = rect.width;
                
                if (clickX < slideWidth * 0.3) {
                    this.previousSlide();
                } else if (clickX > slideWidth * 0.7) {
                    this.nextSlide();
                }
            });
        });
    }
    
    showSlide(slideNumber) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show target slide
        const targetSlide = document.getElementById(`slide-${slideNumber}`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            this.currentSlide = slideNumber;
            this.updateSlideCounter();
            this.updateNavigationButtons();
            
            // Trigger any slide-specific animations
            this.triggerSlideAnimations(slideNumber);
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.showSlide(slideNumber);
        }
    }
    
    updateSlideCounter() {
        this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
    }
    
    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    triggerSlideAnimations(slideNumber) {
        const slide = document.getElementById(`slide-${slideNumber}`);
        if (!slide) return;
        
        // Add entrance animations for specific elements
        const animatedElements = slide.querySelectorAll('.stat-card, .problem-item, .feature-card, .dept-card, .step-card, .highlight-card');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Special animations for specific slides
        switch(slideNumber) {
            case 3: // Market Opportunity
                this.animateMarketStats();
                break;
            case 11: // Financial Projections
                this.animateRevenueChart();
                break;
        }
    }
    
    animateMarketStats() {
        const statCards = document.querySelectorAll('#slide-3 .stat-card');
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }
    
    animateRevenueChart() {
        const bars = document.querySelectorAll('#slide-11 .bar');
        bars.forEach((bar, index) => {
            const originalHeight = bar.style.height;
            bar.style.height = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'height 1s ease-out';
                bar.style.height = originalHeight;
            }, index * 200);
        });
    }
}

// Utility functions for enhanced interactivity
class PresentationUtils {
    static addHoverEffects() {
        // Add subtle hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.problem-item, .feature-card, .dept-card, .step-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(45, 55, 72, 0.15)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    static addProgressIndicator() {
        // Create a subtle progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: #2d3748;
            z-index: 1001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        // Update progress on slide change
        const updateProgress = () => {
            const progress = (presentation.currentSlide / presentation.totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        };
        
        // Initial update
        updateProgress();
        
        // Update on slide changes
        const originalShowSlide = presentation.showSlide.bind(presentation);
        presentation.showSlide = function(slideNumber) {
            originalShowSlide(slideNumber);
            updateProgress();
        };
    }
    
    static addFullscreenSupport() {
        // Add fullscreen toggle functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(err => {
                        console.log('Fullscreen not supported');
                    });
                } else {
                    document.exitFullscreen();
                }
            }
        });
    }
    
    static addSlideOverview() {
        // Add slide overview mode (press 'o' key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'o' || e.key === 'O') {
                this.toggleOverviewMode();
            }
        });
    }
    
    static toggleOverviewMode() {
        const container = document.querySelector('.presentation-container');
        const isOverview = container.classList.contains('overview-mode');
        
        if (!isOverview) {
            // Enter overview mode
            container.classList.add('overview-mode');
            container.style.cssText = `
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 20px;
                padding: 20px;
                overflow-y: auto;
                height: 100vh;
            `;
            
            document.querySelectorAll('.slide').forEach((slide, index) => {
                slide.style.cssText = `
                    position: static;
                    opacity: 1;
                    transform: none;
                    width: 100%;
                    height: 200px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    overflow: hidden;
                `;
                
                slide.addEventListener('click', () => {
                    this.exitOverviewMode();
                    presentation.goToSlide(index + 1);
                });
            });
        } else {
            this.exitOverviewMode();
        }
    }
    
    static exitOverviewMode() {
        const container = document.querySelector('.presentation-container');
        container.classList.remove('overview-mode');
        container.style.cssText = '';
        
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.cssText = '';
        });
        
        presentation.showSlide(presentation.currentSlide);
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation controller
    window.presentation = new PresentationController();
    
    // Add enhanced features
    PresentationUtils.addHoverEffects();
    PresentationUtils.addProgressIndicator();
    PresentationUtils.addFullscreenSupport();
    PresentationUtils.addSlideOverview();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload next slide for smoother transitions
    const preloadNextSlide = () => {
        const nextSlideNumber = presentation.currentSlide + 1;
        if (nextSlideNumber <= presentation.totalSlides) {
            const nextSlide = document.getElementById(`slide-${nextSlideNumber}`);
            if (nextSlide) {
                // Trigger any resource loading for next slide
                const images = nextSlide.querySelectorAll('img');
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            }
        }
    };
    
    // Preload on slide change
    const originalShowSlide = presentation.showSlide.bind(presentation);
    presentation.showSlide = function(slideNumber) {
        originalShowSlide(slideNumber);
        preloadNextSlide();
    };
});

// Add presentation mode detection
document.addEventListener('keydown', (e) => {
    // Press 'p' to enter presentation mode (hide cursor after inactivity)
    if (e.key === 'p' || e.key === 'P') {
        document.body.classList.toggle('presentation-mode');
        
        if (document.body.classList.contains('presentation-mode')) {
            let cursorTimeout;
            const hideCursor = () => {
                document.body.style.cursor = 'none';
            };
            
            const showCursor = () => {
                document.body.style.cursor = 'default';
                clearTimeout(cursorTimeout);
                cursorTimeout = setTimeout(hideCursor, 3000);
            };
            
            document.addEventListener('mousemove', showCursor);
            cursorTimeout = setTimeout(hideCursor, 3000);
        } else {
            document.body.style.cursor = 'default';
        }
    }
});

// Export for potential external use
window.PresentationController = PresentationController;
window.PresentationUtils = PresentationUtils;