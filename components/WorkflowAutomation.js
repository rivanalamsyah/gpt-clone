function WorkflowAutomation({ darkMode }) {
    try {
        const [workflows, setWorkflows] = React.useState([]);
        const [isCreating, setIsCreating] = React.useState(false);
        const [workflowConfig, setWorkflowConfig] = React.useState({
            name: '',
            trigger: 'manual',
            actions: []
        });

        const triggerTypes = [
            { id: 'manual', name: 'Manual Trigger', icon: 'fa-hand-pointer' },
            { id: 'schedule', name: 'Scheduled', icon: 'fa-clock' },
            { id: 'keyword', name: 'Keyword Detected', icon: 'fa-key' },
            { id: 'message_count', name: 'Message Count', icon: 'fa-counter' }
        ];

        const actionTypes = [
            { id: 'send_message', name: 'Send Message', icon: 'fa-paper-plane' },
            { id: 'export_chat', name: 'Export Chat', icon: 'fa-download' },
            { id: 'create_summary', name: 'Create Summary', icon: 'fa-file-alt' },
            { id: 'run_analysis', name: 'Run Analysis', icon: 'fa-chart-line' }
        ];

        React.useEffect(() => {
            const saved = JSON.parse(localStorage.getItem('workflows') || '[]');
            setWorkflows(saved);
        }, []);

        const createWorkflow = () => {
            if (!workflowConfig.name.trim()) return;

            const newWorkflow = {
                id: Date.now().toString(),
                ...workflowConfig,
                created: new Date().toISOString(),
                lastRun: null,
                runCount: 0,
                enabled: true
            };

            const updated = [...workflows, newWorkflow];
            setWorkflows(updated);
            localStorage.setItem('workflows', JSON.stringify(updated));
            
            setWorkflowConfig({ name: '', trigger: 'manual', actions: [] });
            setIsCreating(false);
        };

        const toggleWorkflow = (workflowId) => {
            const updated = workflows.map(w => 
                w.id === workflowId ? { ...w, enabled: !w.enabled } : w
            );
            setWorkflows(updated);
            localStorage.setItem('workflows', JSON.stringify(updated));
        };

        const runWorkflow = async (workflow) => {
            console.log('Running workflow:', workflow.name);
            const updated = workflows.map(w => 
                w.id === workflow.id 
                    ? { ...w, lastRun: new Date().toISOString(), runCount: w.runCount + 1 }
                    : w
            );
            setWorkflows(updated);
            localStorage.setItem('workflows', JSON.stringify(updated));
        };

        return (
            <div data-name="workflow-automation" data-file="components/WorkflowAutomation.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Workflow Automation</h2>
                    <button
                        onClick={() => setIsCreating(!isCreating)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Create Workflow
                    </button>
                </div>

                {/* Create Workflow Form */}
                {isCreating && (
                    <div className={`p-6 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                        <h3 className="text-lg font-semibold mb-4">Create Workflow</h3>
                        
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={workflowConfig.name}
                                onChange={(e) => setWorkflowConfig(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Workflow name..."
                                className={`w-full p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />
                            
                            <select
                                value={workflowConfig.trigger}
                                onChange={(e) => setWorkflowConfig(prev => ({ ...prev, trigger: e.target.value }))}
                                className={`w-full p-3 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            >
                                {triggerTypes.map(trigger => (
                                    <option key={trigger.id} value={trigger.id}>{trigger.name}</option>
                                ))}
                            </select>

                            <div className="flex space-x-2">
                                <button
                                    onClick={createWorkflow}
                                    disabled={!workflowConfig.name.trim()}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                                >
                                    Create Workflow
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Workflows List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workflows.map(workflow => (
                        <div
                            key={workflow.id}
                            className={`p-4 border rounded-lg ${
                                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{workflow.name}</h3>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleWorkflow(workflow.id)}
                                        className={`px-2 py-1 text-xs rounded ${
                                            workflow.enabled 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {workflow.enabled ? 'Enabled' : 'Disabled'}
                                    </button>
                                    <button
                                        onClick={() => runWorkflow(workflow)}
                                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                                    >
                                        Run
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Trigger: {triggerTypes.find(t => t.id === workflow.trigger)?.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Run count: {workflow.runCount}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WorkflowAutomation component error:', error);
        reportError(error);
        return null;
    }
}
