export function exclude<T, Key extends keyof T>(obj: T, ...keys: Key[]) {
  for (const key of keys) {
    // Delete the key from the object
    delete obj[key];
  }
  return obj;
}
