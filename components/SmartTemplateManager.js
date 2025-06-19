function SmartTemplateManager({ isOpen, onClose, onSelectTemplate, darkMode }) {
    try {
        const [templates, setTemplates] = React.useState([]);
        const [activeCategory, setActiveCategory] = React.useState('all');
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isCreating, setIsCreating] = React.useState(false);
        const [newTemplate, setNewTemplate] = React.useState({ name: '', prompt: '', category: 'general' });

        const categories = [
            { id: 'all', name: 'All', icon: 'fa-th-large' },
            { id: 'work', name: 'Work', icon: 'fa-briefcase' },
            { id: 'creative', name: 'Creative', icon: 'fa-palette' },
            { id: 'learning', name: 'Learning', icon: 'fa-graduation-cap' },
            { id: 'coding', name: 'Coding', icon: 'fa-code' }
        ];

        const defaultTemplates = [
            { id: '1', name: 'Email Draft', prompt: 'Help me write a professional email about...', category: 'work', usage: 15 },
            { id: '2', name: 'Code Review', prompt: 'Please review this code and suggest improvements:', category: 'coding', usage: 12 },
            { id: '3', name: 'Creative Story', prompt: 'Write a creative story about...', category: 'creative', usage: 8 },
            { id: '4', name: 'Explain Concept', prompt: 'Explain this concept in simple terms:', category: 'learning', usage: 20 }
        ];

        React.useEffect(() => {
            const saved = JSON.parse(localStorage.getItem('smart_templates') || '[]');
            setTemplates([...defaultTemplates, ...saved]);
        }, []);

        const filteredTemplates = templates.filter(template => {
            const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
            const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                template.prompt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        const handleCreateTemplate = () => {
            if (!newTemplate.name.trim() || !newTemplate.prompt.trim()) return;

            const template = {
                id: Date.now().toString(),
                ...newTemplate,
                usage: 0,
                custom: true
            };

            const updated = [...templates, template];
            setTemplates(updated);
            
            const customTemplates = updated.filter(t => t.custom);
            localStorage.setItem('smart_templates', JSON.stringify(customTemplates));
            
            setNewTemplate({ name: '', prompt: '', category: 'general' });
            setIsCreating(false);
        };

        const handleUseTemplate = (template) => {
            onSelectTemplate(template.prompt);
            
            // Update usage count
            const updated = templates.map(t => 
                t.id === template.id ? { ...t, usage: t.usage + 1 } : t
            );
            setTemplates(updated);
            onClose();
        };

        if (!isOpen) return null;

        return (
            <div data-name="smart-template-manager" data-file="components/SmartTemplateManager.js" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`max-w-4xl w-full rounded-2xl p-6 max-h-[80vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Smart Templates</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Create
                            </button>
                            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-6 h-full">
                        {/* Categories */}
                        <div className="w-48 flex-shrink-0">
                            <div className="space-y-1">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                                            activeCategory === category.id
                                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <i className={`fas ${category.icon}`}></i>
                                        <span>{category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Templates */}
                        <div className="flex-1 overflow-hidden">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search templates..."
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>

                            <div className="overflow-y-auto h-96 space-y-3">
                                {filteredTemplates.map(template => (
                                    <div
                                        key={template.id}
                                        onClick={() => handleUseTemplate(template)}
                                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium">{template.name}</h4>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                    Used {template.usage} times
                                                </span>
                                                {template.custom && (
                                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                        Custom
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {template.prompt}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Create Template Modal */}
                    {isCreating && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
                            <div className={`max-w-md w-full rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                <h4 className="text-lg font-semibold mb-4">Create Template</h4>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={newTemplate.name}
                                        onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Template name..."
                                        className="w-full p-3 border rounded-lg"
                                    />
                                    <select
                                        value={newTemplate.category}
                                        onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full p-3 border rounded-lg"
                                    >
                                        <option value="general">General</option>
                                        <option value="work">Work</option>
                                        <option value="creative">Creative</option>
                                        <option value="learning">Learning</option>
                                        <option value="coding">Coding</option>
                                    </select>
                                    <textarea
                                        value={newTemplate.prompt}
                                        onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                                        placeholder="Template prompt..."
                                        rows="4"
                                        className="w-full p-3 border rounded-lg"
                                    />
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={handleCreateTemplate}
                                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        >
                                            Create
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
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SmartTemplateManager component error:', error);
        reportError(error);
        return null;
    }
}
