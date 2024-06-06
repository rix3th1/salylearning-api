export function exclude<T, Key extends keyof T>(obj: T, ...keys: Key[]) {
  for (const key of keys) {
    // Delete the key from the object
    delete obj[key];
  }
  return obj;
}

export const embedCanvaUrl = (url: string) => {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname === 'www.canva.com') {
    if (parsedUrl.pathname.includes('/view')) {
      if (parsedUrl.searchParams.has('embed')) {
        return url;
      } else {
        parsedUrl.searchParams.append('embed', '');
        return parsedUrl.toString();
      }
    } else {
      return embedCanvaUrl(`${url}/view`);
    }
  }
};
