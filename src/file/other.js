/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-10-17 09:27:05
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-10-17 09:32:25
 * @Description: 其他文件处理相关方法
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
