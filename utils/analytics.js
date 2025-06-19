const AnalyticsUtils = {
    // Track user events
    trackEvent: (eventName, properties = {}) => {
        try {
            const event = {
                name: eventName,
                properties: {
                    ...properties,
                    timestamp: new Date().toISOString(),
                    sessionId: AnalyticsUtils.getSessionId(),
                    userId: AnalyticsUtils.getUserId()
                }
            };
            
            // Store locally for now
            const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
            events.push(event);
            localStorage.setItem('analytics_events', JSON.stringify(events.slice(-1000))); // Keep last 1000 events
            
            console.log('Analytics Event:', event);
        } catch (error) {
            console.error('Analytics tracking error:', error);
        }
    },

    // Get or create session ID
    getSessionId: () => {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    },

    // Get or create user ID
    getUserId: () => {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    },

    // Get analytics data
    getAnalyticsData: () => {
        try {
            const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
            const now = new Date();
            const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            
            const recentEvents = events.filter(event => 
                new Date(event.timestamp) > last7Days
            );

            return {
                totalEvents: events.length,
                recentEvents: recentEvents.length,
                totalChats: events.filter(e => e.name === 'chat_started').length,
                totalMessages: events.filter(e => e.name === 'message_sent').length,
                avgResponseTime: AnalyticsUtils.calculateAvgResponseTime(events),
                topActions: AnalyticsUtils.getTopActions(recentEvents),
                dailyActivity: AnalyticsUtils.getDailyActivity(recentEvents)
            };
        } catch (error) {
            console.error('Error getting analytics data:', error);
            return {};
        }
    },

    // Calculate average response time
    calculateAvgResponseTime: (events) => {
        const responseEvents = events.filter(e => e.properties.responseTime);
        if (responseEvents.length === 0) return 0;
        
        const totalTime = responseEvents.reduce((sum, event) => 
            sum + (event.properties.responseTime || 0), 0
        );
        return Math.round(totalTime / responseEvents.length / 1000); // Convert to seconds
    },

    // Get top actions
    getTopActions: (events) => {
        const actionCounts = {};
        events.forEach(event => {
            actionCounts[event.name] = (actionCounts[event.name] || 0) + 1;
        });
        
        return Object.entries(actionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([action, count]) => ({ action, count }));
    },

    // Get daily activity
    getDailyActivity: (events) => {
        const dailyActivity = {};
        events.forEach(event => {
            const date = new Date(event.timestamp).toDateString();
            dailyActivity[date] = (dailyActivity[date] || 0) + 1;
        });
        
        return Object.entries(dailyActivity)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, count]) => ({ date, count }));
    },

    // Clear analytics data
    clearAnalytics: () => {
        localStorage.removeItem('analytics_events');
        localStorage.removeItem('analytics_user_id');
        sessionStorage.removeItem('analytics_session_id');
    }
};
