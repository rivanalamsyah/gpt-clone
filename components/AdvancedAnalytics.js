function AdvancedAnalytics({ darkMode }) {
    try {
        const [analyticsData, setAnalyticsData] = React.useState({});
        const [timeRange, setTimeRange] = React.useState('7days');
        const [activeMetric, setActiveMetric] = React.useState('overview');

        React.useEffect(() => {
            loadAnalyticsData();
        }, [timeRange]);

        const loadAnalyticsData = () => {
            // Simulate analytics data
            const data = {
                overview: {
                    totalConversations: 245,
                    totalMessages: 1820,
                    avgResponseTime: 1.2,
                    userSatisfaction: 94.5,
                    activeUsers: 67,
                    peakHours: '2-4 PM'
                },
                usage: {
                    dailyActive: [45, 52, 38, 61, 49, 73, 68],
                    messageTypes: { text: 65, voice: 20, file: 15 },
                    topFeatures: ['Chat', 'File Upload', 'Voice Input', 'Templates']
                },
                performance: {
                    responseTime: [1.1, 1.3, 0.9, 1.4, 1.2, 1.0, 1.1],
                    errorRate: 0.8,
                    uptime: 99.9,
                    throughput: 1250
                }
            };
            setAnalyticsData(data);
        };

        const metrics = [
            { id: 'overview', name: 'Overview', icon: 'fa-chart-pie' },
            { id: 'usage', name: 'Usage', icon: 'fa-chart-bar' },
            { id: 'performance', name: 'Performance', icon: 'fa-tachometer-alt' },
            { id: 'users', name: 'Users', icon: 'fa-users' },
            { id: 'content', name: 'Content', icon: 'fa-file-alt' }
        ];

        const timeRanges = [
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7days', label: 'Last 7 Days' },
            { value: '30days', label: 'Last 30 Days' },
            { value: '90days', label: 'Last 3 Months' }
        ];

        return (
            <div data-name="advanced-analytics" data-file="components/AdvancedAnalytics.js" className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <h2 className="text-2xl font-bold">Advanced Analytics</h2>
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
                                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${metric.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{metric.name}</span>
                        </button>
                    ))}
                </div>

                {/* Overview Cards */}
                {activeMetric === 'overview' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.entries(analyticsData.overview || {}).map(([key, value]) => (
                            <div
                                key={key}
                                className={`p-4 rounded-lg border ${
                                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                    {typeof value === 'number' ? value.toLocaleString() : value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Usage Analytics */}
                {activeMetric === 'usage' && (
                    <div className="space-y-6">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">Daily Active Users</h3>
                            <div className="h-32 flex items-end justify-between space-x-2">
                                {(analyticsData.usage?.dailyActive || []).map((value, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div 
                                            className="w-full bg-blue-500 rounded-t"
                                            style={{ height: `${(value / 80) * 100}%` }}
                                        ></div>
                                        <span className="text-xs mt-2 text-gray-500">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={`p-6 rounded-lg border ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                                <h3 className="text-lg font-semibold mb-4">Message Types</h3>
                                <div className="space-y-3">
                                    {Object.entries(analyticsData.usage?.messageTypes || {}).map(([type, percentage]) => (
                                        <div key={type} className="flex items-center justify-between">
                                            <span className="capitalize">{type}</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm">{percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`p-6 rounded-lg border ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                                <h3 className="text-lg font-semibold mb-4">Top Features</h3>
                                <div className="space-y-2">
                                    {(analyticsData.usage?.topFeatures || []).map((feature, index) => (
                                        <div key={feature} className="flex items-center space-x-3">
                                            <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Performance Metrics */}
                {activeMetric === 'performance' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className={`p-4 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <div className="text-2xl font-bold text-green-600 mb-1">
                                {analyticsData.performance?.uptime}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                                {analyticsData.performance?.throughput}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Requests/min</div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <div className="text-2xl font-bold text-orange-600 mb-1">
                                {analyticsData.performance?.errorRate}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Error Rate</div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <div className="text-2xl font-bold text-purple-600 mb-1">1.2s</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('AdvancedAnalytics component error:', error);
        reportError(error);
        return null;
    }
}
