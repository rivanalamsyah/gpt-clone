function LoadingDots() {
    try {
        return (
            <div data-name="loading-dots" data-file="components/LoadingDots.js" className="flex space-x-1">
                <div 
                    className="w-2 h-2 bg-current rounded-full typing-animation" 
                    style={{animationDelay: '0ms'}}
                ></div>
                <div 
                    className="w-2 h-2 bg-current rounded-full typing-animation" 
                    style={{animationDelay: '150ms'}}
                ></div>
                <div 
                    className="w-2 h-2 bg-current rounded-full typing-animation" 
                    style={{animationDelay: '300ms'}}
                ></div>
            </div>
        );
    } catch (error) {
        console.error('LoadingDots component error:', error);
        reportError(error);
        return null;
    }
}
