function MessageRetry({ onRetry, isRetrying }) {
    try {
        return (
            <div 
                data-name="message-retry" 
                data-file="components/MessageRetry.js"
                className="flex items-center space-x-2 mt-2"
            >
                <button
                    onClick={onRetry}
                    disabled={isRetrying}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-red-500/20 text-red-200 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRetrying ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <i className="fas fa-redo"></i>
                    )}
                    <span>{isRetrying ? 'Retrying...' : 'Retry'}</span>
                </button>
                
                <span className="text-xs text-red-300">
                    Message failed to send
                </span>
            </div>
        );
    } catch (error) {
        console.error('MessageRetry component error:', error);
        reportError(error);
        return null;
    }
}
