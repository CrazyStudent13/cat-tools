'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// 数组对象去重
function arrObjDistinct(arr, distinctKey) {
  let obj = {};
  let arrTemp = new Array();
  arrTemp = arr.reduce((cur, next) => {
    obj[next[distinctKey]] ? '' : (obj[next[distinctKey]] = cur.push(next));
    return cur
  }, []); // 设置cur默认类型为数组，并且初始值为空的数组
  return arrTemp
}

// 数组对象查重(可优化)
function distinctArrKeys(arr, distinctKey) {
  let flag = true;
  // 数组查重
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i][distinctKey], arr[j][distinctKey]);
      if (arr[i][distinctKey] !== arr[j][distinctKey]) {
        flag = false;
        break
      }
    }
  }
  // 如果有重复项，返回true,反之返回else
  return !flag
}

// 这个方法有优化空间，也许不仅仅可以是只返回下标
function findArrObjIndex(arr, row, param) {
  let currentIndex = {};
  if (arr.length > 0) {
    arr.map((item, index) => {
      if (item[param] == row[param]) {
        currentIndex = { index, item };
      }
    });
  }

  return currentIndex
}

// 列表分组
function groupByType(arr, param) {
  let map = {};
  let dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (ai[param] && !map[ai[param]]) {
      dest.push({
        name: ai[param],
        data: [ai],
      });
      map[ai[param]] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.name == ai[param]) {
          dj.data.push(ai);
          break
        }
      }
    }
  }
  return dest
}

// 数组去空工具
function removeArrayNull(arr) {
  let arrHandler = [];
  arrHandler = arr.filter((item) => {
    return item !== null
  });
  return arrHandler
}

// 数组去重
function uniqueArr(arr) {
  let arrTemp = arr || [];
  return Array.from(new Set(arrTemp))
}

// 将数组对象中的key转换为大写key, upper 代表转大写，lower代表转小写
function upperOrLowerKeys(arr, code) {
  let newArray = [];
  arr.map((item) => {
    let tempItem = {};
    Object.keys(item).map((itemKey) => {
      let tempKey = '';
      tempKey = code === 'upper' ? itemKey.toLowerCase() : itemKey.toLowerCase();
      tempItem[tempKey] = item[itemKey];
    });
    newArray.push(tempItem);
  });
  return newArray
}

var array = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arrObjDistinct: arrObjDistinct,
  distinctArrKeys: distinctArrKeys,
  findArrObjIndex: findArrObjIndex,
  groupByType: groupByType,
  removeArrayNull: removeArrayNull,
  uniqueArr: uniqueArr,
  upperOrLowerKeys: upperOrLowerKeys
});

// 深拷贝
function deepCopy(obj) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // 只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = this.deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  deepCopy: deepCopy
});

// 全局数据字典转换工具，转化那些不标准的数组字典
function optionTranslate(array, label, value) {
  const optionsArray = [];
  const labelCode = label || 'label';
  const valueCode = value || 'value';
  array.map((item) => {
    let tempItem = item;
    tempItem.value = item[valueCode];
    tempItem.label = item[labelCode];
    tempItem.text = item[labelCode];
    optionsArray.push(tempItem);
  });
  return optionsArray || []
}

// 全局数据字典翻译工具
function translate(value, array, type) {
  // type代表翻译类型，true代表返回的为key值，flase代表返回label值
  let keyValue = null;
  let label = '';
  if (type) {
    array.map((item) => {
      if (item.label === value || item.text === value) keyValue = item.value;
    });
    return keyValue
  } else {
    array.map((item) => {
      if (item.value === value) {
        if (item.label !== undefined) {
          label = item.label;
        } else {
          label = item.text;
        }
      }
    });
    return label
  }
}

// 翻译以code为准的数据字典
function translateCode(value, array, type) {
  // type代表类型，true代表返回的为key值，flase代表返回label值
  let keyValue = null;
  let label = '';
  if (type) {
    array.map((item) => {
      if (item.label === value || item.text === value) keyValue = item.code;
    });
    return keyValue
  } else {
    array.map((item) => {
      if (item.code === value) {
        if (item.label !== undefined) {
          label = item.label;
        } else {
          label = item.text;
        }
      }
    });
    return label
  }
}

var dict = /*#__PURE__*/Object.freeze({
  __proto__: null,
  optionTranslate: optionTranslate,
  translate: translate,
  translateCode: translateCode
});

// 数据最大值转化
function maxNumber(num, maxSize) {
  let numTemp = num || 0;
  let maxSizeTemp = maxSize || 99;
  if (parseInt(numTemp) > maxSizeTemp) {
    return '99+'
  }
  return num
}

// 千分位转换
function toThousandFilter(num) {
  if (num === null || typeof num === 'undefined' || num === '' || num === 0) {
    return 0
  } else {
    return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}


// 千分位分隔器
function thousandsSeparator(num) {
  if (typeof num === "string" || typeof num === "number") {
    let value = String(num);
    value = value.replace(/\$\s?|(,*)/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
}

// 判断是否数字
function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}

var number = /*#__PURE__*/Object.freeze({
  __proto__: null,
  maxNumber: maxNumber,
  toThousandFilter: toThousandFilter,
  thousandsSeparator: thousandsSeparator,
  isNumber: isNumber
});

/**
 *
 *
 * @export
 * @param {*} str
 * @param {*} standard
 */
function computeStrWidth(str, standard) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  context.font = standard || 'normal 12px Robot';
  let txt = str || str;

  let metrics = context.measureText(txt).width || 0;
  return metrics
}

// 生成随机码
function createRandomCode() {
  let code = '';
  let codeLength = 4;
  let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

  for (let i = 0; i < codeLength; i++) {
    let index = Math.floor(Math.random() * 36);
    code += random[index];
  }

  return code
}

// 自定义导出excel文件
function exportExcelFile(array, tableLabel, fileName) {
  let fileNameTemp = fileName || new Date().valueOf();
  let str = '';

  // 拼接表头
  tableLabel.forEach((item) => {
    str += item.describe + ',';
  });
  str += '\n';

  // 拼接表格数据
  array.forEach((element) => {
    tableLabel.forEach((item) => {
      str += element[item.value] + ',';
    });
    str += '\n';
  });

  // 解决中文乱码问题
  let blob = new Blob([str], { type: 'text/plain;charset=utf-8' });
  blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
  let object_url = window.URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.href = object_url;
  link.download = fileNameTemp ? fileNameTemp + '.xls' : 'ProjectList.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 测试方法包
function logCat() {
  console.log('欢迎使用cat方法包');
}

var other = /*#__PURE__*/Object.freeze({
  __proto__: null,
  computeStrWidth: computeStrWidth,
  createRandomCode: createRandomCode,
  exportExcelFile: exportExcelFile,
  logCat: logCat
});

/**
 * 用来判断一个值是否为空的方法
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param { any } value - 需要判断的值
 * @return 去重结果
 */
function isNullorUndefined(value) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length === 0 || JSON.stringify(value) === '{}') {
    return true
  } else {
    return false
  }
}

/**
 * 字符串去重
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param { string } str - 需要切割的字符串
 * @param { string } repeatStr - 需要分割的字符串
 * @param { string } separator - 分割的字符串
 * @return 去重结果
 */
function strDistinct(str, repeatStr, separator) {
  let tempArr = str.split(separator);
  tempArr.map((itemtemp, indextemp, arr) => {
    if (itemtemp === repeatStr) {
      arr.splice(indextemp, 1);
    }
  });
  tempText = tempArr.join(separator);
  return tempText
}

/**
 * 判断字符串长度
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param { string } str - 需要判断长度的字符串
 * @return 去重结果
 */
function strLen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len
}

var string = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isNullorUndefined: isNullorUndefined,
  strDistinct: strDistinct,
  strLen: strLen
});

// 判断两个时间相差情况
function compareDate(startTime, endTime) {
  let start = new Date(startTime);
  let end = new Date(endTime);
  let flag = start - end > 0;

  return flag
}

// 时间格式化插件
function formatTime(date, fmt) {
  let newTime = new Date(date);
  let ret;
  const opt = {
    'Y+': newTime.getFullYear().toString(), // 年
    'm+': (newTime.getMonth() + 1).toString(), // 月
    'd+': newTime.getDate().toString(), // 日
    'H+': newTime.getHours().toString(), // 时
    'M+': newTime.getMinutes().toString(), // 分
    'S+': newTime.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt
}

// 时间戳转换工具
function timestampTranslate(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000); // 因为是北京时区，所以这里增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ')
}

var time = /*#__PURE__*/Object.freeze({
  __proto__: null,
  compareDate: compareDate,
  formatTime: formatTime,
  timestampTranslate: timestampTranslate
});

let catTools = Object.assign(array, common, time, number, dict, string, other);

exports.catTools = catTools;
