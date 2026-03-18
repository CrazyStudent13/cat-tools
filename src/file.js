/**
 * Author: crazystudent13
 * Date: 2022-10-17 09:27:05
 * LastEditTime: 2022-10-17 09:32:25
 * desc: 整合目前的图片，文件相关的公用方法，整合了之前的方法，目前正在重写中，暂不发布
 * doc: 文章链接
 */
/**
 * @description 获取文件后缀名
 * @author crazystudent13
 * @param {string} filename - 文件名（包含后缀）
 * @return {string} 返回小写格式的后缀名，如果没有后缀则返回空字符串
 */
export function getFileType(filename) {
  var startIndex = filename.lastIndexOf('.')
  if (startIndex != -1) return filename.substring(startIndex + 1, filename.length).toLowerCase()
  else return ''
}

/**
 * @description 图片压缩工具，前端生成缩略图
 * @author crazystudent13
 * @param {HTMLImageElement} img - 需要压缩的图片元素
 * @return {string} 返回压缩后的 Base64 编码
 */
export function compressImg(img) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // 瓦片canvas
  const tCanvas = document.createElement('canvas')
  const tctx = tCanvas.getContext('2d')
  const initSize = img.src.length
  let width = img.width
  let height = img.height
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio
  if ((ratio = (width * height) / 4000000) > 1) {
    console.log('大于400万像素')
    ratio = Math.sqrt(ratio)
    width /= ratio
    height /= ratio
  } else {
    ratio = 1
  }
  canvas.width = width
  canvas.height = height
  // 铺底色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // 如果图片像素大于100万则使用瓦片绘制
  let count
  if ((count = (width * height) / 1000000) > 1) {
    console.log('超过100W像素')
    count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
    // 计算每块瓦片的宽和高
    const nw = ~~(width / count)
    const nh = ~~(height / count)
    tCanvas.width = nw
    tCanvas.height = nh
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  }
  // 进行最小压缩
  const ndata = canvas.toDataURL('image/jpeg', 0.1)
  console.log('压缩前：' + initSize)
  console.log('压缩后：' + ndata.length)
  console.log('压缩率：' + ~~((100 * (initSize - ndata.length)) / initSize) + '%')
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
  return ndata
}

/**
 * @description Base64 编码转换为 Blob 对象
 * @author crazystudent13
 * @param {string} dataURI - Base64 编码字符串
 * @param {string} type - MIME 类型
 * @return {Blob} 返回转换后的 Blob 对象
 */
export function base64ToFile(dataURI, type) {
  let binary = atob(dataURI.split(',')[1])
  let array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: type })
}

/**
 * @description 图片转换为 Base64 编码
 * @author crazystudent13
 * @param {HTMLImageElement} img - 需要转换的图片元素
 * @return {string} 返回 Base64 编码字符串
 */
export function fileToBase64(img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  var dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}

/**
 * @description 验证上传文件的类型和大小
 * @author crazystudent13
 * @deprecated 方法耦合度高，建议拆分为类型验证和大小验证两个独立方法
 * @param {File} file - 上传的文件对象
 * @param {Array<string>} typeArr - 允许的文件类型数组
 * @param {number} size - 文件大小限制（字节）
 * @return {boolean} 验证通过返回 true，否则返回 false
 */
export function judgeUploadFile(file, typeArr, size) {
  let FileExt = file.name.replace(/.+\./, '')
  let TypeArrList = typeArr
  let TypeArrStr = ''
  let fileSize = size
  TypeArrList.map((item, index, arr) => {
    TypeArrStr = arr.length - 1 !== index ? TypeArrStr + item + ',' : TypeArrStr + item
  })

  if (TypeArrList.indexOf(FileExt.toLowerCase()) === -1) {
    Message({ message: '您上传的文件格式有误', type: 'warning' })
    return false
  } else {
    this.isLt2k = file.size / 1024 < fileSize ? '1' : '0'
    if (this.isLt2k === '0') {
      Message({ message: `上传文件大小不能超过${fileSize / 1024}M！`, type: 'error' })
    }
    return this.isLt2k === '1' ? true : false
  }
}

/**
 * @description 下载 Excel 文件
 * @author crazystudent13
 * @param {Blob} blob - Excel 文件的 Blob 对象
 * @param {string} fileName - 自定义文件名称
 */
export function downloadExcelFile(blob, fileName) {
  //  对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  //  IE10以上支持blob但是依然不支持download
  if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器
    const link = document.createElement('a')
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } else {
    // 其他浏览器
    navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * @description 自定义导出 Excel 文件（不推荐使用）
 * @author crazystudent13
 * @deprecated 功能与 downloadExcelFile 类似，建议考虑合并
 * @param {Array} data - 表格数据数组
 * @param {Array} tableLabel - 表头配置数组
 * @param {string} [fileName] - 自定义文件名称
 */
export function exportExcelFile(data, tableLabel, fileName) {
  let str = ''
  // 拼接表头
  tableLabel.forEach((item) => {
    str += item.describe + ','
  })
  str += '\n'

  // 拼接表格数据
  data.forEach((element) => {
    tableLabel.forEach((item) => {
      str += element[item.name] + ','
    })
    str += '\n'
  })

  // 解决中文乱码问题
  let blob = new Blob([str], { type: 'text/plain;charset=utf-8' })
  blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type })
  let object_url = window.URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = object_url
  link.download = fileName ? fileName + '.xls' : `file_${new Date().getTime()}` + '.xls'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
