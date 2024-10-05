import { HttpStatus, UnprocessableEntityException, ValidationError, ValidationPipeOptions } from '@nestjs/common';

/**
 * Generate errors from validation errors.
 * @description This function generates errors from validation errors.
 * @param {ValidationError[]} errors The validation errors.
 * @returns {unknown} The generated errors.
 * @example
 * generateErrors([
 *  {
 *    property: 'email',
 *    constraints: {
 *      isEmail: 'email must be an email',
 *    },
 *    children: [],
 *  },
 *  {
 *    property: 'password',
 *    constraints: {
 *      isNotEmpty: 'password should not be empty',
 *    },
 *    children: [],
 *  },
 * ]);
 */
const generateErrors = (errors: ValidationError[]) => {
  return errors.map((error) => ({
    property: error.property,
    errors: (error.children?.length ?? 0) > 0 ? generateErrors(error.children ?? []) : Object.values(error.constraints ?? []),
  }));
};

/**
 * Validation options util.
 * @description This is the validation options util.
 */
export const validationOptionsUtil: ValidationPipeOptions = {
  transform: true, // transform the incoming value to the type defined in the DTO
  whitelist: true, // remove any extra properties sent by the client
  always: true, // always transform the incoming value to the type defined in the DTO
  forbidNonWhitelisted: false, // don't throw an error if extra properties are sent by the client
  enableDebugMessages: true, // enable debug messages for the validation pipe
  transformOptions: {
    enableImplicitConversion: true, // enable implicit conversion of incoming values
    enableCircularCheck: true, // enable circular check for incoming values
  },
  forbidUnknownValues: false, // throw an error if unknown values are sent by the client
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // set the HTTP status code for validation errors
  exceptionFactory: (errors: ValidationError[]) => {
    return new UnprocessableEntityException({
      validationErrors: generateErrors(errors),
    });
  },
};
