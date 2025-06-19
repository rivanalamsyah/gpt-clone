const InsightsEngine = {
    // Analyze conversation
    analyzeConversation: (messages) => {
        try {
            if (!messages || messages.length === 0) {
                return InsightsEngine.getEmptyInsights();
            }

            const userMessages = messages.filter(m => m.isUser);
            const aiMessages = messages.filter(m => !m.isUser);
            const totalWords = messages.reduce((sum, m) => sum + m.text.split(' ').length, 0);
            
            return {
                totalMessages: messages.length,
                userMessages: userMessages.length,
                aiMessages: aiMessages.length,
                totalWords,
                avgWordsPerMessage: Math.round(totalWords / messages.length),
                conversationDuration: InsightsEngine.calculateDuration(messages),
                sentiment: InsightsEngine.analyzeSentiment(messages),
                topics: InsightsEngine.extractTopics(messages),
                complexity: InsightsEngine.calculateComplexity(messages),
                engagement: InsightsEngine.calculateEngagement(messages),
                wordFrequency: InsightsEngine.getWordFrequency(messages)
            };
        } catch (error) {
            console.error('Error analyzing conversation:', error);
            return InsightsEngine.getEmptyInsights();
        }
    },

    // Get empty insights structure
    getEmptyInsights: () => ({
        totalMessages: 0,
        userMessages: 0,
        aiMessages: 0,
        totalWords: 0,
        avgWordsPerMessage: 0,
        conversationDuration: 0,
        sentiment: 'neutral',
        topics: [],
        complexity: 'medium',
        engagement: 'medium',
        wordFrequency: {}
    }),

    // Calculate conversation duration
    calculateDuration: (messages) => {
        if (messages.length < 2) return 0;
        
        const firstMessage = new Date(messages[0].timestamp);
        const lastMessage = new Date(messages[messages.length - 1].timestamp);
        return lastMessage - firstMessage;
    },

    // Analyze sentiment (simplified)
    analyzeSentiment: (messages) => {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'like', 'happy', 'perfect'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'frustrated', 'problem'];
        
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
    },

    // Extract topics (simplified keyword extraction)
    extractTopics: (messages) => {
        const techWords = ['code', 'programming', 'software', 'development', 'algorithm', 'data', 'api'];
        const businessWords = ['business', 'marketing', 'sales', 'strategy', 'management', 'finance'];
        const creativeWords = ['creative', 'design', 'art', 'writing', 'story', 'music'];
        const educationWords = ['learn', 'study', 'education', 'school', 'university', 'course'];
        
        const allText = messages.map(m => m.text.toLowerCase()).join(' ');
        const topics = [];
        
        if (techWords.some(word => allText.includes(word))) topics.push('Technology');
        if (businessWords.some(word => allText.includes(word))) topics.push('Business');
        if (creativeWords.some(word => allText.includes(word))) topics.push('Creative');
        if (educationWords.some(word => allText.includes(word))) topics.push('Education');
        
        return topics.length > 0 ? topics : ['General'];
    },

    // Calculate complexity
    calculateComplexity: (messages) => {
        const totalWords = messages.reduce((sum, m) => sum + m.text.split(' ').length, 0);
        const avgWordsPerMessage = totalWords / messages.length;
        
        if (avgWordsPerMessage > 50) return 'high';
        if (avgWordsPerMessage > 20) return 'medium';
        return 'low';
    },

    // Calculate engagement
    calculateEngagement: (messages) => {
        const userMessages = messages.filter(m => m.isUser);
        const avgUserMessageLength = userMessages.reduce((sum, m) => sum + m.text.length, 0) / userMessages.length;
        
        if (avgUserMessageLength > 100) return 'high';
        if (avgUserMessageLength > 50) return 'medium';
        return 'low';
    },

    // Get word frequency
    getWordFrequency: (messages) => {
        const wordCount = {};
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
        
        messages.forEach(message => {
            const words = message.text.toLowerCase().match(/\b\w+\b/g) || [];
            words.forEach(word => {
                if (word.length > 3 && !stopWords.includes(word)) {
                    wordCount[word] = (wordCount[word] || 0) + 1;
                }
            });
        });
        
        // Return top 10 most frequent words
        return Object.entries(wordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .reduce((obj, [word, count]) => {
                obj[word] = count;
                return obj;
            }, {});
    },

    // Generate insights summary
    generateSummary: (insights) => {
        const summaryPoints = [];
        
        if (insights.totalMessages > 20) {
            summaryPoints.push('This was an extensive conversation with detailed discussion.');
        } else if (insights.totalMessages > 10) {
            summaryPoints.push('This was a moderate-length conversation.');
        } else {
            summaryPoints.push('This was a brief conversation.');
        }
        
        if (insights.sentiment === 'positive') {
            summaryPoints.push('The overall tone was positive and constructive.');
        } else if (insights.sentiment === 'negative') {
            summaryPoints.push('The conversation had some challenging moments.');
        }
        
        if (insights.complexity === 'high') {
            summaryPoints.push('The topics discussed were complex and detailed.');
        }
        
        if (insights.topics.length > 1) {
            summaryPoints.push(`Multiple topics were covered: ${insights.topics.join(', ')}.`);
        } else {
            summaryPoints.push(`The main focus was on ${insights.topics[0]}.`);
        }
        
        return summaryPoints;
    },

    // Export insights
    exportInsights: (insights, format = 'json') => {
        try {
            const exportData = {
                generatedAt: new Date().toISOString(),
                insights,
                summary: InsightsEngine.generateSummary(insights)
            };
            
            let content, filename, mimeType;
            
            switch (format) {
                case 'json':
                    content = JSON.stringify(exportData, null, 2);
                    filename = `conversation-insights-${new Date().toISOString().split('T')[0]}.json`;
                    mimeType = 'application/json';
                    break;
                    
                case 'csv':
                    const csvData = [
                        ['Metric', 'Value'],
                        ['Total Messages', insights.totalMessages],
                        ['User Messages', insights.userMessages],
                        ['AI Messages', insights.aiMessages],
                        ['Total Words', insights.totalWords],
                        ['Avg Words per Message', insights.avgWordsPerMessage],
                        ['Sentiment', insights.sentiment],
                        ['Complexity', insights.complexity],
                        ['Engagement', insights.engagement],
                        ['Main Topics', insights.topics.join(', ')]
                    ];
                    content = csvData.map(row => row.join(',')).join('\n');
                    filename = `conversation-insights-${new Date().toISOString().split('T')[0]}.csv`;
                    mimeType = 'text/csv';
                    break;
                    
                default:
                    throw new Error('Unsupported export format');
            }
            
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Error exporting insights:', error);
            throw error;
        }
    }
};
