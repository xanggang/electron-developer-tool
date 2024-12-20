module.exports = {
  env: {
    es2022: true,
  },
  globals: {
    Cesium: true, // 三维地图的全局变量
  },
  extends: [
    // 基础规则
    'airbnb-base',
    // 附加ts的import设置
    'plugin:import/typescript',
    // vue3规则
    'plugin:vue/vue3-strongly-recommended',
    // ts规则；告诉vue-eslint-parser，不同文件后缀对应的parser，以及传递的parserOptions
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    // node_modules\eslint-plugin-vue\lib\configs\base.js
    // +
    // node_modules\@vue\eslint-config-typescript\index.js
  },
  rules: {
    // 'no-unused-vars': 'error',
    // indent: ['error', 2],
    'arrow-body-style': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'consistent-return': 'off',
    // 换行符统一使用CRLF，防止在代码合并时，由于换行符不同而引起大范围的冲突
    'linebreak-style': ['error', 'windows'],
    'no-shadow': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'max-len': ['error', { code: 150 }],

    //  @typescript-eslint/eslint-plugin
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // eslint-plugin-vue
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'never',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 5,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // eslint-plugin-import
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      // extends配置上新增的
      ts: 'never',
      tsx: 'never',
    }],
    // 作用于引入模块的那个文件。以下配置表示在任何目录下的vite.config.ts中可以引入列在package.json的devDependencies中的依赖
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*/vite.config.ts', '**/*/generateTheme.js'] }],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#importextensions
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
      },
      alias: {
        map: [
          ['@', './src'],
          ['#vo', './Vo'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
      },
    },
  },
}
