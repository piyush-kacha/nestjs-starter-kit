/**
 * Generates a random OTP code within a specified range.
 *
 * If any of the parameters are not provided, they will be defaulted to 100000 and 999999.
 *
 * The generated OTP code will be a whole number between the minimum and maximum values (inclusive).
 *
 * @param {number} [min=100000] - The minimum value of the OTP range.
 * @param {number} [max=999999] - The maximum value of the OTP range.
 * @return {number} The randomly generated OTP code.
 * @throws {Error} If the minimum value is greater than the maximum value.
 * @throws {Error} If the minimum or maximum values are negative.
 * @throws {Error} If the minimum or maximum values are not six digits long.
 * @throws {Error} If the minimum and maximum values are the same.
 * @throws {Error} If the minimum or maximum values are greater than 999999.
 * @throws {Error} If the minimum or maximum values are less than 100000.
 * @throws {Error} If the minimum or maximum values are not numbers.
 * @throws {Error} If the minimum or maximum values are not whole numbers.
 */
export const generateOTPCode = (min?: number, max?: number): number => {
  min = min || 100000;
  max = max || 999999;

  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  } else if (min < 0 || max < 0) {
    throw new Error('Minimum and maximum values cannot be negative');
  } else if (min.toString().length !== 6 || max.toString().length !== 6) {
    throw new Error('Minimum and maximum values must be six digits long');
  } else if (min === max) {
    throw new Error('Minimum and maximum values cannot be the same');
  } else if (min > 999999 || max > 999999) {
    throw new Error('Minimum and maximum values cannot be greater than 999999');
  } else if (max < 100000 || min < 100000) {
    throw new Error('Minimum and maximum values cannot be less than 100000');
  } else if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Minimum and maximum values must be numbers');
  } else if (min % 1 !== 0 || max % 1 !== 0) {
    throw new Error('Minimum and maximum values must be whole numbers');
  } else if (min > 999999 || max > 999999) {
    throw new Error('Minimum and maximum values cannot be greater than 999999');
  } else if (min % 1 !== 0 || max % 1 !== 0) {
    throw new Error('Minimum and maximum values must be whole numbers');
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
