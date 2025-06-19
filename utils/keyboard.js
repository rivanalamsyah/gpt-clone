const KeyboardUtils = {
    setupShortcuts: (handlers) => {
        const handleKeyDown = (e) => {
            try {
                if (e.ctrlKey || e.metaKey) {
                    switch (e.key) {
                        case 'n':
                            e.preventDefault();
                            handlers.newChat?.();
                            break;
                        case 'k':
                            e.preventDefault();
                            handlers.search?.();
                            break;
                        case 'd':
                            e.preventDefault();
                            handlers.toggleDarkMode?.();
                            break;
                        case ',':
                            e.preventDefault();
                            handlers.openSettings?.();
                            break;
                        case 'Enter':
                            e.preventDefault();
                            handlers.sendMessage?.();
                            break;
                        case '/':
                            e.preventDefault();
                            handlers.showShortcuts?.();
                            break;
                    }
                } else if (e.key === 'Escape') {
                    handlers.closeModal?.();
                }
            } catch (error) {
                console.error('Keyboard shortcut error:', error);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }
};
