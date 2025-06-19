function SecurityCenter({ settings, onUpdateSettings, darkMode }) {
    try {
        const [activeSection, setActiveSection] = React.useState('privacy');

        const sections = [
            { id: 'privacy', name: 'Privacy', icon: 'fa-shield-alt' },
            { id: 'data', name: 'Data Control', icon: 'fa-database' },
            { id: 'sessions', name: 'Sessions', icon: 'fa-clock' },
            { id: 'export', name: 'Export & Delete', icon: 'fa-download' }
        ];

        const handleSettingChange = (key, value) => {
            onUpdateSettings({ ...settings, [key]: value });
        };

        const handleDataExport = (format) => {
            // Export user data in specified format
            console.log(`Exporting data in ${format} format`);
        };

        const handleDataDeletion = () => {
            if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
                console.log('Deleting all user data');
            }
        };

        return (
            <div data-name="security-center" data-file="components/SecurityCenter.js" className="space-y-6">
                {/* Section Navigation */}
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                activeSection === section.id
                                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${section.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{section.name}</span>
                        </button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="space-y-6">
                    {activeSection === 'privacy' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Privacy Settings</h3>
                            
                            <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                    <span>Store conversation history</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.storeHistory !== false}
                                        onChange={(e) => handleSettingChange('storeHistory', e.target.checked)}
                                        className="toggle-switch"
                                    />
                                </label>
                                
                                <label className="flex items-center justify-between">
                                    <span>Allow analytics tracking</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.allowAnalytics || false}
                                        onChange={(e) => handleSettingChange('allowAnalytics', e.target.checked)}
                                        className="toggle-switch"
                                    />
                                </label>
                                
                                <label className="flex items-center justify-between">
                                    <span>Share usage data for improvements</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.shareUsageData || false}
                                        onChange={(e) => handleSettingChange('shareUsageData', e.target.checked)}
                                        className="toggle-switch"
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    {activeSection === 'data' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Data Control</h3>
                            
                            <div className={`p-4 rounded-lg border ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                            }`}>
                                <h4 className="font-medium mb-2">Data Retention</h4>
                                <select 
                                    value={settings.dataRetention || '1year'} 
                                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                                    className={`w-full p-2 border rounded-lg ${
                                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                    }`}
                                >
                                    <option value="30days">30 Days</option>
                                    <option value="90days">90 Days</option>
                                    <option value="1year">1 Year</option>
                                    <option value="forever">Forever</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeSection === 'sessions' && (
                        <SessionManager darkMode={darkMode} />
                    )}

                    {activeSection === 'export' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Export & Delete Data</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleDataExport('json')}
                                    className="flex items-center justify-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <i className="fas fa-file-code text-blue-500"></i>
                                    <span>Export as JSON</span>
                                </button>
                                
                                <button
                                    onClick={() => handleDataExport('csv')}
                                    className="flex items-center justify-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <i className="fas fa-file-csv text-green-500"></i>
                                    <span>Export as CSV</span>
                                </button>
                            </div>
                            
                            <div className={`p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800`}>
                                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Danger Zone</h4>
                                <p className="text-sm text-red-600 dark:text-red-300 mb-3">
                                    This action will permanently delete all your data and cannot be undone.
                                </p>
                                <button
                                    onClick={handleDataDeletion}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete All Data
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SecurityCenter component error:', error);
        reportError(error);
        return null;
    }
}
