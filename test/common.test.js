/**
 * @jest-environment jsdom
 */

const commonModule = require('src/common/index.js');
const { deepCopy } = commonModule;

describe('Common Module Tests', () => {
  
  describe('deepCopy', () => {
    it('应该深拷贝简单对象', () => {
      const original = { name: 'Alice', age: 25 };
      const copied = deepCopy(original);
      
      // 验证值相同
      expect(copied).toEqual(original);
      expect(copied.name).toBe('Alice');
      expect(copied.age).toBe(25);
      
      // 验证是深拷贝（引用不同）
      expect(copied).not.toBe(original);
    });

    it('应该深拷贝嵌套对象', () => {
      const original = {
        name: 'Bob',
        address: {
          city: 'Beijing',
          district: {
            name: 'Chaoyang'
          }
        }
      };
      const copied = deepCopy(original);
      
      // 验证值相同
      expect(copied).toEqual(original);
      
      // 验证是深拷贝（引用不同）
      expect(copied).not.toBe(original);
      expect(copied.address).not.toBe(original.address);
      expect(copied.address.district).not.toBe(original.address.district);
      
      // 修改拷贝后的对象不影响原对象
      copied.address.city = 'Shanghai';
      expect(original.address.city).toBe('Beijing');
    });

    it('应该深拷贝数组', () => {
      const original = [1, 2, 3, { name: 'test' }];
      const copied = deepCopy(original);
      
      // 验证值相同
      expect(copied).toEqual(original);
      
      // 验证是深拷贝（引用不同）
      expect(copied).not.toBe(original);
      expect(copied[3]).not.toBe(original[3]);
      
      // 修改拷贝后的数组不影响原数组
      copied[0] = 999;
      expect(original[0]).toBe(1);
    });

    it('应该深拷贝嵌套数组', () => {
      const original = [1, [2, 3], { arr: [4, 5] }];
      const copied = deepCopy(original);
      
      // 验证值相同
      expect(copied).toEqual(original);
      
      // 验证是深拷贝
      expect(copied[1]).not.toBe(original[1]);
      expect(copied[2].arr).not.toBe(original[2].arr);
    });

    it('非对象和数组的参数应该抛出错误', () => {
      expect(() => deepCopy(null)).toThrow('error arguments');
      expect(() => deepCopy(undefined)).toThrow('error arguments');
      expect(() => deepCopy(true)).toThrow('error arguments');
      expect(() => deepCopy(123)).toThrow('error arguments');
      // 注意：字符串会抛出错误
      expect(() => deepCopy('string')).toThrow('error arguments');
    });

    it('应该处理空对象', () => {
      const original = {};
      const copied = deepCopy(original);
      
      expect(copied).toEqual({});
      expect(copied).not.toBe(original);
    });

    it('应该处理空数组', () => {
      const original = [];
      const copied = deepCopy(original);
      
      expect(copied).toEqual([]);
      expect(copied).not.toBe(original);
    });

    it('不应该拷贝原型链上的属性', () => {
      function Person(name) {
        this.name = name;
      }
      Person.prototype.sayHello = function() {
        return 'Hello';
      };
      
      const original = new Person('Alice');
      const copied = deepCopy(original);
      
      // 只拷贝自有属性
      expect(copied.name).toBe('Alice');
      // 不拷贝原型方法
      expect(copied.sayHello).toBeUndefined();
    });
  });
});
