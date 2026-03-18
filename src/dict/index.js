
/**
 * @description 全局数据字典转换工具，将自定义格式的数组转换为 ElementUI 标准格式
 * @author crazystudent13
 * @param {Array} array - 需要转换的数组
 * @param {string} [label='label'] - 展示字段名
 * @param {string} [value='value'] - 值字段名
 * @return {Array} 返回转换后的数组，包含 label、value、text 字段
 */
export function optionTranslate(array, label, value) {
  const optionsArray = []
  const labelCode = label || 'label'
  const valueCode = value || 'value'
  array.map((item) => {
    let tempItem = item
    tempItem.value = item[valueCode]
    tempItem.label = item[labelCode]
    tempItem.text = item[labelCode]
    optionsArray.push(tempItem)
  })
  return optionsArray || []
}


/**
 * @description 数据字典翻译工具，根据值查找对应的标签或根据标签查找值
 * @author crazystudent13
 * @param {*} value - 需要翻译的值
 * @param {Array} array - 数据字典数组
 * @param {boolean} [type] - 转换方向：true 返回 key 值，false 返回 label 值
 * @return {*} 返回查找结果
 */
export function translate(value, array, type) {
  let keyValue = null
  let label = ''
  if (type) {
    array.map((item) => {
      if (item.label == value || item.text == value) keyValue = item.value
    })
    return keyValue
  } else {
    array.map((item) => {
      if (item.value == value) {
        if (item.label !== undefined) {
          label = item.label
        } else {
          label = item.text
        }
      }
    })
    return label
  }
}


/**
 * @description 以 code 为准的数据字典翻译工具（不推荐使用）
 * @author crazystudent13
 * @deprecated 考虑将来会废弃，建议与 translate 方法整合
 * @param {*} value - 需要翻译的值
 * @param {Array} array - 数据字典数组
 * @param {boolean} [type] - 转换方向：true 返回 code 值，false 返回 label 值
 * @return {*} 返回查找结果
 */
export function translateCode(value, array, type) {
  let keyValue = null
  let label = ''
  if (type) {
    array.map((item) => {
      if (item.label == value || item.text == value) keyValue = item.code
    })
    return keyValue
  } else {
    array.map((item) => {
      if (item.code == value) {
        if (item.label !== undefined) {
          label = item.label
        } else {
          label = item.text
        }
      }
    })
    return label
  }
}
