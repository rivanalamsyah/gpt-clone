function ConversationTemplates({ onSelectTemplate, darkMode }) {
    try {
        const templates = [
            {
                name: 'Creative Writing',
                icon: 'fa-pen-fancy',
                prompt: 'Help me write a creative story about...',
                description: 'Get help with creative writing projects'
            },
            {
                name: 'Code Review',
                icon: 'fa-code',
                prompt: 'Please review this code and suggest improvements:\n\n\n\n',
                description: 'Code analysis and optimization'
            },
            {
                name: 'Learning Assistant',
                icon: 'fa-graduation-cap',
                prompt: 'Explain this concept in simple terms:',
                description: 'Learn new topics step by step'
            },
            {
                name: 'Business Analysis',
                icon: 'fa-chart-line',
                prompt: 'Analyze this business scenario:',
                description: 'Business strategy and analysis'
            }
        ];

        return (
            <div data-name="conversation-templates" data-file="components/ConversationTemplates.js" className="mb-6">
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Conversation Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template, index) => (
                        <div 
                            key={index}
                            onClick={() => onSelectTemplate(template.prompt)}
                            className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                                darkMode 
                                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                                    : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                            }`}
                        >
                            <div className="flex items-center mb-2">
                                <i className={`fas ${template.icon} text-blue-500 mr-3`}></i>
                                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {template.name}
                                </h4>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {template.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ConversationTemplates component error:', error);
        reportError(error);
        return null;
    }
}
