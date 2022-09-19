/**
 * 判断字符串宽度，会用来在一些特殊的地方使用
 * @constructor
 * @author，crazystudent13
 * @param { number } str - 需要判断字符串
 * @param { string } standard - 字体标准，默认'normal 12px Robot'
 * @return { number }  返回字符串宽度结果
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
 * 生成随机码,常用来做些简单的随机码
 * @constructor
 * @author，crazystudent13 
 * @param { number } len - 需要生成的随机码位数
 * @return { string }  返回字符串宽度结果
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
 * 前端导出自定义导出excel文件
 * @constructor
 * @author，crazystudent13
 * @todo，这个方法不推荐使用，主要原因是标准和之前的数据字典参数不统一,未来可能会有破坏性的改动
 * @param { number } array - 表单数据
 * @param { array } tableHeader - 需要生成的表头数组，按照[{value:'',describe:''}] 的形式
 * @param { string } fileName - 生成的文件名称
 * @return { string }  返回字符串宽度结果
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

// 测试方法包
export function logCat() {
  console.log('欢迎使用cat方法包')
}
