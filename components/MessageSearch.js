function MessageSearch({ messages, onSearchResults, darkMode }) {
    try {
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isExpanded, setIsExpanded] = React.useState(false);
        const [results, setResults] = React.useState([]);

        const handleSearch = (term) => {
            setSearchTerm(term);
            
            if (!term.trim()) {
                setResults([]);
                onSearchResults([]);
                return;
            }

            const filtered = messages.filter(msg => 
                msg.text.toLowerCase().includes(term.toLowerCase())
            ).map(msg => ({
                ...msg,
                highlight: msg.text.replace(
                    new RegExp(term, 'gi'), 
                    `<mark class="bg-yellow-200 text-gray-900">$&</mark>`
                )
            }));

            setResults(filtered);
            onSearchResults(filtered);
        };

        const toggleSearch = () => {
            setIsExpanded(!isExpanded);
            if (!isExpanded) {
                setTimeout(() => {
                    document.querySelector('.search-input')?.focus();
                }, 100);
            } else {
                setSearchTerm('');
                setResults([]);
                onSearchResults([]);
            }
        };

        return (
            <div data-name="message-search" data-file="components/MessageSearch.js" className="relative">
                {isExpanded ? (
                    <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                        <i className="fas fa-search text-white text-sm"></i>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search messages..."
                            className="search-input bg-transparent text-white placeholder-white placeholder-opacity-60 text-sm outline-none flex-1"
                        />
                        {searchTerm && (
                            <span className="text-xs text-white opacity-60">
                                {results.length} found
                            </span>
                        )}
                        <button
                            onClick={toggleSearch}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={toggleSearch}
                        className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all"
                        title="Search messages"
                    >
                        <i className="fas fa-search text-sm"></i>
                    </button>
                )}

                {/* Search Results Dropdown */}
                {results.length > 0 && isExpanded && (
                    <div className={`absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-lg shadow-lg z-50 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } border`}>
                        {results.slice(0, 10).map((result, index) => (
                            <div
                                key={result.id}
                                className={`p-3 border-b last:border-b-0 hover:bg-opacity-50 cursor-pointer ${
                                    darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-start space-x-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        result.isUser ? 'bg-blue-500' : 'bg-purple-500'
                                    }`}>
                                        <i className={`fas ${result.isUser ? 'fa-user' : 'fa-robot'} text-white text-xs`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div 
                                            className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                                            dangerouslySetInnerHTML={{ __html: result.highlight }}
                                        />
                                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {new Date(result.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('MessageSearch component error:', error);
        reportError(error);
        return null;
    }
}
