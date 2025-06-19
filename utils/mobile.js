const MobileUtils = {
    // Detect mobile device
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Detect iOS
    isIOS: () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },

    // Detect Android
    isAndroid: () => {
        return /Android/i.test(navigator.userAgent);
    },

    // Handle viewport height for mobile browsers
    setViewportHeight: () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },

    // Prevent zoom on input focus (iOS)
    preventZoom: () => {
        const addMaximumScaleToMetaViewport = () => {
            const el = document.querySelector('meta[name=viewport]');
            if (el !== null) {
                let content = el.getAttribute('content');
                let re = /maximum\-scale=[0-9\.]+/g;
                if (re.test(content)) {
                    content = content.replace(re, 'maximum-scale=1.0');
                } else {
                    content = [content, 'maximum-scale=1.0'].join(', ');
                }
                el.setAttribute('content', content);
            }
        };

        const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;
        const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (checkIsIOS()) {
            disableIosTextFieldZoom();
        }
    },

    // Handle safe area insets
    handleSafeArea: () => {
        const setSafeAreaVars = () => {
            const safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0px';
            const safeAreaBottom = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0px';
            
            document.documentElement.style.setProperty('--safe-area-top', safeAreaTop);
            document.documentElement.style.setProperty('--safe-area-bottom', safeAreaBottom);
        };

        setSafeAreaVars();
        window.addEventListener('orientationchange', setSafeAreaVars);
        window.addEventListener('resize', setSafeAreaVars);
    },

    // Optimize touch events
    optimizeTouch: () => {
        // Disable 300ms click delay
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Prevent overscroll
        document.body.addEventListener('touchmove', (e) => {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });
    },

    // Handle keyboard visibility
    handleKeyboard: () => {
        if (MobileUtils.isIOS()) {
            const viewport = document.querySelector('meta[name=viewport]');
            
            document.addEventListener('focusin', () => {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
            });
            
            document.addEventListener('focusout', () => {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1');
            });
        }
    }
};
