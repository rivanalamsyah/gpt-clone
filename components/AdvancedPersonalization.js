function AdvancedPersonalization({ settings, onUpdateSettings, darkMode }) {
    try {
        const [activeTab, setActiveTab] = React.useState('appearance');

        const tabs = [
            { id: 'appearance', name: 'Appearance', icon: 'fa-palette' },
            { id: 'behavior', name: 'AI Behavior', icon: 'fa-brain' },
            { id: 'shortcuts', name: 'Shortcuts', icon: 'fa-keyboard' },
            { id: 'layout', name: 'Layout', icon: 'fa-th-large' }
        ];

        const handleSettingChange = (key, value) => {
            onUpdateSettings({ ...settings, [key]: value });
        };

        return (
            <div data-name="advanced-personalization" data-file="components/AdvancedPersonalization.js" className="w-full">
                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'appearance' && (
                        <div>
                            <ThemeSelector 
                                selectedTheme={settings.theme || 'default'}
                                onThemeChange={(theme) => handleSettingChange('theme', theme)}
                                darkMode={darkMode}
                            />
                            
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold mb-3">Message Density</h4>
                                <select 
                                    value={settings.messageDensity || 'comfortable'} 
                                    onChange={(e) => handleSettingChange('messageDensity', e.target.value)}
                                    className={`w-full p-2 border rounded-lg ${
                                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                    }`}
                                >
                                    <option value="compact">Compact</option>
                                    <option value="comfortable">Comfortable</option>
                                    <option value="spacious">Spacious</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'behavior' && (
                        <div>
                            <PersonalitySelector 
                                selectedPersonality={settings.personality || 'helpful'}
                                onPersonalityChange={(personality) => handleSettingChange('personality', personality)}
                                darkMode={darkMode}
                            />
                            
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold mb-3">Response Style</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={settings.useEmojis || false}
                                            onChange={(e) => handleSettingChange('useEmojis', e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Use emojis in responses</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={settings.explainSteps || false}
                                            onChange={(e) => handleSettingChange('explainSteps', e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Always explain reasoning steps</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shortcuts' && (
                        <KeyboardShortcutsConfig 
                            shortcuts={settings.shortcuts || {}}
                            onUpdateShortcuts={(shortcuts) => handleSettingChange('shortcuts', shortcuts)}
                            darkMode={darkMode}
                        />
                    )}

                    {activeTab === 'layout' && (
                        <LayoutCustomization 
                            layout={settings.layout || {}}
                            onUpdateLayout={(layout) => handleSettingChange('layout', layout)}
                            darkMode={darkMode}
                        />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdvancedPersonalization component error:', error);
        reportError(error);
        return null;
    }
}
