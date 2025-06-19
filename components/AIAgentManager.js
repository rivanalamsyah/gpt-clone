function AIAgentManager({ darkMode }) {
    try {
        const [agents, setAgents] = React.useState([]);
        const [selectedAgent, setSelectedAgent] = React.useState(null);
        const [isCreating, setIsCreating] = React.useState(false);
        const [agentConfig, setAgentConfig] = React.useState({
            name: '',
            type: 'assistant',
            personality: 'helpful',
            capabilities: [],
            systemPrompt: ''
        });

        const agentTypes = [
            { id: 'assistant', name: 'General Assistant', icon: 'fa-user-tie', description: 'Helpful general-purpose AI' },
            { id: 'researcher', name: 'Research Agent', icon: 'fa-search', description: 'Specialized in research and analysis' },
            { id: 'writer', name: 'Content Writer', icon: 'fa-pen', description: 'Creative and technical writing' },
            { id: 'coder', name: 'Code Assistant', icon: 'fa-code', description: 'Programming and development help' },
            { id: 'analyst', name: 'Data Analyst', icon: 'fa-chart-bar', description: 'Data analysis and insights' },
            { id: 'tutor', name: 'Learning Tutor', icon: 'fa-graduation-cap', description: 'Educational guidance' }
        ];

        const capabilities = [
            'web_search', 'file_analysis', 'code_execution', 'image_generation', 
            'data_visualization', 'email_integration', 'calendar_management', 'task_automation'
        ];

        React.useEffect(() => {
            loadAgents();
        }, []);

        const loadAgents = () => {
            const savedAgents = JSON.parse(localStorage.getItem('ai_agents') || '[]');
            const defaultAgents = getDefaultAgents();
            setAgents([...defaultAgents, ...savedAgents]);
        };

        const getDefaultAgents = () => [
            {
                id: 'default-assistant',
                name: 'Vansky Assistant',
                type: 'assistant',
                personality: 'helpful',
                capabilities: ['web_search', 'file_analysis'],
                systemPrompt: 'You are a helpful AI assistant.',
                isDefault: true,
                created: new Date().toISOString()
            }
        ];

        const createAgent = async () => {
            if (!agentConfig.name.trim()) return;
            
            setIsCreating(true);
            try {
                const enhancedPrompt = await getChatResponse(
                    `Create a detailed system prompt for an AI agent with these specifications: ${JSON.stringify(agentConfig)}`,
                    []
                );

                const newAgent = {
                    id: Date.now().toString(),
                    ...agentConfig,
                    systemPrompt: enhancedPrompt,
                    created: new Date().toISOString(),
                    usage: 0
                };

                const customAgents = agents.filter(a => !a.isDefault);
                const updatedAgents = [...customAgents, newAgent];
                localStorage.setItem('ai_agents', JSON.stringify(updatedAgents));
                
                setAgents([...getDefaultAgents(), ...updatedAgents]);
                setAgentConfig({ name: '', type: 'assistant', personality: 'helpful', capabilities: [], systemPrompt: '' });
            } catch (error) {
                console.error('Error creating agent:', error);
            } finally {
                setIsCreating(false);
            }
        };

        const deleteAgent = (agentId) => {
            if (confirm('Are you sure you want to delete this agent?')) {
                const updatedAgents = agents.filter(a => a.id !== agentId && !a.isDefault);
                localStorage.setItem('ai_agents', JSON.stringify(updatedAgents));
                loadAgents();
            }
        };

        return (
            <div data-name="ai-agent-manager" data-file="components/AIAgentManager.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">AI Agent Manager</h2>
                    <button
                        onClick={() => setIsCreating(!isCreating)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Create Agent
                    </button>
                </div>

                {/* Create Agent Form */}
                {isCreating && (
                    <div className={`p-6 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <h3 className="text-lg font-semibold mb-4">Create New Agent</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                value={agentConfig.name}
                                onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Agent name..."
                                className={`p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />
                            
                            <select
                                value={agentConfig.type}
                                onChange={(e) => setAgentConfig(prev => ({ ...prev, type: e.target.value }))}
                                className={`p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            >
                                {agentTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Capabilities</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {capabilities.map(capability => (
                                    <label key={capability} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={agentConfig.capabilities.includes(capability)}
                                            onChange={(e) => {
                                                const caps = e.target.checked
                                                    ? [...agentConfig.capabilities, capability]
                                                    : agentConfig.capabilities.filter(c => c !== capability);
                                                setAgentConfig(prev => ({ ...prev, capabilities: caps }));
                                            }}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{capability.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={createAgent}
                                disabled={!agentConfig.name.trim()}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                Create Agent
                            </button>
                            <button
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Agent List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map(agent => (
                        <div
                            key={agent.id}
                            className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
                                selectedAgent?.id === agent.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : darkMode 
                                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedAgent(agent)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <i className={`fas ${agentTypes.find(t => t.id === agent.type)?.icon || 'fa-robot'} text-blue-500`}></i>
                                    <h3 className="font-semibold">{agent.name}</h3>
                                </div>
                                {!agent.isDefault && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteAgent(agent.id);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <i className="fas fa-trash text-sm"></i>
                                    </button>
                                )}
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {agentTypes.find(t => t.id === agent.type)?.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                                {agent.capabilities.slice(0, 3).map(cap => (
                                    <span key={cap} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                                        {cap.replace('_', ' ')}
                                    </span>
                                ))}
                                {agent.capabilities.length > 3 && (
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                                        +{agent.capabilities.length - 3} more
                                    </span>
                                )}
                            </div>
                            
                            <div className="text-xs text-gray-500">
                                Used {agent.usage || 0} times
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AIAgentManager component error:', error);
        reportError(error);
        return null;
    }
}
