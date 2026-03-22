/**
 * @jest-environment jsdom
 */

const dictModule = require('src/dict/index.js');
const { optionTranslate, translate, translateCode } = dictModule;

describe('Dict Module Tests', () => {
  
  describe('optionTranslate', () => {
    it('应该转换数据格式为 ElementUI 标准格式', () => {
      const data = [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' },
        { id: 3, name: '广州' }
      ];
      
      const result = optionTranslate(data, 'name', 'id');
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: 1,
        name: '北京',
        value: 1,
        label: '北京',
        text: '北京'
      });
      expect(result[1].value).toBe(2);
      expect(result[1].label).toBe('上海');
    });

    it('应该使用默认字段名', () => {
      const data = [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ];
      
      const result = optionTranslate(data);
      
      expect(result[0]).toEqual({
        label: '男',
        value: 1,
        text: '男'
      });
      expect(result[1].label).toBe('女');
      expect(result[1].value).toBe(2);
    });

    it('应该处理空数组', () => {
      const result = optionTranslate([]);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('应该保留原对象的其他属性', () => {
      const data = [
        { id: 1, name: '测试', extra: '额外属性' }
      ];
      
      const result = optionTranslate(data, 'name', 'id');
      
      expect(result[0].extra).toBe('额外属性');
      expect(result[0].value).toBe(1);
      expect(result[0].label).toBe('测试');
    });

    it('应该处理自定义字段名', () => {
      const data = [
        { cityName: '北京', cityId: '010' },
        { cityName: '上海', cityId: '021' }
      ];
      
      const result = optionTranslate(data, 'cityName', 'cityId');
      
      expect(result[0].value).toBe('010');
      expect(result[0].label).toBe('北京');
      expect(result[0].text).toBe('北京');
    });
  });

  describe('translate', () => {
    const options = [
      { value: 1, label: '男', text: '男' },
      { value: 2, label: '女', text: '女' },
      { value: 3, label: '未知', text: '未知' }
    ];

    it('type=false 时应该根据值查找标签', () => {
      expect(translate(1, options, false)).toBe('男');
      expect(translate(2, options, false)).toBe('女');
      expect(translate(3, options, false)).toBe('未知');
    });

    it('type=true 时应该根据标签查找值', () => {
      expect(translate('男', options, true)).toBe(1);
      expect(translate('女', options, true)).toBe(2);
      expect(translate('未知', options, true)).toBe(3);
    });

    it('应该支持通过 text 字段查找', () => {
      const optionsWithText = [
        { value: 'A', text: '选项 A' },
        { value: 'B', text: '选项 B' }
      ];
      
      expect(translate('选项 A', optionsWithText, true)).toBe('A');
      expect(translate('选项 B', optionsWithText, true)).toBe('B');
    });

    it('找不到时应该返回空字符串', () => {
      expect(translate(999, options, false)).toBe('');
      expect(translate('不存在的值', options, true)).toBeNull();
    });

    it('应该处理空数组', () => {
      expect(translate(1, [], false)).toBe('');
      expect(translate('test', [], true)).toBeNull();
    });

    it('应该优先使用 label 字段', () => {
      const data = [
        { value: 1, label: 'Label1', text: 'Text1' }
      ];
      
      // 当有 label 时，应该使用 label
      expect(translate(1, data, false)).toBe('Label1');
    });

    it('没有 label 时应该使用 text 字段', () => {
      const data = [
        { value: 1, text: 'OnlyText' }
      ];
      
      expect(translate(1, data, false)).toBe('OnlyText');
    });

    it('应该支持不同的数据类型', () => {
      const mixedOptions = [
        { value: 'string', label: '字符串' },
        { value: 123, label: '数字' },
        { value: true, label: '布尔值' }
      ];
      
      expect(translate('string', mixedOptions, false)).toBe('字符串');
      expect(translate(123, mixedOptions, false)).toBe('数字');
      expect(translate(true, mixedOptions, false)).toBe('布尔值');
    });
  });

  describe('translateCode', () => {
    const dict = [
      { code: 'MALE', label: '男', text: '男' },
      { code: 'FEMALE', label: '女', text: '女' },
      { code: 'UNKNOWN', label: '未知', text: '未知' }
    ];

    it('type=true 时应该根据 label 查找 code', () => {
      expect(translateCode('男', dict, true)).toBe('MALE');
      expect(translateCode('女', dict, true)).toBe('FEMALE');
      expect(translateCode('未知', dict, true)).toBe('UNKNOWN');
    });

    it('type=false 时应该根据 code 查找 label', () => {
      expect(translateCode('MALE', dict, false)).toBe('男');
      expect(translateCode('FEMALE', dict, false)).toBe('女');
      expect(translateCode('UNKNOWN', dict, false)).toBe('未知');
    });

    it('应该支持通过 text 字段查找 code', () => {
      expect(translateCode('男', dict, true)).toBe('MALE');
      expect(translateCode('女', dict, true)).toBe('FEMALE');
    });

    it('找不到时应该返回空字符串或 null', () => {
      expect(translateCode('不存在的值', dict, true)).toBeNull();
      expect(translateCode('INVALID_CODE', dict, false)).toBe('');
    });

    it('应该处理空数组', () => {
      expect(translateCode('test', [], true)).toBeNull();
      expect(translateCode('test', [], false)).toBe('');
    });

    it('没有 label 时应该使用 text 字段', () => {
      const data = [
        { code: 'CODE1', text: 'OnlyText' }
      ];
      
      expect(translateCode('CODE1', data, false)).toBe('OnlyText');
      expect(translateCode('OnlyText', data, true)).toBe('CODE1');
    });

    it('应该优先使用 label 字段', () => {
      const data = [
        { code: 'CODE1', label: 'Label1', text: 'Text1' }
      ];
      
      expect(translateCode('CODE1', data, false)).toBe('Label1');
    });
  });

  describe('集成测试', () => {
    it('应该支持完整的翻译流程', () => {
      // 原始数据
      const rawData = [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' }
      ];

      // 转换为标准格式
      const options = optionTranslate(rawData, 'name', 'id');

      // 使用翻译功能
      expect(translate(1, options, false)).toBe('北京');
      expect(translate('北京', options, true)).toBe(1);
    });

    it('应该处理复杂的数据结构（对象作为值）', () => {
      const complexData = [
        { 
          value: { nested: 'object' }, 
          label: '复杂对象',
          text: '复杂对象'
        }
      ];

      // 对象比较使用引用比较，所以这里应该用相等的引用
      const searchValue = { nested: 'object' };
      const result = translate(searchValue, complexData, false);
      // 由于是引用比较，结果会是空字符串
      expect(result).toBe('');
    });
  });

  describe('边界情况测试', () => {
    it('应该处理 undefined 参数', () => {
      // optionTranslate 对 undefined 会抛出错误
      expect(() => optionTranslate(undefined)).toThrow();
      // translate 对 undefined 值返回空字符串
      expect(translate(undefined, [], false)).toBe('');
    });

    it('应该处理 null 参数', () => {
      expect(() => optionTranslate(null)).toThrow();
    });

    it('应该处理空字符串值', () => {
      const data = [
        { value: '', label: '空值' },
        { value: 'test', label: '测试' }
      ];

      expect(translate('', data, false)).toBe('空值');
      expect(translate('空值', data, true)).toBe('');
    });

    it('应该处理特殊字符', () => {
      const data = [
        { value: 'test@email.com', label: '邮箱' },
        { value: '中文/英文', label: '混合' }
      ];

      expect(translate('test@email.com', data, false)).toBe('邮箱');
      expect(translate('邮箱', data, true)).toBe('test@email.com');
    });
  });
});
