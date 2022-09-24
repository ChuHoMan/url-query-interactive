export const ensureArray = <T>(arr: T | ReadonlyArray<T>): T[] => {
    if(!arr && (arr as any) !== 0) return []
    return Array.isArray(arr) ? arr : [arr] as any
}