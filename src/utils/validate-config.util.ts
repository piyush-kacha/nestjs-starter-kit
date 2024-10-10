import { plainToClass } from 'class-transformer';

import { validateSync } from 'class-validator';

import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * Validates and converts a configuration object to a specified class instance.
 *
 * @template T - The type of the class to which the configuration will be converted.
 * @param {Record<string, unknown>} config - The configuration object to validate and convert.
 * @param {ClassConstructor<T>} envVariablesClass - The class constructor to which the configuration will be converted.
 * @returns {T} - The validated and converted configuration object.
 * @throws {Error} - Throws an error if validation fails.
 */
export function validateConfigUtil<T extends object>(config: Record<string, unknown>, envVariablesClass: ClassConstructor<T>): T {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
