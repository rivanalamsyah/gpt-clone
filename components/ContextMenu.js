function ContextMenu({ onCopy, onEdit, onDelete, onClose, darkMode }) {
    try {
        React.useEffect(() => {
            const handleClickOutside = () => onClose();
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }, [onClose]);

        return (
            <div 
                data-name="context-menu" 
                data-file="components/ContextMenu.js"
                className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                    darkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                }`}
            >
                <div className="py-2">
                    <button
                        onClick={onCopy}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:bg-opacity-10 transition-colors flex items-center ${
                            darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <i className="fas fa-copy mr-3"></i>
                        Copy Message
                    </button>
                    <button
                        onClick={onEdit}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:bg-opacity-10 transition-colors flex items-center ${
                            darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <i className="fas fa-edit mr-3"></i>
                        Edit Message
                    </button>
                    <button
                        onClick={onDelete}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-red-50 transition-colors flex items-center text-red-500 hover:bg-red-500 hover:bg-opacity-10`}
                    >
                        <i className="fas fa-trash mr-3"></i>
                        Delete Message
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ContextMenu component error:', error);
        reportError(error);
        return null;
    }
}
