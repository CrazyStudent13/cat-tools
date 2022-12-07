/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-10-22 02:40:01
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-07 18:20:13
 * @Description: 主体内容
 */

import * as array from './array/index.js'
import * as common from './common/index.js'

import * as dict from './dict/index.js'
import * as number from './number/index.js'
import * as other from './other/index.js'
import * as string from './string/index.js'
import * as time from './time/index.js'

// 表单限制规则
import * as otherRules from './rules/other.js'
import * as accountRules from './rules/account.js'
import * as typeRules from './rules/type.js'
let formRules = Object.assign(otherRules, accountRules, typeRules)

// 整合所有的方法
let catTools = Object.assign(array, common, time, number, dict, string, other, formRules)

export { catTools }
