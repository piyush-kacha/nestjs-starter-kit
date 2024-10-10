/**
 * A utility type that represents a type `T` or `never`.
 *
 * This type can be useful in scenarios where you want to explicitly
 * indicate that a type can either be a specific type `T` or `never`.
 *
 * @template T - The type to be used or `never`.
 *
 * @example
 * // Example usage of OrNeverType
 *
 * // A type that can be a string or never
 * type StringOrNever = OrNeverType<string>;
 *
 * // A function that accepts a parameter of type StringOrNever
 * function exampleFunction(param: StringOrNever) {
 *   if (typeof param === 'string') {
 *     console.log(`The parameter is a string: ${param}`);
 *   } else {
 *     console.log('The parameter is never');
 *   }
 * }
 *
 * exampleFunction('Hello, world!'); // The parameter is a string: Hello, world!
 * exampleFunction(undefined as never); // The parameter is never
 */
export type OrNeverType<T> = T | never;
