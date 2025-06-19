const WorkflowEngine = {
    // Execute workflow
    executeWorkflow: async (workflow, context = {}) => {
        try {
            console.log('Executing workflow:', workflow.name);
            
            // Check conditions
            if (workflow.conditions && !WorkflowEngine.checkConditions(workflow.conditions, context)) {
                return { success: false, reason: 'Conditions not met' };
            }

            const results = [];
            
            // Execute actions in sequence
            for (const action of workflow.actions) {
                const result = await WorkflowEngine.executeAction(action, context);
                results.push(result);
                
                if (!result.success) {
                    console.error('Action failed:', action.type, result.error);
                    break;
                }
            }

            return {
                success: true,
                results,
                executedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Workflow execution error:', error);
            return {
                success: false,
                error: error.message,
                executedAt: new Date().toISOString()
            };
        }
    },

    // Execute single action
    executeAction: async (action, context) => {
        try {
            switch (action.type) {
                case 'send_message':
                    return await WorkflowEngine.sendMessage(action.config, context);
                    
                case 'export_chat':
                    return await WorkflowEngine.exportChat(action.config, context);
                    
                case 'create_summary':
                    return await WorkflowEngine.createSummary(action.config, context);
                    
                case 'send_email':
                    return await WorkflowEngine.sendEmail(action.config, context);
                    
                case 'save_to_file':
                    return await WorkflowEngine.saveToFile(action.config, context);
                    
                case 'run_analysis':
                    return await WorkflowEngine.runAnalysis(action.config, context);
                    
                default:
                    throw new Error(`Unknown action type: ${action.type}`);
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                action: action.type
            };
        }
    },

    // Check workflow conditions
    checkConditions: (conditions, context) => {
        return conditions.every(condition => {
            switch (condition.type) {
                case 'message_count':
                    return context.messageCount >= condition.value;
                    
                case 'keyword':
                    return context.lastMessage?.includes(condition.value);
                    
                case 'sentiment':
                    return context.sentiment === condition.value;
                    
                case 'time':
                    const currentHour = new Date().getHours();
                    return currentHour >= condition.startHour && currentHour <= condition.endHour;
                    
                default:
                    return true;
            }
        });
    },

    // Action implementations
    sendMessage: async (config, context) => {
        console.log('Sending message:', config.message);
        return { success: true, message: 'Message sent' };
    },

    exportChat: async (config, context) => {
        console.log('Exporting chat in format:', config.format);
        return { success: true, message: 'Chat exported' };
    },

    createSummary: async (config, context) => {
        console.log('Creating summary');
        if (context.messages && context.messages.length > 0) {
            const summary = await getChatResponse(
                `Please create a concise summary of this conversation: ${JSON.stringify(context.messages.slice(-5))}`,
                []
            );
            return { success: true, summary };
        }
        return { success: false, error: 'No messages to summarize' };
    },

    sendEmail: async (config, context) => {
        console.log('Sending email to:', config.recipient);
        // Simulate email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'Email sent' };
    },

    saveToFile: async (config, context) => {
        console.log('Saving to file:', config.filename);
        return { success: true, message: 'File saved' };
    },

    runAnalysis: async (config, context) => {
        console.log('Running analysis');
        if (context.messages) {
            const analysis = InsightsEngine.analyzeConversation(context.messages);
            return { success: true, analysis };
        }
        return { success: false, error: 'No data to analyze' };
    },

    // Get workflow triggers
    getTriggers: () => {
        return [
            { id: 'manual', name: 'Manual Trigger', description: 'Run manually' },
            { id: 'schedule', name: 'Scheduled', description: 'Run on schedule' },
            { id: 'keyword', name: 'Keyword Detected', description: 'Run when keyword found' },
            { id: 'message_count', name: 'Message Count', description: 'Run after X messages' },
            { id: 'file_upload', name: 'File Upload', description: 'Run when file uploaded' },
            { id: 'sentiment', name: 'Sentiment Change', description: 'Run on sentiment change' }
        ];
    },

    // Get available actions
    getActions: () => {
        return [
            { id: 'send_message', name: 'Send Message', description: 'Send automated message' },
            { id: 'export_chat', name: 'Export Chat', description: 'Export conversation' },
            { id: 'create_summary', name: 'Create Summary', description: 'Generate summary' },
            { id: 'send_email', name: 'Send Email', description: 'Send email notification' },
            { id: 'save_to_file', name: 'Save to File', description: 'Save data to file' },
            { id: 'run_analysis', name: 'Run Analysis', description: 'Analyze conversation' }
        ];
    }
};
