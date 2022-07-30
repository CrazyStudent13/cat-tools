import * as array from './array/index.js'
import * as common from './common/index.js'

import * as dict from './dict/index.js'
import * as number from './number/index.js'
import * as other from './other/index.js'
import * as string from './string/index.js'
import * as time from './time/index.js'

let catTools = {}

Object.assign(catTools, array, common, time, number, dict, string, other)

export { catTools }
