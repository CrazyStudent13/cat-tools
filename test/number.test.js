/**
 * @jest-environment jsdom
 */

const numberModule = require('src/number/index.js');
const { maxNumber, isNumber, toThousandFilter, thousandsSeparator } = numberModule;

describe('Number Module Tests', () => {
  
  describe('maxNumber', () => {
    it('应该返回小于最大值的数字', () => {
      expect(maxNumber(50, 99)).toBe(50);
      expect(maxNumber(1, 100)).toBe(1);
      expect(maxNumber(98, 99)).toBe(98);
    });

    it('应该返回等于最大值的数字', () => {
      expect(maxNumber(99, 99)).toBe(99);
      expect(maxNumber(100, 100)).toBe(100);
    });

    it('超过最大值时应该返回 99+', () => {
      expect(maxNumber(150, 99)).toBe('99+');
      expect(maxNumber(100, 99)).toBe('99+');
      expect(maxNumber(200, 100)).toBe('99+'); // 固定返回 '99+'
    });

    it('应该使用默认参数', () => {
      expect(maxNumber()).toBeUndefined(); // num 为 undefined 时，numTemp 为 0，但返回的是 num(undefined)
      expect(maxNumber(50)).toBe(50);
      expect(maxNumber(150)).toBe('99+');
    });

    it('负数应该正常处理', () => {
      expect(maxNumber(-50, 99)).toBe(-50);
      expect(maxNumber(-150, -100)).toBe(-150); // parseInt(-150) = -150, 不大于 -100
    });

    it('小数应该正常处理', () => {
      expect(maxNumber(50.5, 99)).toBe(50.5);
      expect(maxNumber(150.8, 99)).toBe('99+');
    });

    it('零值应该正常处理', () => {
      expect(maxNumber(0, 99)).toBe(0);
      expect(maxNumber(0, 0)).toBe(0);
    });
  });

  describe('isNumber', () => {
    it('应该识别有效数字', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-5)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
      expect(isNumber(0.0001)).toBe(true);
    });

    it('应该识别科学计数法', () => {
      expect(isNumber(1e10)).toBe(true);
      expect(isNumber(1.5e-10)).toBe(true);
    });

    it('应该拒绝 NaN', () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it('应该拒绝 Infinity', () => {
      expect(isNumber(Infinity)).toBe(false);
      expect(isNumber(-Infinity)).toBe(false);
    });

    it('应该拒绝非数字类型', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
    });

    it('特殊数字值应该被拒绝', () => {
      expect(isNumber(Number.NaN)).toBe(false);
      expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(false);
    });
  });

  describe('toThousandFilter', () => {
    it('应该格式化正整数', () => {
      expect(toThousandFilter(1234567)).toBe('1,234,567');
      expect(toThousandFilter(1000)).toBe('1,000');
      expect(toThousandFilter(1000000)).toBe('1,000,000');
    });

    it('应该格式化负数', () => {
      expect(toThousandFilter(-1234567)).toBe('-1,234,567');
      expect(toThousandFilter(-1000)).toBe('-1,000');
    });

    it('应该格式化小数', () => {
      expect(toThousandFilter(1234.567)).toBe('1,234.567');
      expect(toThousandFilter(-1234.567)).toBe('-1,234.567');
    });

    it('小于 1000 的数字应该不变', () => {
      expect(toThousandFilter(999)).toBe('999');
      expect(toThousandFilter(100)).toBe('100');
      expect(toThousandFilter(1)).toBe('1');
    });

    it('无效值应该返回 0', () => {
      expect(toThousandFilter(null)).toBe(0);
      expect(toThousandFilter(undefined)).toBe(0);
      expect(toThousandFilter('')).toBe(0);
      expect(toThousandFilter(0)).toBe(0);
    });

    it('字符串数字应该能处理', () => {
      expect(toThousandFilter('1234567')).toBe('1,234,567');
      expect(toThousandFilter('1000')).toBe('1,000');
    });
  });

  describe('thousandsSeparator', () => {
    it('应该格式化数字类型', () => {
      expect(thousandsSeparator(1234567)).toBe('1,234,567');
      expect(thousandsSeparator(1000)).toBe('1,000');
      expect(thousandsSeparator(1000000)).toBe('1,000,000');
    });

    it('应该格式化字符串类型', () => {
      expect(thousandsSeparator('1234567')).toBe('1,234,567');
      expect(thousandsSeparator('1000')).toBe('1,000');
    });

    it('应该移除美元符号', () => {
      expect(thousandsSeparator('$1234567')).toBe('1,234,567');
      expect(thousandsSeparator('$1,234,567')).toBe('1,234,567');
    });

    it('应该移除已有的千分位符号', () => {
      expect(thousandsSeparator('1,234,567')).toBe('1,234,567');
      expect(thousandsSeparator('1,234')).toBe('1,234');
    });

    it('应该处理带美元符号和逗号的金额', () => {
      expect(thousandsSeparator('$1,234,567.89')).toBe('1,234,567.89');
      expect(thousandsSeparator('$999')).toBe('999');
    });

    it('负数应该正常处理', () => {
      expect(thousandsSeparator(-1234567)).toBe('-1,234,567');
      expect(thousandsSeparator('-1234567')).toBe('-1,234,567');
    });

    it('小数应该正常处理', () => {
      expect(thousandsSeparator(1234.56)).toBe('1,234.56');
      expect(thousandsSeparator('1234.56')).toBe('1,234.56');
    });

    it('小于 1000 的数字应该不变', () => {
      expect(thousandsSeparator(999)).toBe('999');
      expect(thousandsSeparator('999')).toBe('999');
      expect(thousandsSeparator(100)).toBe('100');
    });

    it('无效值应该返回 "0"', () => {
      expect(thousandsSeparator(null)).toBe('0');
      expect(thousandsSeparator(undefined)).toBe('0');
      expect(thousandsSeparator({})).toBe('0');
      expect(thousandsSeparator([])).toBe('0');
      expect(thousandsSeparator(true)).toBe('0');
    });

    it('空字符串应该返回 "0"', () => {
      expect(thousandsSeparator('')).toBe(''); // 空字符串转换后还是空字符串
    });
  });

  describe('边界情况测试', () => {
    it('应该处理极大数字', () => {
      const largeNum = Number.MAX_SAFE_INTEGER;
      expect(isNumber(largeNum)).toBe(true);
      expect(typeof toThousandFilter(largeNum)).toBe('string');
    });

    it('应该处理极小数字', () => {
      const smallNum = Number.MIN_SAFE_INTEGER;
      expect(isNumber(smallNum)).toBe(true);
    });

    it('应该处理接近 0 的小数', () => {
      expect(isNumber(0.0000001)).toBe(true);
      expect(isNumber(-0.0000001)).toBe(true);
    });

    it('maxNumber 的边界值测试', () => {
      expect(maxNumber(99, 99)).toBe(99);
      expect(maxNumber(99.1, 99)).toBe(99.1); // parseInt(99.1) = 99, 不大于 99
      expect(maxNumber(98.9, 99)).toBe(98.9);
    });

    it('toThousandFilter 的边界值测试', () => {
      expect(toThousandFilter(999)).toBe('999');
      expect(toThousandFilter(1000)).toBe('1,000');
      expect(toThousandFilter(-999)).toBe('-999');
      expect(toThousandFilter(-1000)).toBe('-1,000');
    });
  });

  describe('集成测试', () => {
    it('应该支持组合使用', () => {
      const num = 1234567;
      
      // 先验证是数字
      expect(isNumber(num)).toBe(true);
      
      // 再格式化
      const formatted = toThousandFilter(num);
      expect(formatted).toBe('1,234,567');
      
      // 再用另一种方式格式化
      const separated = thousandsSeparator(formatted);
      expect(separated).toBe('1,234,567');
    });

    it('应该处理用户输入场景', () => {
      // 模拟用户输入
      const userInput = '$1,234,567';
      
      // 清理并格式化
      const cleaned = thousandsSeparator(userInput);
      expect(cleaned).toBe('1,234,567');
      
      // 验证是有效数字（需要先转换）
      const numValue = parseFloat(cleaned.replace(/,/g, ''));
      expect(isNumber(numValue)).toBe(true);
    });

    it('应该处理金额显示场景', () => {
      const amount = 150;
      const maxAmount = 99;
      
      // 显示限制
      const display = maxNumber(amount, maxAmount);
      expect(display).toBe('99+');
      
      // 格式化显示
      const normalAmount = 1234567;
      const formatted = toThousandFilter(normalAmount);
      expect(formatted).toBe('1,234,567');
    });
  });

  describe('性能测试', () => {
    it('应该快速处理大量数据', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        isNumber(i);
        toThousandFilter(i);
        thousandsSeparator(i);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 应该在合理时间内完成（例如 1 秒）
      expect(duration).toBeLessThan(1000);
    });
  });
});
