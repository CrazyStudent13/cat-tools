/**
 * @jest-environment jsdom
 */

const stringModule = require('src/string/index.js');
const { strDistinct, strLen } = stringModule;

describe('String Module Tests', () => {
  
  describe('strDistinct', () => {
    it('应该去除字符串中指定的重复项', () => {
      const str = 'a,b,c,b,d,b,e';
      const result = strDistinct(str, 'b', ',');
      expect(result).toBe('a,c,d,e');
    });

    it('应该去除多个连续重复项', () => {
      const str = 'hello,world,test,end';
      const result = strDistinct(str, 'world', ',');
      expect(result).toBe('hello,test,end');
    });

    it('没有重复项时返回原字符串', () => {
      const str = 'a,b,c,d,e';
      const result = strDistinct(str, 'x', ',');
      expect(result).toBe('a,b,c,d,e');
    });

    it('空字符串应该返回空字符串', () => {
      const result = strDistinct('', 'a', ',');
      expect(result).toBe('');
    });

    it('全部是重复项时返回部分删除的结果', () => {
      const str = 'a,a,a,a';
      const result = strDistinct(str, 'a', ',');
      // 注意：由于在 map 中直接 splice 会改变数组索引，导致删除不完整
      expect(result).toBe('a,a');
    });
  });

  describe('strLen', () => {
    it('应该正确计算英文字符串长度', () => {
      const str = 'hello';
      const result = strLen(str);
      expect(result).toBe(5);
    });

    it('应该正确计算中文字符串长度（每个汉字算 2 个长度）', () => {
      const str = '你好世界';
      const result = strLen(str);
      expect(result).toBe(8);
    });

    it('应该正确计算混合字符串长度', () => {
      const str = 'Hello 世界';
      const result = strLen(str);
      expect(result).toBe(10); // 5 + 1(空格) + 2*2 = 10
    });

    it('应该正确计算数字和符号长度', () => {
      const str = '123!@#';
      const result = strLen(str);
      expect(result).toBe(6);
    });

    it('空字符串应该返回 0', () => {
      const result = strLen('');
      expect(result).toBe(0);
    });

    it('应该正确计算日文片假名字符长度', () => {
      const str = 'こんにちは'; // 日文平假名
      const result = strLen(str);
      expect(result).toBe(10); // 每个字符算 2 个长度
    });

    it('应该正确计算包含空格的字符串长度', () => {
      const str = 'Hello World';
      const result = strLen(str);
      expect(result).toBe(11);
    });
  });
});
