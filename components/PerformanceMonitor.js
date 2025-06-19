function PerformanceMonitor({ onPerformanceUpdate }) {
    try {
        const [metrics, setMetrics] = React.useState({
            responseTime: 0,
            memoryUsage: 0,
            renderTime: 0,
            messageCount: 0
        });

        const startTime = React.useRef(Date.now());
        const renderStartTime = React.useRef(Date.now());

        React.useEffect(() => {
            const updateMetrics = () => {
                const now = Date.now();
                const renderTime = now - renderStartTime.current;
                
                // Get memory usage if available
                const memoryUsage = performance.memory ? 
                    Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0;

                const newMetrics = {
                    ...metrics,
                    renderTime,
                    memoryUsage,
                    timestamp: now
                };

                setMetrics(newMetrics);
                onPerformanceUpdate?.(newMetrics);
            };

            const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds
            return () => clearInterval(interval);
        }, []);

        const measureResponseTime = (startTime, endTime) => {
            const responseTime = endTime - startTime;
            setMetrics(prev => ({
                ...prev,
                responseTime,
                lastUpdate: Date.now()
            }));
        };

        // Expose measurement function globally
        React.useEffect(() => {
            window.measureResponseTime = measureResponseTime;
            return () => {
                delete window.measureResponseTime;
            };
        }, []);

        // Performance observer for render timing
        React.useEffect(() => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.entryType === 'measure') {
                            setMetrics(prev => ({
                                ...prev,
                                renderTime: entry.duration
                            }));
                        }
                    });
                });

                observer.observe({ entryTypes: ['measure'] });
                return () => observer.disconnect();
            }
        }, []);

        return (
            <div data-name="performance-monitor" data-file="components/PerformanceMonitor.js" className="hidden">
                {/* Hidden component for performance monitoring */}
            </div>
        );
    } catch (error) {
        console.error('PerformanceMonitor component error:', error);
        reportError(error);
        return null;
    }
}
