function MessageStats({ message, responseTime, darkMode }) {
    try {
        const wordCount = message ? message.split(' ').length : 0;
        const charCount = message ? message.length : 0;

        return (
            <div data-name="message-stats" data-file="components/MessageStats.js" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 flex items-center space-x-4`}>
                <span className="flex items-center">
                    <i className="fas fa-clock mr-1"></i>
                    {responseTime ? `${responseTime}ms` : 'N/A'}
                </span>
                <span className="flex items-center">
                    <i className="fas fa-font mr-1"></i>
                    {wordCount} words
                </span>
                <span className="flex items-center">
                    <i className="fas fa-hashtag mr-1"></i>
                    {charCount} chars
                </span>
            </div>
        );
    } catch (error) {
        console.error('MessageStats component error:', error);
        reportError(error);
        return null;
    }
}
