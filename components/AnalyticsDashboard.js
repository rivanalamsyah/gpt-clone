function AnalyticsDashboard({ analytics, darkMode }) {
    try {
        const [timeRange, setTimeRange] = React.useState('7days');
        const [activeMetric, setActiveMetric] = React.useState('usage');

        const metrics = [
            { id: 'usage', name: 'Usage Stats', icon: 'fa-chart-bar', color: 'blue' },
            { id: 'performance', name: 'Performance', icon: 'fa-tachometer-alt', color: 'green' },
            { id: 'topics', name: 'Topics', icon: 'fa-tags', color: 'purple' },
            { id: 'sentiment', name: 'Sentiment', icon: 'fa-smile', color: 'yellow' }
        ];

        const timeRanges = [
            { value: '24hours', label: 'Last 24 Hours' },
            { value: '7days', label: 'Last 7 Days' },
            { value: '30days', label: 'Last 30 Days' },
            { value: '90days', label: 'Last 3 Months' }
        ];

        const getColorClass = (color) => {
            const colors = {
                blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
                green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
                purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
                yellow: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
            };
            return colors[color] || colors.blue;
        };

        return (
            <div data-name="analytics-dashboard" data-file="components/AnalyticsDashboard.js" className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className={`px-3 py-2 border rounded-lg ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                        {timeRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Metric Tabs */}
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {metrics.map((metric) => (
                        <button
                            key={metric.id}
                            onClick={() => setActiveMetric(metric.id)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                activeMetric === metric.id
                                    ? `${getColorClass(metric.color)} shadow-sm`
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${metric.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{metric.name}</span>
                        </button>
                    ))}
                </div>

                {/* Metric Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeMetric === 'usage' && (
                        <UsageStats analytics={analytics} darkMode={darkMode} />
                    )}
                    
                    {activeMetric === 'performance' && (
                        <PerformanceStats analytics={analytics} darkMode={darkMode} />
                    )}
                    
                    {activeMetric === 'topics' && (
                        <TopicAnalysis analytics={analytics} darkMode={darkMode} />
                    )}
                    
                    {activeMetric === 'sentiment' && (
                        <SentimentAnalysis analytics={analytics} darkMode={darkMode} />
                    )}
                </div>

                {/* Quick Insights */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                        Quick Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Most active time: 2-4 PM</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Favorite topic: Programming</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">Avg response time: 1.2s</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">Satisfaction: 94%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AnalyticsDashboard component error:', error);
        reportError(error);
        return null;
    }
}
