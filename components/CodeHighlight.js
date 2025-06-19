function CodeHighlight({ code, language, darkMode }) {
    try {
        const [copied, setCopied] = React.useState(false);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Failed to copy code:', error);
            }
        };

        const getLanguageColor = (lang) => {
            const colors = {
                javascript: '#f7df1e',
                python: '#3776ab',
                java: '#ed8b00',
                html: '#e34c26',
                css: '#1572b6',
                react: '#61dafb',
                node: '#339933',
                sql: '#336791',
                default: '#10b981'
            };
            return colors[lang.toLowerCase()] || colors.default;
        };

        return (
            <div data-name="code-highlight" data-file="components/CodeHighlight.js" className="code-block-container my-4">
                <div className="code-header">
                    <div className="flex items-center space-x-2">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(language) }}
                        ></div>
                        <span className="code-language">{language.toUpperCase()}</span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="copy-code-btn"
                        title={copied ? 'Copied!' : 'Copy code'}
                    >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
                <pre className="code-block">
                    <code className={`language-${language}`}>{code}</code>
                </pre>
            </div>
        );
    } catch (error) {
        console.error('CodeHighlight component error:', error);
        reportError(error);
        return null;
    }
}
