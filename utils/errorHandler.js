const ErrorHandler = {
    // Log error with context
    logError: (error, context = {}) => {
        try {
            const errorData = {
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href,
                context
            };
            
            console.error('Error logged:', errorData);
            
            // Store in localStorage for debugging
            const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
            errors.push(errorData);
            localStorage.setItem('error_logs', JSON.stringify(errors.slice(-50))); // Keep last 50 errors
            
            return errorData;
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
    },

    // Handle API errors
    handleAPIError: (error, operation = 'API call') => {
        try {
            let userMessage = 'An unexpected error occurred. Please try again.';
            
            if (error.name === 'NetworkError' || !navigator.onLine) {
                userMessage = 'No internet connection. Please check your network and try again.';
            } else if (error.message.includes('timeout')) {
                userMessage = 'Request timed out. Please try again.';
            } else if (error.message.includes('rate limit')) {
                userMessage = 'Too many requests. Please wait a moment and try again.';
            }
            
            ErrorHandler.logError(error, { operation, type: 'API_ERROR' });
            return userMessage;
        } catch (handlerError) {
            console.error('Error in handleAPIError:', handlerError);
            return 'An unexpected error occurred.';
        }
    },

    // Get error logs
    getErrorLogs: () => {
        try {
            return JSON.parse(localStorage.getItem('error_logs') || '[]');
        } catch (error) {
            console.error('Failed to get error logs:', error);
            return [];
        }
    },

    // Clear error logs
    clearErrorLogs: () => {
        try {
            localStorage.removeItem('error_logs');
        } catch (error) {
            console.error('Failed to clear error logs:', error);
        }
    }
};
