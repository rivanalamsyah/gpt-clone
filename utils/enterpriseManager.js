const EnterpriseUtils = {
    // Get enterprise settings
    getEnterpriseSettings: () => {
        try {
            return JSON.parse(localStorage.getItem('enterprise_settings') || '{}');
        } catch (error) {
            console.error('Error getting enterprise settings:', error);
            return {};
        }
    },

    // Save enterprise settings
    saveEnterpriseSettings: (settings) => {
        try {
            localStorage.setItem('enterprise_settings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving enterprise settings:', error);
            throw error;
        }
    },

    // Validate enterprise license
    validateLicense: () => {
        try {
            const license = localStorage.getItem('enterprise_license');
            if (!license) {
                return { valid: false, reason: 'No license found' };
            }

            // Simulate license validation
            const licenseData = JSON.parse(license);
            const now = new Date();
            const expiry = new Date(licenseData.expiresAt);

            if (now > expiry) {
                return { valid: false, reason: 'License expired' };
            }

            return { valid: true, licenseData };
        } catch (error) {
            console.error('License validation error:', error);
            return { valid: false, reason: 'Invalid license format' };
        }
    },

    // Get security audit log
    getAuditLog: (limit = 100) => {
        try {
            const auditLog = JSON.parse(localStorage.getItem('audit_log') || '[]');
            return auditLog.slice(-limit);
        } catch (error) {
            console.error('Error getting audit log:', error);
            return [];
        }
    },

    // Log security event
    logSecurityEvent: (eventType, details) => {
        try {
            const event = {
                id: Date.now().toString(),
                type: eventType,
                details,
                timestamp: new Date().toISOString(),
                userId: EnterpriseUtils.getCurrentUserId(),
                ipAddress: '127.0.0.1' // Simulated
            };

            const auditLog = JSON.parse(localStorage.getItem('audit_log') || '[]');
            auditLog.push(event);
            
            // Keep only last 1000 events
            localStorage.setItem('audit_log', JSON.stringify(auditLog.slice(-1000)));
        } catch (error) {
            console.error('Error logging security event:', error);
        }
    },

    // Get current user ID
    getCurrentUserId: () => {
        return localStorage.getItem('current_user_id') || 'anonymous';
    },

    // Manage user roles
    getUserRoles: (userId) => {
        try {
            const userRoles = JSON.parse(localStorage.getItem('user_roles') || '{}');
            return userRoles[userId] || ['user'];
        } catch (error) {
            console.error('Error getting user roles:', error);
            return ['user'];
        }
    },

    // Set user roles
    setUserRoles: (userId, roles) => {
        try {
            const userRoles = JSON.parse(localStorage.getItem('user_roles') || '{}');
            userRoles[userId] = roles;
            localStorage.setItem('user_roles', JSON.stringify(userRoles));
        } catch (error) {
            console.error('Error setting user roles:', error);
            throw error;
        }
    },

    // Check permission
    hasPermission: (userId, permission) => {
        try {
            const roles = EnterpriseUtils.getUserRoles(userId);
            const permissions = {
                admin: ['read', 'write', 'delete', 'manage_users', 'view_analytics', 'configure_system'],
                manager: ['read', 'write', 'view_analytics'],
                user: ['read', 'write']
            };

            return roles.some(role => permissions[role]?.includes(permission));
        } catch (error) {
            console.error('Permission check error:', error);
            return false;
        }
    },

    // Get billing information
    getBillingInfo: () => {
        try {
            return JSON.parse(localStorage.getItem('billing_info') || '{}');
        } catch (error) {
            console.error('Error getting billing info:', error);
            return {};
        }
    },

    // Update billing information
    updateBillingInfo: (billingData) => {
        try {
            localStorage.setItem('billing_info', JSON.stringify(billingData));
        } catch (error) {
            console.error('Error updating billing info:', error);
            throw error;
        }
    },

    // Get compliance status
    getComplianceStatus: () => {
        return {
            gdpr: { status: 'compliant', lastAudit: '2024-01-15' },
            soc2: { status: 'certified', lastAudit: '2024-02-01' },
            iso27001: { status: 'in_progress', lastAudit: '2024-03-01' },
            hipaa: { status: 'not_applicable', lastAudit: null }
        };
    }
};
