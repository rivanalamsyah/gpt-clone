function App() {
    try {
        const [messages, setMessages] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(false);
        const [sidebarOpen, setSidebarOpen] = React.useState(false);
        const [darkMode, setDarkMode] = React.useState(false);
        const [selectedModel, setSelectedModel] = React.useState('gpt-4');
        const [chatHistory, setChatHistory] = React.useState([]);
        const [currentChatId, setCurrentChatId] = React.useState(null);
        const [settings, setSettings] = React.useState({});
        const [showSettings, setShowSettings] = React.useState(false);
        const [showInsights, setShowInsights] = React.useState(false);
        const [showModelComparison, setShowModelComparison] = React.useState(false);
        const [showCollaboration, setShowCollaboration] = React.useState(false);
        const [showWorkflows, setShowWorkflows] = React.useState(false);
        const [showPlugins, setShowPlugins] = React.useState(false);
        const [showIntegrations, setShowIntegrations] = React.useState(false);
        const [showAPIManager, setShowAPIManager] = React.useState(false);
        const [toast, setToast] = React.useState({ message: '', type: '', isVisible: false });
        const [isTyping, setIsTyping] = React.useState(false);
        const [messageStatuses, setMessageStatuses] = React.useState({});
        const messagesEndRef = React.useRef(null);

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        React.useEffect(() => {
            scrollToBottom();
        }, [messages]);

        React.useEffect(() => {
            const savedHistory = ChatStorage.getChatHistory();
            setChatHistory(savedHistory);
            
            AnalyticsUtils.trackEvent('app_loaded', {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });

            const handleOnline = () => {
                MessageQueue.processQueue(handleSendMessage);
            };

            window.addEventListener('online', handleOnline);
            return () => window.removeEventListener('online', handleOnline);
        }, []);

        const updateMessageStatus = (messageId, status) => {
            setMessageStatuses(prev => ({
                ...prev,
                [messageId]: status
            }));
        };

        const handleSendMessage = async (messageData) => {
            if ((!messageData.text?.trim() && !messageData.files?.length) || isLoading) return;

            const userMessage = {
                id: Date.now().toString(),
                text: messageData.text || '',
                files: messageData.files || [],
                isUser: true,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, userMessage]);
            updateMessageStatus(userMessage.id, 'sending');

            if (!navigator.onLine) {
                MessageQueue.enqueue(messageData);
                updateMessageStatus(userMessage.id, 'failed');
                showToast('Message queued. Will send when back online.', 'info');
                return;
            }

            setIsLoading(true);
            setIsTyping(true);

            const startTime = Date.now();

            try {
                updateMessageStatus(userMessage.id, 'sent');
                
                AnalyticsUtils.trackEvent('message_sent', {
                    messageLength: messageData.text?.length || 0,
                    hasFiles: messageData.files?.length > 0,
                    model: selectedModel
                });

                const response = await getChatResponse(messageData.text || 'File uploaded', messages);
                const endTime = Date.now();

                updateMessageStatus(userMessage.id, 'delivered');

                const aiMessage = {
                    id: (Date.now() + 1).toString(),
                    text: response,
                    isUser: false,
                    timestamp: new Date().toISOString()
                };

                setMessages(prev => [...prev, aiMessage]);
                
                const chatTitle = messageData.text?.substring(0, 50) || 'New Chat';
                const chatData = {
                    id: currentChatId || Date.now().toString(),
                    title: chatTitle,
                    messages: [...messages, userMessage, aiMessage],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    model: selectedModel
                };

                ChatStorage.saveChat(chatData);
                setChatHistory(ChatStorage.getChatHistory());

                AnalyticsUtils.trackEvent('response_received', {
                    responseTime: endTime - startTime,
                    responseLength: response.length,
                    model: selectedModel
                });

            } catch (error) {
                console.error('Failed to get AI response:', error);
                updateMessageStatus(userMessage.id, 'failed');
                showToast(error.message || 'Failed to get response. Please try again.', 'error');
                
                AnalyticsUtils.trackEvent('response_error', {
                    error: error.message,
                    model: selectedModel
                });
            } finally {
                setIsLoading(false);
                setIsTyping(false);
            }
        };

        const handleRetryMessage = async (messageData) => {
            await handleSendMessage(messageData);
        };

        const handleClearChat = () => {
            setMessages([]);
            setCurrentChatId(null);
            setMessageStatuses({});
            AnalyticsUtils.trackEvent('chat_cleared');
        };

        const handleSelectTemplate = (templatePrompt) => {
            handleSendMessage({ text: templatePrompt });
            AnalyticsUtils.trackEvent('template_used', {
                templateLength: templatePrompt.length
            });
        };

        const handleModelChange = (newModel) => {
            setSelectedModel(newModel);
            AnalyticsUtils.trackEvent('model_changed', {
                previousModel: selectedModel,
                newModel: newModel
            });
        };

        const showToast = (message, type) => {
            setToast({ message, type, isVisible: true });
        };

        return (
            <ErrorBoundary>
                <MobileOptimizer onSwipeLeft={() => setSidebarOpen(false)} onSwipeRight={() => setSidebarOpen(true)}>
                    <div className="chat-container">
                        {/* Connection Status */}
                        <ConnectionStatus />
                        
                        {/* Performance Monitor */}
                        <PerformanceMonitor onPerformanceUpdate={(metrics) => console.log('Performance:', metrics)} />
                        
                        {/* Sidebar */}
                        <Sidebar 
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                            chatHistory={chatHistory}
                            onSelectChat={(chat) => {
                                setMessages(chat.messages);
                                setCurrentChatId(chat.id);
                                setSidebarOpen(false);
                            }}
                            onNewChat={handleClearChat}
                            onClearAll={() => {
                                ChatStorage.clearHistory();
                                setChatHistory([]);
                                showToast('Chat history cleared', 'success');
                            }}
                            darkMode={darkMode}
                            onToggleDarkMode={() => setDarkMode(!darkMode)}
                            onOpenSettings={() => setShowSettings(true)}
                        />

                        {/* Header */}
                        <Header 
                            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                            darkMode={darkMode}
                            onClearChat={handleClearChat}
                            selectedModel={selectedModel}
                            onModelChange={handleModelChange}
                            messages={messages}
                        />

                        {/* Messages Area */}
                        <div className="messages-container">
                            {messages.length === 0 ? (
                                <WelcomeScreen 
                                    darkMode={darkMode}
                                    onSelectTemplate={handleSelectTemplate}
                                />
                            ) : (
                                <div>
                                    {messages.map((message) => (
                                        <div key={message.id}>
                                            <ChatMessage
                                                message={message.text}
                                                isUser={message.isUser}
                                                timestamp={message.timestamp}
                                                darkMode={darkMode}
                                                onReaction={() => {}}
                                                reactions={{}}
                                            />
                                            
                                            {message.isUser && (
                                                <div className="px-4 sm:px-6 mb-2">
                                                    <MessageStatus 
                                                        status={messageStatuses[message.id]}
                                                        timestamp={message.timestamp}
                                                    />
                                                    {messageStatuses[message.id] === 'failed' && (
                                                        <MessageRetry 
                                                            onRetry={() => handleRetryMessage({ text: message.text, files: message.files })}
                                                            isRetrying={isLoading}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {isLoading && <SkeletonLoader darkMode={darkMode} />}
                                    {isTyping && <TypingIndicator isVisible={isTyping} />}
                                    
                                    <SmartSuggestions 
                                        onSelectSuggestion={handleSelectTemplate}
                                        darkMode={darkMode}
                                        lastMessage={messages[messages.length - 1]}
                                    />
                                    
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <MessageInput 
                            onSendMessage={handleSendMessage}
                            isLoading={isLoading}
                            darkMode={darkMode}
                        />

                        {/* Enterprise Action Buttons */}
                        <div className="fixed bottom-20 right-4 flex flex-col space-y-2 z-40">
                            <button
                                onClick={() => setShowModelComparison(true)}
                                className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
                                title="Model Comparison"
                            >
                                <i className="fas fa-balance-scale"></i>
                            </button>
                            
                            <button
                                onClick={() => setShowWorkflows(true)}
                                className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
                                title="Workflows"
                            >
                                <i className="fas fa-cogs"></i>
                            </button>
                            
                            {messages.length > 0 && (
                                <button
                                    onClick={() => setShowInsights(true)}
                                    className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
                                    title="Insights"
                                >
                                    <i className="fas fa-chart-pie"></i>
                                </button>
                            )}
                        </div>

                        {/* Floating Action Button */}
                        <FloatingActionButton 
                            onClick={handleClearChat}
                            darkMode={darkMode}
                        />

                        {/* Modals */}
                        {showSettings && (
                            <SettingsModal 
                                isOpen={showSettings}
                                onClose={() => setShowSettings(false)}
                                settings={settings}
                                onUpdateSettings={setSettings}
                                darkMode={darkMode}
                            />
                        )}

                        {showInsights && (
                            <ConversationInsights 
                                messages={messages}
                                isOpen={showInsights}
                                onClose={() => setShowInsights(false)}
                                darkMode={darkMode}
                            />
                        )}

                        {showModelComparison && (
                            <ModelComparison 
                                isOpen={showModelComparison}
                                onClose={() => setShowModelComparison(false)}
                                onSelectModel={handleModelChange}
                                darkMode={darkMode}
                            />
                        )}

                        {showWorkflows && (
                            <WorkflowAutomation 
                                isOpen={showWorkflows}
                                onClose={() => setShowWorkflows(false)}
                                darkMode={darkMode}
                            />
                        )}

                        {/* Toast Notification */}
                        <ToastNotification 
                            message={toast.message}
                            type={toast.type}
                            isVisible={toast.isVisible}
                            onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                        />
                    </div>
                </MobileOptimizer>
            </ErrorBoundary>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
