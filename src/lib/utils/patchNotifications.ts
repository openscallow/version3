// Interface defining the parameters required to patch notifications
export interface PatchNotificationsParams {
    baseUrl: string; // The endpoint to patch notifications
    notificationIds: number[]; // Array of notification IDs to update
}

// Async function to patch notifications and update their status to "read"
export async function patchNotifications({
    baseUrl,
    notificationIds,
}: PatchNotificationsParams): Promise<{ id: number; status: 'read' }[]> {
    // Validate required parameters
    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }
    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
        throw new Error('notificationIds is required and must be a non-empty array');
    }

    try {
        // Perform the PATCH request
        const response = await fetch(baseUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationIds }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update notifications');
        }

        const updatedNotifications: { id: number; status: 'read' }[] = await response.json();
        return updatedNotifications;
    } catch (error) {
        console.error('Error updating notifications:', error);
        throw error;
    }
}
