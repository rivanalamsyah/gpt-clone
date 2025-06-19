function ChatFolders({ folders, selectedFolder, onSelectFolder, onCreateFolder, darkMode }) {
    try {
        const [showCreateForm, setShowCreateForm] = React.useState(false);
        const [newFolderName, setNewFolderName] = React.useState('');

        const handleCreateFolder = () => {
            if (newFolderName.trim()) {
                onCreateFolder(newFolderName.trim());
                setNewFolderName('');
                setShowCreateForm(false);
            }
        };

        const defaultFolders = [
            { id: 'all', name: 'All Chats', icon: 'fa-comments', count: 0 },
            { id: 'work', name: 'Work', icon: 'fa-briefcase', count: 0 },
            { id: 'personal', name: 'Personal', icon: 'fa-user', count: 0 },
            { id: 'archived', name: 'Archived', icon: 'fa-archive', count: 0 }
        ];

        return (
            <div data-name="chat-folders" data-file="components/ChatFolders.js" className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Folders
                    </h3>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className={`p-1 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                        <i className="fas fa-plus text-xs"></i>
                    </button>
                </div>

                <div className="space-y-1">
                    {defaultFolders.map((folder) => (
                        <button
                            key={folder.id}
                            onClick={() => onSelectFolder(folder.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedFolder === folder.id
                                    ? darkMode 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-blue-50 text-blue-700'
                                    : darkMode 
                                        ? 'text-gray-300 hover:bg-gray-700' 
                                        : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <i className={`fas ${folder.icon} text-xs`}></i>
                                <span>{folder.name}</span>
                            </div>
                            <span className="text-xs opacity-60">{folder.count}</span>
                        </button>
                    ))}
                </div>

                {showCreateForm && (
                    <div className="mt-3 space-y-2">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder name"
                            className={`w-full px-3 py-2 text-sm rounded-lg border ${
                                darkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleCreateFolder}
                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className={`px-3 py-1 text-xs rounded-lg ${
                                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ChatFolders component error:', error);
        reportError(error);
        return null;
    }
}
