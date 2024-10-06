/**
 * A class containing constants for various HTTP error codes.
 *
 * @class ExceptionConstants
 *
 * @property {Object} BadRequestCodes - Constants for bad request HTTP error codes.
 * @property {number} BadRequestCodes.MISSING_REQUIRED_PARAMETER - Required parameter is missing from request.
 * @property {number} BadRequestCodes.INVALID_PARAMETER_VALUE - Parameter value is invalid.
 * @property {number} BadRequestCodes.UNSUPPORTED_PARAMETER - Request contains unsupported parameter.
 * @property {number} BadRequestCodes.INVALID_CONTENT_TYPE - Content type of request is invalid.
 * @property {number} BadRequestCodes.INVALID_REQUEST_BODY - Request body is invalid.
 * @property {number} BadRequestCodes.RESOURCE_ALREADY_EXISTS - Resource already exists.
 * @property {number} BadRequestCodes.RESOURCE_NOT_FOUND - Resource not found.
 * @property {number} BadRequestCodes.REQUEST_TOO_LARGE - Request is too large.
 * @property {number} BadRequestCodes.REQUEST_ENTITY_TOO_LARGE - Request entity is too large.
 * @property {number} BadRequestCodes.REQUEST_URI_TOO_LONG - Request URI is too long.
 * @property {number} BadRequestCodes.UNSUPPORTED_MEDIA_TYPE - Request contains unsupported media type.
 * @property {number} BadRequestCodes.METHOD_NOT_ALLOWED - Request method is not allowed.
 * @property {number} BadRequestCodes.HTTP_REQUEST_TIMEOUT - Request has timed out.
 * @property {number} BadRequestCodes.VALIDATION_ERROR - Request validation error.
 * @property {number} BadRequestCodes.UNEXPECTED_ERROR - Unexpected error occurred.
 * @property {number} BadRequestCodes.INVALID_INPUT - Invalid input.
 *
 * @property {Object} UnauthorizedCodes - Constants for unauthorized HTTP error codes.
 * @property {number} UnauthorizedCodes.UNAUTHORIZED_ACCESS - Unauthorized access to resource.
 * @property {number} UnauthorizedCodes.INVALID_CREDENTIALS - Invalid credentials provided.
 * @property {number} UnauthorizedCodes.JSON_WEB_TOKEN_ERROR - JSON web token error.
 * @property {number} UnauthorizedCodes.AUTHENTICATION_FAILED - Authentication failed.
 * @property {number} UnauthorizedCodes.ACCESS_TOKEN_EXPIRED - Access token has expired.
 * @property {number} UnauthorizedCodes.TOKEN_EXPIRED_ERROR - Token has expired error.
 * @property {number} UnauthorizedCodes.UNEXPECTED_ERROR - Unexpected error occurred.
 * @property {number} UnauthorizedCodes.RESOURCE_NOT_FOUND - Resource not found.
 * @property {number} UnauthorizedCodes.USER_NOT_VERIFIED - User not verified.
 * @property {number} UnauthorizedCodes.REQUIRED_RE_AUTHENTICATION - Required re-authentication.
 * @property {number} UnauthorizedCodes.INVALID_RESET_PASSWORD_TOKEN - Invalid reset password token.
 *
 * @property {Object} InternalServerErrorCodes - Constants for internal server error HTTP error codes.
 * @property {number} InternalServerErrorCodes.INTERNAL_SERVER_ERROR - Internal server error.
 * @property {number} InternalServerErrorCodes.DATABASE_ERROR - Database error.
 * @property {number} InternalServerErrorCodes.NETWORK_ERROR - Network error.
 * @property {number} InternalServerErrorCodes.THIRD_PARTY_SERVICE_ERROR - Third party service error.
 * @property {number} InternalServerErrorCodes.SERVER_OVERLOAD - Server is overloaded.
 * @property {number} InternalServerErrorCodes.UNEXPECTED_ERROR - Unexpected error occurred.
 *
 * @property {Object} ForbiddenCodes - Constants for forbidden HTTP error codes.
 * @property {number} ForbiddenCodes.FORBIDDEN - Access to resource is forbidden.
 * @property {number} ForbiddenCodes.MISSING_PERMISSIONS - User does not have the required permissions to access the resource.
 * @property {number} ForbiddenCodes.EXCEEDED_RATE_LIMIT - User has exceeded the rate limit for accessing the resource.
 * @property {number} ForbiddenCodes.RESOURCE_NOT_FOUND - The requested resource could not be found.
 * @property {number} ForbiddenCodes.TEMPORARILY_UNAVAILABLE - The requested resource is temporarily unavailable.
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
