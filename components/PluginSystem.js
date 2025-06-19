function PluginSystem({ darkMode }) {
    try {
        const [installedPlugins, setInstalledPlugins] = React.useState([]);
        const [availablePlugins, setAvailablePlugins] = React.useState([]);
        const [activeTab, setActiveTab] = React.useState('installed');
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            loadInstalledPlugins();
            loadAvailablePlugins();
        }, []);

        const loadInstalledPlugins = () => {
            const plugins = JSON.parse(localStorage.getItem('installed_plugins') || '[]');
            setInstalledPlugins(plugins);
        };

        const loadAvailablePlugins = () => {
            const plugins = [
                {
                    id: 'weather-plugin',
                    name: 'Weather Assistant',
                    description: 'Get real-time weather information and forecasts',
                    version: '1.2.0',
                    author: 'WeatherCorp',
                    rating: 4.8,
                    downloads: 15420,
                    icon: 'fa-cloud-sun',
                    price: 0
                },
                {
                    id: 'calendar-plugin',
                    name: 'Smart Calendar',
                    description: 'Manage events and schedule meetings intelligently',
                    version: '2.1.0',
                    author: 'CalendarPro',
                    rating: 4.6,
                    downloads: 8930,
                    icon: 'fa-calendar-alt',
                    price: 4.99
                },
                {
                    id: 'translator-plugin',
                    name: 'Universal Translator',
                    description: 'Translate text between 100+ languages instantly',
                    version: '1.0.5',
                    author: 'LinguaTech',
                    rating: 4.9,
                    downloads: 23150,
                    icon: 'fa-language',
                    price: 2.99
                }
            ];
            setAvailablePlugins(plugins);
        };

        const installPlugin = (plugin) => {
            const installed = {
                ...plugin,
                installedAt: new Date().toISOString(),
                enabled: true
            };
            
            const updated = [...installedPlugins, installed];
            setInstalledPlugins(updated);
            localStorage.setItem('installed_plugins', JSON.stringify(updated));
        };

        const uninstallPlugin = (pluginId) => {
            if (confirm('Uninstall this plugin?')) {
                const updated = installedPlugins.filter(p => p.id !== pluginId);
                setInstalledPlugins(updated);
                localStorage.setItem('installed_plugins', JSON.stringify(updated));
            }
        };

        const togglePlugin = (pluginId) => {
            const updated = installedPlugins.map(p => 
                p.id === pluginId ? { ...p, enabled: !p.enabled } : p
            );
            setInstalledPlugins(updated);
            localStorage.setItem('installed_plugins', JSON.stringify(updated));
        };

        const filteredPlugins = availablePlugins.filter(plugin =>
            plugin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const isInstalled = (pluginId) => {
            return installedPlugins.some(p => p.id === pluginId);
        };

        return (
            <div data-name="plugin-system" data-file="components/PluginSystem.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Plugin System</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('installed')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'installed'
                                    ? 'bg-blue-500 text-white'
                                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Installed ({installedPlugins.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('marketplace')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'marketplace'
                                    ? 'bg-blue-500 text-white'
                                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Marketplace
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {activeTab === 'marketplace' && (
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search plugins..."
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        />
                        <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                    </div>
                )}

                {/* Plugin Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(activeTab === 'installed' ? installedPlugins : filteredPlugins).map(plugin => (
                        <div
                            key={plugin.id}
                            className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${plugin.icon} text-2xl text-blue-500`}></i>
                                    <div>
                                        <h3 className="font-semibold">{plugin.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">v{plugin.version}</p>
                                    </div>
                                </div>
                                {activeTab === 'installed' && (
                                    <div className={`w-3 h-3 rounded-full ${plugin.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                )}
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {plugin.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold">
                                    {plugin.price === 0 ? 'Free' : `$${plugin.price}`}
                                </span>
                                
                                {activeTab === 'installed' ? (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => togglePlugin(plugin.id)}
                                            className={`px-3 py-1 text-sm rounded ${
                                                plugin.enabled 
                                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                        >
                                            {plugin.enabled ? 'Disable' : 'Enable'}
                                        </button>
                                        <button
                                            onClick={() => uninstallPlugin(plugin.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Uninstall
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => installPlugin(plugin)}
                                        disabled={isInstalled(plugin.id)}
                                        className={`px-4 py-2 text-sm rounded transition-colors ${
                                            isInstalled(plugin.id)
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                    >
                                        {isInstalled(plugin.id) ? 'Installed' : 'Install'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PluginSystem component error:', error);
        reportError(error);
        return null;
    }
}
