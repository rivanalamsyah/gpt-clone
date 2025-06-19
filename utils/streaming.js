const StreamingUtils = {
    simulateStreaming: async (text, onUpdate, onComplete) => {
        try {
            const words = text.split(' ');
            let currentText = '';
            
            for (let i = 0; i < words.length; i++) {
                currentText += (i > 0 ? ' ' : '') + words[i];
                onUpdate(currentText);
                
                // Random delay between 50-150ms for realistic typing
                const delay = Math.random() * 100 + 50;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            onComplete(text);
        } catch (error) {
            console.error('Streaming error:', error);
            onComplete(text);
        }
    },
    
    calculateTypingSpeed: (text) => {
        const wordsPerMinute = 180; // Average typing speed
        const words = text.split(' ').length;
        return (words / wordsPerMinute) * 60 * 1000; // Convert to milliseconds
    }
};
