function Sidebar({ isOpen, onClose, chatHistory, onSelectChat, onNewChat, onClearAll, darkMode, onToggleDarkMode, onOpenSettings }) {
    try {
        const [filteredHistory, setFilteredHistory] = React.useState(chatHistory);
        const [hoveredChat, setHoveredChat] = React.useState(null);
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            setFilteredHistory(chatHistory);
        }, [chatHistory]);

        const handleSearch = (searchTerm) => {
            setSearchTerm(searchTerm);
            if (!searchTerm.trim()) {
                setFilteredHistory(chatHistory);
                return;
            }
            
            const filtered = chatHistory.filter(chat =>
                chat.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredHistory(filtered);
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return 'Today';
            if (diffDays === 2) return 'Yesterday';
            if (diffDays <= 7) return `${diffDays} days ago`;
            return date.toLocaleDateString();
        };

        const getChatPreview = (chat) => {
            if (chat.messages && chat.messages.length > 0) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                return lastMessage.text.substring(0, 45) + (lastMessage.text.length > 45 ? '...' : '');
            }
            return 'Start a new conversation';
        };

        const getChatIcon = (chat) => {
            const icons = ['fa-lightbulb', 'fa-code', 'fa-pen', 'fa-chart-line', 'fa-cog', 'fa-heart'];
            return icons[Math.floor(Math.random() * icons.length)];
        };

        return (
            <div>
                {/* Advanced Backdrop */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-blue-900/20 z-40 md:hidden backdrop-blur-md"
                        onClick={onClose}
                    ></div>
                )}
                
                {/* Advanced Sidebar */}
                <div 
                    data-name="sidebar" 
                    data-file="components/Sidebar.js" 
                    className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-out sidebar-responsive`}
                    style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(32px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
                    }}
                >
                    <div className="flex flex-col h-full w-full relative">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5"></div>
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
                        
                        {/* Premium Header */}
                        <div className="relative flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                                        <i className="fas fa-sparkles text-white text-sm"></i>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Vansky AI</h2>
                                    <p className="text-xs text-white/60">Premium Assistant</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose} 
                                className="p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-90"
                            >
                                <i className="fas fa-times text-sm"></i>
                            </button>
                        </div>
                        
                        {/* Advanced Search & Actions */}
                        <div className="relative p-6 space-y-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search conversations..."
                                    className="w-full pl-12 pr-10 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <i className="fas fa-search text-white/60 group-focus-within:text-purple-400 transition-colors"></i>
                                </div>
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearch('')}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                    >
                                        <i className="fas fa-times text-sm"></i>
                                    </button>
                                )}
                            </div>
                            
                            {/* Premium New Chat Button */}
                            <button 
                                onClick={onNewChat} 
                                className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center space-x-3">
                                    <i className="fas fa-plus group-hover:rotate-180 transition-transform duration-300"></i>
                                    <span>New Conversation</span>
                                    <i className="fas fa-sparkles text-xs opacity-70"></i>
                                </div>
                            </button>
                        </div>
                        
                        {/* Advanced Chat History */}
                        <div className="flex-1 overflow-y-auto px-6 space-y-3 min-h-0 scrollbar-thin relative">
                            {filteredHistory.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl flex items-center justify-center mb-6">
                                        <i className="fas fa-robot text-white/40 text-2xl"></i>
                                    </div>
                                    <p className="text-white/70 text-sm font-medium mb-2">
                                        {searchTerm ? 'No conversations found' : 'Ready to chat!'}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {searchTerm ? 'Try different keywords' : 'Start your first conversation'}
                                    </p>
                                </div>
                            ) : (
                                filteredHistory.map((chat, index) => (
                                    <div 
                                        key={chat.id} 
                                        onClick={() => {
                                            onSelectChat(chat);
                                            if (window.innerWidth < 768) {
                                                onClose();
                                            }
                                        }} 
                                        onMouseEnter={() => setHoveredChat(chat.id)}
                                        onMouseLeave={() => setHoveredChat(null)}
                                        className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                                            hoveredChat === chat.id 
                                                ? 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 border border-white/30 shadow-xl' 
                                                : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                                        }`}
                                        style={{animationDelay: `${index * 50}ms`}}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 relative">
                                                <div className={`w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${hoveredChat === chat.id ? 'scale-110' : ''}`}>
                                                    <i className={`fas ${getChatIcon(chat)} text-white text-sm`}></i>
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white text-xs flex items-center justify-center">
                                                    <span className="text-white font-bold" style={{fontSize: '8px'}}>{chat.messages?.length || 0}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-purple-200 transition-colors">
                                                        {chat.title}
                                                    </h3>
                                                    <span className="text-xs text-white/50 ml-2 flex-shrink-0 group-hover:text-white/70 transition-colors">
                                                        {formatDate(chat.createdAt)}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-xs text-white/60 line-clamp-1 leading-relaxed mb-3 group-hover:text-white/80 transition-colors">
                                                    {getChatPreview(chat)}
                                                </p>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full backdrop-blur-sm">
                                                            {chat.messages?.length || 0} msgs
                                                        </span>
                                                        {chat.model && (
                                                            <span className="text-xs bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-200 px-2 py-1 rounded-full border border-purple-400/30 backdrop-blur-sm">
                                                                {chat.model}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className={`transform transition-all duration-300 ${hoveredChat === chat.id ? 'scale-100 opacity-100 translate-x-0' : 'scale-0 opacity-0 translate-x-4'}`}>
                                                        <i className="fas fa-arrow-right text-white/60 text-sm"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Premium Hover Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-2xl transition-opacity duration-300 ${
                                            hoveredChat === chat.id ? 'opacity-100' : 'opacity-0'
                                        }`}></div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Premium Footer */}
                        <div className="relative p-6 border-t border-white/10 space-y-3">
                            <button 
                                onClick={onOpenSettings} 
                                className="w-full p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-4 group hover:scale-[1.02]"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <i className="fas fa-cog text-white text-sm group-hover:rotate-180 transition-transform duration-500"></i>
                                </div>
                                <div className="flex-1 text-left">
                                    <span className="font-semibold block">Settings</span>
                                    <span className="text-xs text-white/60">Customize your experience</span>
                                </div>
                                <i className="fas fa-chevron-right text-white/40 group-hover:text-white/70 transition-colors"></i>
                            </button>
                            
                            <div className="flex space-x-3">
                                <button 
                                    onClick={onToggleDarkMode} 
                                    className="flex-1 p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02]"
                                >
                                    <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
                                    <span className="text-sm font-medium">{darkMode ? 'Light' : 'Dark'}</span>
                                </button>
                                
                                <button 
                                    onClick={onClearAll}
                                    className="px-4 py-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-all duration-300 border border-red-400/30 hover:scale-[1.02]"
                                    title="Clear All Chats"
                                >
                                    <i className="fas fa-trash text-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
