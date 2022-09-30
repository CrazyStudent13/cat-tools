/**
 * 数据最大值转化，将最大值转换为99+
 * @constructor
 * @author，crazystudent13
 * @todo，这个会考虑给个最大值的自定义权限，目前先搁置
 * @param { number } num - 需要转换的值
 * @param { number } maxSize - 最大值限制
 * @return { number }  返回转换结果，默认为0
 */
export function maxNumber(num, maxSize) {
  let numTemp = num || 0
  let maxSizeTemp = maxSize || 99
  if (parseInt(numTemp) > maxSizeTemp) {
    return '99+'
  }
  return num
}


/**
 * 判断是否数字
 * @constructor
 * @author，crazystudent13
 * @param { any } value - 需要判断的值
 * @return { Boolean }  返回判断结果
 */
export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}


/**
 * 千分位转换,将数字转换为千分位
 * @constructor
 * @author，crazystudent13
 * @todo，目前不支持对带小数的大数字处理
 * @param { number } num - 需要千分位转换的值
 * @return { number }  返回转换结果
 */
export function toThousandFilter(num) {
  if (num === null || typeof num === 'undefined' || num === '' || num === 0) {
    return 0
  } else {
    return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}


// 千分位分隔器，考虑和上边的方法合并
export function thousandsSeparator(num) {
  if (typeof num === "string" || typeof num === "number") {
    let value = String(num);
    value = value.replace(/\$\s?|(,*)/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
}

