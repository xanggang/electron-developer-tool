module.exports = {
  env: {
    es2022: true,
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
    'no-underscore-dangle': 'off',
    // // 'no-unused-vars': 'error',
    // // indent: ['error', 2],
    // 'arrow-body-style': 'off',
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    // 'consistent-return': 'off',
    // // 换行符统一使用CRLF，防止在代码合并时，由于换行符不同而引起大范围的冲突
    // 'linebreak-style': ['error', 'windows'],
    // 'no-shadow': 'off',
    // 'no-use-before-define': ['error', { functions: false }],
    // 'max-len': ['error', { code: 150 }],
    //
    // //  @typescript-eslint/eslint-plugin
    // '@typescript-eslint/no-shadow': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    //
    // // eslint-plugin-vue
    // 'vue/html-self-closing': ['error', {
    //   html: {
    //     void: 'always',
    //     normal: 'never',
    //     component: 'never',
    //   },
    //   svg: 'always',
    //   math: 'always',
    // }],
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: {
    //     max: 5,
    //   },
    //   multiline: {
    //     max: 1,
    //   },
    // }],
    // 'vue/multi-word-component-names': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    //
    // // eslint-plugin-import
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
    }],
    // // 作用于引入模块的那个文件。以下配置表示在任何目录下的vite.config.ts中可以引入列在package.json的devDependencies中的依赖
    // eslint-disable-next-line max-len
    // // 'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*/vite.config.ts', '**/*/generateTheme.js'] }],
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@', './src'],
        ['@main/*', './src/main'],
        ['@render/*', './src/render']
      ],
    },
    // alias: {
    //   map: [
    //     ['@', './src'],
    //     ['@main/*', './src/main'],
    //     ['@render/*', './src/render'],
    //   ],
    //   extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
    // },
  },
}
