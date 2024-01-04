export function isEqual(obj1: any, obj2: any): boolean {
  const keys = Object.keys,
    typeObj1 = typeof obj1,
    typeObj2 = typeof obj2;
  if (obj1 === obj2) return true;
  if (!(obj1 && obj2 && typeObj1 === typeObj2)) return false;
  if (!(typeObj1 === "object")) return true;
  if (!(keys(obj1).length === keys(obj2).length)) return false;
  if (keys(obj1).every((key) => isEqual(obj1[key], obj2[key]))) return true;
  return false;
}
