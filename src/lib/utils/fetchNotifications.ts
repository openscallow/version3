// Interface defining the parameters required to fetch notifications
export interface FetchNotificationsParams {
    baseUrl: string; // The endpoint to fetch notifications
    customerId: string; // The ID of the customer (required)
    status?: 'unread' | 'read' | 'dismissed'; // Optional filter for notification status
    type?: 'info' | 'warning' | 'error' | 'success'; // Optional filter for notification type
}

// Interface defining the structure of a Notification object
export interface Notification {
    id: number; 
    title: string; 
    message: string; 
    type: 'info' | 'warning' | 'error' | 'success'; 
    status: 'unread' | 'read' | 'dismissed'; 
    created_at: string; 
    expires_at: string | null; 
    metadata: Record<string, any> | null; 
}

// Async function to fetch notifications with optional filtering
export async function fetchNotifications({
    baseUrl,
    customerId,
    status,
    type,
}: FetchNotificationsParams): Promise<Notification[]> {
    // Validate required parameters
    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }
    if (!customerId) {
        throw new Error('customerId is required');
    }

    // Construct the full URL, using the current origin as the base if a relative URL is provided
    const url = new URL(baseUrl, window.location.origin);

    // Add query parameters to the URL
    url.searchParams.append('customer_id', customerId);
  
    // Conditionally add optional filter parameters
    if (status) url.searchParams.append('status', status);
    if (type) url.searchParams.append('type', type);

    try {
        // Perform the fetch request
        const response = await fetch(url.toString(), {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch notifications');
        }

        const notifications: Notification[] = await response.json();
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}