const toString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  toString.call(value);
export const isObject = (val: unknown) => toTypeString(val) === '[object Object]';
export const isDate = (val: unknown) => toTypeString(val) === '[object Date]';
export const isArray = (val: unknown) => toTypeString(val) === '[object Array]';
