function MultiLanguageSupport({ darkMode }) {
    try {
        const [selectedLanguage, setSelectedLanguage] = React.useState('en');
        const [autoDetect, setAutoDetect] = React.useState(true);
        const [translations, setTranslations] = React.useState({});

        const languages = [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'es', name: 'Español', flag: '🇪🇸' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'it', name: 'Italiano', flag: '🇮🇹' },
            { code: 'pt', name: 'Português', flag: '🇵🇹' },
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'ja', name: '日本語', flag: '🇯🇵' },
            { code: 'ko', name: '한국어', flag: '🇰🇷' },
            { code: 'zh', name: '中文', flag: '🇨🇳' }
        ];

        const handleLanguageChange = (langCode) => {
            setSelectedLanguage(langCode);
            console.log(`Language changed to: ${langCode}`);
        };

        const translateText = async (text, targetLang) => {
            // Simulate translation
            console.log(`Translating "${text}" to ${targetLang}`);
            return `[${targetLang.toUpperCase()}] ${text}`;
        };

        return (
            <div data-name="multi-language-support" data-file="components/MultiLanguageSupport.js" className="space-y-6">
                <h2 className="text-2xl font-bold">Multi-Language Support</h2>

                {/* Language Selector */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Interface Language</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`p-3 border rounded-lg text-center transition-all ${
                                    selectedLanguage === lang.code
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <div className="text-2xl mb-1">{lang.flag}</div>
                                <div className="text-sm font-medium">{lang.name}</div>
                                <div className="text-xs text-gray-500">{lang.code.toUpperCase()}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Auto-Detection Settings */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Language Detection</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Auto-detect user language</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoDetect}
                                    onChange={(e) => setAutoDetect(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span>Translate AI responses</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Translation Stats */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Translation Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">1,250</div>
                            <div className="text-sm text-gray-600">Messages Translated</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">12</div>
                            <div className="text-sm text-gray-600">Languages Used</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">98.5%</div>
                            <div className="text-sm text-gray-600">Accuracy Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">0.8s</div>
                            <div className="text-sm text-gray-600">Avg Translation Time</div>
                        </div>
                    </div>
                </div>

                {/* Quick Translation Test */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Translation Test</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Enter text to translate..."
                            className={`w-full p-3 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        />
                        <div className="flex space-x-2">
                            <select className={`px-3 py-2 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}>
                                <option value="auto">Auto-detect</option>
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <span className="flex items-center">→</span>
                            <select className={`px-3 py-2 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}>
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Translate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MultiLanguageSupport component error:', error);
        reportError(error);
        return null;
    }
}
