function EnterpriseFeatures({ darkMode }) {
    try {
        const [activeSection, setActiveSection] = React.useState('administration');
        const [adminSettings, setAdminSettings] = React.useState({
            userManagement: true,
            auditLogging: true,
            dataRetention: '1year',
            apiLimits: 1000,
            ssoEnabled: false,
            complianceMode: 'GDPR'
        });

        const sections = [
            { id: 'administration', name: 'Administration', icon: 'fa-cogs' },
            { id: 'security', name: 'Security', icon: 'fa-shield-alt' },
            { id: 'compliance', name: 'Compliance', icon: 'fa-balance-scale' },
            { id: 'monitoring', name: 'Monitoring', icon: 'fa-chart-line' },
            { id: 'billing', name: 'Billing', icon: 'fa-credit-card' }
        ];

        const handleSettingChange = (key, value) => {
            setAdminSettings(prev => ({ ...prev, [key]: value }));
        };

        return (
            <div data-name="enterprise-features" data-file="components/EnterpriseFeatures.js" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Enterprise Features</h2>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            Enterprise Plan
                        </span>
                    </div>
                </div>

                {/* Section Navigation */}
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                activeSection === section.id
                                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            <i className={`fas ${section.icon} mr-2`}></i>
                            <span className="hidden sm:inline">{section.name}</span>
                        </button>
                    ))}
                </div>

                {/* Administration */}
                {activeSection === 'administration' && (
                    <div className="space-y-4">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">User Management</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Enable user management</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={adminSettings.userManagement}
                                            onChange={(e) => handleSettingChange('userManagement', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Data Retention Policy</label>
                                    <select
                                        value={adminSettings.dataRetention}
                                        onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                                        className={`w-full p-2 border rounded-lg ${
                                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                        }`}
                                    >
                                        <option value="30days">30 Days</option>
                                        <option value="90days">90 Days</option>
                                        <option value="1year">1 Year</option>
                                        <option value="forever">Forever</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">API Rate Limit (per hour)</label>
                                    <input
                                        type="number"
                                        value={adminSettings.apiLimits}
                                        onChange={(e) => handleSettingChange('apiLimits', parseInt(e.target.value))}
                                        className={`w-full p-2 border rounded-lg ${
                                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security */}
                {activeSection === 'security' && (
                    <div className="space-y-4">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">Security Controls</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Two-Factor Authentication</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Enabled</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">End-to-End Encryption</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Session Management</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">IP Whitelisting</span>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Configure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Compliance */}
                {activeSection === 'compliance' && (
                    <div className="space-y-4">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">Compliance Standards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border rounded-lg text-center">
                                    <i className="fas fa-shield-alt text-2xl text-green-500 mb-2"></i>
                                    <div className="font-medium">GDPR</div>
                                    <div className="text-xs text-green-600">Compliant</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <i className="fas fa-lock text-2xl text-green-500 mb-2"></i>
                                    <div className="font-medium">SOC 2</div>
                                    <div className="text-xs text-green-600">Certified</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <i className="fas fa-certificate text-2xl text-blue-500 mb-2"></i>
                                    <div className="font-medium">ISO 27001</div>
                                    <div className="text-xs text-blue-600">In Progress</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Monitoring */}
                {activeSection === 'monitoring' && (
                    <div className="space-y-4">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">System Monitoring</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                                    <div className="text-sm text-gray-600">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">1.2s</div>
                                    <div className="text-sm text-gray-600">Response Time</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">2.5K</div>
                                    <div className="text-sm text-gray-600">Active Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">0.1%</div>
                                    <div className="text-sm text-gray-600">Error Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Billing */}
                {activeSection === 'billing' && (
                    <div className="space-y-4">
                        <div className={`p-6 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                            <h3 className="text-lg font-semibold mb-4">Billing Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">$299/mo</div>
                                    <div className="text-sm text-gray-600">Enterprise Plan</div>
                                    <div className="text-xs text-gray-500">Next billing: Jan 15, 2024</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>API Calls Used</span>
                                        <span>75,000 / 100,000</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('EnterpriseFeatures component error:', error);
        reportError(error);
        return null;
    }
}
