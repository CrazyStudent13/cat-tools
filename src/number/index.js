/**
 * @description 数字最大值限制，超过最大值时显示为 '99+'
 * @author crazystudent13
 * @param {number} [num=0] - 需要转换的数字
 * @param {number} [maxSize=99] - 最大值限制
 * @return {number|string} 返回转换结果，如果超过最大值则返回 '99+'
 */
export function maxNumber(num, maxSize) {
  let numTemp = num || 0
  let maxSizeTemp = maxSize || 99
  if (parseInt(numTemp) > maxSizeTemp) {
    return '99+'
  }
  return num
}


/**
 * @description 判断是否为有效数字
 * @author crazystudent13
 * @param {*} value - 需要判断的值
 * @return {boolean} 如果是有效数字返回 true，否则返回 false
 */
export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}


/**
 * @description 数字千分位格式化
 * @author crazystudent13
 * @param {number} num - 需要格式化的数字
 * @return {string|number} 返回格式化后的字符串，如果输入无效则返回 0
 */
export function toThousandFilter(num) {
  if (num === null || typeof num === 'undefined' || num === '' || num === 0) {
    return 0
  } else {
    return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}


/**
 * @description 千分位分隔器，支持字符串和数字类型的输入
 * @author crazystudent13
 * @param {string|number} num - 需要分隔的数字或字符串
 * @return {string} 返回分隔后的字符串，如果输入无效则返回 "0"
 */
export function thousandsSeparator(num) {
  if (typeof num === "string" || typeof num === "number") {
    let value = String(num);
    value = value.replace(/\$\s?|(,*)/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
}

