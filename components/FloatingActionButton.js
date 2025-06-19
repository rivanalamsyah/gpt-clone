function FloatingActionButton({ onClick, darkMode }) {
    try {
        return (
            <button
                data-name="floating-action-button"
                data-file="components/FloatingActionButton.js"
                onClick={onClick}
                className={`floating-action-button w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl interactive-element btn-interactive focus-ring ${
                    darkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                }`}
                title="Start New Chat"
            >
                <i className="fas fa-plus text-xl sm:text-2xl"></i>
            </button>
        );
    } catch (error) {
        console.error('FloatingActionButton component error:', error);
        reportError(error);
        return null;
    }
}
