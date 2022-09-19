
/**
 * 全局数据字典转换工具，用于转化那些不标准的数组字典，转换结果和elementUI的习惯相似，常用来处理接口
 * @constructor
 * @author，crazystudent13
 * @todo，暂无
 * @param { array } array - 需要转换的数组
 * @param { string } label - 需要转换的展示字段
 * @param { string } value - 需要转换的值字段
 * @return { array }  返回转换结果
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
 * 全局数据字典翻译工具
 * @constructor
 * @author，crazystudent13
 * @todo，暂无
 * @param { string } value - 需要翻译的值
 * @param { array } array - 需要翻译的数组
 * @param { string } value - 转换方向，true代表返回的为key值，flase代表返回label值
 * @return { array }  返回转换结果
 */
export function translate(value, array, type) {
  let keyValue = null
  let label = ''
  if (type) {
    array.map((item) => {
      if (item.label === value || item.text === value) keyValue = item.value
    })
    return keyValue
  } else {
    array.map((item) => {
      if (item.value === value) {
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
 * 翻译以code为准的数据字典
 * @constructor
 * @author，crazystudent13
 * @todo，这个是可能将来会考虑废弃，或者是和数据字典翻译方法整合，所以，不推荐使用
 * @param { string } value - 需要翻译的值
 * @param { array } array - 需要翻译的数组
 * @param { string } type - 转换方向，true代表返回的为key值，flase代表返回label值
 * @return { array }  返回转换结果
 */
export function translateCode(value, array, type) {
  let keyValue = null
  let label = ''
  if (type) {
    array.map((item) => {
      if (item.label === value || item.text === value) keyValue = item.code
    })
    return keyValue
  } else {
    array.map((item) => {
      if (item.code === value) {
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
