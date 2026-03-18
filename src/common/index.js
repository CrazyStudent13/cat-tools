/**
 * @description 深拷贝数组或对象
 * @author crazystudent13
 * @param {Array|Object} obj - 需要深拷贝的数组或对象
 * @return {Array|Object} 返回拷贝后的结果
 */
export function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    // 只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepCopy(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}


/**
 * @description 判断值是否为空（null、undefined、空字符串、空数组或空对象）
 * @author crazystudent13
 * @param {*} value - 需要判断的值
 * @return {boolean} 如果为空返回 true，否则返回 false
 */
export function isNullorUndefined(value) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length === 0 || JSON.stringify(value) === '{}') {
    return true
  } else {
    return false
  }
}