/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-10-17 09:27:05
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-10-17 09:32:25
 * @Description: 图片处理相关方法
 */

/**
 * @description 图片压缩工具，前端生成缩略图
 * @author crazystudent13
 * @param {HTMLImageElement} img - 需要压缩的图片元素
 * @return {string} 返回压缩后的 Base64 编码
 */
export function compressImg(img) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // 瓦片 canvas
  const tCanvas = document.createElement('canvas')
  const tctx = tCanvas.getContext('2d')
  const initSize = img.src.length
  let width = img.width
  let height = img.height
  // 如果图片大于四百万像素，计算压缩比并将大小压至 400 万以下
  let ratio
  if ((ratio = (width * height) / 4000000) > 1) {
    console.log('大于 400 万像素')
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
  // 如果图片像素大于 100 万则使用瓦片绘制
  let count
  if ((count = (width * height) / 1000000) > 1) {
    console.log('超过 100W 像素')
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
