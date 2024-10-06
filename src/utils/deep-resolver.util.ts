/**
 * Recursively resolves all promises within an input object, array, or value.
 *
 * @param input - The input value which can be a promise, array, object, or any other type.
 * @returns A promise that resolves to the same structure as the input, but with all promises resolved.
 *
 * @example
 * ```typescript
 * const input = {
 *   a: Promise.resolve(1),
 *   b: [Promise.resolve(2), 3],
 *   c: {
 *     d: Promise.resolve(4),
 *     e: 5
 *   }
 * };
 *
 * const result = await deepResolvePromisesUtil(input);
 * // result will be: { a: 1, b: [2, 3], c: { d: 4, e: 5 } }
 * ```
 */
export const deepResolvePromisesUtil = async (input) => {
  if (input instanceof Promise) {
    return await input;
  }

  if (Array.isArray(input)) {
    const resolvedArray = await Promise.all(input.map(deepResolvePromisesUtil));
    return resolvedArray;
  }

  if (input instanceof Date) {
    return input;
  }

  if (typeof input === 'object' && input !== null) {
    const keys = Object.keys(input);
    const resolvedObject = {};

    for (const key of keys) {
      const resolvedValue = await deepResolvePromisesUtil(input[key]);
      resolvedObject[key] = resolvedValue;
    }

    return resolvedObject;
  }

  return input;
};
