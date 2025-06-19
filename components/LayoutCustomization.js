function LayoutCustomization({ layout, onUpdateLayout, darkMode }) {
    try {
        const handleLayoutChange = (key, value) => {
            onUpdateLayout({ ...layout, [key]: value });
        };

        const layoutOptions = [
            { id: 'sidebarPosition', name: 'Sidebar Position', options: ['left', 'right'] },
            { id: 'messageAlignment', name: 'Message Alignment', options: ['left', 'center', 'right'] },
            { id: 'compactMode', name: 'Compact Mode', type: 'toggle' },
            { id: 'showTimestamps', name: 'Show Timestamps', type: 'toggle' },
            { id: 'showAvatars', name: 'Show Avatars', type: 'toggle' }
        ];

        return (
            <div data-name="layout-customization" data-file="components/LayoutCustomization.js" className="space-y-6">
                <h4 className="text-sm font-semibold mb-3">Layout Options</h4>
                
                <div className="space-y-4">
                    {layoutOptions.map((option) => (
                        <div key={option.id} className="flex items-center justify-between">
                            <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                {option.name}
                            </span>
                            
                            {option.type === 'toggle' ? (
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={layout[option.id] || false}
                                        onChange={(e) => handleLayoutChange(option.id, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            ) : (
                                <select
                                    value={layout[option.id] || option.options[0]}
                                    onChange={(e) => handleLayoutChange(option.id, e.target.value)}
                                    className={`px-3 py-1 border rounded ${
                                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                    }`}
                                >
                                    {option.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>

                {/* Preview */}
                <div className={`mt-6 p-4 border rounded-lg ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h5 className="text-sm font-medium mb-3">Preview</h5>
                    <div className="space-y-2">
                        <div className={`text-xs p-2 rounded ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                            Layout changes will be applied immediately
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Sample message preview</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LayoutCustomization component error:', error);
        reportError(error);
        return null;
    }
}
