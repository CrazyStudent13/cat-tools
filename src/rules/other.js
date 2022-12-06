/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 16:02:58
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-06 17:10:49
 * @Description: 项目中常用的其他判断模式
 */

/**
 * 判断是否第三方连接，这个是项目中使用的
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} path
 * @returns {Boolean} 判断结果
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断是否为url
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} url
 * @returns {Boolean} 判断结果
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 判断字符串是否小写
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} str
 * @returns {Boolean} 判断结果
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 判断字符串是否大写
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} str
 * @returns {Boolean} 去重结果
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
