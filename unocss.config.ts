import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import type {} from '@unocss/core' // 修复pnpm下的类型错误

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {

  },
  rules: [
    ['flex-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center'}],
  ],
});
