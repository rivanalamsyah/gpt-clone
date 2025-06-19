function PersonalitySelector({ selectedPersonality, onPersonalityChange, darkMode }) {
    try {
        const personalities = [
            { 
                id: 'helpful', 
                name: 'Helpful', 
                icon: 'fa-heart',
                description: 'Friendly and supportive assistant',
                color: 'blue'
            },
            { 
                id: 'professional', 
                name: 'Professional', 
                icon: 'fa-briefcase',
                description: 'Formal and business-focused',
                color: 'gray'
            },
            { 
                id: 'creative', 
                name: 'Creative', 
                icon: 'fa-palette',
                description: 'Imaginative and artistic',
                color: 'purple'
            },
            { 
                id: 'analytical', 
                name: 'Analytical', 
                icon: 'fa-chart-line',
                description: 'Data-driven and logical',
                color: 'green'
            }
        ];

        const getColorClasses = (color, isSelected) => {
            const colors = {
                blue: isSelected ? 'bg-blue-500 text-white' : 'text-blue-500',
                gray: isSelected ? 'bg-gray-500 text-white' : 'text-gray-500',
                purple: isSelected ? 'bg-purple-500 text-white' : 'text-purple-500',
                green: isSelected ? 'bg-green-500 text-white' : 'text-green-500'
            };
            return colors[color] || colors.blue;
        };

        return (
            <div data-name="personality-selector" data-file="components/PersonalitySelector.js" className="mb-6">
                <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    AI Personality
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {personalities.map((personality) => (
                        <button
                            key={personality.id}
                            onClick={() => onPersonalityChange(personality.id)}
                            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                                selectedPersonality === personality.id
                                    ? darkMode 
                                        ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                                        : 'border-blue-500 bg-blue-50'
                                    : darkMode 
                                        ? 'border-gray-600 hover:border-gray-500' 
                                        : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                getColorClasses(personality.color, selectedPersonality === personality.id)
                            }`}>
                                <i className={`fas ${personality.icon}`}></i>
                            </div>
                            <div className="flex-1 text-left">
                                <div className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {personality.name}
                                </div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {personality.description}
                                </div>
                            </div>
                            {selectedPersonality === personality.id && (
                                <i className="fas fa-check text-blue-500"></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PersonalitySelector component error:', error);
        reportError(error);
        return null;
    }
}
