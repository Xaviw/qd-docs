// @unocss-include
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, {
      // class: 'prose prose-sky text-lg text-left m-auto dark:prose-invert',
    }, {
    })
  },
} satisfies Theme
