/**
 * Interface representing the structure of an exception.
 *
 * @interface IException
 *
 * @property {string} message - A brief message describing the error.
 * @property {number} [code] - The error code associated with the exception.
 * @property {Error} [cause] - The cause of the exception.
 * @property {string} [description] - A detailed description of the error.
 */
export interface IException {
  message: string;
  code?: number;
  cause?: Error;
  description?: string;
}

/**
 * Interface representing the structure of a not found exception response.
 *
 * @interface IHttpNotFoundExceptionResponse
 *
 * @property {number} code - The HTTP status code of the not found error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} path - The path of the request that caused the not found error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpNotFoundExceptionResponse {
  code: number;
  message: string;
  description: string;
  path?: string;
  timestamp: string;
  traceId: string;
}

/**
 * Interface representing the structure of a bad request exception response.
 *
 * @interface IHttpBadRequestExceptionResponse
 *
 * @property {number} code - The HTTP status code of the bad request.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpBadRequestExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

/**
 * Interface representing the structure of a not found exception response.
 *
 * @interface IHttpInternalServerErrorExceptionResponse
 *
 * @property {number} code - The HTTP status code of the not found error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpInternalServerErrorExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

/**
 * Interface representing the structure of an unauthorized exception response.
 *
 * @interface IHttpUnauthorizedExceptionResponse
 *
 * @property {number} code - The HTTP status code of the unauthorized error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpUnauthorizedExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

/**
 * Interface representing the structure of a forbidden exception response.
 *
 * @interface IHttpForbiddenExceptionResponse
 *
 * @property {number} code - The HTTP status code of the forbidden error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpForbiddenExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

/**
 * Interface representing the structure of a conflict exception response.
 *
 * @interface IHttpGatewayTimeOutExceptionResponse
 *
 * @property {number} code - The HTTP status code of the conflict error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 * @property {string} path - The path of the request that caused the conflict.
 */
export interface IHttpGatewayTimeOutExceptionResponse {
  code: number;
  message: string;
  description?: string;
  timestamp: string;
  traceId: string;
  path: string;
}

/**
 * Interface representing the structure of a request timeout exception response.
 *
 * @interface IHttpAllExceptionResponse
 *
 * @property {number} code - The HTTP status code of the request timeout error.
 * @property {string} message - A brief message describing the error.
 * @property {string} description - A detailed description of the error.
 * @property {unknown} error - The error that caused the exception.
 * @property {string} timestamp - The timestamp when the error occurred.
 * @property {string} traceId - A unique identifier for tracing the error.
 */
export interface IHttpAllExceptionResponse {
  code: number;
  message: string;
  description: string;
  error?: unknown;
  timestamp: string;
  traceId: string;
}
