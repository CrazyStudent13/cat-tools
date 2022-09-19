// 判断两个时间相差情况
export function compareDate(startTime, endTime) {
  let start = new Date(startTime)
  let end = new Date(endTime)
  let flag = start - end > 0

  return flag
}

// 时间格式化插件
export function formatTime(date, fmt) {
  let newTime = new Date(date)
  let ret
  const opt = {
    'Y+': newTime.getFullYear().toString(), // 年
    'm+': (newTime.getMonth() + 1).toString(), // 月
    'd+': newTime.getDate().toString(), // 日
    'H+': newTime.getHours().toString(), // 时
    'M+': newTime.getMinutes().toString(), // 分
    'S+': newTime.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
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
