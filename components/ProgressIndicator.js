function ProgressIndicator({ progress, message, darkMode }) {
    try {
        if (!message) return null;

        const wordCount = message.split(' ').length;
        const estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed

        return (
            <div data-name="progress-indicator" data-file="components/ProgressIndicator.js" className="flex justify-start mb-2 px-4">
                <div className={`px-3 py-2 rounded-lg text-xs ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                                progress > 25 ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full ${
                                progress > 50 ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full ${
                                progress > 75 ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full ${
                                progress > 90 ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                        </div>
                        <span>{wordCount} words • {estimatedReadTime} min read</span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProgressIndicator component error:', error);
        reportError(error);
        return null;
    }
}
