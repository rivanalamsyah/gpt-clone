function ScrollToBottom({ show, onClick, darkMode }) {
    try {
        if (!show) return null;

        return (
            <div data-name="scroll-to-bottom" data-file="components/ScrollToBottom.js" className="fixed bottom-24 right-6 z-10">
                <button
                    onClick={onClick}
                    className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 ${
                        darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-white hover:bg-gray-50 text-gray-600'
                    }`}
                    title="Scroll to bottom"
                >
                    <i className="fas fa-arrow-down"></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('ScrollToBottom component error:', error);
        reportError(error);
        return null;
    }
}
