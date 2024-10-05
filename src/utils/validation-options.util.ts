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
const generateErrors = (errors: ValidationError[]): unknown => {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? [])
          : Object.values(currentValue.constraints ?? {}).join(', '),
    }),
    {},
  );
};

/**
 * Validation options util.
 * @description This is the validation options util.
 */
export const validationOptionsUtil: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: generateErrors(errors),
    });
  },
};
