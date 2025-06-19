function VoiceInput({ onVoiceInput, darkMode, isListening, onToggleListening }) {
    try {
        const [isSupported, setIsSupported] = React.useState(false);
        const [transcript, setTranscript] = React.useState('');

        React.useEffect(() => {
            setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
        }, []);

        const startListening = () => {
            if (!isSupported) return;
            
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                setTranscript(transcript);
                
                if (event.results[current].isFinal) {
                    onVoiceInput(transcript);
                    setTranscript('');
                }
            };

            recognition.onerror = () => {
                onToggleListening();
            };

            recognition.onend = () => {
                onToggleListening();
            };

            recognition.start();
        };

        const handleVoiceClick = () => {
            if (!isSupported) {
                alert('Speech recognition is not supported in your browser.');
                return;
            }
            
            if (!isListening) {
                startListening();
            }
            onToggleListening();
        };

        if (!isSupported) return null;

        return (
            <button
                data-name="voice-input"
                data-file="components/VoiceInput.js"
                onClick={handleVoiceClick}
                className={`p-2 sm:p-3 rounded-lg transition-all flex-shrink-0 ${
                    isListening 
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
            >
                <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} text-sm`}></i>
            </button>
        );
    } catch (error) {
        console.error('VoiceInput component error:', error);
        reportError(error);
        return null;
    }
}
