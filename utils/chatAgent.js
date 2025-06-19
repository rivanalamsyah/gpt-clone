async function getChatResponse(message, chatHistory, retryCount = 0) {
    try {
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message input');
        }

        // Check if offline
        if (!navigator.onLine) {
            throw new Error('No internet connection available');
        }

        const systemPrompt = `You are Vansky AI, a helpful and friendly AI assistant. Please respond naturally and conversationally:

RESPONSE GUIDELINES:
- Write in a friendly, conversational tone
- Use simple paragraphs separated by double line breaks
- Keep responses helpful but concise
- Use **bold** for important points only
- Use \`code\` for technical terms or code snippets
- Use bullet points (•) for lists when helpful
- Be direct and clear in your explanations
- Provide practical examples when relevant

Remember to be helpful, accurate, and easy to understand.

### Recent conversation:
${JSON.stringify(chatHistory.slice(-6))}`;

        const userPrompt = message.trim();
        
        // Simulate network delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        const response = await invokeAIAgent(systemPrompt, userPrompt);
        
        if (!response || typeof response !== 'string') {
            throw new Error('Invalid AI response received');
        }
        
        return response.trim();
    } catch (error) {
        console.error('Chat agent error:', error);
        
        // Retry logic for network errors
        if (retryCount < 2 && (error.message.includes('network') || error.message.includes('timeout'))) {
            console.log(`Retrying chat request (attempt ${retryCount + 1})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
            return getChatResponse(message, chatHistory, retryCount + 1);
        }
        
        // Return user-friendly error message
        const userMessage = ErrorHandler.handleAPIError(error, 'Chat Response');
        throw new Error(userMessage);
    }
}
