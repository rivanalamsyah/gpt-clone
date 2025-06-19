function KeyboardShortcutsConfig({ shortcuts, onUpdateShortcuts, darkMode }) {
    try {
        const [editingShortcut, setEditingShortcut] = React.useState(null);
        const [newShortcut, setNewShortcut] = React.useState('');

        const defaultShortcuts = [
            { id: 'newChat', name: 'New Chat', key: 'Ctrl+N', action: 'newChat' },
            { id: 'search', name: 'Search', key: 'Ctrl+K', action: 'search' },
            { id: 'darkMode', name: 'Toggle Dark Mode', key: 'Ctrl+D', action: 'toggleDarkMode' },
            { id: 'settings', name: 'Open Settings', key: 'Ctrl+,', action: 'openSettings' },
            { id: 'send', name: 'Send Message', key: 'Ctrl+Enter', action: 'sendMessage' }
        ];

        const handleShortcutEdit = (shortcutId, newKey) => {
            const updated = { ...shortcuts, [shortcutId]: newKey };
            onUpdateShortcuts(updated);
            setEditingShortcut(null);
        };

        const handleKeyCapture = (e) => {
            e.preventDefault();
            const keys = [];
            if (e.ctrlKey) keys.push('Ctrl');
            if (e.altKey) keys.push('Alt');
            if (e.shiftKey) keys.push('Shift');
            if (e.key && !['Control', 'Alt', 'Shift'].includes(e.key)) {
                keys.push(e.key);
            }
            setNewShortcut(keys.join('+'));
        };

        return (
            <div data-name="keyboard-shortcuts-config" data-file="components/KeyboardShortcutsConfig.js" className="space-y-4">
                <h4 className="text-sm font-semibold mb-3">Keyboard Shortcuts</h4>
                
                <div className="space-y-3">
                    {defaultShortcuts.map((shortcut) => (
                        <div key={shortcut.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {shortcut.name}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                {editingShortcut === shortcut.id ? (
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={newShortcut}
                                            placeholder="Press keys..."
                                            onKeyDown={handleKeyCapture}
                                            className={`px-2 py-1 text-sm border rounded ${
                                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                            }`}
                                        />
                                        <button
                                            onClick={() => handleShortcutEdit(shortcut.id, newShortcut)}
                                            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingShortcut(null)}
                                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <kbd className={`px-2 py-1 text-xs rounded ${
                                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {shortcuts[shortcut.id] || shortcut.key}
                                        </kbd>
                                        <button
                                            onClick={() => {
                                                setEditingShortcut(shortcut.id);
                                                setNewShortcut('');
                                            }}
                                            className="text-blue-500 hover:text-blue-600 text-sm"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('KeyboardShortcutsConfig component error:', error);
        reportError(error);
        return null;
    }
}
