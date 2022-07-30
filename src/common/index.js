// 深拷贝
export function deepCopy(obj) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    // 只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = this.deepCopy(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}
