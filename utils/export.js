const ExportUtils = {
    // Export chat to different formats
    exportChat: (chatData, format = 'json') => {
        try {
            let content, filename, mimeType;
            
            switch (format) {
                case 'json':
                    content = JSON.stringify(chatData, null, 2);
                    filename = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
                    mimeType = 'application/json';
                    break;
                    
                case 'txt':
                    content = ExportUtils.formatAsText(chatData);
                    filename = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
                    mimeType = 'text/plain';
                    break;
                    
                case 'markdown':
                    content = ExportUtils.formatAsMarkdown(chatData);
                    filename = `chat-export-${new Date().toISOString().split('T')[0]}.md`;
                    mimeType = 'text/markdown';
                    break;
                    
                case 'csv':
                    content = ExportUtils.formatAsCSV(chatData);
                    filename = `chat-export-${new Date().toISOString().split('T')[0]}.csv`;
                    mimeType = 'text/csv';
                    break;
                    
                default:
                    throw new Error('Unsupported export format');
            }
            
            ExportUtils.downloadFile(content, filename, mimeType);
        } catch (error) {
            console.error('Export error:', error);
            throw error;
        }
    },

    // Format chat as plain text
    formatAsText: (chatData) => {
        const header = `Chat Export - ${chatData.title}\nExported: ${new Date().toLocaleString()}\n${'='.repeat(50)}\n\n`;
        
        const messages = chatData.messages.map(msg => {
            const sender = msg.isUser ? 'You' : 'AI';
            const timestamp = new Date(msg.timestamp).toLocaleString();
            return `[${timestamp}] ${sender}: ${msg.text}\n`;
        }).join('\n');
        
        return header + messages;
    },

    // Format chat as Markdown
    formatAsMarkdown: (chatData) => {
        const header = `# ${chatData.title}\n\n**Exported:** ${new Date().toLocaleString()}\n\n---\n\n`;
        
        const messages = chatData.messages.map(msg => {
            const sender = msg.isUser ? '**You**' : '**AI Assistant**';
            const timestamp = new Date(msg.timestamp).toLocaleString();
            return `### ${sender} *(${timestamp})*\n\n${msg.text}\n\n---\n`;
        }).join('\n');
        
        return header + messages;
    },

    // Format chat as CSV
    formatAsCSV: (chatData) => {
        const header = 'Timestamp,Sender,Message\n';
        
        const rows = chatData.messages.map(msg => {
            const timestamp = new Date(msg.timestamp).toISOString();
            const sender = msg.isUser ? 'User' : 'AI';
            const message = `"${msg.text.replace(/"/g, '""')}"`;
            return `${timestamp},${sender},${message}`;
        }).join('\n');
        
        return header + rows;
    },

    // Download file
    downloadFile: (content, filename, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Import chat from file
    importChat: (file) => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        resolve(data);
                    } catch (parseError) {
                        reject(new Error('Invalid file format'));
                    }
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsText(file);
            } catch (error) {
                reject(error);
            }
        });
    }
};
