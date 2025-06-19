function MessageStatus({ status, timestamp }) {
    try {
        const getStatusIcon = () => {
            switch (status) {
                case 'sending':
                    return <i className="fas fa-clock text-gray-400 animate-pulse"></i>;
                case 'sent':
                    return <i className="fas fa-check text-gray-400"></i>;
                case 'delivered':
                    return <i className="fas fa-check-double text-blue-400"></i>;
                case 'failed':
                    return <i className="fas fa-exclamation-triangle text-red-400"></i>;
                default:
                    return null;
            }
        };

        const getStatusText = () => {
            switch (status) {
                case 'sending':
                    return 'Sending...';
                case 'sent':
                    return 'Sent';
                case 'delivered':
                    return 'Delivered';
                case 'failed':
                    return 'Failed to send';
                default:
                    return '';
            }
        };

        const formatTime = (timestamp) => {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        };

        return (
            <div 
                data-name="message-status" 
                data-file="components/MessageStatus.js"
                className="flex items-center space-x-1 text-xs"
                title={getStatusText()}
            >
                {timestamp && (
                    <span className="text-gray-500">{formatTime(timestamp)}</span>
                )}
                {getStatusIcon()}
            </div>
        );
    } catch (error) {
        console.error('MessageStatus component error:', error);
        reportError(error);
        return null;
    }
}
