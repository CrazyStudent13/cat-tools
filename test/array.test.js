/**
 * @jest-environment jsdom
 */

const arrayModule = require('src/array/index.js');
const { 
  arrObjDistinct, 
  distinctArrKeys, 
  findArrObjIndex, 
  groupByType, 
  removeArrayNull, 
  uniqueArr,
  upperOrLowerKeys 
} = arrayModule;

describe('Array Module Tests', () => {
  
  describe('arrObjDistinct', () => {
    it('应该根据指定 key 去重数组对象', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Charlie' }
      ];
      
      const result = arrObjDistinct(data, 'id');
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 1, name: 'Alice' });
      expect(result[1]).toEqual({ id: 2, name: 'Bob' });
    });

    it('应该保留第一次出现的元素', () => {
      const data = [
        { id: 1, name: 'First' },
        { id: 1, name: 'Second' },
        { id: 1, name: 'Third' }
      ];
      
      const result = arrObjDistinct(data, 'id');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('First');
    });

    it('空数组应该返回空数组', () => {
      expect(arrObjDistinct([], 'id')).toEqual([]);
    });

    it('没有重复项应该返回原数组', () => {
      const data = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' }
      ];
      
      const result = arrObjDistinct(data, 'id');
      
      expect(result).toHaveLength(3);
      expect(result).toEqual(data);
    });

    it('应该处理嵌套对象', () => {
      const data = [
        { id: 1, info: { age: 25 } },
        { id: 1, info: { age: 30 } },
        { id: 2, info: { age: 28 } }
      ];
      
      const result = arrObjDistinct(data, 'id');
      
      expect(result).toHaveLength(2);
      expect(result[0].info.age).toBe(25);
    });
  });

  describe('distinctArrKeys', () => {
    it('存在不同项时应该返回 true（函数逻辑是检查是否有不同的项）', () => {
      const data = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' }
      ];
      
      // 注意：distinctArrKeys 的实际逻辑是检查是否存在不同的项
      // 如果有任何两个元素不相同，就返回 true
      expect(distinctArrKeys(data, 'id')).toBe(true);
    });

    it('全部相同的元素应该返回 false', () => {
      const data = [
        { id: 1, name: 'A' },
        { id: 1, name: 'B' },
        { id: 1, name: 'C' }
      ];
      
      // 所有元素的 id 都相同，不会触发 flag = false，所以返回 false
      expect(distinctArrKeys(data, 'id')).toBe(false);
    });

    it('空数组应该返回 false', () => {
      expect(distinctArrKeys([], 'id')).toBe(false);
    });

    it('单个元素应该返回 false', () => {
      const data = [{ id: 1, name: 'A' }];
      expect(distinctArrKeys(data, 'id')).toBe(false);
    });

    it('部分相同的元素应该返回 true', () => {
      const data = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 1, name: 'C' }
      ];
      
      // 有不同的元素，返回 true
      expect(distinctArrKeys(data, 'id')).toBe(true);
    });
  });

  describe('findArrObjIndex', () => {
    it('应该找到元素的索引和对象', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ];
      
      const target = { id: 2, name: 'Bob' };
      const result = findArrObjIndex(data, target, 'id');
      
      expect(result.index).toBe(1);
      expect(result.item).toEqual({ id: 2, name: 'Bob' });
    });

    it('找不到时应该返回空对象', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      
      const target = { id: 999, name: 'Not Found' };
      const result = findArrObjIndex(data, target, 'id');
      
      expect(result).toEqual({});
    });

    it('空数组应该返回空对象', () => {
      const target = { id: 1, name: 'Test' };
      expect(findArrObjIndex([], target, 'id')).toEqual({});
    });

    it('多个匹配时应该返回最后一个匹配的索引', () => {
      const data = [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 1, name: 'Third' }
      ];
      
      const target = { id: 1, name: 'First' };
      const result = findArrObjIndex(data, target, 'id');
      
      expect(result.index).toBe(2);
      expect(result.item.name).toBe('Third');
    });
  });

  describe('groupByType', () => {
    it('应该根据指定字段分组', () => {
      const data = [
        { type: 'fruit', name: 'Apple' },
        { type: 'vegetable', name: 'Carrot' },
        { type: 'fruit', name: 'Banana' }
      ];
      
      const result = groupByType(data, 'type');
      
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('fruit');
      expect(result[0].data).toHaveLength(2);
      expect(result[1].name).toBe('vegetable');
      expect(result[1].data).toHaveLength(1);
    });

    it('应该正确分组数据', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 }
      ];
      
      const result = groupByType(data, 'category');
      
      expect(result.find(g => g.name === 'A').data).toHaveLength(2);
      expect(result.find(g => g.name === 'B').data).toHaveLength(1);
    });

    it('空数组应该返回空数组', () => {
      expect(groupByType([], 'type')).toEqual([]);
    });

    it('字段值为空时应该跳过', () => {
      const data = [
        { type: '', name: 'Empty' },
        { type: 'valid', name: 'Valid' }
      ];
      
      const result = groupByType(data, 'type');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('valid');
    });

    it('应该保留原始数据', () => {
      const data = [
        { type: 'A', name: 'Test', extra: 'data' }
      ];
      
      const result = groupByType(data, 'type');
      
      expect(result[0].data[0].extra).toBe('data');
    });
  });

  describe('removeArrayNull', () => {
    it('应该移除数组中的 null 值', () => {
      const data = [1, null, 2, null, 3];
      const result = removeArrayNull(data);
      
      expect(result).toEqual([1, 2, 3]);
      expect(result).toHaveLength(3);
    });

    it('不应该移除 undefined', () => {
      const data = [1, undefined, 2, null, 3];
      const result = removeArrayNull(data);
      
      expect(result).toEqual([1, undefined, 2, 3]);
      expect(result).toHaveLength(4);
    });

    it('空数组应该返回空数组', () => {
      expect(removeArrayNull([])).toEqual([]);
    });

    it('没有 null 的数组应该返回原数组', () => {
      const data = [1, 2, 3];
      const result = removeArrayNull(data);
      
      expect(result).toEqual([1, 2, 3]);
    });

    it('全是 null 的数组应该返回空数组', () => {
      const data = [null, null, null];
      const result = removeArrayNull(data);
      
      expect(result).toEqual([]);
    });
  });

  describe('uniqueArr', () => {
    it('应该去除一维数组的重复项', () => {
      const data = [1, 2, 2, 3, 3, 3, 4];
      const result = uniqueArr(data);
      
      expect(result).toEqual([1, 2, 3, 4]);
      expect(result).toHaveLength(4);
    });

    it('应该处理字符串数组', () => {
      const data = ['a', 'b', 'a', 'c', 'b'];
      const result = uniqueArr(data);
      
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('空数组应该返回空数组', () => {
      expect(uniqueArr([])).toEqual([]);
    });

    it('没有重复项应该返回原数组', () => {
      const data = [1, 2, 3, 4, 5];
      const result = uniqueArr(data);
      
      expect(result).toEqual(data);
    });

    it('undefined 应该返回空数组', () => {
      expect(uniqueArr(undefined)).toEqual([]);
    });

    it('应该保持原有顺序', () => {
      const data = [3, 1, 2, 1, 3, 4];
      const result = uniqueArr(data);
      
      expect(result).toEqual([3, 1, 2, 4]);
    });
  });

  describe('upperOrLowerKeys', () => {
    it('应该将键名转换为小写（code=lower）', () => {
      const data = [
        { UserName: 'Alice', UserAge: 25 },
        { UserName: 'Bob', UserAge: 30 }
      ];
      
      const result = upperOrLowerKeys(data, 'lower');
      
      expect(result[0]).toEqual({ username: 'Alice', userage: 25 });
      expect(result[1]).toEqual({ username: 'Bob', userage: 30 });
    });

    it('应该将键名转换为小写（code=upper 实际也是小写）', () => {
      const data = [
        { UserName: 'Alice', UserAge: 25 }
      ];
      
      const result = upperOrLowerKeys(data, 'upper');
      
      // 注意：实现中 upper 和 lower 都是转小写
      expect(result[0]).toEqual({ username: 'Alice', userage: 25 });
    });

    it('空数组应该返回空数组', () => {
      expect(upperOrLowerKeys([], 'lower')).toEqual([]);
    });

    it('应该处理嵌套对象键名', () => {
      const data = [
        { UserInfo: { Name: 'Alice' } }
      ];
      
      const result = upperOrLowerKeys(data, 'lower');
      
      expect(result[0]).toEqual({ userinfo: { Name: 'Alice' } });
    });

    it('应该保留原始值', () => {
      const data = [
        { Name: 'Alice', Age: 25 }
      ];
      
      const result = upperOrLowerKeys(data, 'lower');
      
      expect(result[0].name).toBe('Alice');
      expect(result[0].age).toBe(25);
    });
  });

  describe('集成测试', () => {
    it('应该支持去重后分组', () => {
      const data = [
        { type: 'fruit', id: 1, name: 'Apple' },
        { type: 'fruit', id: 1, name: 'Apple2' },
        { type: 'vegetable', id: 2, name: 'Carrot' }
      ];
      
      // 先去重
      const distinct = arrObjDistinct(data, 'id');
      expect(distinct).toHaveLength(2);
      
      // 再分组
      const grouped = groupByType(distinct, 'type');
      expect(grouped).toHaveLength(2);
    });

    it('应该支持查找后去重', () => {
      const data = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 1, name: 'C' }
      ];
      
      const target = { id: 1, name: 'A' };
      const found = findArrObjIndex(data, target, 'id');
      expect(found.index).toBeDefined();
      
      // 去重
      const distinct = arrObjDistinct(data, 'id');
      expect(distinct).toHaveLength(2);
    });

    it('完整的数据处理流程', () => {
      const rawData = [
        { category: 'A', name: 'Item1' },
        { category: 'A', name: 'Item2' },
        { category: 'B', name: 'Item3' },
        null,
        { category: 'B', name: 'Item4' }
      ];
      
      // 1. 移除 null
      const cleaned = removeArrayNull(rawData);
      expect(cleaned).toHaveLength(4);
      
      // 2. 分组
      const grouped = groupByType(cleaned, 'category');
      expect(grouped).toHaveLength(2);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理超大数组', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => ({
        id: i % 100,
        value: i
      }));
      
      const result = arrObjDistinct(largeArray, 'id');
      expect(result).toHaveLength(100);
    });

    it('应该处理特殊字符键名', () => {
      const data = [
        { 'key-with-dash': 'value1', name: 'A' },
        { 'key-with-dash': 'value1', name: 'B' },
        { 'key-with-dash': 'value2', name: 'C' }
      ];
      
      const result = arrObjDistinct(data, 'key-with-dash');
      expect(result).toHaveLength(2);
    });

    it('应该处理数字键名', () => {
      const data = [
        { 0: 'zero', name: 'A' },
        { 0: 'zero', name: 'B' },
        { 0: 'one', name: 'C' }
      ];
      
      const result = arrObjDistinct(data, '0');
      expect(result).toHaveLength(2);
    });

    it('removeArrayNull 应该只移除 null', () => {
      const data = [0, false, '', null, undefined, NaN];
      const result = removeArrayNull(data);
      
      expect(result).toEqual([0, false, '', undefined, NaN]);
      expect(result).toHaveLength(5);
    });

    it('uniqueArr 应该处理混合类型', () => {
      const data = [1, '1', true, false, null, undefined];
      const result = uniqueArr(data);
      
      expect(result).toHaveLength(6);
    });
  });

  describe('性能测试', () => {
    it('应该快速处理大量数据', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        value: i
      }));
      
      const startTime = Date.now();
      
      uniqueArr(largeArray.map(item => item.id));
      arrObjDistinct(largeArray, 'id');
      removeArrayNull(largeArray);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeLessThan(1000);
    });
  });
});
