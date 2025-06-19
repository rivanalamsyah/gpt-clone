function MessageRegenerate({ onRegenerate, isLoading, darkMode }) {
    try {
        return (
            <div data-name="message-regenerate" data-file="components/MessageRegenerate.js" className="flex justify-start mb-4">
                <div className="ml-12">
                    <button
                        onClick={onRegenerate}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg border transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode 
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-redo'} mr-2`}></i>
                        {isLoading ? 'Regenerating...' : 'Regenerate response'}
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessageRegenerate component error:', error);
        reportError(error);
        return null;
    }
}
