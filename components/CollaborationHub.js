function CollaborationHub({ currentChat, onShareChat, onInviteUser, darkMode }) {
    try {
        const [shareLink, setShareLink] = React.useState('');
        const [inviteEmail, setInviteEmail] = React.useState('');
        const [shareSettings, setShareSettings] = React.useState({
            allowComments: true,
            allowEditing: false,
            expiresIn: '7days'
        });

        const generateShareLink = () => {
            const link = `${window.location.origin}/shared/${currentChat.id}?token=${Date.now()}`;
            setShareLink(link);
            navigator.clipboard.writeText(link);
        };

        const handleInvite = () => {
            if (inviteEmail.trim()) {
                onInviteUser(inviteEmail, shareSettings);
                setInviteEmail('');
            }
        };

        const exportOptions = [
            { format: 'pdf', name: 'PDF Document', icon: 'fa-file-pdf' },
            { format: 'word', name: 'Word Document', icon: 'fa-file-word' },
            { format: 'markdown', name: 'Markdown', icon: 'fa-markdown' },
            { format: 'json', name: 'JSON Data', icon: 'fa-file-code' }
        ];

        return (
            <div data-name="collaboration-hub" data-file="components/CollaborationHub.js" className="space-y-6">
                {/* Share Chat */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <i className="fas fa-share-alt mr-2 text-blue-500"></i>
                        Share Conversation
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={shareLink}
                                placeholder="Click 'Generate Link' to create shareable link"
                                readOnly
                                className={`flex-1 p-2 border rounded-lg ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            />
                            <button
                                onClick={generateShareLink}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Generate Link
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={shareSettings.allowComments}
                                    onChange={(e) => setShareSettings(prev => ({
                                        ...prev, allowComments: e.target.checked
                                    }))}
                                    className="mr-2"
                                />
                                <span className="text-sm">Allow comments</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={shareSettings.allowEditing}
                                    onChange={(e) => setShareSettings(prev => ({
                                        ...prev, allowEditing: e.target.checked
                                    }))}
                                    className="mr-2"
                                />
                                <span className="text-sm">Allow editing</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Invite Collaborators */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <i className="fas fa-user-plus mr-2 text-green-500"></i>
                        Invite Collaborators
                    </h3>
                    
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="Enter email address"
                            className={`flex-1 p-2 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        />
                        <button
                            onClick={handleInvite}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Invite
                        </button>
                    </div>
                </div>

                {/* Export Options */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <i className="fas fa-download mr-2 text-purple-500"></i>
                        Export Conversation
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {exportOptions.map((option) => (
                            <button
                                key={option.format}
                                onClick={() => onShareChat?.(option.format)}
                                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all hover:scale-105 ${
                                    darkMode 
                                        ? 'border-gray-600 hover:bg-gray-700' 
                                        : 'border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                <i className={`fas ${option.icon}`}></i>
                                <span className="text-sm">{option.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CollaborationHub component error:', error);
        reportError(error);
        return null;
    }
}
