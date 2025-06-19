function QuickActions({ onSelectAction, darkMode }) {
    try {
        const quickActions = [
            { icon: 'fa-lightbulb', text: 'Explain', prompt: 'Explain this in simple terms:', color: 'yellow' },
            { icon: 'fa-compress-alt', text: 'Summarize', prompt: 'Summarize this:', color: 'blue' },
            { icon: 'fa-language', text: 'Translate', prompt: 'Translate this to English:', color: 'green' },
            { icon: 'fa-code', text: 'Code', prompt: 'Write code for:', color: 'purple' }
        ];

        const getColorClasses = (color) => {
            const colors = {
                yellow: 'from-yellow-400 to-orange-400',
                blue: 'from-blue-400 to-cyan-400',
                green: 'from-green-400 to-teal-400',
                purple: 'from-purple-400 to-pink-400'
            };
            return colors[color] || colors.blue;
        };

        return (
            <div data-name="quick-actions" data-file="components/QuickActions.js" className="content-section px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-hierarchy-3 text-white text-center mb-6 opacity-90">
                        Quick Actions
                    </h3>
                    <div className="card-grid card-grid-2 sm:card-grid-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectAction(action.prompt)}
                                className={`flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-2xl transition-all hover:scale-105 hover-lift interactive-element btn-interactive focus-ring ${
                                    darkMode 
                                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                                        : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-100'
                                }`}
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${getColorClasses(action.color)} rounded-xl flex items-center justify-center shadow-md`}>
                                    <i className={`fas ${action.icon} text-white text-lg sm:text-xl`}></i>
                                </div>
                                <span className="text-sm sm:text-base font-medium text-center leading-tight">{action.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('QuickActions component error:', error);
        reportError(error);
        return null;
    }
}
