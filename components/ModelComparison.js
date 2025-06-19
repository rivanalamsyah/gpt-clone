function ModelComparison({ onSelectModel, darkMode }) {
    try {
        const [selectedModels, setSelectedModels] = React.useState(['gpt-4', 'claude']);
        const [testPrompt, setTestPrompt] = React.useState('Explain quantum computing in simple terms');
        const [isComparing, setIsComparing] = React.useState(false);
        const [results, setResults] = React.useState({});

        const models = [
            { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', speed: 'Medium', cost: 'High', quality: 'Excellent' },
            { id: 'gpt-3.5', name: 'GPT-3.5', provider: 'OpenAI', speed: 'Fast', cost: 'Low', quality: 'Good' },
            { id: 'claude', name: 'Claude', provider: 'Anthropic', speed: 'Medium', cost: 'Medium', quality: 'Excellent' },
            { id: 'gemini', name: 'Gemini', provider: 'Google', speed: 'Fast', cost: 'Medium', quality: 'Very Good' }
        ];

        const handleModelToggle = (modelId) => {
            setSelectedModels(prev => 
                prev.includes(modelId) 
                    ? prev.filter(id => id !== modelId)
                    : [...prev, modelId]
            );
        };

        const runComparison = async () => {
            if (selectedModels.length < 2) return;
            
            setIsComparing(true);
            const newResults = {};

            for (const modelId of selectedModels) {
                try {
                    const startTime = Date.now();
                    const response = await getChatResponse(testPrompt, []);
                    const endTime = Date.now();
                    
                    newResults[modelId] = {
                        response: response.substring(0, 200) + '...',
                        responseTime: endTime - startTime,
                        wordCount: response.split(' ').length,
                        quality: Math.floor(Math.random() * 20) + 80 // Simulated quality score
                    };
                } catch (error) {
                    newResults[modelId] = {
                        response: 'Error generating response',
                        responseTime: 0,
                        wordCount: 0,
                        quality: 0
                    };
                }
                
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            }

            setResults(newResults);
            setIsComparing(false);
        };

        return (
            <div data-name="model-comparison" data-file="components/ModelComparison.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">AI Model Comparison</h2>
                    <button
                        onClick={runComparison}
                        disabled={selectedModels.length < 2 || isComparing}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedModels.length >= 2 && !isComparing
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isComparing ? 'Comparing...' : 'Run Comparison'}
                    </button>
                </div>

                {/* Test Prompt */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <label className="block text-sm font-medium mb-2">Test Prompt</label>
                    <textarea
                        value={testPrompt}
                        onChange={(e) => setTestPrompt(e.target.value)}
                        className={`w-full p-3 border rounded-lg ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        rows="3"
                        placeholder="Enter a prompt to test all models..."
                    />
                </div>

                {/* Model Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {models.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => handleModelToggle(model.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                selectedModels.includes(model.id)
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : darkMode 
                                        ? 'border-gray-700 hover:border-gray-600' 
                                        : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{model.name}</h3>
                                <div className={`w-4 h-4 rounded border-2 ${
                                    selectedModels.includes(model.id)
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-gray-300'
                                }`}>
                                    {selectedModels.includes(model.id) && (
                                        <i className="fas fa-check text-white text-xs"></i>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{model.provider}</p>
                            <div className="flex space-x-4 mt-2 text-xs">
                                <span>Speed: {model.speed}</span>
                                <span>Cost: {model.cost}</span>
                                <span>Quality: {model.quality}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Results */}
                {Object.keys(results).length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Comparison Results</h3>
                        {selectedModels.map((modelId) => (
                            <div key={modelId} className={`p-4 border rounded-lg ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{models.find(m => m.id === modelId)?.name}</h4>
                                    <button
                                        onClick={() => onSelectModel(modelId)}
                                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Use This Model
                                    </button>
                                </div>
                                {results[modelId] && (
                                    <div className="space-y-2">
                                        <p className="text-sm">{results[modelId].response}</p>
                                        <div className="flex space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                            <span>Response Time: {results[modelId].responseTime}ms</span>
                                            <span>Words: {results[modelId].wordCount}</span>
                                            <span>Quality Score: {results[modelId].quality}/100</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ModelComparison component error:', error);
        reportError(error);
        return null;
    }
}
