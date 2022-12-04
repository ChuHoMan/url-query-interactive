type Arrayable<T> = T | T[]

/**
 * underline to dashed
 * 下划线转中划线
 * @example
 * UnderlineToDashed<'A_B'>  // A_B -> A-B
 */
 type UnderlineToDashed<T> = T extends `${infer S}${infer R}`
 ? S extends '_'
   ? `-${UnderlineToDashed<R>}`
   : `${S}${UnderlineToDashed<R>}`
 : T
