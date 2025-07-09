import logtail from '$config/logtail.client';

const API_BASE = '/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

class ApiClient {
  async request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const url = `${API_BASE}${endpoint}`;
    const method: string = options.method || 'GET';
    const requestId = this.generateRequestId();

    // Log request start
    logtail.info('API Request Started', {
      request_id: requestId,
      method,
      endpoint,
      url,
      has_body: !!options.body,
      timestamp: new Date().toISOString()
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const startTime = Date.now();
      const response = await fetch(url, config);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }));
        
        // Log API error
        logtail.error('API Request Failed', {
          request_id: requestId,
          method,
          endpoint,
          url,
          status_code: response.status,
          status_text: response.statusText,
          error_message: error.message || `HTTP ${response.status}`,
          duration_ms: duration,
          timestamp: new Date().toISOString()
        });
        logtail.flush();
        
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const responseData = await response.json();
      
      // Log successful response
      logtail.info('API Request Completed Successfully', {
        request_id: requestId,
        method,
        endpoint,
        url,
        status_code: response.status,
        duration_ms: duration,
        response_size: JSON.stringify(responseData).length,
        timestamp: new Date().toISOString()
      });
      logtail.flush();

      return responseData;
      
    } catch (error: any) {
      // Log unexpected errors (network issues, parsing errors, etc.)
      logtail.error('API Request Exception', {
        request_id: requestId,
        method,
        endpoint,
        url,
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack,
        timestamp: new Date().toISOString()
      });
      logtail.flush();
      
      throw error;
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  get(endpoint: string, options?: RequestOptions): Promise<any> {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint: string, body?: any, options?: RequestOptions): Promise<any> {
    return this.request(endpoint, { method: 'POST', body, ...options });
  }

  put(endpoint: string, body?: any, options?: RequestOptions): Promise<any> {
    return this.request(endpoint, { method: 'PUT', body, ...options });
  }

  delete(endpoint: string, options?: RequestOptions): Promise<any> {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const api = new ApiClient();