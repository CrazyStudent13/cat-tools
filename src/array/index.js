// /**
//  * 数组对象去重,根绝传入的key，判断去重的标准
// 
// 
//  * @author，crazystudent13
//  * @todo，暂无待办
//  * @param { array } arr - 需要去重的数组对象
//  * @param { string } distinctKey - 去重的判断的key
//  * @return 去重结果
//  */
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
 * @description 数组对象查重,根绝传入的key，判断当前数组是否有重复
 * @author，crazystudent13
 * @todo，实现方式不够优雅，所以这里需要处理一下，而且和另一个方法，命名似乎可以归类一下
 * @method  distinctArrKeys
 * @param { array } arr - 需要去重的数组对象
 * @param { string } distinctKey - 去重的判断的key
 * @return { boolean }  去重判断结果结果,如果有重复项，返回true, 反之返回false
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
 * @description 返回数组对象下标
 * @author crazystudent13
 * @todo 这个方法有优化空间，也许不仅仅可以是只返回下标
 * @method  findArrObjIndex
 * @param { array } arr - 需要去重的数组对象
 * @param { object } row - 需要判断的行
 * @param { string } param - 需要判断的数组的对象
 * @return { number } 具体的数组下表
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
 * @description 列表分组


 * @author crazystudent13
 * @todo 暂无
 * @method  groupByType
 * @param { array } arr - 需要分组的数组对象
 * @param { string } param - 分组的判断字段
 * @return { array } 分组完成的数组
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
 * @description 数组去空工具


 * @author crazystudent13
 * @todo 暂无
 * @method  removeArrayNull
 * @param { array } arr - 需要出去数组中空值的数组
 * @return { array } 去空完成的数组
 */
export function removeArrayNull(arr) {
  let arrHandler = []
  arrHandler = arr.filter((item) => {
    return item !== null
  })
  return arrHandler
}

/**
 * @description 数组去重


 * @author crazystudent13
 * @todo 暂无
 * @method  uniqueArr
 * @param { array } arr - 非数组对象，简单的一维数组
 * @return { array } 去重完成的结果
 */
export function uniqueArr(arr) {
  let arrTemp = arr || []
  return Array.from(new Set(arrTemp))
}

/**
 * @description 数组key值大小写转换，常用来处理接口返回的不规则结果


 * @author crazystudent13
 * @todo 暂无
 * @method  upperOrLowerKeys
 * @param { array } arr - 将数组对象中的key转换为大写key
 * @param { string } code - 转换的方向 upper 代表转大写，lower代表转小写
 * @return { array } 字段值转换完成的数组结果
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
