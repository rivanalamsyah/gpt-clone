const IntegrationUtils = {
    // Get all integrations
    getAllIntegrations: () => {
        try {
            return JSON.parse(localStorage.getItem('integrations') || '[]');
        } catch (error) {
            console.error('Error getting integrations:', error);
            return [];
        }
    },

    // Connect integration
    connectIntegration: async (integration, config = {}) => {
        try {
            const connectedIntegration = {
                ...integration,
                ...config,
                connectedAt: new Date().toISOString(),
                status: 'connected',
                lastSync: null
            };

            const integrations = IntegrationUtils.getAllIntegrations();
            const updated = [...integrations, connectedIntegration];
            localStorage.setItem('integrations', JSON.stringify(updated));

            return connectedIntegration;
        } catch (error) {
            console.error('Error connecting integration:', error);
            throw error;
        }
    },

    // Disconnect integration
    disconnectIntegration: (integrationId) => {
        try {
            const integrations = IntegrationUtils.getAllIntegrations();
            const updated = integrations.filter(i => i.id !== integrationId);
            localStorage.setItem('integrations', JSON.stringify(updated));
        } catch (error) {
            console.error('Error disconnecting integration:', error);
            throw error;
        }
    },

    // Test integration connection
    testConnection: async (integrationId) => {
        try {
            const integration = IntegrationUtils.getIntegration(integrationId);
            if (!integration) {
                throw new Error('Integration not found');
            }

            // Simulate API test
            await new Promise(resolve => setTimeout(resolve, 1000));

            const integrations = IntegrationUtils.getAllIntegrations();
            const updated = integrations.map(i => 
                i.id === integrationId 
                    ? { ...i, lastSync: new Date().toISOString(), status: 'connected' }
                    : i
            );
            localStorage.setItem('integrations', JSON.stringify(updated));

            return { success: true, message: 'Connection test successful' };
        } catch (error) {
            console.error('Connection test error:', error);
            
            const integrations = IntegrationUtils.getAllIntegrations();
            const updated = integrations.map(i => 
                i.id === integrationId 
                    ? { ...i, status: 'error' }
                    : i
            );
            localStorage.setItem('integrations', JSON.stringify(updated));

            return { success: false, error: error.message };
        }
    },

    // Get integration by ID
    getIntegration: (integrationId) => {
        const integrations = IntegrationUtils.getAllIntegrations();
        return integrations.find(i => i.id === integrationId);
    },

    // Get connected integrations
    getConnectedIntegrations: () => {
        const integrations = IntegrationUtils.getAllIntegrations();
        return integrations.filter(i => i.status === 'connected');
    },

    // Execute integration action
    executeIntegrationAction: async (integrationId, action, params = {}) => {
        try {
            const integration = IntegrationUtils.getIntegration(integrationId);
            if (!integration) {
                throw new Error('Integration not found');
            }

            if (integration.status !== 'connected') {
                throw new Error('Integration not connected');
            }

            // Simulate integration action
            console.log(`Executing ${action} on ${integration.name}`, params);
            
            switch (integration.id) {
                case 'google-drive':
                    return await IntegrationUtils.executeGoogleDriveAction(action, params);
                    
                case 'slack':
                    return await IntegrationUtils.executeSlackAction(action, params);
                    
                case 'github':
                    return await IntegrationUtils.executeGitHubAction(action, params);
                    
                default:
                    return { success: true, message: 'Action executed successfully' };
            }
        } catch (error) {
            console.error('Integration action error:', error);
            return { success: false, error: error.message };
        }
    },

    // Integration-specific actions
    executeGoogleDriveAction: async (action, params) => {
        switch (action) {
            case 'listFiles':
                await new Promise(resolve => setTimeout(resolve, 800));
                return {
                    success: true,
                    data: {
                        files: [
                            { name: 'Document1.pdf', size: '2.5MB', modified: '2 hours ago' },
                            { name: 'Spreadsheet.xlsx', size: '1.2MB', modified: '1 day ago' }
                        ]
                    }
                };
                
            case 'uploadFile':
                await new Promise(resolve => setTimeout(resolve, 1200));
                return { success: true, message: 'File uploaded to Google Drive' };
                
            default:
                throw new Error(`Unknown Google Drive action: ${action}`);
        }
    },

    executeSlackAction: async (action, params) => {
        switch (action) {
            case 'sendMessage':
                await new Promise(resolve => setTimeout(resolve, 600));
                return { success: true, message: 'Message sent to Slack' };
                
            case 'getChannels':
                await new Promise(resolve => setTimeout(resolve, 500));
                return {
                    success: true,
                    data: {
                        channels: ['#general', '#development', '#marketing']
                    }
                };
                
            default:
                throw new Error(`Unknown Slack action: ${action}`);
        }
    },

    executeGitHubAction: async (action, params) => {
        switch (action) {
            case 'listRepos':
                await new Promise(resolve => setTimeout(resolve, 700));
                return {
                    success: true,
                    data: {
                        repositories: [
                            { name: 'project-1', stars: 125, language: 'JavaScript' },
                            { name: 'project-2', stars: 67, language: 'Python' }
                        ]
                    }
                };
                
            case 'createIssue':
                await new Promise(resolve => setTimeout(resolve, 900));
                return { success: true, message: 'Issue created on GitHub' };
                
            default:
                throw new Error(`Unknown GitHub action: ${action}`);
        }
    },

    // Sync all integrations
    syncAllIntegrations: async () => {
        try {
            const connectedIntegrations = IntegrationUtils.getConnectedIntegrations();
            const results = [];

            for (const integration of connectedIntegrations) {
                try {
                    const result = await IntegrationUtils.testConnection(integration.id);
                    results.push({ integration: integration.name, ...result });
                } catch (error) {
                    results.push({ 
                        integration: integration.name, 
                        success: false, 
                        error: error.message 
                    });
                }
            }

            return { success: true, results };
        } catch (error) {
            console.error('Sync error:', error);
            return { success: false, error: error.message };
        }
    }
};
