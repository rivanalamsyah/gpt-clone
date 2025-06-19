const MarkdownUtils = {
    formatMessage: (text) => {
        try {
            if (!text) return '';
            
            const paragraphs = text.split('\n\n').filter(p => p.trim());
            
            let formatted = paragraphs.map(paragraph => {
                let para = paragraph.trim();
                
                // Professional code blocks
                if (para.includes('')) {
                    return para.replace(/(\w+)?\n?([\s\S]*?)/g, (match, lang, code) => {
                        const cleanCode = code.trim();
                        return `<div class="code-block-professional">
                            <pre><code>${cleanCode}</code></pre>
                        </div>`;
                    });
                }
                
                // Professional inline code
                para = para.replace(/`([^`\n]+)`/g, '<code class="inline-code-professional">$1</code>');
                
                // Professional bold text
                para = para.replace(/\*\*([^*]+)\*\*/g, '<strong class="professional-bold">$1</strong>');
                
                // Professional italic text
                para = para.replace(/\*([^*\n]+)\*/g, '<em class="professional-italic">$1</em>');
                
                // Professional bullet points
                para = para.replace(/^\* (.+)$/gm, '• $1');
                para = para.replace(/^\d+\. (.+)$/gm, '$1');
                
                // Professional links
                para = para.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="professional-link">$1</a>');
                
                return `<p class="chat-paragraph">${para}</p>`;
            }).join('');
                
            return `<div class="chat-content">${formatted}</div>`;
        } catch (error) {
            console.error('Markdown formatting error:', error);
            return `<div class="chat-content"><p class="chat-paragraph">${text}</p></div>`;
        }
    },
    
    stripMarkdown: (text) => {
        try {
            return text
                .replace(/[\s\S]*?/g, '[Code]')
                .replace(/`([^`]+)`/g, '$1')
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/\*([^*]+)\*/g, '$1')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/^\*\s+/gm, '• ')
                .replace(/^\d+\.\s+/gm, '');
        } catch (error) {
            console.error('Strip markdown error:', error);
            return text;
        }
    }
};
