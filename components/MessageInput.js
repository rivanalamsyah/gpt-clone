function MessageInput({ onSendMessage, isLoading, darkMode }) {
    try {
        const [message, setMessage] = React.useState('');
        const [isFocused, setIsFocused] = React.useState(false);
        const [isListening, setIsListening] = React.useState(false);
        const [uploadedFiles, setUploadedFiles] = React.useState([]);
        const textareaRef = React.useRef(null);

        const handleSubmit = (e) => {
            e.preventDefault();
            if ((message.trim() || uploadedFiles.length > 0) && !isLoading) {
                const messageData = {
                    text: message.trim(),
                    files: uploadedFiles
                };
                onSendMessage(messageData);
                setMessage('');
                setUploadedFiles([]);
                adjustTextareaHeight();
            }
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
        };

        const adjustTextareaHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
            }
        };

        const handleVoiceInput = (transcript) => {
            setMessage(transcript);
            adjustTextareaHeight();
        };

        const handleFileUpload = (fileData) => {
            setUploadedFiles(prev => [...prev, fileData]);
        };

        const handleRemoveFile = (fileToRemove) => {
            setUploadedFiles(prev => prev.filter(file => file !== fileToRemove));
        };

        React.useEffect(() => {
            adjustTextareaHeight();
        }, [message]);

        return (
            <div data-name="message-input" data-file="components/MessageInput.js" className="input-fixed glass-morphism border-t border-white border-opacity-20 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
                <div className="w-full max-w-4xl mx-auto">
                    {/* File Previews */}
                    {uploadedFiles.length > 0 && (
                        <div className="mb-3 space-y-2">
                            {uploadedFiles.map((file, index) => (
                                <FilePreview 
                                    key={index}
                                    file={file}
                                    onRemove={handleRemoveFile}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={`flex items-end space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-morphism border-2 transition-all duration-300 ${
                            isFocused ? 'border-purple-400 shadow-lg scale-[1.02]' : 'border-transparent'
                        }`}>
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Message Vansky AI..."
                                className="flex-1 resize-none border-none outline-none bg-transparent text-white placeholder-white placeholder-opacity-60 text-sm sm:text-base leading-relaxed min-h-[24px] max-h-[120px]"
                                rows="1"
                                disabled={isLoading}
                            />
                            
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <FileUpload 
                                    onFileUpload={handleFileUpload}
                                    darkMode={darkMode}
                                    disabled={isLoading}
                                />
                                
                                <VoiceInput 
                                    onVoiceInput={handleVoiceInput}
                                    darkMode={darkMode}
                                    isListening={isListening}
                                    onToggleListening={() => setIsListening(!isListening)}
                                />
                                
                                <button
                                    type="submit"
                                    disabled={(!message.trim() && uploadedFiles.length === 0) || isLoading}
                                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 ${
                                        (message.trim() || uploadedFiles.length > 0) && !isLoading
                                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-110' 
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                                    }`}
                                >
                                    {isLoading ? (
                                        <i className="fas fa-spinner fa-spin text-sm"></i>
                                    ) : (
                                        <i className="fas fa-paper-plane text-sm"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessageInput component error:', error);
        reportError(error);
        return null;
    }
}
