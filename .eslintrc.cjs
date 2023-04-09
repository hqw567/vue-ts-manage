/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    node: true, // 标志当前的环境，不然使用module.exports 会报错
    es2021: true
  },
  root: true,
  extends: [
    'eslint:recommended', // 使用eslint推荐的语法规范
    'plugin:react/recommended', // react推荐的语法规范
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser', // 使用解析器来解析ts的代码，使得eslint可以规范ts的代码
  parserOptions: {
    ecmaVersion: 'latest', // es的版本为最新版本
    sourceType: 'module' // 代码的模块化方式，使用module的模块方式
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off'
  }
}
