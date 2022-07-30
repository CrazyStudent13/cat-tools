// 数组对象去重
export function arrObjDistinct(arr, distinctKey) {
  let obj = {}
  let arrTemp = new Array()
  arrTemp = arr.reduce((cur, next) => {
    obj[next[distinctKey]] ? '' : (obj[next[distinctKey]] = true && cur.push(next))
    return cur
  }, []) // 设置cur默认类型为数组，并且初始值为空的数组
  return arrTemp
}

// 数组对象查重(可优化)
export function distinctArrKeys(arr, distinctKey) {
  let flag = true
  // 数组查重
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i][distinctKey], arr[j][distinctKey])
      if (arr[i][distinctKey] !== arr[j][distinctKey]) {
        flag = false
        break
      }
    }
  }
  // 如果有重复项，返回true,反之返回else
  return !flag
}

// 这个方法有优化空间，也许不仅仅可以是只返回下标
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

// 列表分组
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

// 数组去空工具
export function removeArrayNull(arr) {
  let arrHandler = []
  arrHandler = arr.filter((item) => {
    return item !== null
  })
  return arrHandler
}

// 数组去重
export function uniqueArr(arr) {
  let arrTemp = arr || []
  return Array.from(new Set(arrTemp))
}

// 将数组对象中的key转换为大写key, upper 代表转大写，lower代表转小写
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
