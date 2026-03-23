/**
 * NPM 包本地测试脚本
 * 
 * 使用方法:
 * node test-package.js
 */

const { catTools } = require('./index.js');

console.log('🎯 开始测试 cat-tools 包...\n');

// 测试计数器
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   错误：${error.message}`);
    failed++;
  }
}

// 数组方法测试
test('arrObjDistinct - 数组对象去重', () => {
  const arr = [
    { id: 1, name: 'A' },
    { id: 1, name: 'B' },
    { id: 2, name: 'C' }
  ];
  const result = catTools.arrObjDistinct(arr, 'id');
  if (result.length !== 2) throw new Error('去重失败');
});

test('uniqueArr - 简单数组去重', () => {
  const result = catTools.uniqueArr([1, 2, 2, 3, 3, 3]);
  if (result.length !== 3) throw new Error('去重失败');
});

test('groupByType - 数组分组', () => {
  const arr = [
    { type: 'A', value: 1 },
    { type: 'A', value: 2 },
    { type: 'B', value: 3 }
  ];
  const result = catTools.groupByType(arr, 'type');
  if (result.length !== 2) throw new Error('分组失败');
});

// 字符串方法测试
test('strLen - 字符串长度计算', () => {
  const result = catTools.strLen('Hello 世界');
  if (result !== 10) throw new Error(`期望 10，得到 ${result}`);
});

test('isNullorUndefined - 空值判断', () => {
  if (!catTools.isNullorUndefined(null)) throw new Error('null 判断失败');
  if (!catTools.isNullorUndefined(undefined)) throw new Error('undefined 判断失败');
  if (!catTools.isNullorUndefined('')) throw new Error('空字符串判断失败');
  if (catTools.isNullorUndefined('hello')) throw new Error('非空判断失败');
});

// 数字方法测试
test('maxNumber - 最大值转换', () => {
  const result = catTools.maxNumber(150, 99);
  if (result !== '99+') throw new Error('最大值转换失败');
});

test('toThousandFilter - 千分位格式化', () => {
  const result = catTools.toThousandFilter(1234567);
  if (result !== '1,234,567') throw new Error('千分位格式化失败');
});

test('isNumber - 数字判断', () => {
  if (!catTools.isNumber(123)) throw new Error('数字判断失败');
  if (catTools.isNumber('123')) throw new Error('字符串判断失败');
  if (catTools.isNumber(NaN)) throw new Error('NaN 判断失败');
});

// 时间方法测试
test('timestampTranslate - 时间戳转换', () => {
  const timestamp = 1609459200000; // 2021-01-01 00:00:00
  const result = catTools.timestampTranslate(timestamp);
  if (!result.includes('2021-01-01')) throw new Error('时间戳转换失败');
});

test('compareDate - 时间比较', () => {
  const result = catTools.compareDate('2023-01-01', '2022-01-01');
  if (!result) throw new Error('时间比较失败');
});

// 字典方法测试
test('optionTranslate - 数据格式转换', () => {
  const data = [{ name: '选项 1', code: '1' }];
  const result = catTools.optionTranslate(data, 'name', 'code');
  if (!result[0].label || !result[0].value) {
    throw new Error('格式转换失败');
  }
});

test('translate - 字典翻译', () => {
  const options = [
    { value: 1, label: '选项 A' },
    { value: 2, label: '选项 B' }
  ];
  const result = catTools.translate(1, options, false);
  if (result !== '选项 A') throw new Error('字典翻译失败');
});

// 通用方法测试
test('deepCopy - 深拷贝', () => {
  const original = { a: 1, b: { c: 2 } };
  const copy = catTools.deepCopy(original);
  copy.b.c = 3;
  if (original.b.c === 3) throw new Error('深拷贝失败');
  if (JSON.stringify(original) === JSON.stringify(copy)) {
    throw new Error('深拷贝应该创建新对象');
  }
});

// 其他方法测试
test('createRandomCode - 随机码生成', () => {
  const code = catTools.createRandomCode();
  if (typeof code !== 'string' || code.length === 0) {
    throw new Error('随机码生成失败');
  }
});

test('removeArrayNull - 移除数组中的 null', () => {
  const arr = [1, null, 2, null, 3];
  const result = catTools.removeArrayNull(arr);
  if (result.length !== 3) throw new Error('移除 null 失败');
  if (result.includes(null)) throw new Error('仍然包含 null');
});

// 输出结果
console.log('\n' + '='.repeat(50));
console.log(`测试结果：${passed} 通过，${failed} 失败`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 所有测试通过！包可以正常使用！\n');
  process.exit(0);
} else {
  console.log('\n❌ 部分测试失败，请检查代码！\n');
  process.exit(1);
}
