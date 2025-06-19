function SkeletonLoader({ darkMode }) {
    try {
        return (
            <div data-name="skeleton-loader" data-file="components/SkeletonLoader.js" className="message-spacing flex justify-start px-4 sm:px-6">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } skeleton-shimmer`}></div>
                </div>
                
                <div className="flex-1 max-w-md">
                    <div className={`rounded-2xl rounded-bl-md p-4 sm:p-5 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                        <div className="space-y-3">
                            <div className={`h-4 rounded ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            } skeleton-shimmer`}></div>
                            <div className={`h-4 rounded w-3/4 ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            } skeleton-shimmer`}></div>
                            <div className={`h-4 rounded w-1/2 ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            } skeleton-shimmer`}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-300 border-opacity-20">
                            <div className={`h-3 w-12 rounded ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            } skeleton-shimmer`}></div>
                            <div className={`h-3 w-8 rounded ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            } skeleton-shimmer`}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SkeletonLoader component error:', error);
        reportError(error);
        return null;
    }
}
