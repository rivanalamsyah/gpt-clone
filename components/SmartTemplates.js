function SmartTemplates({ onSelectTemplate, darkMode }) {
    try {
        const [templates, setTemplates] = React.useState([]);
        const [customTemplate, setCustomTemplate] = React.useState({ name: '', prompt: '', category: 'general' });
        const [isCreating, setIsCreating] = React.useState(false);
        const [activeCategory, setActiveCategory] = React.useState('all');

        const defaultTemplates = [
            { 
                id: '1', 
                name: 'Code Review', 
                prompt: 'Please review this code and provide feedback on:\n1. Code quality and structure\n2. Potential bugs or issues\n3. Performance improvements\n4. Best practices\n\n\n[Paste your code here]\n',
                category: 'development',
                usage: 45
            },
            { 
                id: '2', 
                name: 'Email Draft', 
                prompt: 'Help me write a professional email for:\n- Recipient: [Name/Role]\n- Purpose: [Meeting request/Follow-up/etc.]\n- Key points: [List main points]\n- Tone: [Formal/Friendly/etc.]',
                category: 'business',
                usage: 32
            },
            { 
                id: '3', 
                name: 'Learning Assistant', 
                prompt: 'I want to learn about [Topic]. Please:\n1. Explain the basics in simple terms\n2. Provide key concepts I should understand\n3. Suggest practical examples\n4. Recommend next steps for deeper learning',
                category: 'education',
                usage: 28
            },
            { 
                id: '4', 
                name: 'Creative Writing', 
                prompt: 'Help me with creative writing:\n- Genre: [Fantasy/Sci-fi/Mystery/etc.]\n- Setting: [Describe the world/time period]\n- Characters: [Main character details]\n- Plot idea: [Basic story concept]\n\nPlease help develop this into a compelling narrative.',
                category: 'creative',
                usage: 21
            }
        ];

        const categories = [
            { id: 'all', name: 'All Templates', icon: 'fa-th-large' },
            { id: 'development', name: 'Development', icon: 'fa-code' },
            { id: 'business', name: 'Business', icon: 'fa-briefcase' },
            { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
            { id: 'creative', name: 'Creative', icon: 'fa-palette' },
            { id: 'custom', name: 'Custom', icon: 'fa-user-cog' }
        ];

        React.useEffect(() => {
            const savedTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
            setTemplates([...defaultTemplates, ...savedTemplates]);
        }, []);

        const filteredTemplates = templates.filter(template => 
            activeCategory === 'all' || template.category === activeCategory
        );

        const handleCreateTemplate = async () => {
            if (!customTemplate.name.trim() || !customTemplate.prompt.trim()) return;

            setIsCreating(true);
            
            try {
                // Generate enhanced template using AI
                const enhancedPrompt = await getChatResponse(
                    `Improve this template prompt to be more comprehensive and useful: "${customTemplate.prompt}"`,
                    []
                );

                const newTemplate = {
                    id: Date.now().toString(),
                    name: customTemplate.name,
                    prompt: enhancedPrompt,
                    category: customTemplate.category,
                    usage: 0,
                    custom: true
                };

                const updatedTemplates = [...templates, newTemplate];
                setTemplates(updatedTemplates);

                const customTemplates = updatedTemplates.filter(t => t.custom);
                localStorage.setItem('custom_templates', JSON.stringify(customTemplates));

                setCustomTemplate({ name: '', prompt: '', category: 'general' });
            } catch (error) {
                console.error('Error creating template:', error);
            } finally {
                setIsCreating(false);
            }
        };

        const handleUseTemplate = (template) => {
            onSelectTemplate(template.prompt);
            
            // Update usage count
            const updatedTemplates = templates.map(t => 
                t.id === template.id ? { ...t, usage: t.usage + 1 } : t
            );
            setTemplates(updatedTemplates);
        };

        return (
            <div data-name="smart-templates" data-file="components/SmartTemplates.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Smart Templates</h2>
                    <div className="flex space-x-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                    activeCategory === category.id
                                        ? 'bg-blue-500 text-white'
                                        : darkMode 
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <i className={`fas ${category.icon} mr-1`}></i>
                                <span className="hidden sm:inline">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Create Custom Template */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Create Custom Template</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={customTemplate.name}
                                onChange={(e) => setCustomTemplate(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Template name..."
                                className={`p-2 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />
                            <select
                                value={customTemplate.category}
                                onChange={(e) => setCustomTemplate(prev => ({ ...prev, category: e.target.value }))}
                                className={`p-2 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            >
                                <option value="general">General</option>
                                <option value="development">Development</option>
                                <option value="business">Business</option>
                                <option value="education">Education</option>
                                <option value="creative">Creative</option>
                            </select>
                        </div>
                        <textarea
                            value={customTemplate.prompt}
                            onChange={(e) => setCustomTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                            placeholder="Template prompt..."
                            className={`w-full p-3 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                            rows="4"
                        />
                        <button
                            onClick={handleCreateTemplate}
                            disabled={!customTemplate.name.trim() || !customTemplate.prompt.trim() || isCreating}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                customTemplate.name.trim() && customTemplate.prompt.trim() && !isCreating
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isCreating ? 'Creating...' : 'Create Template'}
                        </button>
                    </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
                                darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleUseTemplate(template)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{template.name}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">Used {template.usage} times</span>
                                    {template.custom && (
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Custom</span>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {template.prompt}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {template.category}
                                </span>
                                <button className="text-blue-500 hover:text-blue-600 text-sm">
                                    Use Template →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SmartTemplates component error:', error);
        reportError(error);
        return null;
    }
}
