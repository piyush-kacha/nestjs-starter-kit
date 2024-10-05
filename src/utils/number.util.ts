/**
 * Generates a random six digit OTP
 * @param {number} min - the minimum value of the OTP (default is 100000)
 * @param {number} max - the maximum value of the OTP (default is 999999)
 * @returns {number} - returns the generated OTP
 * @throws {Error} - throws an error if the minimum value is greater than the maximum value
 * @throws {Error} - throws an error if the minimum or maximum values are negative
 * @throws {Error} - throws an error if the minimum or maximum values are not six digits long
 * @throws {Error} - throws an error if the minimum and maximum values are the same
 * @throws {Error} - throws an error if the minimum or maximum values are greater than 999999
 * @throws {Error} - throws an error if the minimum or maximum values are less than 100000
 * @throws {Error} - throws an error if the minimum or maximum values are not numbers
 */
export const generateOTPCode = (min?: number, max?: number): number => {
  min = min || 100000;
  max = max || 999999;

  // Validate the input values
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
