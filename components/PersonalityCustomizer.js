function PersonalityCustomizer({ isOpen, onClose, currentPersonality, onPersonalityChange, darkMode }) {
    try {
        const [selectedPersonality, setSelectedPersonality] = React.useState(currentPersonality || 'helpful');
        const [customSettings, setCustomSettings] = React.useState({
            tone: 'friendly',
            verbosity: 'balanced',
            formality: 'casual',
            creativity: 'moderate'
        });

        const personalities = [
            { 
                id: 'helpful', 
                name: 'Helpful Assistant', 
                icon: 'fa-heart',
                description: 'Friendly, supportive, and eager to help',
                color: 'blue'
            },
            { 
                id: 'professional', 
                name: 'Professional', 
                icon: 'fa-briefcase',
                description: 'Formal, precise, and business-focused',
                color: 'gray'
            },
            { 
                id: 'creative', 
                name: 'Creative Genius', 
                icon: 'fa-palette',
                description: 'Imaginative, artistic, and innovative',
                color: 'purple'
            },
            { 
                id: 'analytical', 
                name: 'Data Analyst', 
                icon: 'fa-chart-line',
                description: 'Logical, data-driven, and methodical',
                color: 'green'
            },
            { 
                id: 'teacher', 
                name: 'Patient Teacher', 
                icon: 'fa-graduation-cap',
                description: 'Educational, patient, and encouraging',
                color: 'orange'
            },
            { 
                id: 'custom', 
                name: 'Custom Personality', 
                icon: 'fa-cog',
                description: 'Personalized to your preferences',
                color: 'pink'
            }
        ];

        const handlePersonalitySelect = (personalityId) => {
            setSelectedPersonality(personalityId);
            const personality = personalities.find(p => p.id === personalityId);
            onPersonalityChange({ ...personality, customSettings });
        };

        const handleCustomSettingChange = (setting, value) => {
            setCustomSettings(prev => ({ ...prev, [setting]: value }));
        };

        if (!isOpen) return null;

        return (
            <div data-name="personality-customizer" data-file="components/PersonalityCustomizer.js" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`max-w-lg w-full rounded-2xl p-6 max-h-[80vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">AI Personality</h3>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {personalities.map((personality) => (
                            <div
                                key={personality.id}
                                onClick={() => handlePersonalitySelect(personality.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    selectedPersonality === personality.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white bg-${personality.color}-500`}>
                                        <i className={`fas ${personality.icon}`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{personality.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{personality.description}</p>
                                    </div>
                                    {selectedPersonality === personality.id && (
                                        <i className="fas fa-check text-blue-500"></i>
                                    )}
                                </div>
                            </div>
                        ))}

                        {selectedPersonality === 'custom' && (
                            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                                <h4 className="text-sm font-medium">Custom Settings</h4>
                                
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Tone</label>
                                        <select
                                            value={customSettings.tone}
                                            onChange={(e) => handleCustomSettingChange('tone', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="friendly">Friendly</option>
                                            <option value="serious">Serious</option>
                                            <option value="playful">Playful</option>
                                            <option value="formal">Formal</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Response Length</label>
                                        <select
                                            value={customSettings.verbosity}
                                            onChange={(e) => handleCustomSettingChange('verbosity', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="concise">Concise</option>
                                            <option value="balanced">Balanced</option>
                                            <option value="detailed">Detailed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Creativity Level</label>
                                        <select
                                            value={customSettings.creativity}
                                            onChange={(e) => handleCustomSettingChange('creativity', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="conservative">Conservative</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="creative">Creative</option>
                                            <option value="innovative">Innovative</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => handlePersonalitySelect(selectedPersonality)}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Apply Personality
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PersonalityCustomizer component error:', error);
        reportError(error);
        return null;
    }
}
