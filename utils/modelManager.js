const ModelManager = {
    // Available AI models
    models: [
        { 
            id: 'gpt-4', 
            name: 'GPT-4', 
            provider: 'OpenAI', 
            description: 'Most capable model for complex tasks',
            speed: 'Medium', 
            cost: 'High', 
            quality: 'Excellent',
            features: ['reasoning', 'creativity', 'analysis']
        },
        { 
            id: 'gpt-3.5', 
            name: 'GPT-3.5', 
            provider: 'OpenAI', 
            description: 'Fast and efficient for general tasks',
            speed: 'Fast', 
            cost: 'Low', 
            quality: 'Good',
            features: ['speed', 'efficiency']
        },
        { 
            id: 'claude', 
            name: 'Claude', 
            provider: 'Anthropic', 
            description: 'Helpful, harmless, and honest AI',
            speed: 'Medium', 
            cost: 'Medium', 
            quality: 'Excellent',
            features: ['safety', 'reasoning', 'analysis']
        },
        { 
            id: 'gemini', 
            name: 'Gemini', 
            provider: 'Google', 
            description: 'Multimodal AI with strong performance',
            speed: 'Fast', 
            cost: 'Medium', 
            quality: 'Very Good',
            features: ['multimodal', 'speed', 'integration']
        }
    ],

    // Get model by ID
    getModel: (modelId) => {
        return ModelManager.models.find(model => model.id === modelId);
    },

    // Get models by provider
    getModelsByProvider: (provider) => {
        return ModelManager.models.filter(model => model.provider === provider);
    },

    // Compare models
    compareModels: async (modelIds, testPrompt) => {
        const results = {};
        
        for (const modelId of modelIds) {
            try {
                const startTime = Date.now();
                const response = await getChatResponse(testPrompt, []);
                const endTime = Date.now();
                
                results[modelId] = {
                    response: response.substring(0, 200) + '...',
                    responseTime: endTime - startTime,
                    wordCount: response.split(' ').length,
                    quality: ModelManager.calculateQualityScore(response),
                    model: ModelManager.getModel(modelId)
                };
            } catch (error) {
                results[modelId] = {
                    response: 'Error generating response',
                    responseTime: 0,
                    wordCount: 0,
                    quality: 0,
                    error: error.message,
                    model: ModelManager.getModel(modelId)
                };
            }
        }
        
        return results;
    },

    // Calculate quality score (simplified)
    calculateQualityScore: (response) => {
        try {
            let score = 60; // Base score
            
            // Length factor
            const wordCount = response.split(' ').length;
            if (wordCount > 50) score += 10;
            if (wordCount > 100) score += 10;
            
            // Coherence factor (simplified)
            const sentences = response.split('.').length;
            if (sentences > 3) score += 5;
            
            // Complexity factor
            const avgWordLength = response.split(' ').reduce((sum, word) => sum + word.length, 0) / wordCount;
            if (avgWordLength > 5) score += 10;
            
            // Random factor for demonstration
            score += Math.floor(Math.random() * 15);
            
            return Math.min(100, Math.max(0, score));
        } catch (error) {
            return 60; // Default score
        }
    },

    // Get recommended model for task type
    getRecommendedModel: (taskType) => {
        const recommendations = {
            'coding': 'gpt-4',
            'creative': 'claude',
            'analysis': 'gpt-4',
            'chat': 'gpt-3.5',
            'research': 'gemini',
            'writing': 'claude'
        };
        
        return recommendations[taskType] || 'gpt-3.5';
    },

    // Benchmark models
    benchmarkModels: async (testCases) => {
        const results = {};
        
        for (const model of ModelManager.models) {
            results[model.id] = {
                model: model,
                scores: {},
                averageScore: 0,
                averageTime: 0
            };
            
            let totalScore = 0;
            let totalTime = 0;
            
            for (const testCase of testCases) {
                try {
                    const startTime = Date.now();
                    const response = await getChatResponse(testCase.prompt, []);
                    const endTime = Date.now();
                    
                    const score = ModelManager.calculateQualityScore(response);
                    const time = endTime - startTime;
                    
                    results[model.id].scores[testCase.name] = {
                        score,
                        time,
                        response: response.substring(0, 100) + '...'
                    };
                    
                    totalScore += score;
                    totalTime += time;
                } catch (error) {
                    results[model.id].scores[testCase.name] = {
                        score: 0,
                        time: 0,
                        error: error.message
                    };
                }
                
                // Add delay between tests
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            results[model.id].averageScore = totalScore / testCases.length;
            results[model.id].averageTime = totalTime / testCases.length;
        }
        
        return results;
    },

    // Save model preferences
    saveModelPreferences: (preferences) => {
        try {
            localStorage.setItem('model_preferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving model preferences:', error);
        }
    },

    // Load model preferences
    loadModelPreferences: () => {
        try {
            const stored = localStorage.getItem('model_preferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading model preferences:', error);
            return {};
        }
    }
};
