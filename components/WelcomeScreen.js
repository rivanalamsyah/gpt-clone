function WelcomeScreen({ darkMode, onSelectTemplate }) {
    try {
        const suggestions = [
            { icon: '🧠', text: 'Explain quantum computing', color: 'from-purple-500 to-pink-500' },
            { icon: '✍️', text: 'Write a creative story', color: 'from-green-500 to-teal-500' },
            { icon: '🗺️', text: 'Help me plan a trip', color: 'from-blue-500 to-cyan-500' },
            { icon: '🔢', text: 'Solve a math problem', color: 'from-orange-500 to-red-500' }
        ];

        return (
            <div data-name="welcome-screen" data-file="components/WelcomeScreen.js" className="content-section flex flex-col items-center justify-center min-h-[60vh] text-center px-4 sm:px-6 w-full">
                <div className="mb-8 sm:mb-12 w-full max-w-4xl">
                    <div className="relative mx-auto mb-6 sm:mb-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-3xl sm:rounded-[2rem] flex items-center justify-center shadow-2xl hover-lift mx-auto">
                            <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">V</span>
                        </div>
                        <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full border-3 sm:border-4 border-white pulse-animation"></div>
                    </div>
                    
                    <h2 className="text-hierarchy-1 text-white mb-3 sm:mb-4">
                        Welcome to Vansky AI
                    </h2>
                    <p className="text-white text-opacity-90 text-base sm:text-lg mb-8 sm:mb-12 px-4 max-w-lg mx-auto leading-relaxed">
                        Your advanced AI assistant is ready to help you explore, create, and learn
                    </p>
                </div>
                
                <div className="card-grid card-grid-2 sm:card-grid-2 w-full max-w-lg sm:max-w-2xl px-4">
                    {suggestions.map((suggestion, index) => (
                        <div 
                            key={index} 
                            onClick={() => onSelectTemplate(suggestion.text)}
                            className="glass-morphism rounded-2xl p-6 sm:p-8 cursor-pointer transition-all hover:scale-105 hover-lift group w-full interactive-element btn-interactive"
                        >
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${suggestion.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                                <span className="text-2xl sm:text-3xl">{suggestion.icon}</span>
                            </div>
                            <p className="text-white text-sm sm:text-base font-medium line-clamp-2 px-2 leading-relaxed">
                                {suggestion.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WelcomeScreen component error:', error);
        reportError(error);
        return null;
    }
}
