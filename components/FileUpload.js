function FileUpload({ onFileUpload, darkMode, disabled }) {
    try {
        const [isDragging, setIsDragging] = React.useState(false);
        const [uploadProgress, setUploadProgress] = React.useState(0);
        const [isUploading, setIsUploading] = React.useState(false);
        const fileInputRef = React.useRef(null);

        const handleDragOver = (e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            setIsDragging(false);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setIsDragging(false);
            
            if (disabled) return;
            
            const files = Array.from(e.dataTransfer.files);
            handleFiles(files);
        };

        const handleFileSelect = (e) => {
            const files = Array.from(e.target.files);
            handleFiles(files);
        };

        const handleFiles = async (files) => {
            const validFiles = files.filter(file => {
                const validTypes = ['image/', 'text/', 'application/pdf', 'application/json'];
                return validTypes.some(type => file.type.startsWith(type)) && file.size <= 10 * 1024 * 1024; // 10MB
            });

            if (validFiles.length === 0) {
                alert('Please select valid files (images, text, PDF, JSON) under 10MB');
                return;
            }

            setIsUploading(true);
            
            for (let i = 0; i < validFiles.length; i++) {
                const file = validFiles[i];
                setUploadProgress(((i + 1) / validFiles.length) * 100);
                
                // Simulate upload delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const fileData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file),
                    timestamp: new Date().toISOString()
                };
                
                onFileUpload(fileData);
            }
            
            setIsUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
        };

        return (
            <div data-name="file-upload" data-file="components/FileUpload.js" className="relative">
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,text/*,.pdf,.json"
                    disabled={disabled}
                />
                
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isUploading}
                    className={`p-2 sm:p-3 rounded-lg transition-all flex-shrink-0 ${
                        disabled || isUploading
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white hover:scale-105'
                    }`}
                    title="Upload file"
                >
                    {isUploading ? (
                        <i className="fas fa-spinner fa-spin text-sm"></i>
                    ) : (
                        <i className="fas fa-paperclip text-sm"></i>
                    )}
                </button>

                {/* Upload Progress */}
                {isUploading && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded">
                        Uploading... {Math.round(uploadProgress)}%
                        <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                            <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Drag and Drop Overlay */}
                {isDragging && (
                    <div 
                        className="fixed inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center z-50"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="bg-white rounded-lg p-8 text-center shadow-2xl">
                            <i className="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-4"></i>
                            <p className="text-lg font-semibold text-gray-800">Drop files here to upload</p>
                            <p className="text-sm text-gray-600 mt-2">Images, text, PDF, JSON files (max 10MB)</p>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('FileUpload component error:', error);
        reportError(error);
        return null;
    }
}
