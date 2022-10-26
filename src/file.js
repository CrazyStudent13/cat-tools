/**
 * Author: 远川
 * Date: 2022-10-17 09:27:05
 * LastEditTime: 2022-10-17 09:32:25
 * desc: 整合目前的图片，文件相关的公用方法，整合了之前的方法，目前正在重写中，暂不发布
 * doc: 文章链接
 */

/**
 * 压缩图片，前端制作缩略图，可以避免开发者自己去压缩图片
 * @constructor
 * @author crazystudent13
 * @todo 暂无待办
 * @param { file } dataURI - 需要转换为文件的base64位码
 * @param { string } type - 文件类型
 * @return 转换后的Base64位码
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
 * Base64转换为文件
 * @constructor
 * @author crazystudent13
 * @todo 暂无待办
 * @param { file } dataURI - 需要转换为文件的base64位码
 * @param { string } type - 文件类型
 * @return 转换后的Base64位码
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
 * 图片转换为Base64位码
 * @constructor
 * @author crazystudent13
 * @todo 图片和文件
 * @param { file } img - 需要转码的文件
 * @return 转换后的Base64位码
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
 * 判断文件及文件大小
 * @constructor
 * @author crazystudent13
 * @todo 这里是将文件的大小和类型一起判断了，功能有些耦合，建议将这两种方法拆开
 * @param { string } file - 上传文件的名称(包含文件名)
 * @param { array } typeArr - 要限制的类型，
 * @param { number } size - 文件大小
 * @return 字符串分割结果
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
 * 下载excel文件
 * @constructor
 * @author crazystudent13
 * @todo 这个方法暂时还不稳定，建议后期多做测试
 * @param { blob } blob - 需要下载的excel文件
 * @param { string } fileName - 自定义文件名称
 * @return 字符串分割结果
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
