// /**
//  * @constructor
//  * @param {*} str
//  * @param {*} standard
//  */
export function computeStrWidth(str, standard) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font = standard || 'normal 12px Robot'
  let txt = str || str

  let metrics = context.measureText(txt).width || 0
  return metrics
}

// 生成随机码
export function createRandomCode() {
  let code = ''
  let codeLength = 4
  let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')

  for (let i = 0; i < codeLength; i++) {
    let index = Math.floor(Math.random() * 36)
    code += random[index]
  }

  return code
}

// 自定义导出excel文件
export function exportExcelFile(array, tableLabel, fileName) {
  let fileNameTemp = fileName || new Date().valueOf()
  let str = ''

  // 拼接表头
  tableLabel.forEach((item) => {
    str += item.describe + ','
  })
  str += '\n'

  // 拼接表格数据
  array.forEach((element) => {
    tableLabel.forEach((item) => {
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
