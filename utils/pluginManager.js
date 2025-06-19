const PluginUtils = {
    // Get installed plugins
    getInstalledPlugins: () => {
        try {
            return JSON.parse(localStorage.getItem('installed_plugins') || '[]');
        } catch (error) {
            console.error('Error getting installed plugins:', error);
            return [];
        }
    },

    // Install plugin
    installPlugin: (plugin) => {
        try {
            const installedPlugins = PluginUtils.getInstalledPlugins();
            
            // Check if already installed
            if (installedPlugins.some(p => p.id === plugin.id)) {
                throw new Error('Plugin already installed');
            }

            const installedPlugin = {
                ...plugin,
                installedAt: new Date().toISOString(),
                enabled: true,
                version: plugin.version
            };

            const updatedPlugins = [...installedPlugins, installedPlugin];
            localStorage.setItem('installed_plugins', JSON.stringify(updatedPlugins));
            
            return installedPlugin;
        } catch (error) {
            console.error('Error installing plugin:', error);
            throw error;
        }
    },

    // Uninstall plugin
    uninstallPlugin: (pluginId) => {
        try {
            const installedPlugins = PluginUtils.getInstalledPlugins();
            const updatedPlugins = installedPlugins.filter(p => p.id !== pluginId);
            localStorage.setItem('installed_plugins', JSON.stringify(updatedPlugins));
        } catch (error) {
            console.error('Error uninstalling plugin:', error);
            throw error;
        }
    },

    // Enable/disable plugin
    togglePlugin: (pluginId, enabled) => {
        try {
            const installedPlugins = PluginUtils.getInstalledPlugins();
            const updatedPlugins = installedPlugins.map(p => 
                p.id === pluginId ? { ...p, enabled } : p
            );
            localStorage.setItem('installed_plugins', JSON.stringify(updatedPlugins));
        } catch (error) {
            console.error('Error toggling plugin:', error);
            throw error;
        }
    },

    // Execute plugin function
    executePlugin: async (pluginId, functionName, params = {}) => {
        try {
            const plugin = PluginUtils.getPlugin(pluginId);
            if (!plugin) {
                throw new Error('Plugin not found');
            }

            if (!plugin.enabled) {
                throw new Error('Plugin is disabled');
            }

            // Simulate plugin execution
            console.log(`Executing plugin ${plugin.name} function ${functionName}`, params);
            
            switch (pluginId) {
                case 'weather-plugin':
                    return await PluginUtils.executeWeatherPlugin(functionName, params);
                    
                case 'calendar-plugin':
                    return await PluginUtils.executeCalendarPlugin(functionName, params);
                    
                case 'translator-plugin':
                    return await PluginUtils.executeTranslatorPlugin(functionName, params);
                    
                default:
                    return { success: true, message: 'Plugin executed successfully' };
            }
        } catch (error) {
            console.error('Plugin execution error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get plugin by ID
    getPlugin: (pluginId) => {
        const installedPlugins = PluginUtils.getInstalledPlugins();
        return installedPlugins.find(p => p.id === pluginId);
    },

    // Get enabled plugins
    getEnabledPlugins: () => {
        const installedPlugins = PluginUtils.getInstalledPlugins();
        return installedPlugins.filter(p => p.enabled);
    },

    // Plugin execution implementations
    executeWeatherPlugin: async (functionName, params) => {
        switch (functionName) {
            case 'getCurrentWeather':
                await new Promise(resolve => setTimeout(resolve, 1000));
                return {
                    success: true,
                    data: {
                        temperature: '22°C',
                        condition: 'Sunny',
                        location: params.location || 'Current Location'
                    }
                };
                
            default:
                throw new Error(`Unknown weather function: ${functionName}`);
        }
    },

    executeCalendarPlugin: async (functionName, params) => {
        switch (functionName) {
            case 'getUpcomingEvents':
                await new Promise(resolve => setTimeout(resolve, 800));
                return {
                    success: true,
                    data: {
                        events: [
                            { title: 'Team Meeting', time: '10:00 AM', date: 'Today' },
                            { title: 'Project Review', time: '2:00 PM', date: 'Tomorrow' }
                        ]
                    }
                };
                
            default:
                throw new Error(`Unknown calendar function: ${functionName}`);
        }
    },

    executeTranslatorPlugin: async (functionName, params) => {
        switch (functionName) {
            case 'translateText':
                await new Promise(resolve => setTimeout(resolve, 600));
                return {
                    success: true,
                    data: {
                        originalText: params.text,
                        translatedText: `[Translated: ${params.text}]`,
                        fromLanguage: params.from || 'auto',
                        toLanguage: params.to || 'en'
                    }
                };
                
            default:
                throw new Error(`Unknown translator function: ${functionName}`);
        }
    },

    // Check plugin permissions
    checkPermissions: (plugin, requiredPermissions) => {
        if (!plugin.permissions) return false;
        return requiredPermissions.every(permission => 
            plugin.permissions.includes(permission)
        );
    },

    // Update plugin
    updatePlugin: (pluginId, newVersion) => {
        try {
            const installedPlugins = PluginUtils.getInstalledPlugins();
            const updatedPlugins = installedPlugins.map(p => 
                p.id === pluginId ? { ...p, version: newVersion, updatedAt: new Date().toISOString() } : p
            );
            localStorage.setItem('installed_plugins', JSON.stringify(updatedPlugins));
        } catch (error) {
            console.error('Error updating plugin:', error);
            throw error;
        }
    }
};
