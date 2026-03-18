/**
 * @description 数组对象去重，根据传入的 key 值判断重复项
 * @author crazystudent13
 * @param {Array} arr - 需要去重的数组对象
 * @param {string} distinctKey - 用于去重判断的字段名
 * @return {Array} 返回去重后的数组
 */
export function arrObjDistinct(arr, distinctKey) {
  let obj = {}
  let arrTemp = new Array()
  arrTemp = arr.reduce((cur, next) => {
    obj[next[distinctKey]] ? '' : (obj[next[distinctKey]] = true && cur.push(next))
    return cur
  }, []) // 设置cur默认类型为数组，并且初始值为空的数组
  return arrTemp
}

/**
 * @description 检查数组对象是否存在重复项，根据指定的 key 值判断
 * @author crazystudent13
 * @param {Array} arr - 需要检查的数组对象
 * @param {string} distinctKey - 用于判断重复的字段名
 * @return {boolean} 如果存在重复项返回 true，否则返回 false
 */
export function distinctArrKeys(arr, distinctKey) {
  let flag = true
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i][distinctKey], arr[j][distinctKey])
      if (arr[i][distinctKey] !== arr[j][distinctKey]) {
        flag = false
        break
      }
    }
  }
  return !flag
}

/**
 * @description 查找数组对象中指定元素的索引位置
 * @author crazystudent13
 * @param {Array} arr - 要搜索的数组对象
 * @param {Object} row - 要查找的元素对象
 * @param {string} param - 用于比较的字段名
 * @return {Object} 返回包含 index（索引）和 item（元素）的对象
 */
export function findArrObjIndex(arr, row, param) {
  let currentIndex = {}
  if (arr.length > 0) {
    arr.map((item, index) => {
      if (item[param] == row[param]) {
        currentIndex = { index, item }
      }
    })
  }

  return currentIndex
}

/**
 * @description 根据指定字段对数组进行分组
 * @author crazystudent13
 * @param {Array} arr - 需要分组的数组对象
 * @param {string} param - 用于分组的字段名
 * @return {Array} 返回分组后的数组，格式为 [{name: '分组名', data: [数组项]}]
 */
export function groupByType(arr, param) {
  let map = {}
  let dest = []
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i]
    if (ai[param] && !map[ai[param]]) {
      dest.push({
        name: ai[param],
        data: [ai],
      })
      map[ai[param]] = ai
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j]
        if (dj.name == ai[param]) {
          dj.data.push(ai)
          break
        }
      }
    }
  }
  return dest
}

/**
 * @description 移除数组中的 null 值
 * @author crazystudent13
 * @param {Array} arr - 需要移除 null 值的数组
 * @return {Array} 返回过滤后的数组
 */
export function removeArrayNull(arr) {
  let arrHandler = []
  arrHandler = arr.filter((item) => {
    return item !== null
  })
  return arrHandler
}

/**
 * @description 一维数组去重，适用于简单类型的数组
 * @author crazystudent13
 * @param {Array} arr - 需要去重的一维数组
 * @return {Array} 返回去重后的数组
 */
export function uniqueArr(arr) {
  let arrTemp = arr || []
  return Array.from(new Set(arrTemp))
}

/**
 * @description 转换数组对象的键名大小写，常用于处理接口返回的数据格式
 * @author crazystudent13
 * @param {Array} arr - 需要转换键名的数组对象
 * @param {string} code - 转换方向：'upper' 转大写，'lower' 转小写
 * @return {Array} 返回键名转换完成后的数组
 */
export function upperOrLowerKeys(arr, code) {
  let newArray = []
  arr.map((item) => {
    let tempItem = {}
    Object.keys(item).map((itemKey) => {
      let tempKey = ''
      tempKey = code === 'upper' ? itemKey.toLowerCase() : itemKey.toLowerCase()
      tempItem[tempKey] = item[itemKey]
    })
    newArray.push(tempItem)
  })
  return newArray
}
