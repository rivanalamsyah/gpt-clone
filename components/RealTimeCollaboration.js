function RealTimeCollaboration({ chatId, onCollaboratorJoin, onCollaboratorLeave, darkMode }) {
    try {
        const [collaborators, setCollaborators] = React.useState([]);
        const [isSharing, setIsSharing] = React.useState(false);
        const [shareCode, setShareCode] = React.useState('');
        const [joinCode, setJoinCode] = React.useState('');

        React.useEffect(() => {
            // Simulate real-time collaborators
            const mockCollaborators = [
                { id: '1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', status: 'active' },
                { id: '2', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', status: 'typing' }
            ];
            setCollaborators(mockCollaborators);
        }, [chatId]);

        const generateShareCode = () => {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            setShareCode(code);
            setIsSharing(true);
        };

        const joinSession = () => {
            if (joinCode.trim()) {
                onCollaboratorJoin?.(joinCode);
                setJoinCode('');
            }
        };

        const leaveSession = () => {
            setIsSharing(false);
            setShareCode('');
            onCollaboratorLeave?.();
        };

        return (
            <div data-name="real-time-collaboration" data-file="components/RealTimeCollaboration.js" className="space-y-6">
                <h2 className="text-2xl font-bold">Real-Time Collaboration</h2>
                
                {/* Share Session */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Share This Conversation</h3>
                    
                    {!isSharing ? (
                        <button
                            onClick={generateShareCode}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Generate Share Code
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className={`p-4 rounded-lg border-2 border-dashed ${
                                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                                }`}>
                                    <span className="text-2xl font-mono font-bold">{shareCode}</span>
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(shareCode)}
                                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Copy Code
                                </button>
                            </div>
                            <button
                                onClick={leaveSession}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Stop Sharing
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Join Session */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Join a Session</h3>
                    
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            placeholder="Enter 6-digit code"
                            maxLength="6"
                            className={`flex-1 p-3 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        />
                        <button
                            onClick={joinSession}
                            disabled={joinCode.length !== 6}
                            className={`px-4 py-3 rounded-lg transition-colors ${
                                joinCode.length === 6
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Join
                        </button>
                    </div>
                </div>
                
                {/* Active Collaborators */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Active Collaborators ({collaborators.length})</h3>
                    
                    <div className="space-y-3">
                        {collaborators.map((collaborator) => (
                            <div key={collaborator.id} className="flex items-center space-x-3">
                                <img
                                    src={collaborator.avatar}
                                    alt={collaborator.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                    <span className="font-medium">{collaborator.name}</span>
                                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                        collaborator.status === 'active' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {collaborator.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Collaboration Features */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Collaboration Features</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-eye text-blue-500"></i>
                            <span className="text-sm">Live cursor tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-comments text-green-500"></i>
                            <span className="text-sm">Real-time messaging</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-sync text-purple-500"></i>
                            <span className="text-sm">Auto-sync changes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-history text-orange-500"></i>
                            <span className="text-sm">Version history</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RealTimeCollaboration component error:', error);
        reportError(error);
        return null;
    }
}
