import { isDate, isObject, isArray } from "."

function forEach(obj: any, fn: (...args: any[]) => any) {
    if (obj === null || typeof obj === 'undefined') {
      return
    }
  
    if (typeof obj !== 'object') {
      /* eslint no-param-reassign:0 */
      obj = [obj]
    }
  
    if (isArray(obj)) {
      // 遍历数组的每个值
      for (let i = 0, l = obj.length; i < l; i++) {
        // eslint-disable-next-line no-useless-call
        fn.call(null, obj[i], i, obj)
      }
    } else {
      // 遍历每个对象
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // eslint-disable-next-line no-useless-call
          fn.call(null, obj[key], key, obj)
        }
      }
    }
  }
  
  export function encode(val: string) {
    return encodeURIComponent(val)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
  
  export function buildURL(url: string, params: any) {
    /* eslint no-param-reassign:0 */
    if (!params) {
      return url
    }
  
    const parts: any = []
  
    forEach(params, (val: any, key: any) => {
      if (val === null || typeof val === 'undefined') {
        return
      }
  
      if (isArray(val)) {
        key = key + '[]'
      } else {
        val = [val]
      }
  
      forEach(val, (v: any) => {
        if (isDate(v)) {
          v = v.toISOString()
        } else if (isObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(encode(key) + '=' + encode(v))
      })
    })
  
    const serializedParams = parts.join('&')
  
    if (serializedParams) {
      const hashMarkIndex = url.indexOf('#')
      if (hashMarkIndex !== -1) {
        url = url.slice(0, hashMarkIndex)
      }
  
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  
    return url
  }
  