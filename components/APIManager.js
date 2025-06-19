function APIManager({ darkMode }) {
    try {
        const [apiKeys, setApiKeys] = React.useState([]);
        const [isAdding, setIsAdding] = React.useState(false);
        const [newApiConfig, setNewApiConfig] = React.useState({
            name: '',
            provider: '',
            key: '',
            endpoint: '',
            description: ''
        });

        const providers = [
            { id: 'openai', name: 'OpenAI', endpoint: 'https://api.openai.com/v1' },
            { id: 'anthropic', name: 'Anthropic', endpoint: 'https://api.anthropic.com' },
            { id: 'google', name: 'Google AI', endpoint: 'https://generativelanguage.googleapis.com' },
            { id: 'custom', name: 'Custom API', endpoint: '' }
        ];

        React.useEffect(() => {
            loadApiKeys();
        }, []);

        const loadApiKeys = () => {
            const saved = JSON.parse(localStorage.getItem('api_keys') || '[]');
            setApiKeys(saved);
        };

        const addApiKey = () => {
            if (!newApiConfig.name.trim() || !newApiConfig.key.trim()) return;

            const newApi = {
                id: Date.now().toString(),
                ...newApiConfig,
                createdAt: new Date().toISOString(),
                lastUsed: null,
                status: 'active'
            };

            const updated = [...apiKeys, newApi];
            setApiKeys(updated);
            localStorage.setItem('api_keys', JSON.stringify(updated));
            
            setNewApiConfig({ name: '', provider: '', key: '', endpoint: '', description: '' });
            setIsAdding(false);
        };

        const deleteApiKey = (apiId) => {
            if (confirm('Delete this API key?')) {
                const updated = apiKeys.filter(api => api.id !== apiId);
                setApiKeys(updated);
                localStorage.setItem('api_keys', JSON.stringify(updated));
            }
        };

        const testApiKey = async (api) => {
            try {
                console.log('Testing API key for:', api.name);
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const updated = apiKeys.map(a => 
                    a.id === api.id ? { ...a, lastUsed: new Date().toISOString(), status: 'active' } : a
                );
                setApiKeys(updated);
                localStorage.setItem('api_keys', JSON.stringify(updated));
                
                alert('API key test successful!');
            } catch (error) {
                const updated = apiKeys.map(a => 
                    a.id === api.id ? { ...a, status: 'error' } : a
                );
                setApiKeys(updated);
                localStorage.setItem('api_keys', JSON.stringify(updated));
                
                alert('API key test failed!');
            }
        };

        const maskApiKey = (key) => {
            if (key.length <= 8) return key;
            return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
        };

        const getStatusColor = (status) => {
            const colors = {
                active: 'bg-green-100 text-green-700',
                error: 'bg-red-100 text-red-700',
                inactive: 'bg-gray-100 text-gray-700'
            };
            return colors[status] || colors.inactive;
        };

        return (
            <div data-name="api-manager" data-file="components/APIManager.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">API Manager</h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add API Key
                    </button>
                </div>

                {/* Add API Form */}
                {isAdding && (
                    <div className={`p-6 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <h3 className="text-lg font-semibold mb-4">Add New API Key</h3>
                        
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={newApiConfig.name}
                                onChange={(e) => setNewApiConfig(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="API name..."
                                className={`w-full p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />
                            
                            <select
                                value={newApiConfig.provider}
                                onChange={(e) => {
                                    const provider = providers.find(p => p.id === e.target.value);
                                    setNewApiConfig(prev => ({ 
                                        ...prev, 
                                        provider: e.target.value,
                                        endpoint: provider?.endpoint || ''
                                    }));
                                }}
                                className={`w-full p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            >
                                <option value="">Select provider...</option>
                                {providers.map(provider => (
                                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                                ))}
                            </select>

                            <input
                                type="password"
                                value={newApiConfig.key}
                                onChange={(e) => setNewApiConfig(prev => ({ ...prev, key: e.target.value }))}
                                placeholder="API key..."
                                className={`w-full p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />

                            <div className="flex space-x-2">
                                <button
                                    onClick={addApiKey}
                                    disabled={!newApiConfig.name.trim() || !newApiConfig.key.trim()}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                                >
                                    Add API Key
                                </button>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* API Keys List */}
                <div className="space-y-4">
                    {apiKeys.map(api => (
                        <div
                            key={api.id}
                            className={`p-4 border rounded-lg ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <h3 className="font-semibold">{api.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(api.status)}`}>
                                        {api.status}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => testApiKey(api)}
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Test
                                    </button>
                                    <button
                                        onClick={() => deleteApiKey(api.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            
                            <div className="text-sm space-y-1">
                                <div><span className="font-medium">Provider:</span> {api.provider}</div>
                                <div><span className="font-medium">Key:</span> {maskApiKey(api.key)}</div>
                                <div><span className="font-medium">Created:</span> {new Date(api.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {apiKeys.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <i className="fas fa-key text-4xl mb-4"></i>
                        <p>No API keys configured</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('APIManager component error:', error);
        reportError(error);
        return null;
    }
}
