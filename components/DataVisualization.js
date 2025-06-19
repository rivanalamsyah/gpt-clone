function DataVisualization({ darkMode }) {
    try {
        const [chartType, setChartType] = React.useState('usage');
        const [timeRange, setTimeRange] = React.useState('7days');
        const [exportFormat, setExportFormat] = React.useState('png');

        const chartTypes = [
            { id: 'usage', name: 'Usage Trends', icon: 'fa-chart-line' },
            { id: 'performance', name: 'Performance', icon: 'fa-tachometer-alt' },
            { id: 'costs', name: 'Cost Analysis', icon: 'fa-dollar-sign' },
            { id: 'users', name: 'User Activity', icon: 'fa-users' }
        ];

        const generateReport = () => {
            console.log(`Generating ${chartType} report for ${timeRange} in ${exportFormat} format`);
        };

        const exportChart = () => {
            console.log(`Exporting chart as ${exportFormat}`);
        };

        return (
            <div data-name="data-visualization" data-file="components/DataVisualization.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Data Visualization</h2>
                    <div className="flex space-x-2">
                        <select
                            value={exportFormat}
                            onChange={(e) => setExportFormat(e.target.value)}
                            className={`px-3 py-2 border rounded-lg ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        >
                            <option value="png">PNG</option>
                            <option value="pdf">PDF</option>
                            <option value="svg">SVG</option>
                        </select>
                        <button
                            onClick={exportChart}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Export
                        </button>
                    </div>
                </div>

                {/* Chart Type Selector */}
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {chartTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setChartType(type.id)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                chartType === type.id
                                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${type.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{type.name}</span>
                        </button>
                    ))}
                </div>

                {/* Time Range Selector */}
                <div className="flex space-x-2">
                    {['24h', '7days', '30days', '90days'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                timeRange === range
                                    ? 'bg-blue-500 text-white'
                                    : darkMode 
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                {/* Chart Container */}
                <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <div className="text-center">
                            <i className={`fas ${chartTypes.find(t => t.id === chartType)?.icon} text-4xl text-blue-500 mb-4`}></i>
                            <p className="text-lg font-medium">{chartTypes.find(t => t.id === chartType)?.name}</p>
                            <p className="text-sm text-gray-600">Showing data for {timeRange}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className="text-2xl font-bold text-blue-600">2.5K</div>
                        <div className="text-sm text-gray-600">Total Sessions</div>
                        <div className="text-xs text-green-600">↑ 12% from last period</div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className="text-2xl font-bold text-green-600">18.5K</div>
                        <div className="text-sm text-gray-600">API Calls</div>
                        <div className="text-xs text-green-600">↑ 8% from last period</div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className="text-2xl font-bold text-purple-600">$127</div>
                        <div className="text-sm text-gray-600">Total Cost</div>
                        <div className="text-xs text-red-600">↑ 3% from last period</div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className="text-2xl font-bold text-orange-600">94.5%</div>
                        <div className="text-sm text-gray-600">Satisfaction</div>
                        <div className="text-xs text-green-600">↑ 2% from last period</div>
                    </div>
                </div>

                {/* Export Options */}
                <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <h3 className="text-lg font-semibold mb-3">Export Options</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => generateReport()}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Generate Report
                        </button>
                        <button
                            onClick={() => exportChart()}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Export Chart
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DataVisualization component error:', error);
        reportError(error);
        return null;
    }
}
