function ThemeSelector({ selectedTheme, onThemeChange, darkMode }) {
    try {
        const themes = [
            { id: 'default', name: 'Default', colors: ['#667eea', '#764ba2'] },
            { id: 'ocean', name: 'Ocean', colors: ['#2196F3', '#21CBF3'] },
            { id: 'sunset', name: 'Sunset', colors: ['#ff7e5f', '#feb47b'] },
            { id: 'forest', name: 'Forest', colors: ['#11998e', '#38ef7d'] },
            { id: 'purple', name: 'Purple', colors: ['#667eea', '#764ba2'] },
            { id: 'dark', name: 'Dark', colors: ['#2c3e50', '#3498db'] }
        ];

        return (
            <div data-name="theme-selector" data-file="components/ThemeSelector.js" className="mb-6">
                <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Choose Theme
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => onThemeChange(theme.id)}
                            className={`relative p-3 rounded-lg border-2 transition-all ${
                                selectedTheme === theme.id
                                    ? 'border-blue-500 shadow-lg'
                                    : darkMode 
                                        ? 'border-gray-600 hover:border-gray-500' 
                                        : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div 
                                className="w-full h-8 rounded-md mb-2"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`
                                }}
                            ></div>
                            <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {theme.name}
                            </span>
                            {selectedTheme === theme.id && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <i className="fas fa-check text-white text-xs"></i>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ThemeSelector component error:', error);
        reportError(error);
        return null;
    }
}
