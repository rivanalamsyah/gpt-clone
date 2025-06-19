function PerformanceStats({ analytics, darkMode }) {
    try {
        const performanceMetrics = [
            {
                label: 'Response Time',
                value: `${analytics?.avgResponseTime || 1.2}s`,
                icon: 'fa-clock',
                color: 'green',
                status: 'good'
            },
            {
                label: 'Memory Usage',
                value: `${analytics?.memoryUsage || 45}MB`,
                icon: 'fa-memory',
                color: 'blue',
                status: 'normal'
            },
            {
                label: 'Success Rate',
                value: `${analytics?.successRate || 98.5}%`,
                icon: 'fa-check-circle',
                color: 'green',
                status: 'excellent'
            },
            {
                label: 'Error Rate',
                value: `${analytics?.errorRate || 1.5}%`,
                icon: 'fa-exclamation-triangle',
                color: 'orange',
                status: 'warning'
            }
        ];

        const getStatusColor = (status) => {
            const colors = {
                excellent: 'text-green-600 bg-green-100 dark:bg-green-900/20',
                good: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
                normal: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
                warning: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
                critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
            };
            return colors[status] || colors.normal;
        };

        return (
            <div data-name="performance-stats" data-file="components/PerformanceStats.js" className="col-span-full space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {performanceMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border transition-all ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <i className={`fas ${metric.icon} text-lg ${getStatusColor(metric.status)}`}></i>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                                    {metric.status}
                                </span>
                            </div>
                            <div className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {metric.value}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Chart */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Performance Trends</h4>
                    <div className="h-32 flex items-end justify-between space-x-2">
                        {[...Array(24)].map((_, i) => {
                            const height = Math.random() * 80 + 20;
                            const isGood = height > 60;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div 
                                        className={`w-full rounded-t ${isGood ? 'bg-green-500' : 'bg-yellow-500'}`}
                                        style={{ height: `${height}%` }}
                                        title={`Hour ${i}: ${height.toFixed(1)}%`}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>24:00</span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PerformanceStats component error:', error);
        reportError(error);
        return null;
    }
}
