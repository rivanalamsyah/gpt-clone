function KeyboardShortcuts({ isOpen, onClose, darkMode }) {
    try {
        if (!isOpen) return null;

        const shortcuts = [
            { key: 'Ctrl + N', action: 'New Chat', icon: 'fa-plus' },
            { key: 'Ctrl + K', action: 'Search Chats', icon: 'fa-search' },
            { key: 'Ctrl + D', action: 'Toggle Dark Mode', icon: 'fa-moon' },
            { key: 'Ctrl + ,', action: 'Open Settings', icon: 'fa-cog' },
            { key: 'Ctrl + Enter', action: 'Send Message', icon: 'fa-paper-plane' },
            { key: 'Ctrl + /', action: 'Show Shortcuts', icon: 'fa-keyboard' },
            { key: 'Escape', action: 'Close Modal/Sidebar', icon: 'fa-times' },
            { key: 'Ctrl + Shift + L', action: 'Clear Chat', icon: 'fa-trash' }
        ];

        return (
            <div data-name="keyboard-shortcuts" data-file="components/KeyboardShortcuts.js" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className={`max-w-md w-full rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center">
                            <i className="fas fa-keyboard mr-2 text-blue-500"></i>
                            Keyboard Shortcuts
                        </h2>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {shortcuts.map((shortcut, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${shortcut.icon} text-blue-500 w-4`}></i>
                                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {shortcut.action}
                                    </span>
                                </div>
                                <kbd className={`px-3 py-1 text-sm rounded font-mono ${
                                    darkMode ? 'bg-gray-600 text-gray-300 border border-gray-500' : 'bg-white text-gray-600 border border-gray-300'
                                }`}>
                                    {shortcut.key}
                                </kbd>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            <i className="fas fa-info-circle mr-2"></i>
                            Press <kbd className="px-1 py-0.5 text-xs bg-blue-200 dark:bg-blue-700 rounded">Ctrl + /</kbd> anytime to view shortcuts
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('KeyboardShortcuts component error:', error);
        reportError(error);
        return null;
    }
}
