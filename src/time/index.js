// 判断两个时间相差情况
export function compareDate(startTime, endTime) {
  let start = new Date(startTime)
  let end = new Date(endTime)
  let flag = start - end > 0

  return flag
}

/**
 * 时间戳转换工具
 * @constructor
 * @author crazystudent13
 * @todo 暂无待办
 * @param { string } time - 需要转换的时间戳
 * @return 时间戳转换结果
 */
export function timestampTranslate(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000) // 因为是北京时区，所以这里增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ')
}
