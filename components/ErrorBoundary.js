function ErrorBoundary({ children, fallback }) {
    try {
        const [hasError, setHasError] = React.useState(false);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            const handleError = (event) => {
                setHasError(true);
                setError(event.error);
                console.error('Error caught by boundary:', event.error);
            };

            window.addEventListener('error', handleError);
            return () => window.removeEventListener('error', handleError);
        }, []);

        if (hasError) {
            return fallback || (
                <div data-name="error-boundary" data-file="components/ErrorBoundary.js" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                        <i className="fas fa-exclamation-triangle text-white text-xl"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h2>
                    <p className="text-red-600 text-center mb-4 max-w-md">
                        An unexpected error occurred. Please refresh the page or try again later.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return children;
    } catch (error) {
        console.error('ErrorBoundary component error:', error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600">Critical error occurred</p>
            </div>
        );
    }
}
