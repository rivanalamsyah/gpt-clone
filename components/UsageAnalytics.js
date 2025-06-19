function UsageAnalytics({ darkMode }) {
    try {
        const [analytics, setAnalytics] = React.useState({});
        const [timeRange, setTimeRange] = React.useState('7days');

        React.useEffect(() => {
            loadAnalytics();
        }, [timeRange]);

        const loadAnalytics = () => {
            const data = AnalyticsUtils.getAnalyticsData();
            setAnalytics(data);
        };

        const stats = [
            { 
                label: 'Total Conversations', 
                value: analytics?.totalChats || 0, 
                icon: 'fa-comments', 
                color: 'blue',
                change: '+12%'
            },
            { 
                label: 'Messages Sent', 
                value: analytics?.totalMessages || 0, 
                icon: 'fa-paper-plane', 
                color: 'green',
                change: '+8%'
            },
            { 
                label: 'Time Saved', 
                value: `${analytics?.timeSaved || 0}h`, 
                icon: 'fa-clock', 
                color: 'purple',
                change: '+15%'
            },
            { 
                label: 'Avg Response Time', 
                value: `${analytics?.avgResponseTime || 0}s`, 
                icon: 'fa-tachometer-alt', 
                color: 'orange',
                change: '-5%'
            }
        ];

        const getColorClasses = (color) => {
            const colors = {
                blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
                green: 'text-green-600 bg-green-100 dark:bg-green-900/20',
                purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
                orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
            };
            return colors[color] || colors.blue;
        };

        return (
            <div data-name="usage-analytics" data-file="components/UsageAnalytics.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Usage Analytics</h3>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className={`px-3 py-2 border rounded-lg text-sm ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    stat.change.startsWith('+') 
                                        ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                                        : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                                }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {stat.value}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Usage Over Time</h4>
                    <div className="h-32 flex items-end justify-between space-x-2">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <div 
                                    className="w-full bg-blue-500 rounded-t"
                                    style={{ height: `${Math.random() * 100 + 20}%` }}
                                ></div>
                                <span className="text-xs mt-2 text-gray-500">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('UsageAnalytics component error:', error);
        reportError(error);
        return null;
    }
}
