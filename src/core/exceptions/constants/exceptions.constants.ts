/**
 * This class defines constants for HTTP error codes.
 */
export class ExceptionConstants {
  /**
   * Constants for bad request HTTP error codes.
   */
  public static readonly BadRequestCodes = {
    MISSING_REQUIRED_PARAMETER: 10001, // Required parameter is missing from request
    INVALID_PARAMETER_VALUE: 10002, // Parameter value is invalid
    UNSUPPORTED_PARAMETER: 10003, // Request contains unsupported parameter
    INVALID_CONTENT_TYPE: 10004, // Content type of request is invalid
    INVALID_REQUEST_BODY: 10005, // Request body is invalid
    RESOURCE_ALREADY_EXISTS: 10006, // Resource already exists
    RESOURCE_NOT_FOUND: 10007, // Resource not found
    REQUEST_TOO_LARGE: 10008, // Request is too large
    REQUEST_ENTITY_TOO_LARGE: 10009, // Request entity is too large
    REQUEST_URI_TOO_LONG: 10010, // Request URI is too long
    UNSUPPORTED_MEDIA_TYPE: 10011, // Request contains unsupported media type
    METHOD_NOT_ALLOWED: 10012, // Request method is not allowed
    HTTP_REQUEST_TIMEOUT: 10013, // Request has timed out
    VALIDATION_ERROR: 10014, // Request validation error
    UNEXPECTED_ERROR: 10015, // Unexpected error occurred
    INVALID_INPUT: 10016, // Invalid input
  };

  /**
   * Constants for unauthorized HTTP error codes.
   */
  public static readonly UnauthorizedCodes = {
    UNAUTHORIZED_ACCESS: 20001, // Unauthorized access to resource
    INVALID_CREDENTIALS: 20002, // Invalid credentials provided
    JSON_WEB_TOKEN_ERROR: 20003, // JSON web token error
    AUTHENTICATION_FAILED: 20004, // Authentication failed
    ACCESS_TOKEN_EXPIRED: 20005, // Access token has expired
    TOKEN_EXPIRED_ERROR: 20006, // Token has expired error
    UNEXPECTED_ERROR: 20007, // Unexpected error occurred
    RESOURCE_NOT_FOUND: 20008, // Resource not found
    USER_NOT_VERIFIED: 20009, // User not verified
    REQUIRED_RE_AUTHENTICATION: 20010, // Required re-authentication
    INVALID_RESET_PASSWORD_TOKEN: 20011, // Invalid reset password token
  };

  /**
   * Constants for internal server error HTTP error codes.
   */
  public static readonly InternalServerErrorCodes = {
    INTERNAL_SERVER_ERROR: 30001, // Internal server error
    DATABASE_ERROR: 30002, // Database error
    NETWORK_ERROR: 30003, // Network error
    THIRD_PARTY_SERVICE_ERROR: 30004, // Third party service error
    SERVER_OVERLOAD: 30005, // Server is overloaded
    UNEXPECTED_ERROR: 30006, // Unexpected error occurred
  };

  /**
   * Constants for forbidden HTTP error codes.
   */
  public static readonly ForbiddenCodes = {
    FORBIDDEN: 40001, // Access to resource is forbidden
    MISSING_PERMISSIONS: 40002, // User does not have the required permissions to access the resource
    EXCEEDED_RATE_LIMIT: 40003, // User has exceeded the rate limit for accessing the resource
    RESOURCE_NOT_FOUND: 40004, // The requested resource could not be found
    TEMPORARILY_UNAVAILABLE: 40005, // The requested resource is temporarily unavailable
  };
}
