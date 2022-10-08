/**
 * @description 深拷贝,适用于数组和对象
 * @author，crazystudent13
 * @todo，暂无
 * @method deepCopy
 * @param { array } obj - 需要深拷贝的数组或对象
 * @return { array }   返回拷贝结果
 */
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
