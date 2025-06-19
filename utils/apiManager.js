const APIUtils = {
    // Get all API keys
    getAllAPIKeys: () => {
        try {
            return JSON.parse(localStorage.getItem('api_keys') || '[]');
        } catch (error) {
            console.error('Error getting API keys:', error);
            return [];
        }
    },

    // Add new API key
    addAPIKey: (apiConfig) => {
        try {
            const apiKeys = APIUtils.getAllAPIKeys();
            
            const newAPIKey = {
                id: Date.now().toString(),
                ...apiConfig,
                createdAt: new Date().toISOString(),
                lastUsed: null,
                status: 'active'
            };

            const updated = [...apiKeys, newAPIKey];
            localStorage.setItem('api_keys', JSON.stringify(updated));
            
            return newAPIKey;
        } catch (error) {
            console.error('Error adding API key:', error);
            throw error;
        }
    },

    // Delete API key
    deleteAPIKey: (apiId) => {
        try {
            const apiKeys = APIUtils.getAllAPIKeys();
            const updated = apiKeys.filter(api => api.id !== apiId);
            localStorage.setItem('api_keys', JSON.stringify(updated));
        } catch (error) {
            console.error('Error deleting API key:', error);
            throw error;
        }
    },

    // Test API key
    testAPIKey: async (apiId) => {
        try {
            const api = APIUtils.getAPIKey(apiId);
            if (!api) {
                throw new Error('API key not found');
            }

            // Simulate API test
            await new Promise(resolve => setTimeout(resolve, 1000));

            const apiKeys = APIUtils.getAllAPIKeys();
            const updated = apiKeys.map(a => 
                a.id === apiId 
                    ? { ...a, lastUsed: new Date().toISOString(), status: 'active' }
                    : a
            );
            localStorage.setItem('api_keys', JSON.stringify(updated));

            return { success: true, message: 'API key test successful' };
        } catch (error) {
            const apiKeys = APIUtils.getAllAPIKeys();
            const updated = apiKeys.map(a => 
                a.id === apiId 
                    ? { ...a, status: 'error' }
                    : a
            );
            localStorage.setItem('api_keys', JSON.stringify(updated));

            return { success: false, error: error.message };
        }
    },

    // Get API key by ID
    getAPIKey: (apiId) => {
        const apiKeys = APIUtils.getAllAPIKeys();
        return apiKeys.find(api => api.id === apiId);
    },

    // Get active API keys
    getActiveAPIKeys: () => {
        const apiKeys = APIUtils.getAllAPIKeys();
        return apiKeys.filter(api => api.status === 'active');
    },

    // Update API key
    updateAPIKey: (apiId, updates) => {
        try {
            const apiKeys = APIUtils.getAllAPIKeys();
            const updated = apiKeys.map(api => 
                api.id === apiId 
                    ? { ...api, ...updates, updatedAt: new Date().toISOString() }
                    : api
            );
            localStorage.setItem('api_keys', JSON.stringify(updated));
            
            return updated.find(api => api.id === apiId);
        } catch (error) {
            console.error('Error updating API key:', error);
            throw error;
        }
    },

    // Validate API key format
    validateAPIKey: (provider, key) => {
        const patterns = {
            openai: /^sk-[a-zA-Z0-9]{48}$/,
            anthropic: /^sk-ant-[a-zA-Z0-9-]{95}$/,
            google: /^[a-zA-Z0-9_-]{39}$/
        };

        if (patterns[provider]) {
            return patterns[provider].test(key);
        }

        return key.length > 10; // Basic validation for custom APIs
    },

    // Mask API key for display
    maskAPIKey: (key) => {
        if (key.length <= 8) return key;
        return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
    },

    // Get API usage statistics
    getUsageStats: () => {
        try {
            const apiKeys = APIUtils.getAllAPIKeys();
            
            return {
                total: apiKeys.length,
                active: apiKeys.filter(api => api.status === 'active').length,
                error: apiKeys.filter(api => api.status === 'error').length,
                byProvider: apiKeys.reduce((acc, api) => {
                    acc[api.provider] = (acc[api.provider] || 0) + 1;
                    return acc;
                }, {})
            };
        } catch (error) {
            console.error('Error getting usage stats:', error);
            return { total: 0, active: 0, error: 0, byProvider: {} };
        }
    }
};
