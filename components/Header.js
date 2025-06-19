function Header({ onToggleSidebar, darkMode, onClearChat, selectedModel, onModelChange, messages }) {
    try {
        const [searchResults, setSearchResults] = React.useState([]);

        const handleSearchResults = (results) => {
            setSearchResults(results);
        };

        return (
            <header data-name="header" data-file="components/Header.js" className="header-fixed glass-morphism border-b border-white border-opacity-20 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
                        <button 
                            onClick={onToggleSidebar} 
                            className="p-2 rounded-xl text-white hover:bg-white hover:bg-opacity-20 transition-all flex-shrink-0"
                        >
                            <i className="fas fa-bars text-sm sm:text-base"></i>
                        </button>
                        
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                            <div className="relative flex-shrink-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg hover-lift">
                                    <span className="text-white font-bold text-sm sm:text-lg">V</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white pulse-animation"></div>
                            </div>
                            <div className="hidden sm:block min-w-0">
                                <h1 className="text-base sm:text-xl font-bold text-white truncate">
                                    Vansky AI
                                </h1>
                                <p className="text-xs text-white text-opacity-70 truncate">
                                    Advanced Assistant
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
                        <MessageSearch 
                            messages={messages || []}
                            onSearchResults={handleSearchResults}
                            darkMode={darkMode}
                        />
                        
                        <select 
                            value={selectedModel} 
                            onChange={(e) => onModelChange(e.target.value)}
                            className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl glass-morphism text-white border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 hidden md:block"
                        >
                            <option value="gpt-4" className="text-gray-900">GPT-4</option>
                            <option value="gpt-3.5" className="text-gray-900">GPT-3.5</option>
                            <option value="claude" className="text-gray-900">Claude</option>
                        </select>
                        
                        <button 
                            onClick={onClearChat} 
                            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white hover:bg-white hover:bg-opacity-20 transition-all scale-on-hover"
                            title="New chat"
                        >
                            <i className="fas fa-plus text-sm"></i>
                        </button>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
