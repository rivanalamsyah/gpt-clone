function SearchChat({ onSearch, darkMode, placeholder = "Search messages..." }) {
    try {
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isExpanded, setIsExpanded] = React.useState(false);

        const handleSearch = (value) => {
            setSearchTerm(value);
            onSearch(value);
        };

        const handleToggle = () => {
            setIsExpanded(!isExpanded);
            if (!isExpanded) {
                setTimeout(() => {
                    document.querySelector('.search-input')?.focus();
                }, 100);
            } else {
                setSearchTerm('');
                onSearch('');
            }
        };

        return (
            <div data-name="search-chat" data-file="components/SearchChat.js" className="flex items-center">
                {isExpanded ? (
                    <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                        <i className="fas fa-search text-white text-sm"></i>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={placeholder}
                            className="search-input bg-transparent text-white placeholder-white placeholder-opacity-60 text-sm outline-none w-40"
                        />
                        <button
                            onClick={handleToggle}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleToggle}
                        className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all"
                        title="Search messages"
                    >
                        <i className="fas fa-search text-sm"></i>
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('SearchChat component error:', error);
        reportError(error);
        return null;
    }
}
