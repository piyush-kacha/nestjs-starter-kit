import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

// Import internal files & modules
import { ExceptionConstants } from './exceptions.constants';
import { IException, IHttpInternalServerErrorExceptionResponse } from './exceptions.interface';

// Exception class for Internal Server Error
export class InternalServerErrorException extends HttpException {
  @ApiProperty({
    enum: ExceptionConstants.InternalServerErrorCodes,
    description: 'A unique code identifying the error.',
    example: ExceptionConstants.InternalServerErrorCodes.INTERNAL_SERVER_ERROR,
  })
  code: number; // Internal status code

  @ApiHideProperty()
  cause: Error; // Error object causing the exception

  @ApiProperty({
    description: 'Message for the exception',
    example: 'An unexpected error occurred while processing your request.',
  })
  message: string; // Message for the exception

  @ApiProperty({
    description: 'A description of the error message.',
    example:
      'The server encountered an unexpected condition that prevented it from fulfilling the request. This could be due to an error in the application code, a misconfiguration in the server, or an issue with the underlying infrastructure. Please try again later or contact the server administrator if the problem persists.',
  })
  description: string; // Description of the exception

  @ApiProperty({
    description: 'Timestamp of the exception',
    format: 'date-time',
    example: '2022-12-31T23:59:59.999Z',
  })
  timestamp: string; // Timestamp of the exception

  @ApiProperty({
    description: 'Trace ID of the request',
    example: '65b5f773-df95-4ce5-a917-62ee832fcdd0',
  })
  traceId: string; // Trace ID of the request

  /**
   * Constructs a new InternalServerErrorException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.INTERNAL_SERVER_ERROR, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Set the Trace ID of the BadRequestException instance.
   * @param traceId A string representing the Trace ID.
   */
  setTraceId = (traceId: string) => {
    this.traceId = traceId;
  };

  /**
   * Generate an HTTP response body representing the BadRequestException instance.
   * @param message A string representing the message to include in the response body.
   * @returns An object representing the HTTP response body.
   */
  generateHttpResponseBody = (message?: string): IHttpInternalServerErrorExceptionResponse => {
    return {
      code: this.code,
      message: message || this.message,
      description: this.description,
      timestamp: this.timestamp,
      traceId: this.traceId,
    };
  };

  /**
   * Returns a new instance of InternalServerErrorException with a standard error message and code
   * @param error Error object causing the exception
   * @returns A new instance of InternalServerErrorException
   */
  static INTERNAL_SERVER_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message: 'We are sorry, something went wrong on our end. Please try again later or contact our support team for assistance.',
      code: ExceptionConstants.InternalServerErrorCodes.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  };

  /**
   * Returns a new instance of InternalServerErrorException with a custom error message and code
   * @param error Error object causing the exception
   * @returns A new instance of InternalServerErrorException
   */
  static UNEXPECTED_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message: 'An unexpected error occurred while processing the request.',
      code: ExceptionConstants.InternalServerErrorCodes.UNEXPECTED_ERROR,
      cause: error,
    });
  };
}
