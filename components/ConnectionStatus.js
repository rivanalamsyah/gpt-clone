function ConnectionStatus() {
    try {
        const [isOnline, setIsOnline] = React.useState(navigator.onLine);
        const [showStatus, setShowStatus] = React.useState(false);

        React.useEffect(() => {
            const handleOnline = () => {
                setIsOnline(true);
                setShowStatus(true);
                setTimeout(() => setShowStatus(false), 3000);
            };

            const handleOffline = () => {
                setIsOnline(false);
                setShowStatus(true);
            };

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }, []);

        if (!showStatus && isOnline) return null;

        return (
            <div 
                data-name="connection-status" 
                data-file="components/ConnectionStatus.js"
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isOnline 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white animate-pulse'
                }`}
            >
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-white animate-ping'}`}></div>
                    <span>{isOnline ? 'Back online' : 'No internet connection'}</span>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ConnectionStatus component error:', error);
        reportError(error);
        return null;
    }
}
