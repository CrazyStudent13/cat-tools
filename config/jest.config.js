module.exports = {
  // 测试环境设置为 jsdom，因为代码可能需要浏览器环境
  testEnvironment: 'jsdom',
  
  // 使用 babel-jest 来转换 ES6 模块
  transform: {
    '^.+\\.js$': ['babel-jest', {
      configFile: './config/babel.config.js'
    }]
  },
  
  // 测试文件匹配模式
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js'
  ],
  
  // 模块文件扩展名
  moduleFileExtensions: ['js', 'json'],
  
  // 模块名映射
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  
  // 收集覆盖率信息
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/main.js' // 排除主入口文件
  ],
  
  // 覆盖率报告目录
  coverageDirectory: 'coverage',
  
  // 覆盖率报告格式
  coverageReporters: ['text', 'lcov', 'html'],
  
  // 显示详细的测试输出
  verbose: true,
  
  // 忽略 node_modules 目录
  testPathIgnorePatterns: ['/node_modules/'],
  
  // 根目录
  rootDir: '..',
  
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
