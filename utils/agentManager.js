const AgentUtils = {
    // Get all agents
    getAllAgents: () => {
        try {
            const customAgents = JSON.parse(localStorage.getItem('ai_agents') || '[]');
            const defaultAgents = AgentUtils.getDefaultAgents();
            return [...defaultAgents, ...customAgents];
        } catch (error) {
            console.error('Error getting agents:', error);
            return AgentUtils.getDefaultAgents();
        }
    },

    // Get default agents
    getDefaultAgents: () => {
        return [
            {
                id: 'default-assistant',
                name: 'Vansky Assistant',
                type: 'assistant',
                personality: 'helpful',
                capabilities: ['web_search', 'file_analysis'],
                systemPrompt: 'You are Vansky AI, a helpful and intelligent assistant.',
                isDefault: true,
                created: new Date().toISOString(),
                usage: 0
            },
            {
                id: 'code-assistant',
                name: 'Code Helper',
                type: 'coder',
                personality: 'technical',
                capabilities: ['code_execution', 'file_analysis'],
                systemPrompt: 'You are a skilled programming assistant specialized in code review and debugging.',
                isDefault: true,
                created: new Date().toISOString(),
                usage: 0
            }
        ];
    },

    // Save custom agent
    saveAgent: (agent) => {
        try {
            const customAgents = JSON.parse(localStorage.getItem('ai_agents') || '[]');
            const newAgent = {
                ...agent,
                id: agent.id || Date.now().toString(),
                created: new Date().toISOString(),
                usage: 0,
                isCustom: true
            };
            
            customAgents.push(newAgent);
            localStorage.setItem('ai_agents', JSON.stringify(customAgents));
            return newAgent;
        } catch (error) {
            console.error('Error saving agent:', error);
            throw error;
        }
    },

    // Update agent usage
    updateUsage: (agentId) => {
        try {
            const customAgents = JSON.parse(localStorage.getItem('ai_agents') || '[]');
            const updatedAgents = customAgents.map(agent => 
                agent.id === agentId 
                    ? { ...agent, usage: (agent.usage || 0) + 1 }
                    : agent
            );
            localStorage.setItem('ai_agents', JSON.stringify(updatedAgents));
        } catch (error) {
            console.error('Error updating agent usage:', error);
        }
    },

    // Delete custom agent
    deleteAgent: (agentId) => {
        try {
            const customAgents = JSON.parse(localStorage.getItem('ai_agents') || '[]');
            const filteredAgents = customAgents.filter(agent => agent.id !== agentId);
            localStorage.setItem('ai_agents', JSON.stringify(filteredAgents));
        } catch (error) {
            console.error('Error deleting agent:', error);
            throw error;
        }
    },

    // Get agent by ID
    getAgent: (agentId) => {
        const allAgents = AgentUtils.getAllAgents();
        return allAgents.find(agent => agent.id === agentId);
    },

    // Get agents by type
    getAgentsByType: (type) => {
        const allAgents = AgentUtils.getAllAgents();
        return allAgents.filter(agent => agent.type === type);
    },

    // Execute agent task
    executeAgentTask: async (agentId, task, context = {}) => {
        try {
            const agent = AgentUtils.getAgent(agentId);
            if (!agent) {
                throw new Error('Agent not found');
            }

            // Build enhanced system prompt
            const enhancedPrompt = `${agent.systemPrompt}

Agent Capabilities: ${agent.capabilities.join(', ')}
Personality: ${agent.personality}
Context: ${JSON.stringify(context)}

Please respond according to your role and capabilities.`;

            // Execute task using AI
            const response = await getChatResponse(task, [], enhancedPrompt);
            
            // Update usage
            AgentUtils.updateUsage(agentId);
            
            return {
                success: true,
                response,
                agent: agent.name,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Agent execution error:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    },

    // Get agent recommendations
    getRecommendedAgent: (taskType) => {
        const recommendations = {
            'coding': 'code-assistant',
            'research': 'researcher',
            'writing': 'writer',
            'analysis': 'analyst',
            'learning': 'tutor',
            'general': 'default-assistant'
        };
        
        const agentId = recommendations[taskType] || 'default-assistant';
        return AgentUtils.getAgent(agentId);
    }
};
