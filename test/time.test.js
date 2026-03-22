/**
 * @jest-environment jsdom
 */

const timeModule = require('src/time/index.js');
const { compareDate, timestampTranslate } = timeModule;

describe('Time Module Tests', () => {
  
  describe('compareDate', () => {
    it('应该正确比较两个日期字符串', () => {
      expect(compareDate('2024-01-02', '2024-01-01')).toBe(true);
      expect(compareDate('2024-01-01', '2024-01-02')).toBe(false);
      expect(compareDate('2024-01-01', '2024-01-01')).toBe(false);
    });

    it('应该正确比较 Date 对象', () => {
      const date1 = new Date('2024-01-02');
      const date2 = new Date('2024-01-01');
      
      expect(compareDate(date1, date2)).toBe(true);
      expect(compareDate(date2, date1)).toBe(false);
    });

    it('应该支持混合类型比较', () => {
      const dateStr = '2024-01-02';
      const dateObj = new Date('2024-01-01');
      
      expect(compareDate(dateStr, dateObj)).toBe(true);
      expect(compareDate(dateObj, dateStr)).toBe(false);
    });

    it('应该比较时间戳', () => {
      const timestamp1 = 1704153600000; // 2024-01-02 00:00:00
      const timestamp2 = 1704067200000; // 2024-01-01 00:00:00
      
      expect(compareDate(timestamp1, timestamp2)).toBe(true);
      expect(compareDate(timestamp2, timestamp1)).toBe(false);
    });

    it('相同时间应该返回 false', () => {
      const sameTime = '2024-01-01 12:00:00';
      expect(compareDate(sameTime, sameTime)).toBe(false);
    });

    it('应该处理时分秒', () => {
      expect(compareDate('2024-01-01 10:30:00', '2024-01-01 10:29:59')).toBe(true);
      expect(compareDate('2024-01-01 10:30:00', '2024-01-01 10:30:01')).toBe(false);
    });

    it('应该处理跨天比较', () => {
      expect(compareDate('2024-01-01 23:59:59', '2024-01-02 00:00:00')).toBe(false);
      expect(compareDate('2024-01-02 00:00:00', '2024-01-01 23:59:59')).toBe(true);
    });

    it('应该处理闰年', () => {
      expect(compareDate('2024-02-29', '2024-03-01')).toBe(false);
      expect(compareDate('2024-03-01', '2024-02-29')).toBe(true);
    });

    it('应该处理不同格式的日期字符串', () => {
      expect(compareDate('2024/01/02', '2024/01/01')).toBe(true);
      expect(compareDate('01-02-2024', '01-01-2024')).toBe(true);
    });
  });

  describe('timestampTranslate', () => {
    it('应该将时间戳转换为标准格式', () => {
      const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
      const result = timestampTranslate(timestamp);
      
      // 北京时间是 UTC+8，所以应该是 2024-01-01 08:00:00
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('应该使用当前时间作为默认值', () => {
      const result = timestampTranslate();
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      // 不验证具体时间，因为测试执行时间不确定
    });

    it('应该处理正数时间戳', () => {
      const timestamp = 1609459200000; // 2021-01-01 00:00:00 UTC
      const result = timestampTranslate(timestamp);
      expect(result).toBe('2021-01-01 08:00:00');
    });

    it('应该处理零值时间戳', () => {
      const result = timestampTranslate(0);
      expect(result).toBe('1970-01-01 08:00:00');
    });

    it('应该处理负数时间戳', () => {
      const timestamp = -86400000; // 1969-12-31 00:00:00 UTC
      const result = timestampTranslate(timestamp);
      expect(result).toBe('1969-12-31 08:00:00');
    });

    it('应该处理带毫秒的时间戳', () => {
      const timestamp = 1704067200123;
      const result = timestampTranslate(timestamp);
      
      // 毫秒部分不应该显示
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      expect(result.length).toBe(19);
    });

    it('应该处理不同的时区转换', () => {
      // 创建一个特定时间的 Date 对象
      const testDate = new Date('2024-06-15T12:30:45Z');
      const timestamp = testDate.getTime();
      const result = timestampTranslate(timestamp);
      
      // 北京时间应该是 20:30:45
      expect(result).toContain('20:30:45');
    });

    it('应该保持格式一致性', () => {
      const timestamps = [
        1609459200000,
        1640995200000,
        1672531200000
      ];
      
      const results = timestamps.map(ts => timestampTranslate(ts));
      
      results.forEach(result => {
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        expect(result.length).toBe(19);
      });
    });
  });

  describe('集成测试', () => {
    it('应该支持完整的时间处理流程', () => {
      // 获取当前时间戳
      const now = Date.now();
      
      // 转换为北京时间
      const beijingTime = timestampTranslate(now);
      expect(beijingTime).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      
      // 比较时间
      const oneHourAgo = now - 3600000;
      expect(compareDate(now, oneHourAgo)).toBe(true);
    });

    it('应该处理时间计算场景', () => {
      const startTime = '2024-01-01 09:00:00';
      const endTime = '2024-01-01 17:00:00';
      
      // 判断开始时间是否早于结束时间
      expect(compareDate(startTime, endTime)).toBe(false);
      expect(compareDate(endTime, startTime)).toBe(true);
    });

    it('应该处理时间戳和日期字符串混合使用', () => {
      const timestamp = 1704067200000;
      const dateString = '2024-01-02 00:00:00';
      
      // timestamp 是 2024-01-01 08:00:00 (北京时间)
      // dateString 是 2024-01-02 00:00:00
      expect(compareDate(timestamp, dateString)).toBe(false);
      expect(compareDate(dateString, timestamp)).toBe(true);
    });
  });

  describe('边界情况测试', () => {
    describe('Date comparison edge cases', () => {
      it('应该处理无效日期', () => {
        const result1 = compareDate('invalid', '2024-01-01');
        expect(result1).toBe(false); // Invalid Date 会被转换为 NaN
        
        const result2 = compareDate('2024-01-01', 'invalid');
        expect(result2).toBe(false);
      });

      it('应该处理 null 和 undefined', () => {
        expect(compareDate(null, '2024-01-01')).toBe(false); // null 转换为 1970-01-01
        expect(compareDate('2024-01-01', null)).toBe(true); // null 转换为 1970-01-01，早于 2024-01-01
        expect(compareDate(undefined, '2024-01-01')).toBe(false); // undefined 转换为 Invalid Date (NaN)
        expect(compareDate('2024-01-01', undefined)).toBe(false); // NaN 比较返回 false
      });

      it('应该处理空字符串', () => {
        expect(compareDate('', '2024-01-01')).toBe(false);
        expect(compareDate('2024-01-01', '')).toBe(false); // 空字符串转换为 Invalid Date
      });
    });

    describe('Timestamp translation edge cases', () => {
      it('应该处理极大时间戳', () => {
        const maxTimestamp = Number.MAX_SAFE_INTEGER;
        expect(() => timestampTranslate(maxTimestamp)).toThrow();
      });

      it('应该处理极小时间戳', () => {
        const minTimestamp = Number.MIN_SAFE_INTEGER;
        expect(() => timestampTranslate(minTimestamp)).toThrow();
      });

      it('应该处理非数字参数', () => {
        expect(() => timestampTranslate('invalid')).toThrow();
        expect(() => timestampTranslate(NaN)).toThrow();
      });
    });
  });

  describe('性能测试', () => {
    it('应该快速处理大量时间比较', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        compareDate('2024-01-01', '2024-01-02');
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeLessThan(1000);
    });

    it('应该快速处理大量时间戳转换', () => {
      const startTime = Date.now();
      const now = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        timestampTranslate(now + i * 1000);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeLessThan(1000);
    });
  });
});
