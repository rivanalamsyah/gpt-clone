function ModelSelector({ selectedModel, onModelChange, darkMode }) {
    try {
        const models = [
            { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
            { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient' },
            { id: 'claude', name: 'Claude', description: 'Anthropic AI' },
            { id: 'gemini', name: 'Gemini', description: 'Google AI' }
        ];

        return (
            <div data-name="model-selector" data-file="components/ModelSelector.js" className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    AI Model
                </label>
                <select 
                    value={selectedModel} 
                    onChange={(e) => onModelChange(e.target.value)}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-800'
                    }`}
                >
                    {models.map(model => (
                        <option key={model.id} value={model.id}>
                            {model.name} - {model.description}
                        </option>
                    ))}
                </select>
            </div>
        );
    } catch (error) {
        console.error('ModelSelector component error:', error);
        reportError(error);
        return null;
    }
}
