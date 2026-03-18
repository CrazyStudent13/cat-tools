/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 16:02:58
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-06 17:10:49
 * @Description: 项目中常用的其他判断模式
 */

/**
 * @description 判断是否为外部链接（支持 http、https、mailto、tel 等协议）
 * @author crazystudent13
 * @param {string} path - 需要判断的路径或链接
 * @return {boolean} 如果是外部链接返回 true，否则返回 false
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 验证 URL 格式
 * @author crazystudent13
 * @param {string} url - 需要验证的 URL 地址
 * @return {boolean} 如果格式正确返回 true，否则返回 false
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description 验证字符串是否全为小写字母
 * @author crazystudent13
 * @param {string} str - 需要验证的字符串
 * @return {boolean} 如果全为小写字母返回 true，否则返回 false
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description 验证字符串是否全为大写字母
 * @author crazystudent13
 * @param {string} str - 需要验证的字符串
 * @return {boolean} 如果全为大写字母返回 true，否则返回 false
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
