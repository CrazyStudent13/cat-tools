

/**
 * @description 字符串去重，移除指定的重复子串
 * @author crazystudent13
 * @param {string} str - 需要处理的字符串
 * @param {string} repeatStr - 需要移除的重复子串
 * @param {string} separator - 分隔符
 * @return {string} 返回处理后的字符串
 */
export function strDistinct(str, repeatStr, separator) {
  let tempArr = str.split(separator)
  tempArr.map((itemtemp, indextemp, arr) => {
    if (itemtemp === repeatStr) {
      arr.splice(indextemp, 1)
    }
  })
  let tempText = tempArr.join(separator)
  return tempText
}

/**
 * @description 计算字符串长度（中文按 2 个字符计，英文按 1 个字符计）
 * @author crazystudent13
 * @param {string} str - 需要计算长度的字符串
 * @return {number} 返回字符串长度
 */
export function strLen(str) {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}
