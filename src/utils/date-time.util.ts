/**
 * Converts a time string to milliseconds.
 *
 * The time string should end with a single character representing the time unit:
 * - 'd' for days
 * - 'h' for hours
 * - 'm' for minutes
 * - 's' for seconds
 *
 * @param {string} time - The time string to convert.
 * @returns {number} The equivalent time in milliseconds.
 * @throws {Error} If the time format is invalid.
 */
export function convertToMilliseconds(time: string): number {
  const timeUnit = time.slice(-1); // Obtiene el último carácter (d, h, m, s)
  const timeValue = parseInt(time.slice(0, -1)); // Obtiene el valor numérico

  switch (timeUnit) {
    case 'd': // días
      return timeValue * 24 * 60 * 60 * 1000;
    case 'h': // horas
      return timeValue * 60 * 60 * 1000;
    case 'm': // minutos
      return timeValue * 60 * 1000;
    case 's': // segundos
      return timeValue * 1000;
    default:
      throw new Error(`Invalid time format: ${time}`);
  }
}
