function AIModelBenchmark({ darkMode }) {
    try {
        const [benchmarkResults, setBenchmarkResults] = React.useState({});
        const [isRunning, setIsRunning] = React.useState(false);
        const [selectedTests, setSelectedTests] = React.useState(['speed', 'quality', 'accuracy']);

        const benchmarkTests = [
            { id: 'speed', name: 'Response Speed', description: 'Time to generate response' },
            { id: 'quality', name: 'Response Quality', description: 'Coherence and relevance' },
            { id: 'accuracy', name: 'Factual Accuracy', description: 'Correctness of information' },
            { id: 'creativity', name: 'Creativity', description: 'Original and creative responses' },
            { id: 'reasoning', name: 'Logical Reasoning', description: 'Problem-solving ability' }
        ];

        const models = [
            { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
            { id: 'gpt-3.5', name: 'GPT-3.5', provider: 'OpenAI' },
            { id: 'claude', name: 'Claude', provider: 'Anthropic' },
            { id: 'gemini', name: 'Gemini', provider: 'Google' }
        ];

        const runBenchmark = async () => {
            setIsRunning(true);
            const results = {};

            for (const model of models) {
                results[model.id] = {};
                
                for (const testId of selectedTests) {
                    // Simulate benchmark testing
                    const score = Math.floor(Math.random() * 40) + 60; // 60-100 score
                    const time = Math.floor(Math.random() * 2000) + 500; // 500-2500ms
                    
                    results[model.id][testId] = {
                        score,
                        time,
                        details: `Benchmark completed in ${time}ms with ${score}/100 score`
                    };
                    
                    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing
                }
            }

            setBenchmarkResults(results);
            setIsRunning(false);
        };

        const toggleTest = (testId) => {
            setSelectedTests(prev => 
                prev.includes(testId) 
                    ? prev.filter(id => id !== testId)
                    : [...prev, testId]
            );
        };

        const getScoreColor = (score) => {
            if (score >= 90) return 'text-green-600';
            if (score >= 75) return 'text-blue-600';
            if (score >= 60) return 'text-yellow-600';
            return 'text-red-600';
        };

        return (
            <div data-name="ai-model-benchmark" data-file="components/AIModelBenchmark.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">AI Model Benchmark</h2>
                    <button
                        onClick={runBenchmark}
                        disabled={selectedTests.length === 0 || isRunning}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedTests.length > 0 && !isRunning
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isRunning ? 'Running Tests...' : 'Run Benchmark'}
                    </button>
                </div>

                {/* Test Selection */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Select Benchmark Tests</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benchmarkTests.map((test) => (
                            <label
                                key={test.id}
                                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                    selectedTests.includes(test.id)
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTests.includes(test.id)}
                                    onChange={() => toggleTest(test.id)}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <div className="font-medium">{test.name}</div>
                                    <div className="text-sm text-gray-600">{test.description}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Benchmark Results */}
                {Object.keys(benchmarkResults).length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Benchmark Results</h3>
                        
                        {models.map((model) => (
                            <div
                                key={model.id}
                                className={`p-6 rounded-lg border ${
                                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-semibold">{model.name}</h4>
                                    <span className="text-sm text-gray-500">{model.provider}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {selectedTests.map((testId) => {
                                        const result = benchmarkResults[model.id]?.[testId];
                                        if (!result) return null;
                                        
                                        const test = benchmarkTests.find(t => t.id === testId);
                                        return (
                                            <div key={testId} className="text-center">
                                                <div className="text-sm text-gray-600 mb-1">{test.name}</div>
                                                <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                                                    {result.score}/100
                                                </div>
                                                <div className="text-xs text-gray-500">{result.time}ms</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('AIModelBenchmark component error:', error);
        reportError(error);
        return null;
    }
}
