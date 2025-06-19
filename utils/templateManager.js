const TemplateManager = {
    // Get all templates
    getAllTemplates: () => {
        try {
            const customTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
            const defaultTemplates = TemplateManager.getDefaultTemplates();
            return [...defaultTemplates, ...customTemplates];
        } catch (error) {
            console.error('Error getting templates:', error);
            return TemplateManager.getDefaultTemplates();
        }
    },

    // Get default templates
    getDefaultTemplates: () => {
        return [
            {
                id: 'code-review',
                name: 'Code Review',
                category: 'development',
                prompt: 'Please review this code and provide feedback on:\n1. Code quality and structure\n2. Potential bugs or issues\n3. Performance improvements\n4. Best practices\n\n\n[Paste your code here]\n',
                usage: 0,
                isDefault: true
            },
            {
                id: 'email-draft',
                name: 'Professional Email',
                category: 'business',
                prompt: 'Help me write a professional email:\n- Recipient: [Name/Role]\n- Purpose: [Meeting/Follow-up/etc.]\n- Key points: [List main points]\n- Tone: [Formal/Friendly/etc.]',
                usage: 0,
                isDefault: true
            },
            {
                id: 'learning-assistant',
                name: 'Learning Assistant',
                category: 'education',
                prompt: 'I want to learn about [Topic]. Please:\n1. Explain the basics\n2. Key concepts to understand\n3. Practical examples\n4. Next steps for learning',
                usage: 0,
                isDefault: true
            },
            {
                id: 'creative-writing',
                name: 'Creative Writing',
                category: 'creative',
                prompt: 'Help with creative writing:\n- Genre: [Fantasy/Sci-fi/Mystery/etc.]\n- Setting: [World/time period]\n- Characters: [Main character details]\n- Plot: [Basic story concept]',
                usage: 0,
                isDefault: true
            }
        ];
    },

    // Save custom template
    saveTemplate: (template) => {
        try {
            const customTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
            const newTemplate = {
                ...template,
                id: template.id || Date.now().toString(),
                createdAt: new Date().toISOString(),
                usage: 0,
                isCustom: true
            };
            
            customTemplates.push(newTemplate);
            localStorage.setItem('custom_templates', JSON.stringify(customTemplates));
            return newTemplate;
        } catch (error) {
            console.error('Error saving template:', error);
            throw error;
        }
    },

    // Update template usage
    updateUsage: (templateId) => {
        try {
            const customTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
            const updatedTemplates = customTemplates.map(template => 
                template.id === templateId 
                    ? { ...template, usage: (template.usage || 0) + 1 }
                    : template
            );
            localStorage.setItem('custom_templates', JSON.stringify(updatedTemplates));
        } catch (error) {
            console.error('Error updating template usage:', error);
        }
    },

    // Delete custom template
    deleteTemplate: (templateId) => {
        try {
            const customTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
            const filteredTemplates = customTemplates.filter(template => template.id !== templateId);
            localStorage.setItem('custom_templates', JSON.stringify(filteredTemplates));
        } catch (error) {
            console.error('Error deleting template:', error);
            throw error;
        }
    },

    // Get templates by category
    getTemplatesByCategory: (category) => {
        const allTemplates = TemplateManager.getAllTemplates();
        return category === 'all' 
            ? allTemplates 
            : allTemplates.filter(template => template.category === category);
    },

    // Search templates
    searchTemplates: (searchTerm) => {
        const allTemplates = TemplateManager.getAllTemplates();
        return allTemplates.filter(template =>
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },

    // Export templates
    exportTemplates: () => {
        try {
            const allTemplates = TemplateManager.getAllTemplates();
            const exportData = {
                exportDate: new Date().toISOString(),
                templates: allTemplates,
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vansky-templates-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting templates:', error);
            throw error;
        }
    },

    // Import templates
    importTemplates: (file) => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.templates && Array.isArray(data.templates)) {
                            const customTemplates = data.templates.filter(t => t.isCustom);
                            localStorage.setItem('custom_templates', JSON.stringify(customTemplates));
                            resolve(customTemplates.length);
                        } else {
                            reject(new Error('Invalid template file format'));
                        }
                    } catch (parseError) {
                        reject(new Error('Failed to parse template file'));
                    }
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsText(file);
            } catch (error) {
                reject(error);
            }
        });
    }
};
