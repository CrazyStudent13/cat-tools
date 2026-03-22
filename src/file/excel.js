/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-10-17 09:27:05
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-10-17 09:32:25
 * @Description: Excel 文件处理相关方法
 */

/**
 * @description 下载 Excel 文件
 * @author crazystudent13
 * @param {Blob} blob - Excel 文件的 Blob 对象
 * @param {string} fileName - 自定义文件名称
 */
export function downloadExcelFile(blob, fileName) {
  //  对于<a>标签，只有 Firefox 和 Chrome（内核）支持 download 属性
  //  IE10以上支持 blob 但是依然不支持 download
  if ('download' in document.createElement('a')) {
    // 支持 a 标签 download 的浏览器
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
