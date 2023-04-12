export interface IException {
  message: string;
  code?: number;
  cause?: Error;
  description?: string;
}

export interface IHttpBadRequestExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

export interface IHttpInternalServerErrorExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

export interface IHttpUnauthorizedExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}

export interface IHttpForbiddenExceptionResponse {
  code: number;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;
}
