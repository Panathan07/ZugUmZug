export function renameKeys<T extends { [key: string]: any }>(
  object: T,
  keysMap: { [key: string]: string },
): T {
  return Object.keys(object).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: object[key] },
    }),
    {},
  ) as T;
}
