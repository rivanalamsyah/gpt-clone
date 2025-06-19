const CollaborationUtils = {
    // Generate unique session code
    generateSessionCode: () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    // Create shareable link
    createShareLink: (chatId, permissions = {}) => {
        try {
            const shareData = {
                chatId,
                permissions: {
                    canView: permissions.canView !== false,
                    canComment: permissions.canComment || false,
                    canEdit: permissions.canEdit || false,
                    expiresAt: permissions.expiresAt || null
                },
                createdAt: new Date().toISOString(),
                token: CollaborationUtils.generateToken()
            };
            
            // Store share data locally
            const shareLinks = JSON.parse(localStorage.getItem('share_links') || '[]');
            shareLinks.push(shareData);
            localStorage.setItem('share_links', JSON.stringify(shareLinks));
            
            const baseUrl = window.location.origin;
            return `${baseUrl}/shared/${chatId}?token=${shareData.token}`;
        } catch (error) {
            console.error('Error creating share link:', error);
            throw error;
        }
    },

    // Generate secure token
    generateToken: () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Validate share permissions
    validateShareAccess: (token, action) => {
        try {
            const shareLinks = JSON.parse(localStorage.getItem('share_links') || '[]');
            const shareData = shareLinks.find(link => link.token === token);
            
            if (!shareData) {
                return { valid: false, reason: 'Invalid share link' };
            }
            
            // Check expiration
            if (shareData.permissions.expiresAt && new Date() > new Date(shareData.permissions.expiresAt)) {
                return { valid: false, reason: 'Share link has expired' };
            }
            
            // Check permissions
            const hasPermission = shareData.permissions[`can${action.charAt(0).toUpperCase() + action.slice(1)}`];
            if (!hasPermission) {
                return { valid: false, reason: `Permission denied for ${action}` };
            }
            
            return { valid: true, shareData };
        } catch (error) {
            console.error('Error validating share access:', error);
            return { valid: false, reason: 'Validation error' };
        }
    },

    // Simulate real-time collaboration
    simulateCollaboration: (chatId, callback) => {
        try {
            const collaborators = [
                { id: '1', name: 'John Doe', status: 'active', cursor: { x: 0, y: 0 } },
                { id: '2', name: 'Jane Smith', status: 'typing', cursor: { x: 100, y: 50 } }
            ];
            
            // Simulate real-time updates
            const interval = setInterval(() => {
                // Random status updates
                collaborators.forEach(collaborator => {
                    collaborator.status = Math.random() > 0.7 ? 'typing' : 'active';
                    collaborator.cursor = {
                        x: Math.random() * 800,
                        y: Math.random() * 600
                    };
                });
                
                callback({
                    type: 'collaborators_update',
                    data: collaborators
                });
            }, 3000);
            
            return () => clearInterval(interval);
        } catch (error) {
            console.error('Error simulating collaboration:', error);
            return () => {};
        }
    },

    // Send invitation email (simulated)
    sendInvitation: async (email, chatId, permissions) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const invitation = {
                id: Date.now().toString(),
                email,
                chatId,
                permissions,
                status: 'sent',
                sentAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
            };
            
            // Store invitations locally
            const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
            invitations.push(invitation);
            localStorage.setItem('invitations', JSON.stringify(invitations));
            
            return invitation;
        } catch (error) {
            console.error('Error sending invitation:', error);
            throw error;
        }
    },

    // Get pending invitations
    getPendingInvitations: () => {
        try {
            const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
            return invitations.filter(inv => 
                inv.status === 'sent' && 
                new Date(inv.expiresAt) > new Date()
            );
        } catch (error) {
            console.error('Error getting invitations:', error);
            return [];
        }
    },

    // Accept invitation
    acceptInvitation: (invitationId) => {
        try {
            const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
            const updatedInvitations = invitations.map(inv => 
                inv.id === invitationId 
                    ? { ...inv, status: 'accepted', acceptedAt: new Date().toISOString() }
                    : inv
            );
            localStorage.setItem('invitations', JSON.stringify(updatedInvitations));
            
            return updatedInvitations.find(inv => inv.id === invitationId);
        } catch (error) {
            console.error('Error accepting invitation:', error);
            throw error;
        }
    },

    // Track collaboration events
    trackCollaborationEvent: (eventType, data) => {
        try {
            const event = {
                type: eventType,
                data,
                timestamp: new Date().toISOString(),
                sessionId: CollaborationUtils.getSessionId()
            };
            
            // Store events for analytics
            const events = JSON.parse(localStorage.getItem('collaboration_events') || '[]');
            events.push(event);
            localStorage.setItem('collaboration_events', JSON.stringify(events.slice(-1000)));
            
            console.log('Collaboration event tracked:', event);
        } catch (error) {
            console.error('Error tracking collaboration event:', error);
        }
    },

    // Get session ID
    getSessionId: () => {
        let sessionId = sessionStorage.getItem('collaboration_session_id');
        if (!sessionId) {
            sessionId = 'collab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('collaboration_session_id', sessionId);
        }
        return sessionId;
    }
};
