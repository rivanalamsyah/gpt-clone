function TypingIndicator({ isVisible, userName = "AI" }) {
    try {
        if (!isVisible) return null;

        return (
            <div 
                data-name="typing-indicator" 
                data-file="components/TypingIndicator.js"
                className="flex items-center space-x-3 px-4 sm:px-6 py-3 animate-fade-in"
            >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <i className="fas fa-robot text-white text-sm"></i>
                </div>
                
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                        <span className="text-white/80 text-sm">{userName} is typing</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TypingIndicator component error:', error);
        reportError(error);
        return null;
    }
}
