module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      },
      modules: 'commonjs' // 将 ES6 模块转换为 CommonJS
    }]
  ]
};
