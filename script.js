// Neural Arc Investor Deck - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Slide navigation
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideIndicator = document.getElementById('slideIndicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create indicator dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        slideIndicator.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.indicator-dot');
    
    // Navigation functions
    function updateSlide() {
        slides[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Re-initialize icons for the current slide
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateSlide();
        }
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            prevSlide();
        }
    });
    
    // Scroll detection for updating current slide
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            slides.forEach((slide, index) => {
                const slideTop = slide.offsetTop;
                const slideBottom = slideTop + slide.offsetHeight;
                
                if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
                    if (currentSlide !== index) {
                        currentSlide = index;
                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === currentSlide);
                        });
                        prevBtn.disabled = currentSlide === 0;
                        nextBtn.disabled = currentSlide === totalSlides - 1;
                    }
                }
            });
        }, 100);
    });
    
    // Animate bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and elements
    document.querySelectorAll('.problem-card, .feature-card, .metric-card, .allocation-card, .highlight-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Animate projection bars when visible
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease-out';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    const revenueSection = document.querySelector('.revenue-projections');
    if (revenueSection) {
        barObserver.observe(revenueSection);
    }
    
    // Smooth hover effects
    document.querySelectorAll('.problem-card, .feature-card, .metric-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Initialize
    updateSlide();
    
    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
});
