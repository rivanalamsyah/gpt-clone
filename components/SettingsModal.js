function SettingsModal({ isOpen, onClose, settings, onUpdateSettings, darkMode }) {
    try {
        const [activeTab, setActiveTab] = React.useState('personalization');
        const [showThemeCustomizer, setShowThemeCustomizer] = React.useState(false);
        const [showPersonalityCustomizer, setShowPersonalityCustomizer] = React.useState(false);
        const [showTemplateManager, setShowTemplateManager] = React.useState(false);
        const [showKeyboardShortcuts, setShowKeyboardShortcuts] = React.useState(false);
        const [showModelComparison, setShowModelComparison] = React.useState(false);
        const [showCollaboration, setShowCollaboration] = React.useState(false);
        const [showAPIManager, setShowAPIManager] = React.useState(false);
        const [showWorkflows, setShowWorkflows] = React.useState(false);
        const [showPlugins, setShowPlugins] = React.useState(false);
        const [showIntegrations, setShowIntegrations] = React.useState(false);

        if (!isOpen) return null;

        const tabs = [
            { id: 'personalization', name: 'Personalization', icon: 'fa-user-cog' },
            { id: 'analytics', name: 'Analytics', icon: 'fa-chart-line' },
            { id: 'templates', name: 'Templates', icon: 'fa-file-alt' },
            { id: 'shortcuts', name: 'Shortcuts', icon: 'fa-keyboard' },
            { id: 'enterprise', name: 'Enterprise', icon: 'fa-building' },
            { id: 'privacy', name: 'Privacy', icon: 'fa-shield-alt' }
        ];

        return (
            <div data-name="settings-modal" data-file="components/SettingsModal.js" className="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Settings & Enterprise Features
                            </h2>
                            <button 
                                onClick={onClose} 
                                className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
                            >
                                <i className={`fas fa-times ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        {/* Tab Navigation */}
                        <div className="w-64 border-r border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
                            <div className="p-4 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all text-sm ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <i className={`fas ${tab.icon}`}></i>
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
                            {activeTab === 'personalization' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold mb-4">Customize Your Experience</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setShowThemeCustomizer(true)}
                                            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <i className="fas fa-palette text-purple-500"></i>
                                                <div>
                                                    <div className="font-medium">Theme Customization</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Customize colors and appearance
                                                    </div>
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setShowPersonalityCustomizer(true)}
                                            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <i className="fas fa-brain text-blue-500"></i>
                                                <div>
                                                    <div className="font-medium">AI Personality</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Configure AI behavior and tone
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'analytics' && <UsageAnalytics darkMode={darkMode} />}

                            {activeTab === 'templates' && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Smart Templates</h3>
                                    <button
                                        onClick={() => setShowTemplateManager(true)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Manage Templates
                                    </button>
                                </div>
                            )}

                            {activeTab === 'shortcuts' && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                                    <button
                                        onClick={() => setShowKeyboardShortcuts(true)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        View Shortcuts
                                    </button>
                                </div>
                            )}

                            {activeTab === 'enterprise' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Enterprise Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { id: 'model-comparison', icon: 'fa-balance-scale', title: 'Model Comparison', desc: 'Compare AI model performance', action: () => setShowModelComparison(true) },
                                            { id: 'collaboration', icon: 'fa-users', title: 'Collaboration Hub', desc: 'Share and collaborate on chats', action: () => setShowCollaboration(true) },
                                            { id: 'api-manager', icon: 'fa-key', title: 'API Manager', desc: 'Manage API keys and endpoints', action: () => setShowAPIManager(true) },
                                            { id: 'workflows', icon: 'fa-cogs', title: 'Workflow Automation', desc: 'Automate repetitive tasks', action: () => setShowWorkflows(true) },
                                            { id: 'plugins', icon: 'fa-puzzle-piece', title: 'Plugin System', desc: 'Install and manage plugins', action: () => setShowPlugins(true) },
                                            { id: 'integrations', icon: 'fa-link', title: 'Integrations', desc: 'Connect third-party services', action: () => setShowIntegrations(true) }
                                        ].map((feature) => (
                                            <button
                                                key={feature.id}
                                                onClick={feature.action}
                                                className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <i className={`fas ${feature.icon} text-blue-500`}></i>
                                                    <div>
                                                        <div className="font-medium">{feature.title}</div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {feature.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Privacy & Data</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" defaultChecked />
                                            <span>Store conversation history</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>Allow usage analytics</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>Share data for improvements</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sub-modals */}
                {showModelComparison && (
                    <ModelComparison 
                        isOpen={showModelComparison}
                        onClose={() => setShowModelComparison(false)}
                        darkMode={darkMode}
                    />
                )}

                {showCollaboration && (
                    <CollaborationHub 
                        isOpen={showCollaboration}
                        onClose={() => setShowCollaboration(false)}
                        darkMode={darkMode}
                    />
                )}

                {showAPIManager && (
                    <APIManager 
                        isOpen={showAPIManager}
                        onClose={() => setShowAPIManager(false)}
                        darkMode={darkMode}
                    />
                )}

                {showWorkflows && (
                    <WorkflowAutomation 
                        isOpen={showWorkflows}
                        onClose={() => setShowWorkflows(false)}
                        darkMode={darkMode}
                    />
                )}

                {showPlugins && (
                    <PluginSystem 
                        isOpen={showPlugins}
                        onClose={() => setShowPlugins(false)}
                        darkMode={darkMode}
                    />
                )}

                {showIntegrations && (
                    <IntegrationHub 
                        isOpen={showIntegrations}
                        onClose={() => setShowIntegrations(false)}
                        darkMode={darkMode}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('SettingsModal component error:', error);
        reportError(error);
        return null;
    }
}
