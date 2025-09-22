/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 30/08/2025
 * 
 * Last by: Gautam mer (CEO)
 * Created at: 30/08/2025
 * 
*/

import logtail from '$config/logtail.client';

// Constants
const API_BASE = '/api';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

// Types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  body?: unknown;
}

interface LoggingOptions {
  enabled?: boolean;
  message?: string;
}

interface ApiError extends Error {
  statusCode?: number;
  statusText?: string;
  requestId?: string;
}

interface LogContext {
  request_id: string;
  method: string;
  endpoint: string;
  url: string;
  timestamp: string;
  [key: string]: unknown;
}

// Custom error class for API errors
class ApiClientError extends Error implements ApiError {
  constructor(
    message: string,
    public statusCode?: number,
    public statusText?: string,
    public requestId?: string
  ) {
    super(message);
    this.name = 'ApiClientError';
    Object.setPrototypeOf(this, ApiClientError.prototype);
  }
}

class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(baseUrl: string = API_BASE, defaultHeaders: HeadersInit = DEFAULT_HEADERS) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * Main request method with improved error handling and logging
   */
  async request<T = unknown>(
    endpoint: string,
    options: ApiRequestOptions & { method?: HttpMethod } = {},
    logging: LoggingOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = options.method || 'GET';
    const requestId = this.generateRequestId();
    const startTime = Date.now();

    // Log request if enabled
    if (logging.enabled) {
      this.logRequest(requestId, method, endpoint, url, options.body, logging.message);
    }

    const requestConfig = this.buildRequestConfig(options);

    try {
      const response = await fetch(url, { ...requestConfig, method });
      const duration = Date.now() - startTime;

      if (!response.ok) {
        await this.handleErrorResponse(response, requestId, method, endpoint, url, duration);
      }

      return await this.handleSuccessResponse<T>(
        response,
        requestId,
        method,
        endpoint,
        url,
        duration
      );
    } catch (error) {
      this.handleNetworkError(error, requestId, method, endpoint, url);
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Build request configuration with proper headers and body serialization
   */
  private buildRequestConfig(options: ApiRequestOptions): RequestInit {
    const { body, ...restOptions } = options;
    
    const config: RequestInit = {
      ...restOptions,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    // Serialize body if it's an object (but not FormData, Blob, etc.)
    if (body !== undefined && body !== null) {
      if (this.shouldSerializeBody(body)) {
        config.body = JSON.stringify(body);
      } else {
        config.body = body as BodyInit;
      }
    }

    return config;
  }

  /**
   * Check if body should be JSON serialized
   */
  private shouldSerializeBody(body: unknown): boolean {
    return (
      typeof body === 'object' &&
      body !== null &&
      !(body instanceof FormData) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer) &&
      !(body instanceof URLSearchParams)
    );
  }

  /**
   * Handle successful API response
   */
  private async handleSuccessResponse<T>(
    response: Response,
    requestId: string,
    method: string,
    endpoint: string,
    url: string,
    duration: number
  ): Promise<T> {
    const responseData = await this.parseResponse<T>(response);

    // Log successful response if it contains a message
    if (this.hasMessage(responseData)) {
      const logContext: LogContext = {
        request_id: requestId,
        method,
        endpoint,
        url,
        status_code: response.status,
        duration_ms: duration,
        response_size: JSON.stringify(responseData).length,
        timestamp: new Date().toISOString(),
      };

      logtail.info(responseData.message as string, logContext);
      await logtail.flush();
    }

    return responseData;
  }

  /**
   * Handle error response from API
   */
  private async handleErrorResponse(
    response: Response,
    requestId: string,
    method: string,
    endpoint: string,
    url: string,
    duration: number
  ): Promise<never> {
    const errorData = await this.parseErrorResponse(response);
    const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;

    const logContext: LogContext = {
      request_id: requestId,
      method,
      endpoint,
      url,
      status_code: response.status,
      status_text: response.statusText,
      error_message: errorMessage,
      duration_ms: duration,
      timestamp: new Date().toISOString(),
    };

    logtail.error(errorMessage, logContext);
    await logtail.flush();

    throw new ApiClientError(errorMessage, response.status, response.statusText, requestId);
  }

  /**
   * Handle network or unexpected errors
   */
  private handleNetworkError(
    error: unknown,
    requestId: string,
    method: string,
    endpoint: string,
    url: string
  ): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    const logContext: LogContext = {
      request_id: requestId,
      method,
      endpoint,
      url,
      error_name: errorObj.name,
      error_message: errorObj.message,
      error_stack: errorObj.stack,
      timestamp: new Date().toISOString(),
    };

    logtail.error(`Network error: ${errorObj.message}`, logContext);
    logtail.flush().catch(console.error); // Don't await to avoid blocking
  }

  /**
   * Log request initiation
   */
  private logRequest(
    requestId: string,
    method: string,
    endpoint: string,
    url: string,
    body: unknown,
    message?: string
  ): void {
    const logMessage = message || `API Request: ${method} ${endpoint}`;
    
    const logContext: LogContext = {
      request_id: requestId,
      method,
      endpoint,
      url,
      has_body: body !== undefined && body !== null,
      timestamp: new Date().toISOString(),
    };

    logtail.info(logMessage, logContext);
  }

  /**
   * Parse response body safely
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    
    // Return text for non-JSON responses
    return response.text() as unknown as T;
  }

  /**
   * Parse error response body safely
   */
  private async parseErrorResponse(response: Response): Promise<{ message?: string }> {
    try {
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        return await response.json();
      }
      
      const text = await response.text();
      return { message: text || 'Unknown error' };
    } catch {
      return { message: 'Failed to parse error response' };
    }
  }

  /**
   * Type guard to check if response has a message property
   */
  private hasMessage(data: unknown): data is { message: string } {
    return (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof (data as any).message === 'string'
    );
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `req_${timestamp}_${random}`;
  }

  // HTTP method shortcuts
  async get<T = unknown>(
    endpoint: string,
    options?: ApiRequestOptions,
    logging?: LoggingOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' }, logging);
  }

  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ApiRequestOptions,
    logging?: LoggingOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body }, logging);
  }

  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ApiRequestOptions,
    logging?: LoggingOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body }, logging);
  }

  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ApiRequestOptions,
    logging?: LoggingOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body }, logging);
  }

  async delete<T = unknown>(
    endpoint: string,
    options?: ApiRequestOptions,
    logging?: LoggingOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' }, logging);
  }
}

// Export singleton instance for backward compatibility
export const api = new ApiClient();

// Also export the class for custom instances
export { ApiClient, ApiClientError };

// Export types for external use
export type { ApiRequestOptions, LoggingOptions, ApiError };