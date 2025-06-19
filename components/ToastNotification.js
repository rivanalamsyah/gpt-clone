function ToastNotification({ message, type, isVisible, onClose }) {
    try {
        React.useEffect(() => {
            if (isVisible) {
                const timer = setTimeout(onClose, 3000);
                return () => clearTimeout(timer);
            }
        }, [isVisible, onClose]);

        if (!isVisible) return null;

        const getIcon = () => {
            switch (type) {
                case 'success': return 'fa-check-circle text-green-500';
                case 'error': return 'fa-exclamation-circle text-red-500';
                case 'info': return 'fa-info-circle text-blue-500';
                default: return 'fa-bell text-gray-500';
            }
        };

        const getBgColor = () => {
            switch (type) {
                case 'success': return 'bg-green-50 border-green-200';
                case 'error': return 'bg-red-50 border-red-200';
                case 'info': return 'bg-blue-50 border-blue-200';
                default: return 'bg-gray-50 border-gray-200';
            }
        };

        return (
            <div 
                data-name="toast-notification" 
                data-file="components/ToastNotification.js"
                className={`fixed top-4 right-4 left-4 sm:left-auto max-w-sm w-full sm:w-auto rounded-lg border shadow-lg z-50 transform transition-all duration-300 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                } ${getBgColor()}`}
            >
                <div className="p-4 flex items-center">
                    <i className={`fas ${getIcon()} mr-3 text-lg flex-shrink-0`}></i>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-3 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ToastNotification component error:', error);
        reportError(error);
        return null;
    }
}
