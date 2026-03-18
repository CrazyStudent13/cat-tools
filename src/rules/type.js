/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 17:09:20
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-07 18:07:47
 * @Description: 主要判断值相关的类型
 */

/**
 * @description 判断是否为字符串类型
 * @author crazystudent13
 * @param {*} str - 需要判断的值
 * @return {boolean} 如果是字符串返回 true，否则返回 false
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @description 判断是否为数组类型
 * @author crazystudent13
 * @param {*} arg - 需要判断的值
 * @return {boolean} 如果是数组返回 true，否则返回 false
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 验证数据是否为 Blob 格式
 * @author crazystudent13
 * @param {Blob} data - 需要验证的数据
 * @return {Promise<boolean>} 如果是 Blob 格式返回 true，否则返回 false
 */
export async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}
