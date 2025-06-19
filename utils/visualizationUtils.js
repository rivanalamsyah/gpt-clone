const VisualizationUtils = {
    // Generate chart data
    generateChartData: (type, timeRange) => {
        try {
            const now = new Date();
            const dataPoints = [];
            
            switch (timeRange) {
                case '24h':
                    for (let i = 23; i >= 0; i--) {
                        const hour = new Date(now - i * 60 * 60 * 1000);
                        dataPoints.push({
                            label: hour.getHours() + ':00',
                            value: Math.floor(Math.random() * 100) + 20
                        });
                    }
                    break;
                    
                case '7days':
                    for (let i = 6; i >= 0; i--) {
                        const day = new Date(now - i * 24 * 60 * 60 * 1000);
                        dataPoints.push({
                            label: day.toLocaleDateString('en', { weekday: 'short' }),
                            value: Math.floor(Math.random() * 200) + 50
                        });
                    }
                    break;
                    
                case '30days':
                    for (let i = 29; i >= 0; i--) {
                        const day = new Date(now - i * 24 * 60 * 60 * 1000);
                        dataPoints.push({
                            label: day.getDate().toString(),
                            value: Math.floor(Math.random() * 500) + 100
                        });
                    }
                    break;
                    
                default:
                    dataPoints.push({ label: 'No Data', value: 0 });
            }
            
            return dataPoints;
        } catch (error) {
            console.error('Error generating chart data:', error);
            return [];
        }
    },

    // Export chart as image
    exportChart: async (chartElement, format = 'png') => {
        try {
            // Simulate chart export
            console.log(`Exporting chart as ${format}`);
            
            const exportData = {
                format,
                timestamp: new Date().toISOString(),
                size: { width: 800, height: 400 }
            };
            
            return exportData;
        } catch (error) {
            console.error('Chart export error:', error);
            throw error;
        }
    },

    // Generate report
    generateReport: (reportType, data, options = {}) => {
        try {
            const report = {
                id: Date.now().toString(),
                type: reportType,
                generatedAt: new Date().toISOString(),
                data,
                options,
                summary: VisualizationUtils.generateSummary(data)
            };
            
            return report;
        } catch (error) {
            console.error('Report generation error:', error);
            throw error;
        }
    },

    // Generate data summary
    generateSummary: (data) => {
        try {
            if (!Array.isArray(data) || data.length === 0) {
                return { total: 0, average: 0, trend: 'stable' };
            }
            
            const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
            const average = total / data.length;
            
            // Calculate trend
            const firstHalf = data.slice(0, Math.floor(data.length / 2));
            const secondHalf = data.slice(Math.floor(data.length / 2));
            
            const firstAvg = firstHalf.reduce((sum, item) => sum + (item.value || 0), 0) / firstHalf.length;
            const secondAvg = secondHalf.reduce((sum, item) => sum + (item.value || 0), 0) / secondHalf.length;
            
            let trend = 'stable';
            if (secondAvg > firstAvg * 1.1) trend = 'increasing';
            else if (secondAvg < firstAvg * 0.9) trend = 'decreasing';
            
            return {
                total: Math.round(total),
                average: Math.round(average),
                trend,
                dataPoints: data.length
            };
        } catch (error) {
            console.error('Summary generation error:', error);
            return { total: 0, average: 0, trend: 'unknown' };
        }
    },

    // Get visualization templates
    getVisualizationTemplates: () => {
        return [
            { id: 'line-chart', name: 'Line Chart', icon: 'fa-chart-line', description: 'Show trends over time' },
            { id: 'bar-chart', name: 'Bar Chart', icon: 'fa-chart-bar', description: 'Compare values' },
            { id: 'pie-chart', name: 'Pie Chart', icon: 'fa-chart-pie', description: 'Show proportions' },
            { id: 'area-chart', name: 'Area Chart', icon: 'fa-chart-area', description: 'Show cumulative data' },
            { id: 'scatter-plot', name: 'Scatter Plot', icon: 'fa-braille', description: 'Show correlations' },
            { id: 'heatmap', name: 'Heatmap', icon: 'fa-th', description: 'Show data density' }
        ];
    },

    // Save visualization
    saveVisualization: (visualization) => {
        try {
            const savedVisualizations = JSON.parse(localStorage.getItem('saved_visualizations') || '[]');
            const newVisualization = {
                ...visualization,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            
            savedVisualizations.push(newVisualization);
            localStorage.setItem('saved_visualizations', JSON.stringify(savedVisualizations));
            
            return newVisualization;
        } catch (error) {
            console.error('Error saving visualization:', error);
            throw error;
        }
    },

    // Get saved visualizations
    getSavedVisualizations: () => {
        try {
            return JSON.parse(localStorage.getItem('saved_visualizations') || '[]');
        } catch (error) {
            console.error('Error getting saved visualizations:', error);
            return [];
        }
    }
};
