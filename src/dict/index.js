// 全局数据字典转换工具，转化那些不标准的数组字典
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

// 全局数据字典翻译工具
export function translate(value, array, type) {
  // type代表翻译类型，true代表返回的为key值，flase代表返回label值
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

// 翻译以code为准的数据字典
export function translateCode(value, array, type) {
  // type代表类型，true代表返回的为key值，flase代表返回label值
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
