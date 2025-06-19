function SessionManager({ darkMode }) {
    try {
        const [sessions, setSessions] = React.useState([
            { id: '1', device: 'Chrome on Windows', location: 'New York, US', lastActive: '2 minutes ago', current: true },
            { id: '2', device: 'Safari on iPhone', location: 'New York, US', lastActive: '1 hour ago', current: false },
            { id: '3', device: 'Firefox on Mac', location: 'San Francisco, US', lastActive: '2 days ago', current: false }
        ]);

        const handleTerminateSession = (sessionId) => {
            setSessions(prev => prev.filter(session => session.id !== sessionId));
        };

        const handleTerminateAllOthers = () => {
            setSessions(prev => prev.filter(session => session.current));
        };

        return (
            <div data-name="session-manager" data-file="components/SessionManager.js" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Active Sessions</h3>
                    <button
                        onClick={handleTerminateAllOthers}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Terminate All Others
                    </button>
                </div>
                
                <div className="space-y-3">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className={`p-4 rounded-lg border transition-all ${
                                session.current
                                    ? darkMode 
                                        ? 'bg-green-900/20 border-green-700' 
                                        : 'bg-green-50 border-green-200'
                                    : darkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-50 border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <i className={`fas ${
                                            session.device.includes('iPhone') ? 'fa-mobile-alt' :
                                            session.device.includes('Mac') ? 'fa-laptop' : 'fa-desktop'
                                        } text-sm`}></i>
                                        <span className="font-medium">{session.device}</span>
                                        {session.current && (
                                            <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <div>{session.location}</div>
                                        <div>Last active: {session.lastActive}</div>
                                    </div>
                                </div>
                                
                                {!session.current && (
                                    <button
                                        onClick={() => handleTerminateSession(session.id)}
                                        className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                    >
                                        Terminate
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SessionManager component error:', error);
        reportError(error);
        return null;
    }
}
