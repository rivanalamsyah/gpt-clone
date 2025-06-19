function ChatMessage({ message, isUser, timestamp, darkMode, onReaction, reactions, onEdit, onDelete }) {
    try {
        const [showCopied, setShowCopied] = React.useState(false);
        const [showMenu, setShowMenu] = React.useState(false);

        const handleCopy = async () => {
            try {
                const plainText = message.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
                await navigator.clipboard.writeText(plainText);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch (error) {
                console.error('Failed to copy message:', error);
            }
        };

        const formatTime = (timestamp) => {
            try {
                return new Date(timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } catch (error) {
                return '';
            }
        };

        const formatMessage = (text) => {
            if (!text) return '';
            
            return text
                .split('\n\n')
                .map(paragraph => {
                    let para = paragraph.trim();
                    para = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                    para = para.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
                    para = para.replace(/^\* (.+)$/gm, '• $1');
                    return `<p class="mb-3 last:mb-0 leading-relaxed">${para}</p>`;
                })
                .join('');
        };

        const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

        return (
            <div 
                data-name="chat-message" 
                data-file="components/ChatMessage.js" 
                className={`message-spacing flex ${isUser ? 'justify-end' : 'justify-start'} px-4 sm:px-6 group hover-lift`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setShowMenu(!showMenu);
                }}
            >
                {!isUser && (
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                            <i className="fas fa-robot text-white text-sm sm:text-base"></i>
                        </div>
                    </div>
                )}

                <div className="flex flex-col max-w-[85%] sm:max-w-md md:max-w-lg lg:max-w-2xl">
                    <div className={`relative break-words px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-sm transition-all duration-300 ${
                        isUser 
                            ? 'bg-blue-500 text-white rounded-br-md hover:shadow-lg' 
                            : darkMode 
                                ? 'bg-gray-700 text-white rounded-bl-md hover:shadow-lg border border-gray-600' 
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md hover:shadow-lg'
                    }`}>
                        
                        {isUser ? (
                            <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                {message}
                            </div>
                        ) : (
                            <div 
                                className="text-sm sm:text-base leading-relaxed prose-sm"
                                dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
                            />
                        )}
                        
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white border-opacity-20">
                            <span className={`text-xs ${isUser ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {timestamp && formatTime(timestamp)}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                                {isUser && (
                                    <i className="fas fa-check-double text-xs text-blue-100"></i>
                                )}
                                
                                {!isUser && (
                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={handleCopy}
                                            className={`p-2 rounded-full text-xs hover:bg-gray-100 hover:bg-opacity-20 transition-all transform hover:scale-110 focus-ring ${
                                                showCopied ? 'text-green-500' : ''
                                            }`}
                                            title={showCopied ? 'Copied!' : 'Copy'}
                                        >
                                            <i className={`fas ${showCopied ? 'fa-check' : 'fa-copy'}`}></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {showMenu && (
                            <ContextMenu 
                                onCopy={handleCopy}
                                onEdit={() => onEdit?.()}
                                onDelete={() => onDelete?.()}
                                onClose={() => setShowMenu(false)}
                                darkMode={darkMode}
                            />
                        )}
                    </div>

                    {/* Message Reactions */}
                    <div className="flex items-center mt-3 space-x-2 flex-wrap">
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {reactionEmojis.map((emoji, index) => (
                                <button
                                    key={index}
                                    onClick={() => onReaction?.(emoji)}
                                    className={`text-base p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all transform hover:scale-125 interactive-element ${
                                        reactions?.[emoji] ? 'bg-blue-100 bg-opacity-20' : ''
                                    }`}
                                    title={`React with ${emoji}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        
                        {/* Show active reactions */}
                        <div className="flex space-x-2 flex-wrap">
                            {Object.entries(reactions || {}).map(([emoji, count]) => 
                                count > 0 && (
                                    <div key={emoji} className="flex items-center space-x-1 bg-gray-100 bg-opacity-20 rounded-full px-3 py-1 mt-1">
                                        <span className="text-sm">{emoji}</span>
                                        <span className="text-xs opacity-70">{count}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ChatMessage component error:', error);
        reportError(error);
        return null;
    }
}
