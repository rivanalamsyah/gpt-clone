function StreamingMessage({ message, isComplete, darkMode }) {
    try {
        const [displayedText, setDisplayedText] = React.useState('');
        const [currentIndex, setCurrentIndex] = React.useState(0);

        React.useEffect(() => {
            if (isComplete) {
                setDisplayedText(message);
                return;
            }

            if (currentIndex < message.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => prev + message[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, 30);
                return () => clearTimeout(timer);
            }
        }, [message, currentIndex, isComplete]);

        return (
            <div data-name="streaming-message" data-file="components/StreamingMessage.js" className="flex justify-start mb-6 message-fade-in">
                <div className="flex max-w-3xl">
                    <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
                            <i className="fas fa-robot text-white text-sm"></i>
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                            <div 
                                className="whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: MarkdownUtils.formatMessage(displayedText) }}
                            />
                            {!isComplete && (
                                <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1"></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StreamingMessage component error:', error);
        reportError(error);
        return null;
    }
}
