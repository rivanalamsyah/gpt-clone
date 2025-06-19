function AIModelOrchestration({ darkMode }) {
    try {
        const [models, setModels] = React.useState([]);
        const [loadBalancing, setLoadBalancing] = React.useState('round-robin');
        const [failoverEnabled, setFailoverEnabled] = React.useState(true);

        React.useEffect(() => {
            loadModelStatus();
        }, []);

        const loadModelStatus = () => {
            const modelData = [
                { id: 'gpt-4', name: 'GPT-4', status: 'active', load: 65, responseTime: 1.2, cost: 0.03 },
                { id: 'gpt-3.5', name: 'GPT-3.5', status: 'active', load: 45, responseTime: 0.8, cost: 0.002 },
                { id: 'claude', name: 'Claude', status: 'maintenance', load: 0, responseTime: 0, cost: 0.015 },
                { id: 'gemini', name: 'Gemini', status: 'active', load: 30, responseTime: 1.0, cost: 0.01 }
            ];
            setModels(modelData);
        };

        const getStatusColor = (status) => {
            const colors = {
                active: 'text-green-600 bg-green-100',
                maintenance: 'text-yellow-600 bg-yellow-100',
                offline: 'text-red-600 bg-red-100'
            };
            return colors[status] || colors.offline;
        };

        const getLoadColor = (load) => {
            if (load < 30) return 'bg-green-500';
            if (load < 70) return 'bg-yellow-500';
            return 'bg-red-500';
        };

        return (
            <div data-name="ai-model-orchestration" data-file="components/AIModelOrchestration.js" className="space-y-6">
                <h2 className="text-2xl font-bold">AI Model Orchestration</h2>

                {/* Load Balancing Configuration */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Load Balancing Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Strategy</label>
                            <select
                                value={loadBalancing}
                                onChange={(e) => setLoadBalancing(e.target.value)}
                                className={`w-full p-2 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            >
                                <option value="round-robin">Round Robin</option>
                                <option value="least-load">Least Load</option>
                                <option value="fastest-response">Fastest Response</option>
                                <option value="cost-optimized">Cost Optimized</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="failover"
                                checked={failoverEnabled}
                                onChange={(e) => setFailoverEnabled(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="failover" className="text-sm">Enable automatic failover</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Model Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {models.map((model) => (
                        <div
                            key={model.id}
                            className={`p-4 rounded-lg border transition-all ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold">{model.name}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(model.status)}`}>
                                    {model.status}
                                </span>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Load</span>
                                    <span>{model.load}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${getLoadColor(model.load)}`}
                                        style={{ width: `${model.load}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                    <span>Response Time</span>
                                    <span>{model.responseTime}s</span>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                    <span>Cost per 1K tokens</span>
                                    <span>${model.cost}</span>
                                </div>
                            </div>
                            
                            <div className="mt-3 flex space-x-2">
                                <button className="flex-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                                    Test
                                </button>
                                <button className="flex-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                                    Config
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Metrics */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">1,250</div>
                            <div className="text-sm text-gray-600">Requests/min</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">99.8%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">0.9s</div>
                            <div className="text-sm text-gray-600">Avg Response</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">$0.012</div>
                            <div className="text-sm text-gray-600">Avg Cost/1K</div>
                        </div>
                    </div>
                </div>

                {/* Model Routing Rules */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Routing Rules</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <div className="font-medium">High Priority Requests</div>
                                <div className="text-sm text-gray-600">Route to GPT-4 for complex queries</div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <div className="font-medium">Cost Optimization</div>
                                <div className="text-sm text-gray-600">Use GPT-3.5 for simple queries</div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <div className="font-medium">Failover to Gemini</div>
                                <div className="text-sm text-gray-600">When OpenAI models unavailable</div>
                            </div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Standby</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AIModelOrchestration component error:', error);
        reportError(error);
        return null;
    }
}
