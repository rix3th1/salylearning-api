export function exclude<T, Key extends keyof T>(obj: T, ...keys: Key[]) {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}
