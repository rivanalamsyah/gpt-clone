function MobileOptimizer({ children, onSwipeLeft, onSwipeRight }) {
    try {
        const [touchStart, setTouchStart] = React.useState(null);
        const [touchEnd, setTouchEnd] = React.useState(null);
        const [isScrolling, setIsScrolling] = React.useState(false);

        const minSwipeDistance = 50;

        const onTouchStart = (e) => {
            setTouchEnd(null);
            setTouchStart(e.targetTouches[0].clientX);
            setIsScrolling(false);
        };

        const onTouchMove = (e) => {
            if (!touchStart) return;
            
            const currentTouch = e.targetTouches[0];
            const deltaX = Math.abs(currentTouch.clientX - touchStart);
            const deltaY = Math.abs(currentTouch.clientY - (e.targetTouches[0]?.clientY || 0));
            
            // Determine if user is scrolling vertically
            if (deltaY > deltaX) {
                setIsScrolling(true);
            }
            
            setTouchEnd(currentTouch.clientX);
        };

        const onTouchEnd = () => {
            if (!touchStart || !touchEnd || isScrolling) return;
            
            const distance = touchStart - touchEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;

            if (isLeftSwipe) {
                onSwipeLeft?.();
            } else if (isRightSwipe) {
                onSwipeRight?.();
            }
        };

        // Optimize for mobile viewport
        React.useEffect(() => {
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);

            return () => {
                window.removeEventListener('resize', setVH);
                window.removeEventListener('orientationchange', setVH);
            };
        }, []);

        // Prevent zoom on double tap
        React.useEffect(() => {
            const preventDefault = (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            };

            document.addEventListener('touchstart', preventDefault, { passive: false });
            return () => document.removeEventListener('touchstart', preventDefault);
        }, []);

        // Add mobile-specific classes
        React.useEffect(() => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (isMobile) {
                document.body.classList.add('mobile-device');
            }
            
            if (isIOS) {
                document.body.classList.add('ios-device');
            }

            return () => {
                document.body.classList.remove('mobile-device', 'ios-device');
            };
        }, []);

        return (
            <div 
                data-name="mobile-optimizer" 
                data-file="components/MobileOptimizer.js"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="h-full w-full"
            >
                {children}
            </div>
        );
    } catch (error) {
        console.error('MobileOptimizer component error:', error);
        reportError(error);
        return children;
    }
}
