/**
 * @description 比较两个时间的大小，判断 startTime 是否晚于 endTime
 * @author crazystudent13
 * @param {string|Date} startTime - 开始时间
 * @param {string|Date} endTime - 结束时间
 * @return {boolean} 如果 startTime 晚于 endTime 返回 true，否则返回 false
 */
export function compareDate(startTime, endTime) {
  let start = new Date(startTime)
  let end = new Date(endTime)
  let flag = start - end > 0

  return flag
}

/**
 * @description 时间戳转换为格式化日期时间（北京时间）
 * @author crazystudent13
 * @param {number} [time=当前时间戳] - 需要转换的时间戳
 * @return {string} 返回格式化的日期时间字符串，格式为 'YYYY-MM-DD HH:mm:ss'
 */
export function timestampTranslate(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000) // 因为是北京时区，所以这里增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ')
}
