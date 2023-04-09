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
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest', // es的版本为最新版本
    parser: '@typescript-eslint/parser',
    sourceType: 'module' // 代码的模块化方式，使用module的模块方式
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  }
}
