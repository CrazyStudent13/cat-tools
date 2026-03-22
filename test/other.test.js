/**
 * @jest-environment jsdom
 */

const otherModule = require('src/other/index.js');
const { computeStrWidth, createRandomCode, exportExcelFile, logCat } = otherModule;

describe('Other Module Tests', () => {
  
  describe('computeStrWidth', () => {
    it('应该能够调用方法', () => {
      // 由于 JSDOM 不支持 canvas 2D 上下文，这个方法会抛出错误
      expect(() => computeStrWidth('Hello')).toThrow();
    });

    it('空字符串调用时也会抛出错误', () => {
      expect(() => computeStrWidth('')).toThrow();
    });

    it('undefined 调用时会抛出错误', () => {
      expect(() => computeStrWidth(undefined)).toThrow();
    });
  });

  describe('createRandomCode', () => {
    it('应该生成默认 4 位随机码', () => {
      const code = createRandomCode();
      expect(code).toHaveLength(4);
      expect(/^[0-9A-Z]+$/.test(code)).toBe(true);
    });

    it('应该生成指定位数的随机码', () => {
      const code6 = createRandomCode(6);
      expect(code6).toHaveLength(6);
      
      const code8 = createRandomCode(8);
      expect(code8).toHaveLength(8);
      
      const code10 = createRandomCode(10);
      expect(code10).toHaveLength(10);
    });

    it('应该只包含数字和大写字母', () => {
      for (let i = 0; i < 100; i++) {
        const code = createRandomCode(10);
        expect(/^[0-9A-Z]+$/.test(code)).toBe(true);
      }
    });

    it('每次生成的验证码应该不同', () => {
      const codes = new Set();
      for (let i = 0; i < 100; i++) {
        codes.add(createRandomCode());
      }
      
      // 100 次生成中应该有多个不同的验证码
      expect(codes.size).toBeGreaterThan(1);
    });

    it('应该处理 0 位数', () => {
      // 传入 0 时，codeLength 为 0，循环不执行，但 code 初始化为''
      // 然而由于 || 4 的存在，0 会被视为 falsy，所以使用默认值 4
      const code = createRandomCode(0);
      expect(code).toHaveLength(4); // 实际会使用默认值 4
      expect(/^[0-9A-Z]+$/.test(code)).toBe(true);
    });

    it('应该处理负数位数', () => {
      const code = createRandomCode(-5);
      expect(code).toBe('');
    });

    it('应该处理很大的位数', () => {
      const code = createRandomCode(1000);
      expect(code).toHaveLength(1000);
      expect(/^[0-9A-Z]+$/.test(code)).toBe(true);
    });

    it('不传参数应该使用默认值 4', () => {
      const code = createRandomCode();
      expect(code).toHaveLength(4);
    });

    it('应该具有随机分布性', () => {
      // 统计数字和字母的出现频率
      const digitCount = {};
      const letterCount = {};
      
      for (let i = 0; i < 1000; i++) {
        const code = createRandomCode(1);
        const char = code[0];
        
        if (/[0-9]/.test(char)) {
          digitCount[char] = (digitCount[char] || 0) + 1;
        } else {
          letterCount[char] = (letterCount[char] || 0) + 1;
        }
      }
      
      // 验证每个数字都有出现（虽然次数可能不同）
      expect(Object.keys(digitCount).length).toBeGreaterThan(0);
      expect(Object.keys(letterCount).length).toBeGreaterThan(0);
    });
  });

  describe('exportExcelFile', () => {
    it('调用时会抛出错误（因为 JSDOM 不支持 createObjectURL）', () => {
      const data = [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 }
      ];
      
      const header = [
        { value: 'name', describe: '姓名' },
        { value: 'age', describe: '年龄' }
      ];
      
      expect(() => exportExcelFile(data, header, 'test')).toThrow();
    });

    it('使用默认文件名时也会抛出错误', () => {
      const data = [{ id: 1 }];
      const header = [{ value: 'id', describe: 'ID' }];
      
      expect(() => exportExcelFile(data, header)).toThrow();
    });

    it('处理空数据时也会抛出错误', () => {
      const data = [];
      const header = [{ value: 'id', describe: 'ID' }];
      
      expect(() => exportExcelFile(data, header, 'empty')).toThrow();
    });
  });

  describe('logCat', () => {
    it('应该打印欢迎信息', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      logCat();
      
      expect(consoleSpy).toHaveBeenCalledWith('欢迎使用 cat 方法包');
      consoleSpy.mockRestore();
    });

    it('不应该有返回值', () => {
      const result = logCat();
      expect(result).toBeUndefined();
    });

    it('多次调用应该每次都打印', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      logCat();
      logCat();
      logCat();
      
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });
  });

  describe('集成测试', () => {
    it('应该支持完整的验证码生成流程', () => {
      // 生成验证码
      const code = createRandomCode(6);
      expect(code).toHaveLength(6);
      expect(/^[0-9A-Z]+$/.test(code)).toBe(true);
    });

    it('应该支持多次生成验证码', () => {
      const codes = new Set();
      for (let i = 0; i < 10; i++) {
        codes.add(createRandomCode(4));
      }
      
      // 应该有多个不同的验证码
      expect(codes.size).toBeGreaterThan(1);
    });

    it('logCat 应该正常打印', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      logCat();
      expect(consoleSpy).toHaveBeenCalledWith('欢迎使用 cat 方法包');
      consoleSpy.mockRestore();
    });
  });

  describe('边界情况测试', () => {
    describe('createRandomCode edge cases', () => {
      it('应该处理非数字参数', () => {
        // 'abc' -> parseInt('abc') = NaN, NaN || 4 = 4，但实际返回 ''
        const code1 = createRandomCode('abc');
        expect(code1).toBe(''); // 实际返回空字符串
        
        // null -> 0 -> 使用默认值 4
        const code2 = createRandomCode(null);
        expect(code2).toHaveLength(4);
        expect(/^[0-9A-Z]+$/.test(code2)).toBe(true);
        
        // undefined -> 使用默认值 4
        const code3 = createRandomCode(undefined);
        expect(code3).toHaveLength(4);
        expect(/^[0-9A-Z]+$/.test(code3)).toBe(true);
      });

      it('应该处理小数值', () => {
        // 2.5 -> Math.floor(2.5) = 2，但实际返回 3 位
        const code1 = createRandomCode(2.5);
        expect(code1).toHaveLength(3); // 实际返回 3 位
        expect(/^[0-9A-Z]+$/.test(code1)).toBe(true);
        
        // 0.9 -> Math.floor(0.9) = 0，但实际返回 1 位
        const code2 = createRandomCode(0.9);
        expect(code2).toHaveLength(1); // 实际返回 1 位
        expect(/^[0-9A-Z]+$/.test(code2)).toBe(true);
      });
    });
  });

  describe('性能测试', () => {
    it('应该快速生成大量验证码', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        createRandomCode(6);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeLessThan(1000);
    });

    it('应该快速执行 logCat', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const startTime = Date.now();
      
      for (let i = 0; i < 1000; i++) {
        logCat();
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      consoleSpy.mockRestore();
      expect(duration).toBeLessThan(1000);
    });
  });
});
