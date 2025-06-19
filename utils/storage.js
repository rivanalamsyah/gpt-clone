const ChatStorage = {
    STORAGE_KEY: 'chatgpt_clone_history',
    
    saveChat: (chatData) => {
        try {
            const history = ChatStorage.getChatHistory();
            const existingIndex = history.findIndex(chat => chat.id === chatData.id);
            
            if (existingIndex >= 0) {
                history[existingIndex] = chatData;
            } else {
                history.unshift(chatData);
            }
            
            localStorage.setItem(ChatStorage.STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
        } catch (error) {
            console.error('Error saving chat:', error);
        }
    },
    
    getChatHistory: () => {
        try {
            const stored = localStorage.getItem(ChatStorage.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading chat history:', error);
            return [];
        }
    },
    
    clearHistory: () => {
        try {
            localStorage.removeItem(ChatStorage.STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing chat history:', error);
        }
    }
};
