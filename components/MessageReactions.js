function MessageReactions({ reactions, onReaction, darkMode }) {
    try {
        const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

        return (
            <div data-name="message-reactions" data-file="components/MessageReactions.js" className="flex items-center mt-2 space-x-1">
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {reactionEmojis.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => onReaction?.(emoji)}
                            className={`text-sm p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-all transform hover:scale-125 ${
                                reactions?.[emoji] ? 'bg-blue-100 bg-opacity-20' : ''
                            }`}
                            title={`React with ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
                
                {/* Show active reactions */}
                <div className="flex space-x-1">
                    {Object.entries(reactions || {}).map(([emoji, count]) => 
                        count > 0 && (
                            <div key={emoji} className="flex items-center space-x-1 bg-gray-100 bg-opacity-20 rounded-full px-2 py-1">
                                <span className="text-sm">{emoji}</span>
                                <span className="text-xs opacity-70">{count}</span>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessageReactions component error:', error);
        reportError(error);
        return null;
    }
}
