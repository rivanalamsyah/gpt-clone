function FilePreview({ file, onRemove, darkMode }) {
    try {
        const getFileIcon = (type) => {
            if (type.startsWith('image/')) return 'fa-image';
            if (type.startsWith('text/')) return 'fa-file-alt';
            if (type === 'application/pdf') return 'fa-file-pdf';
            if (type === 'application/json') return 'fa-file-code';
            return 'fa-file';
        };

        const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        const isImage = file.type.startsWith('image/');

        return (
            <div data-name="file-preview" data-file="components/FilePreview.js" className={`flex items-center space-x-3 p-3 rounded-lg border transition-all hover:shadow-md ${
                darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
                {isImage ? (
                    <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded-lg"
                    />
                ) : (
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                        <i className={`fas ${getFileIcon(file.type)} text-lg ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}></i>
                    </div>
                )}
                
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                        {file.name}
                    </p>
                    <p className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        {formatFileSize(file.size)}
                    </p>
                </div>
                
                <button
                    onClick={() => onRemove(file)}
                    className={`p-2 rounded-full transition-colors hover:scale-110 ${
                        darkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-10' 
                            : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title="Remove file"
                >
                    <i className="fas fa-times text-sm"></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('FilePreview component error:', error);
        reportError(error);
        return null;
    }
}
