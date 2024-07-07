# cat-tools

## 简介

根据公司项目需求，将常用方法抽离出来，便于后续的方法的统一拓展。

如今脱离公司了，索性从头开始做吧，目前支持vue2项目，后续会逐步支持vue3，react等项目。

详情参考[线上文档](http://cattools.crazystudent13.cn)

## 使用

```
npm i cat-tools
```

### vue2

在vue2项目中，我们在`main.js`文件中全局引入，然后挂在到`vue.prototype`上，之后就可以在`this`全局调用。

```
// 这样的写法可以使二者方法
import { catTools as devTools } from 'cat-tools' 
Vue.prototype.$devTools = Object.assign(devTools)
```

之后在项目中就可以全局引用了，这里我们以判空一个值为例子举例。

```
const test = "123"
const state = !this.$devTools.isNullorUndefined(test)
console.log(state) 
// 输出结果：false
```



## 开发

针对于该工具包的开发者体用，

```javascript
# 克隆项目
git clone https://github.com/CrazyStudent13/cat-tools.git

# 进入项目目录
cd cat-tools

# 安装依赖
npm install
```

## 发布

```javascript
# 生成文档
npm run doc

# 打包
npm run build
```



## 参考

[JS 工具库文档化 - JSDoc](https://juejin.cn/post/6844904160274415623#heading-5)

[jsdoc主题：minami](https://github.com/nijikokun/minami)

