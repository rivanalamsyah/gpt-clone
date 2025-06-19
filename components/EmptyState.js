function EmptyState({ darkMode, onNewChat }) {
    try {
        return (
            <div data-name="empty-state" data-file="components/EmptyState.js" className="flex flex-col items-center justify-center h-full px-6 text-center">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl">
                        <i className="fas fa-comments text-white text-3xl"></i>
                    </div>
                    <div className="relative">
                        {/* Floating elements for visual interest */}
                        <div className="absolute -top-4 -left-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="absolute -top-2 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute -bottom-3 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                    </div>
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    No conversations yet
                </h3>
                <p className={`text-lg mb-8 max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Start a conversation with Vansky AI and explore the possibilities of AI assistance
                </p>
                
                <button
                    onClick={onNewChat}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Start Your First Chat
                </button>
                
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                    <div className={`p-4 rounded-lg border-2 border-dashed transition-colors hover:bg-opacity-50 ${
                        darkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-50'
                    }`}>
                        <i className="fas fa-lightbulb text-yellow-500 text-xl mb-2"></i>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Get creative ideas
                        </p>
                    </div>
                    <div className={`p-4 rounded-lg border-2 border-dashed transition-colors hover:bg-opacity-50 ${
                        darkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-50'
                    }`}>
                        <i className="fas fa-code text-green-500 text-xl mb-2"></i>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Write code
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('EmptyState component error:', error);
        reportError(error);
        return null;
    }
}
