/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 17:09:20
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-06 17:09:46
 * @Description: 主要判断值相关的内容
 */

/**
 * 判断是否字符串
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} str
 * @returns {Boolean} 判断结果
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 判断是否数组
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} arg
 * @returns {Boolean} 判断结果
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
