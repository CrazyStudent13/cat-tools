/**
 * @description 计算字符串的像素宽度，常用于文本渲染和布局场景
 * @constructor
 * @author crazystudent13
 * @param {string} str - 需要计算宽度的字符串
 * @param {string} [standard='normal 12px Robot'] - 字体样式标准
 * @return {number} 返回字符串的像素宽度值
 */
export function computeStrWidth(str, standard) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font = standard || 'normal 12px Robot'
  let txt = str || str

  let metrics = context.measureText(txt).width || 0
  return metrics
}

/**
 * @description 生成指定位数的随机验证码，支持数字和大写字母组合
 * @constructor
 * @author crazystudent13
 * @param {number} len - 需要生成的随机码位数，默认为 4 位
 * @return {string} 返回生成的随机码字符串
 */
export function createRandomCode(len) {
  let code = ''
  let codeLength = len || 4
  let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')

  for (let i = 0; i < codeLength; i++) {
    let index = Math.floor(Math.random() * 36)
    code += random[index]
  }

  return code
}

/**
 * @description 前端导出 Excel 文件，将表格数据转换为 Excel 格式下载
 * @constructor
 * @author crazystudent13
 * @deprecated 不推荐使用，主要原因是字段标准和数据字典参数不统一，未来可能会有破坏性改动
 * @param {Array} array - 表单数据数组
 * @param {Array} tableHeader - 表头配置数组，格式为 [{value:'', describe:''}]
 * @param {string} [fileName] - 生成的文件名，不传则使用时间戳命名
 * @return {void}
 */
export function exportExcelFile(array, tableHeader, fileName) {
  let fileNameTemp = fileName || new Date().valueOf()
  let str = ''

  // 拼接表头
  tableHeader.forEach((item) => {
    str += item.describe + ','
  })
  str += '\n'

  // 拼接表格数据
  array.forEach((element) => {
    tableHeader.forEach((item) => {
      str += element[item.value] + ','
    })
    str += '\n'
  })

  // 解决中文乱码问题
  let blob = new Blob([str], { type: 'text/plain;charset=utf-8' })
  blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type })
  let object_url = window.URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = object_url
  link.download = fileNameTemp ? fileNameTemp + '.xls' : 'ProjectList.xls'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * @description 打印欢迎信息，用于测试方法包是否正常加载
 * @constructor
 * @author crazystudent13
 * @return {void}
 */
export function logCat() {
  console.log('欢迎使用 cat 方法包')
}
