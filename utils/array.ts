export const ensureArray = <T>(arr: T | ReadonlyArray<T>): T[] => {
  if (!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr) ? arr : [arr] as any;
};

export const isNotNullArrary = (val: unknown): boolean => {
  return Array.isArray(val) && val.length > 0
}
