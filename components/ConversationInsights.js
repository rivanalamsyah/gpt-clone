function ConversationInsights({ messages, isOpen, onClose, darkMode }) {
    try {
        const [insights, setInsights] = React.useState({});
        const [isAnalyzing, setIsAnalyzing] = React.useState(false);

        React.useEffect(() => {
            if (isOpen && messages.length > 0) {
                analyzeConversation();
            }
        }, [isOpen, messages]);

        const analyzeConversation = async () => {
            setIsAnalyzing(true);
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const totalMessages = messages.length;
                const userMessages = messages.filter(m => m.isUser).length;
                const aiMessages = messages.filter(m => !m.isUser).length;
                const totalWords = messages.reduce((sum, m) => sum + m.text.split(' ').length, 0);
                const avgWordsPerMessage = Math.round(totalWords / totalMessages);
                
                const topics = extractTopics(messages);
                const sentiment = analyzeSentiment(messages);
                
                setInsights({
                    totalMessages,
                    userMessages,
                    aiMessages,
                    totalWords,
                    avgWordsPerMessage,
                    topics,
                    sentiment,
                    duration: calculateDuration(messages)
                });
            } catch (error) {
                console.error('Analysis error:', error);
            } finally {
                setIsAnalyzing(false);
            }
        };

        const extractTopics = (messages) => {
            const topicKeywords = {
                'Technology': ['code', 'programming', 'software', 'tech', 'computer'],
                'Business': ['business', 'marketing', 'sales', 'strategy'],
                'Creative': ['creative', 'design', 'art', 'writing'],
                'Education': ['learn', 'study', 'education', 'school']
            };
            
            const text = messages.map(m => m.text.toLowerCase()).join(' ');
            const detectedTopics = [];
            
            Object.entries(topicKeywords).forEach(([topic, keywords]) => {
                const matches = keywords.filter(keyword => text.includes(keyword)).length;
                if (matches > 0) {
                    detectedTopics.push({ topic, relevance: matches });
                }
            });
            
            return detectedTopics.sort((a, b) => b.relevance - a.relevance).slice(0, 3);
        };

        const analyzeSentiment = (messages) => {
            const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful'];
            const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'problem'];
            
            let positiveCount = 0;
            let negativeCount = 0;
            
            messages.forEach(message => {
                const words = message.text.toLowerCase().split(' ');
                positiveCount += words.filter(word => positiveWords.includes(word)).length;
                negativeCount += words.filter(word => negativeWords.includes(word)).length;
            });
            
            if (positiveCount > negativeCount) return 'positive';
            if (negativeCount > positiveCount) return 'negative';
            return 'neutral';
        };

        const calculateDuration = (messages) => {
            if (messages.length < 2) return 0;
            const start = new Date(messages[0].timestamp);
            const end = new Date(messages[messages.length - 1].timestamp);
            return Math.round((end - start) / 1000 / 60);
        };

        if (!isOpen) return null;

        return (
            <div data-name="conversation-insights" data-file="components/ConversationInsights.js" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`max-w-2xl w-full rounded-2xl p-6 max-h-[80vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Conversation Insights</h3>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-center">Analyzing conversation...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{insights.totalMessages || 0}</div>
                                    <div className="text-sm text-gray-600">Messages</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">{insights.totalWords || 0}</div>
                                    <div className="text-sm text-gray-600">Words</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">{insights.duration || 0}m</div>
                                    <div className="text-sm text-gray-600">Duration</div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">{insights.avgWordsPerMessage || 0}</div>
                                    <div className="text-sm text-gray-600">Avg Words</div>
                                </div>
                            </div>

                            {/* Topics */}
                            <div className="space-y-3">
                                <h4 className="font-semibold">Main Topics</h4>
                                {insights.topics?.map((topic, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <span className="font-medium">{topic.topic}</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${(topic.relevance / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )) || <p className="text-gray-500">No specific topics detected</p>}
                            </div>

                            {/* Sentiment */}
                            <div className="space-y-3">
                                <h4 className="font-semibold">Overall Sentiment</h4>
                                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                                    insights.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                    insights.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    <i className={`fas ${
                                        insights.sentiment === 'positive' ? 'fa-smile' :
                                        insights.sentiment === 'negative' ? 'fa-frown' :
                                        'fa-meh'
                                    }`}></i>
                                    <span className="capitalize">{insights.sentiment}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ConversationInsights component error:', error);
        reportError(error);
        return null;
    }
}
