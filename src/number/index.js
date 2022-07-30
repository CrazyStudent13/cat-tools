// 数据最大值转化
export function maxNumber(num, maxSize) {
  let numTemp = num || 0
  let maxSizeTemp = maxSize || 99
  if (parseInt(numTemp) > maxSizeTemp) {
    return '99+'
  }
  return num
}

// 千分位转换
export function toThousandFilter(num) {
  if (num === null || typeof num === 'undefined' || num === '' || num === 0) {
    return 0
  } else {
    return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}


// 千分位分隔器
export function thousandsSeparator(num) {
  if (typeof num === "string" || typeof num === "number") {
    let value = String(num);
    value = value.replace(/\$\s?|(,*)/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
}

// 判断是否数字
export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}
