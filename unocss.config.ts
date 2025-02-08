import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
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
        display: 'inline-block',
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
    ['flex-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    ['text-primary', { color: 'var(--color-text-primary)' }],
    ['text-secondary', { color: 'var(--color-text-secondary)' }],
    ['text-tertiary', { color: 'var(--color-text-tertiary)' }],
    ['text-muted', { color: 'var(--color-text-muted)' }],
    ['text-inverted', { color: 'var(--color-text-inverted)' }],
  ],
})
