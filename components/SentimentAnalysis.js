function SentimentAnalysis({ analytics, darkMode }) {
    try {
        const sentimentData = {
            positive: { count: 85, percentage: 68, color: 'green' },
            neutral: { count: 32, percentage: 26, color: 'yellow' },
            negative: { count: 8, percentage: 6, color: 'red' }
        };

        const moodTrends = [
            { time: '9 AM', mood: 'positive', value: 78 },
            { time: '12 PM', mood: 'positive', value: 85 },
            { time: '3 PM', mood: 'neutral', value: 65 },
            { time: '6 PM', mood: 'positive', value: 72 },
            { time: '9 PM', mood: 'neutral', value: 58 }
        ];

        const getMoodColor = (mood) => {
            const colors = {
                positive: 'text-green-500',
                neutral: 'text-yellow-500',
                negative: 'text-red-500'
            };
            return colors[mood] || colors.neutral;
        };

        const getMoodIcon = (mood) => {
            const icons = {
                positive: 'fa-smile',
                neutral: 'fa-meh',
                negative: 'fa-frown'
            };
            return icons[mood] || icons.neutral;
        };

        return (
            <div data-name="sentiment-analysis" data-file="components/SentimentAnalysis.js" className="col-span-full space-y-6">
                {/* Sentiment Overview */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Conversation Sentiment</h4>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(sentimentData).map(([sentiment, data]) => (
                            <div key={sentiment} className="text-center">
                                <div className={`text-3xl mb-2 ${getMoodColor(sentiment)}`}>
                                    <i className={`fas ${getMoodIcon(sentiment)}`}></i>
                                </div>
                                <div className={`text-2xl font-bold mb-1 ${getMoodColor(sentiment)}`}>
                                    {data.percentage}%
                                </div>
                                <div className="text-sm text-gray-500 capitalize">
                                    {sentiment} ({data.count})
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sentiment Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="h-full flex">
                            <div 
                                className="bg-green-500 transition-all duration-500"
                                style={{ width: `${sentimentData.positive.percentage}%` }}
                            ></div>
                            <div 
                                className="bg-yellow-500 transition-all duration-500"
                                style={{ width: `${sentimentData.neutral.percentage}%` }}
                            ></div>
                            <div 
                                className="bg-red-500 transition-all duration-500"
                                style={{ width: `${sentimentData.negative.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Mood Trends */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h4 className="text-lg font-semibold mb-4">Mood Throughout Day</h4>
                    
                    <div className="space-y-3">
                        {moodTrends.map((trend, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-16 text-sm font-medium">
                                    {trend.time}
                                </div>
                                <div className={`text-lg ${getMoodColor(trend.mood)}`}>
                                    <i className={`fas ${getMoodIcon(trend.mood)}`}></i>
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                            trend.mood === 'positive' ? 'bg-green-500' :
                                            trend.mood === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${trend.value}%` }}
                                    ></div>
                                </div>
                                <div className="w-12 text-sm text-right">
                                    {trend.value}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SentimentAnalysis component error:', error);
        reportError(error);
        return null;
    }
}
