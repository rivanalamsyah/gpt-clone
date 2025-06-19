const PerformanceUtils = {
    // Debounce function for search and input
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
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
    },

    // Lazy load images
    lazyLoadImages: () => {
        const images = document.querySelectorAll('img[data-src]');
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

        images.forEach(img => imageObserver.observe(img));
    },

    // Measure component render time
    measureRender: (componentName, renderFunction) => {
        const startTime = performance.now();
        const result = renderFunction();
        const endTime = performance.now();
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`${componentName} render time: ${endTime - startTime}ms`);
        }
        
        return result;
    },

    // Memory usage monitoring
    getMemoryUsage: () => {
        if (performance.memory) {
            return {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }
        return null;
    },

    // Optimize scroll performance
    optimizeScroll: (element) => {
        let ticking = false;
        
        const updateScrollPosition = () => {
            // Update scroll-dependent UI here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        element.addEventListener('scroll', requestTick);
        return () => element.removeEventListener('scroll', requestTick);
    }
};
