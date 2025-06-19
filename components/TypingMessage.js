function TypingMessage({ message, darkMode }) {
    try {
        const [displayText, setDisplayText] = React.useState('');
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const [isComplete, setIsComplete] = React.useState(false);

        React.useEffect(() => {
            if (!message) return;
            
            if (currentIndex < message.length) {
                const timer = setTimeout(() => {
                    setDisplayText(prev => prev + message[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, 30);
                return () => clearTimeout(timer);
            } else {
                setIsComplete(true);
            }
        }, [message, currentIndex]);

        React.useEffect(() => {
            if (message) {
                setDisplayText('');
                setCurrentIndex(0);
                setIsComplete(false);
            }
        }, [message]);

        if (!message) return null;

        const formatMessage = (text) => {
            if (!text) return '';
            
            return text
                .split('\n\n')
                .map(paragraph => {
                    let para = paragraph.trim();
                    para = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                    para = para.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
                    para = para.replace(/^\* (.+)$/gm, '• $1');
                    return `<p class="mb-2 last:mb-0">${para}</p>`;
                })
                .join('');
        };

        return (
            <div data-name="typing-message" data-file="components/TypingMessage.js" className="flex justify-start mb-3 px-4">
                <div className={`relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl rounded-bl-md shadow-sm ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                    <div 
                        className="text-sm leading-relaxed prose-sm"
                        dangerouslySetInnerHTML={{ __html: formatMessage(displayText) }}
                    />
                    {!isComplete && displayText && (
                        <span className="inline-block w-0.5 h-4 bg-current ml-1 animate-pulse"></span>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TypingMessage component error:', error);
        reportError(error);
        return null;
    }
}
