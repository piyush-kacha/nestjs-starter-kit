/**
 * Generate a slug from a text
 * @param {string} text - The text to generate a slug from
 * @returns {string} The generated slug
 */
export const generateSlug = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
