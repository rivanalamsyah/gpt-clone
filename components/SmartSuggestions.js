function SmartSuggestions({ onSelectSuggestion, darkMode, lastMessage }) {
    try {
        const [suggestions, setSuggestions] = React.useState([]);

        React.useEffect(() => {
            if (lastMessage && !lastMessage.isUser) {
                const smartSuggestions = [
                    "Can you explain this further?",
                    "What are the pros and cons?",
                    "Give me an example",
                    "How does this work in practice?",
                    "What's the next step?"
                ];
                setSuggestions(smartSuggestions.slice(0, 3));
            }
        }, [lastMessage]);

        if (suggestions.length === 0) return null;

        return (
            <div data-name="smart-suggestions" data-file="components/SmartSuggestions.js" className="content-section px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center mr-3">
                            <i className="fas fa-lightbulb text-white text-xs"></i>
                        </div>
                        <span className="text-sm font-medium text-white opacity-90">Suggested follow-ups</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectSuggestion(suggestion)}
                                className={`px-4 py-3 text-sm rounded-xl border transition-all hover:scale-105 hover-lift interactive-element btn-interactive focus-ring ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
                                }`}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SmartSuggestions component error:', error);
        reportError(error);
        return null;
    }
}
