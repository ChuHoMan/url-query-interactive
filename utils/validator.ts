const toString = Object.prototype.toString;
export const isObject = (val: unknown) => toString.call(val) === '[object Object]';
