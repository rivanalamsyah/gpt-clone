function AdvancedExport({ chatHistory, darkMode }) {
    try {
        const [exportFormat, setExportFormat] = React.useState('json');
        const [isExporting, setIsExporting] = React.useState(false);
        const [importProgress, setImportProgress] = React.useState(0);

        const exportFormats = [
            { id: 'json', name: 'JSON', description: 'Complete data', icon: 'fa-file-code' },
            { id: 'csv', name: 'CSV', description: 'Spreadsheet format', icon: 'fa-file-csv' },
            { id: 'pdf', name: 'PDF', description: 'Document format', icon: 'fa-file-pdf' },
            { id: 'html', name: 'HTML', description: 'Web format', icon: 'fa-file-code' }
        ];

        const handleExport = async () => {
            setIsExporting(true);
            try {
                const exportData = {
                    exportDate: new Date().toISOString(),
                    totalChats: chatHistory.length,
                    chats: chatHistory
                };
                
                const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                    type: 'application/json'
                });
                
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `vansky-ai-export-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Export error:', error);
            } finally {
                setIsExporting(false);
            }
        };

        const handleImport = async (file) => {
            if (!file) return;
            
            setImportProgress(0);
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.chats && Array.isArray(data.chats)) {
                        for (const chat of data.chats) {
                            ChatStorage.saveChat(chat);
                        }
                        alert(`Successfully imported ${data.chats.length} conversations`);
                    } else {
                        alert('Invalid file format');
                    }
                } catch (error) {
                    alert('Error importing file: ' + error.message);
                } finally {
                    setImportProgress(0);
                }
            };
            
            reader.readAsText(file);
        };

        return (
            <div data-name="advanced-export" data-file="components/AdvancedExport.js" className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Export & Import</h2>
                
                {/* Export Section */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Export Conversations</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {exportFormats.map((format) => (
                            <button
                                key={format.id}
                                onClick={() => setExportFormat(format.id)}
                                className={`p-3 border rounded-lg text-left transition-all ${
                                    exportFormat === format.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <div className="flex items-center space-x-2 mb-1">
                                    <i className={`fas ${format.icon}`}></i>
                                    <span className="font-medium">{format.name}</span>
                                </div>
                                <p className="text-xs text-gray-600">{format.description}</p>
                            </button>
                        ))}
                    </div>
                    
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                            isExporting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
                    </button>
                </div>
                
                {/* Import Section */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-4">Import Conversations</h3>
                    
                    <input
                        type="file"
                        accept=".json"
                        onChange={(e) => handleImport(e.target.files[0])}
                        className="w-full p-3 border rounded-lg"
                    />
                    
                    {importProgress > 0 && (
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${importProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-center mt-2">{Math.round(importProgress)}% imported</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdvancedExport component error:', error);
        reportError(error);
        return null;
    }
}
