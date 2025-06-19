function ThemeCustomizer({ isOpen, onClose, currentTheme, onThemeChange, darkMode }) {
    try {
        const [selectedTheme, setSelectedTheme] = React.useState(currentTheme || 'default');
        const [customColors, setCustomColors] = React.useState({
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb'
        });

        const themes = [
            { id: 'default', name: 'Default', colors: ['#667eea', '#764ba2'], preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { id: 'ocean', name: 'Ocean Blue', colors: ['#2196F3', '#21CBF3'], preview: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)' },
            { id: 'sunset', name: 'Sunset', colors: ['#ff7e5f', '#feb47b'], preview: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' },
            { id: 'forest', name: 'Forest', colors: ['#11998e', '#38ef7d'], preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
            { id: 'purple', name: 'Purple Dream', colors: ['#667eea', '#764ba2'], preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { id: 'custom', name: 'Custom', colors: [customColors.primary, customColors.secondary], preview: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)` }
        ];

        const handleThemeSelect = (themeId) => {
            setSelectedTheme(themeId);
            const theme = themes.find(t => t.id === themeId);
            onThemeChange(theme);
        };

        const handleColorChange = (colorType, color) => {
            setCustomColors(prev => ({ ...prev, [colorType]: color }));
        };

        if (!isOpen) return null;

        return (
            <div data-name="theme-customizer" data-file="components/ThemeCustomizer.js" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`max-w-md w-full rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Customize Theme</h3>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => handleThemeSelect(theme.id)}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                        selectedTheme === theme.id ? 'border-blue-500' : 'border-gray-200'
                                    }`}
                                >
                                    <div 
                                        className="w-full h-8 rounded-md mb-2"
                                        style={{ background: theme.preview }}
                                    ></div>
                                    <span className="text-sm font-medium">{theme.name}</span>
                                </button>
                            ))}
                        </div>

                        {selectedTheme === 'custom' && (
                            <div className="space-y-3 mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h4 className="text-sm font-medium">Custom Colors</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <label className="text-sm w-20">Primary:</label>
                                        <input
                                            type="color"
                                            value={customColors.primary}
                                            onChange={(e) => handleColorChange('primary', e.target.value)}
                                            className="w-12 h-8 rounded border"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <label className="text-sm w-20">Secondary:</label>
                                        <input
                                            type="color"
                                            value={customColors.secondary}
                                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                                            className="w-12 h-8 rounded border"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => handleThemeSelect(selectedTheme)}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Apply Theme
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ThemeCustomizer component error:', error);
        reportError(error);
        return null;
    }
}
