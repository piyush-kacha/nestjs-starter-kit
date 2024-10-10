// Import required modules
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionConstants } from './constants';
import { IException, IHttpNotFoundExceptionResponse } from './interfaces';

export class NotFoundException extends HttpException {
  /** The error code. */
  @ApiProperty({
    enum: ExceptionConstants.NotFoundCodes,
    description: 'A unique code identifying the error.',
    example: ExceptionConstants.NotFoundCodes.RESOURCE_NOT_FOUND,
  })
  code: number;

  /** The error that caused this exception. */
  @ApiHideProperty()
  cause: Error;

  /** The error message. */
  @ApiProperty({
    description: 'Message for the exception',
    example: 'Resource not found',
  })
  message: string;

  /** The detailed description of the error. */
  @ApiProperty({
    description: 'A description of the error message.',
    example: 'The requested resource was not found.',
  })
  description: string;

  /** The path of the request that caused the not found error. */
  @ApiPropertyOptional({
    description: 'The path of the request that caused the not found error.',
    example: '/api/v1/users',
  })
  path?: string;

  /** The timestamp of the exception. */
  @ApiProperty({
    description: 'Timestamp of the exception',
    format: 'date-time',
    example: '2022-12-31T23:59:59.999Z',
  })
  timestamp: string;

  /** Trace ID of the request */
  @ApiProperty({
    description: 'Trace ID of the request',
    example: '65b5f773-df95-4ce5-a917-62ee832fcdd0',
  })
  traceId: string; // Trace ID of the request

  /**
   * Constructs a new NotFoundException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.NOT_FOUND, {
      cause: exception.cause,
      description: exception.description,
    });

    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code || ExceptionConstants.NotFoundCodes.RESOURCE_NOT_FOUND;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Set the path of the NotFoundException instance.
   * @param path A string representing the path of the request.
   */
  setPath(path: string): void {
    this.path = path;
  }

  /**
   * Set the Trace ID of the NotFoundException instance.
   * @param traceId A string representing the Trace ID.
   */
  setTraceId(traceId: string): void {
    this.traceId = traceId;
  }

  generateHttpResponseBody(message?: string): IHttpNotFoundExceptionResponse {
    if (this.code === ExceptionConstants.NotFoundCodes.URL_NOT_FOUND && this.path !== undefined) {
      this.message = `The URL not found`;
      if (message) {
        this.message = message;
      }
      this.description = `The requested URL was not found: ${this.path}`;

      return {
        code: this.code,
        message: this.message,
        description: this.description,
        path: this.path,
        timestamp: this.timestamp,
        traceId: this.traceId,
      };
    } else {
      return {
        code: this.code,
        message: message || this.message,
        description: this.description,
        timestamp: this.timestamp,
        traceId: this.traceId,
      };
    }
  }

  static fromError(error: Error): NotFoundException {
    return new NotFoundException({
      message: error.message,
      cause: error,
      description: error.stack,
    });
  }

  static RESOURCE_NOT_FOUND = (message?: string): NotFoundException => {
    return new NotFoundException({
      message: message || 'Resource not found',
      code: ExceptionConstants.NotFoundCodes.RESOURCE_NOT_FOUND,
    });
  };

  static RESOURCE_NOT_FOUND_WITH_ID = (message?: string): NotFoundException => {
    return new NotFoundException({
      message: message || 'Resource not found with the specified ID',
      code: ExceptionConstants.NotFoundCodes.RESOURCE_NOT_FOUND_WITH_ID,
    });
  };

  static RESOURCE_NOT_FOUND_WITH_PARAMETERS = (message?: string): NotFoundException => {
    return new NotFoundException({
      message: message || 'Resource not found with the specified parameters',
      code: ExceptionConstants.NotFoundCodes.RESOURCE_NOT_FOUND_WITH_PARAMETERS,
    });
  };

  static URL_NOT_FOUND = (message?: string): NotFoundException => {
    return new NotFoundException({
      message: message || 'Resource not found with the specified name',
      code: ExceptionConstants.NotFoundCodes.URL_NOT_FOUND,
    });
  };
}
