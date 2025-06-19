function IntegrationHub({ darkMode }) {
    try {
        const [integrations, setIntegrations] = React.useState([]);
        const [availableIntegrations, setAvailableIntegrations] = React.useState([]);
        const [isConnecting, setIsConnecting] = React.useState(null);

        React.useEffect(() => {
            loadIntegrations();
            loadAvailableIntegrations();
        }, []);

        const loadIntegrations = () => {
            const saved = JSON.parse(localStorage.getItem('integrations') || '[]');
            setIntegrations(saved);
        };

        const loadAvailableIntegrations = () => {
            const available = [
                {
                    id: 'google-drive',
                    name: 'Google Drive',
                    description: 'Access and manage your Google Drive files',
                    icon: 'fa-google-drive',
                    category: 'storage',
                    features: ['file_access', 'file_upload', 'sharing'],
                    status: 'available'
                },
                {
                    id: 'slack',
                    name: 'Slack',
                    description: 'Send messages and notifications to Slack channels',
                    icon: 'fa-slack',
                    category: 'communication',
                    features: ['messaging', 'notifications', 'channels'],
                    status: 'available'
                },
                {
                    id: 'github',
                    name: 'GitHub',
                    description: 'Manage repositories and track issues',
                    icon: 'fa-github',
                    category: 'development',
                    features: ['repos', 'issues', 'pull_requests'],
                    status: 'available'
                },
                {
                    id: 'trello',
                    name: 'Trello',
                    description: 'Create and manage Trello boards and cards',
                    icon: 'fa-trello',
                    category: 'productivity',
                    features: ['boards', 'cards', 'lists'],
                    status: 'available'
                },
                {
                    id: 'notion',
                    name: 'Notion',
                    description: 'Access and update your Notion workspace',
                    icon: 'fa-book',
                    category: 'productivity',
                    features: ['pages', 'databases', 'blocks'],
                    status: 'available'
                }
            ];
            setAvailableIntegrations(available);
        };

        const connectIntegration = async (integration) => {
            setIsConnecting(integration.id);
            
            try {
                // Simulate OAuth flow
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const connected = {
                    ...integration,
                    connectedAt: new Date().toISOString(),
                    status: 'connected',
                    permissions: integration.features
                };
                
                const updated = [...integrations, connected];
                setIntegrations(updated);
                localStorage.setItem('integrations', JSON.stringify(updated));
                
            } catch (error) {
                console.error('Integration error:', error);
            } finally {
                setIsConnecting(null);
            }
        };

        const disconnectIntegration = (integrationId) => {
            if (confirm('Disconnect this integration?')) {
                const updated = integrations.filter(i => i.id !== integrationId);
                setIntegrations(updated);
                localStorage.setItem('integrations', JSON.stringify(updated));
            }
        };

        const testConnection = async (integrationId) => {
            try {
                console.log('Testing connection for:', integrationId);
                // Simulate API test
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Connection test successful!');
            } catch (error) {
                alert('Connection test failed!');
            }
        };

        const isConnected = (integrationId) => {
            return integrations.some(i => i.id === integrationId);
        };

        const getCategoryColor = (category) => {
            const colors = {
                storage: 'bg-blue-100 text-blue-700',
                communication: 'bg-green-100 text-green-700',
                development: 'bg-purple-100 text-purple-700',
                productivity: 'bg-orange-100 text-orange-700'
            };
            return colors[category] || 'bg-gray-100 text-gray-700';
        };

        return (
            <div data-name="integration-hub" data-file="components/IntegrationHub.js" className="space-y-6">
                <h2 className="text-2xl font-bold">Integration Hub</h2>
                
                {/* Connected Integrations */}
                {integrations.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Connected Integrations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {integrations.map(integration => (
                                <div
                                    key={integration.id}
                                    className={`p-4 border rounded-lg ${
                                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <i className={`fab ${integration.icon} text-2xl`}></i>
                                            <div>
                                                <h4 className="font-semibold">{integration.name}</h4>
                                                <span className="text-xs text-green-600">Connected</span>
                                            </div>
                                        </div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        Connected on {new Date(integration.connectedAt).toLocaleDateString()}
                                    </p>
                                    
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => testConnection(integration.id)}
                                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Test
                                        </button>
                                        <button
                                            onClick={() => disconnectIntegration(integration.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Available Integrations */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableIntegrations.filter(i => !isConnected(i.id)).map(integration => (
                            <div
                                key={integration.id}
                                className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <i className={`fab ${integration.icon} text-2xl text-gray-600`}></i>
                                    <div>
                                        <h4 className="font-semibold">{integration.name}</h4>
                                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(integration.category)}`}>
                                            {integration.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {integration.description}
                                </p>
                                
                                <div className="mb-3">
                                    <div className="flex flex-wrap gap-1">
                                        {integration.features.slice(0, 3).map(feature => (
                                            <span key={feature} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {feature.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => connectIntegration(integration)}
                                    disabled={isConnecting === integration.id}
                                    className={`w-full px-4 py-2 text-sm rounded transition-colors ${
                                        isConnecting === integration.id
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('IntegrationHub component error:', error);
        reportError(error);
        return null;
    }
}
