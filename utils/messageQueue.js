const MessageQueue = {
    // Queue key for localStorage
    QUEUE_KEY: 'message_queue',

    // Add message to queue
    enqueue: (message) => {
        try {
            const queue = MessageQueue.getQueue();
            const queueItem = {
                id: Date.now().toString(),
                message,
                timestamp: new Date().toISOString(),
                retryCount: 0,
                maxRetries: 3
            };
            
            queue.push(queueItem);
            localStorage.setItem(MessageQueue.QUEUE_KEY, JSON.stringify(queue));
            return queueItem.id;
        } catch (error) {
            console.error('Failed to enqueue message:', error);
            return null;
        }
    },

    // Remove message from queue
    dequeue: (messageId) => {
        try {
            const queue = MessageQueue.getQueue();
            const filteredQueue = queue.filter(item => item.id !== messageId);
            localStorage.setItem(MessageQueue.QUEUE_KEY, JSON.stringify(filteredQueue));
        } catch (error) {
            console.error('Failed to dequeue message:', error);
        }
    },

    // Get all queued messages
    getQueue: () => {
        try {
            return JSON.parse(localStorage.getItem(MessageQueue.QUEUE_KEY) || '[]');
        } catch (error) {
            console.error('Failed to get message queue:', error);
            return [];
        }
    },

    // Process queue when back online
    processQueue: async (sendFunction) => {
        try {
            const queue = MessageQueue.getQueue();
            if (queue.length === 0) return;

            for (const item of queue) {
                try {
                    await sendFunction(item.message);
                    MessageQueue.dequeue(item.id);
                } catch (error) {
                    item.retryCount++;
                    if (item.retryCount >= item.maxRetries) {
                        MessageQueue.dequeue(item.id);
                        console.error('Message failed after max retries:', item);
                    } else {
                        // Update retry count
                        const queue = MessageQueue.getQueue();
                        const updatedQueue = queue.map(qItem => 
                            qItem.id === item.id ? { ...qItem, retryCount: item.retryCount } : qItem
                        );
                        localStorage.setItem(MessageQueue.QUEUE_KEY, JSON.stringify(updatedQueue));
                    }
                }
            }
        } catch (error) {
            console.error('Failed to process message queue:', error);
        }
    },

    // Clear entire queue
    clearQueue: () => {
        try {
            localStorage.removeItem(MessageQueue.QUEUE_KEY);
        } catch (error) {
            console.error('Failed to clear message queue:', error);
        }
    }
};
