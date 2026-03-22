/**
 * @jest-environment jsdom
 */

// 导入所有 rules 模块的方法
const accountModule = require('src/rules/account.js');
const otherModule = require('src/rules/other.js');
const typeModule = require('src/rules/type.js');

// Account 模块方法
const { validEmail } = accountModule;

// Other 模块方法
const { isExternal, validURL, validLowerCase, validUpperCase } = otherModule;

// Type 模块方法
const { isString, isArray, blobValidate } = typeModule;

describe('Rules Module Tests', () => {
  
  // ==================== Account 模块 ====================
  describe('Account Module (账户相关验证)', () => {
    describe('validEmail', () => {
      it('应该验证正确的邮箱格式', () => {
        expect(validEmail('test@example.com')).toBe(true);
        expect(validEmail('user.name@domain.co.uk')).toBe(true);
        expect(validEmail('test123@test.cn')).toBe(true);
      });

      it('应该拒绝错误的邮箱格式', () => {
        expect(validEmail('invalid')).toBe(false);
        expect(validEmail('test@')).toBe(false);
        expect(validEmail('@example.com')).toBe(false);
        expect(validEmail('test@.com')).toBe(false);
      });

      it('应该支持带特殊字符的邮箱', () => {
        expect(validEmail('test.user@example.com')).toBe(true);
        expect(validEmail('user+tag@example.com')).toBe(true);
        expect(validEmail('user_name@example-domain.com')).toBe(true);
      });

      it('应该支持数字邮箱', () => {
        expect(validEmail('123456@example.com')).toBe(true);
        expect(validEmail('test@123.com')).toBe(true);
      });

      it('空值和空格应该被拒绝', () => {
        expect(validEmail('')).toBe(false);
        expect(validEmail('   ')).toBe(false);
      });
    });
  });

  // ==================== Other 模块 ====================
  describe('Other Module (其他常用验证)', () => {
    describe('isExternal', () => {
      it('应该识别 http 协议的外部链接', () => {
        expect(isExternal('http://example.com')).toBe(true);
        expect(isExternal('http://www.example.com/path')).toBe(true);
      });

      it('应该识别 https 协议的外部链接', () => {
        expect(isExternal('https://example.com')).toBe(true);
        expect(isExternal('https://secure.example.com')).toBe(true);
      });

      it('应该识别 mailto 协议', () => {
        expect(isExternal('mailto:test@example.com')).toBe(true);
      });

      it('应该识别 tel 协议', () => {
        expect(isExternal('tel:+86-13800138000')).toBe(true);
      });

      it('应该拒绝内部路径', () => {
        expect(isExternal('/home')).toBe(false);
        expect(isExternal('./about')).toBe(false);
        expect(isExternal('../contact')).toBe(false);
        expect(isExternal('about')).toBe(false);
      });
    });

    describe('validURL', () => {
      it('应该验证正确的 URL 格式', () => {
        expect(validURL('http://example.com')).toBe(true);
        expect(validURL('https://example.com')).toBe(true);
        expect(validURL('ftp://files.example.com')).toBe(true);
      });

      it('应该验证带端口和路径的 URL', () => {
        expect(validURL('http://example.com:8080/path')).toBe(true);
        expect(validURL('https://example.com/path?query=123')).toBe(true);
      });

      it('应该验证带认证的 URL', () => {
        expect(validURL('http://user:pass@example.com')).toBe(true);
      });

      it('应该拒绝错误的 URL 格式', () => {
        expect(validURL('not-a-url')).toBe(false);
        expect(validURL('example.com')).toBe(false);
        expect(validURL('')).toBe(false);
      });
    });

    describe('validLowerCase', () => {
      it('应该验证全为小写字母的字符串', () => {
        expect(validLowerCase('abc')).toBe(true);
        expect(validLowerCase('hello')).toBe(true);
        expect(validLowerCase('abcdefghijklmnopqrstuvwxyz')).toBe(true);
      });

      it('应该拒绝包含非小写字母的字符串', () => {
        expect(validLowerCase('ABC')).toBe(false);
        expect(validLowerCase('Abc')).toBe(false);
        expect(validLowerCase('123')).toBe(false);
        expect(validLowerCase('abc123')).toBe(false);
      });

      it('应该拒绝包含特殊字符的字符串', () => {
        expect(validLowerCase('abc!')).toBe(false);
        expect(validLowerCase('abc-def')).toBe(false);
        expect(validLowerCase('abc def')).toBe(false);
      });

      it('空字符串应该被拒绝', () => {
        expect(validLowerCase('')).toBe(false);
      });
    });

    describe('validUpperCase', () => {
      it('应该验证全为大写字母的字符串', () => {
        expect(validUpperCase('ABC')).toBe(true);
        expect(validUpperCase('HELLO')).toBe(true);
        expect(validUpperCase('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true);
      });

      it('应该拒绝包含非大写字母的字符串', () => {
        expect(validUpperCase('abc')).toBe(false);
        expect(validUpperCase('AbC')).toBe(false);
        expect(validUpperCase('123')).toBe(false);
        expect(validUpperCase('ABC123')).toBe(false);
      });

      it('应该拒绝包含特殊字符的字符串', () => {
        expect(validUpperCase('ABC!')).toBe(false);
        expect(validUpperCase('ABC-DEF')).toBe(false);
        expect(validUpperCase('ABC DEF')).toBe(false);
      });

      it('空字符串应该被拒绝', () => {
        expect(validUpperCase('')).toBe(false);
      });
    });
  });

  // ==================== Type 模块 ====================
  describe('Type Module (类型判断)', () => {
    describe('isString', () => {
      it('应该识别字符串类型', () => {
        expect(isString('hello')).toBe(true);
        expect(isString('')).toBe(true);
        expect(isString('123')).toBe(true);
      });

      it('应该识别 String 对象', () => {
        expect(isString(new String('hello'))).toBe(true);
      });

      it('应该拒绝非字符串类型', () => {
        expect(isString(123)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString(true)).toBe(false);
      });
    });

    describe('isArray', () => {
      it('应该识别数组类型', () => {
        expect(isArray([1, 2, 3])).toBe(true);
        expect(isArray([])).toBe(true);
        expect(isArray(['a', 'b'])).toBe(true);
      });

      it('应该识别嵌套数组', () => {
        expect(isArray([[1, 2], [3, 4]])).toBe(true);
      });

      it('应该拒绝非数组类型', () => {
        expect(isArray('array')).toBe(false);
        expect(isArray(123)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(undefined)).toBe(false);
        expect(isArray({})).toBe(false);
        expect(isArray(true)).toBe(false);
      });
    });

    describe('blobValidate', () => {
      it('Blob 数据应该返回 true', async () => {
        // 创建一个模拟的 Blob 对象
        const mockBlob = {
          text: async () => {
            throw new Error('Not JSON');
          }
        };
        
        const result = await blobValidate(mockBlob);
        expect(result).toBe(true);
      });

      it('可解析为 JSON 的数据应该返回 false', async () => {
        const mockData = {
          text: async () => JSON.stringify({ key: 'value' })
        };
        
        const result = await blobValidate(mockData);
        expect(result).toBe(false);
      });

      it('纯文本数据应该返回 true', async () => {
        const mockText = {
          text: async () => 'This is plain text'
        };
        
        const result = await blobValidate(mockText);
        expect(result).toBe(true);
      });
    });
  });

  // ==================== 集成测试 ====================
  describe('Integration Tests (集成测试)', () => {
    it('应该支持完整的表单验证流程', () => {
      // 验证邮箱
      expect(validEmail('user@example.com')).toBe(true);
      
      // 验证用户名（全小写）
      expect(validLowerCase('username')).toBe(true);
      
      // 验证验证码（全大写）
      expect(validUpperCase('CODE123')).toBe(false); // 包含数字
      
      // 验证类型
      expect(isString('test')).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('应该处理用户输入场景', () => {
      const userInput = {
        email: 'test@example.com',
        username: 'john',
        code: 'ABC',
        tags: ['tag1', 'tag2']
      };
      
      // 验证邮箱
      expect(validEmail(userInput.email)).toBe(true);
      
      // 验证用户名
      expect(validLowerCase(userInput.username)).toBe(true);
      
      // 验证代码
      expect(validUpperCase(userInput.code)).toBe(true);
      
      // 验证标签数组
      expect(isArray(userInput.tags)).toBe(true);
    });
  });

  // ==================== 边界情况测试 ====================
  describe('Edge Cases (边界情况)', () => {
    describe('Email validation edge cases', () => {
      it('应该处理国际化域名', () => {
        expect(validEmail('test@例子。测试')).toBe(false); // IDN 可能不支持
      });

      it('应该处理超长邮箱地址', () => {
        const longEmail = 'a'.repeat(60) + '@example.com';
        expect(validEmail(longEmail)).toBe(true);
      });
    });

    describe('URL validation edge cases', () => {
      it('应该处理 localhost', () => {
        expect(isExternal('http://localhost')).toBe(true);
        expect(isExternal('http://localhost:3000')).toBe(true);
      });

      it('应该处理 IP 地址', () => {
        expect(isExternal('http://192.168.1.1')).toBe(true);
        expect(isExternal('http://127.0.0.1:8080')).toBe(true);
      });
    });

    describe('Type checking edge cases', () => {
      it('应该处理 null 和 undefined', () => {
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(undefined)).toBe(false);
      });

      it('应该处理类数组对象', () => {
        const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
        expect(isArray(arrayLike)).toBe(false);
      });
    });
  });

  // ==================== 性能测试 ====================
  describe('Performance Tests (性能测试)', () => {
    it('应该快速处理大量验证请求', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        validEmail('test@example.com');
        validLowerCase('test');
        validUpperCase('TEST');
        isString('test');
        isArray([1, 2, 3]);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 应该在合理时间内完成（例如 1 秒）
      expect(duration).toBeLessThan(1000);
    });
  });
});
