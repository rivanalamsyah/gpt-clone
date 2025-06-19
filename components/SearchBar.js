function SearchBar({ onSearch, darkMode, placeholder = "Search chats..." }) {
    try {
        const [searchTerm, setSearchTerm] = React.useState('');

        const handleSearch = (value) => {
            setSearchTerm(value);
            onSearch(value);
        };

        return (
            <div data-name="search-bar" data-file="components/SearchBar.js" className="relative mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={placeholder}
                        className={`w-full pl-10 pr-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className={`fas fa-search text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                    </div>
                    {searchTerm && (
                        <button
                            onClick={() => handleSearch('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-all hover:scale-110"
                        >
                            <i className={`fas fa-times text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}></i>
                        </button>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SearchBar component error:', error);
        reportError(error);
        return null;
    }
}
