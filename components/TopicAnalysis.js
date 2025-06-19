function TopicAnalysis({ analytics, darkMode }) {
    try {
        const topics = [
            { name: 'Programming', count: 45, percentage: 35, color: 'blue' },
            { name: 'Writing', count: 32, percentage: 25, color: 'green' },
            { name: 'Analysis', count: 28, percentage: 22, color: 'purple' },
            { name: 'Creative', count: 15, percentage: 12, color: 'pink' },
            { name: 'Other', count: 8, percentage: 6, color: 'gray' }
        ];

        const getColorClass = (color) => {
            const colors = {
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                purple: 'bg-purple-500',
                pink: 'bg-pink-500',
                gray: 'bg-gray-500'
            };
            return colors[color] || colors.gray;
        };

        const getTextColor = (color) => {
            const colors = {
                blue: 'text-blue-600',
                green: 'text-green-600',
                purple: 'text-purple-600',
                pink: 'text-pink-600',
                gray: 'text-gray-600'
            };
            return colors[color] || colors.gray;
        };

        return (
            <div data-name="topic-analysis" data-file="components/TopicAnalysis.js" className="col-span-full space-y-6">
                {/* Topic Distribution */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Topic Distribution</h4>
                    
                    <div className="space-y-4">
                        {topics.map((topic, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-24 text-sm font-medium">
                                    {topic.name}
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div 
                                        className={`h-3 rounded-full ${getColorClass(topic.color)} transition-all duration-500`}
                                        style={{ width: `${topic.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="w-16 text-sm text-right">
                                    <span className={`font-medium ${getTextColor(topic.color)}`}>
                                        {topic.count}
                                    </span>
                                    <span className="text-gray-500 ml-1">
                                        ({topic.percentage}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Keywords */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Trending Keywords</h4>
                    
                    <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'React', 'API', 'Database', 'UI/UX', 'Machine Learning', 'CSS', 'Python', 'Design', 'Analytics'].map((keyword, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    darkMode 
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } transition-colors cursor-pointer`}
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TopicAnalysis component error:', error);
        reportError(error);
        return null;
    }
}
