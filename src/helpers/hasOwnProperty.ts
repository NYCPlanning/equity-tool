// This function helps avoid TypeScript errors when using type string to index into an Object
// https://fettblog.eu/typescript-hasownproperty/
export function hasOwnProperty<T>(obj: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
