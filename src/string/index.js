/**
 * 用来判断一个值是否为空的方法
 * @constructor
 * @参数 { any } value - 需要判断的值
 */
export function isNullorUndefined(value) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length === 0 || JSON.stringify(value) === '{}') {
    return true
  } else {
    return false
  }
}

/**
 * 字符串去重
 * @constructor
 * @param { string } str - 需要切割的字符串
 * @param { string } repeatStr - 需要分割的字符串
 * @param { string } separator - 分割的字符串
 */
export function strDistinct(str, repeatStr, separator) {
  let tempArr = str.split(separator)
  tempArr.map((itemtemp, indextemp, arr) => {
    if (itemtemp === repeatStr) {
      arr.splice(indextemp, 1)
    }
  })
  tempText = tempArr.join(separator)
  return tempText
}

/**
 * 判断字符串长度
 * @constructor
 * @param { string } str - 需要判断长度的字符串
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
