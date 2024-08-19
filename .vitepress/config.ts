import path from 'node:path'
import { defineConfig } from 'vitepress'
import AutoNav from 'vite-plugin-vitepress-auto-nav'
import Unocss from 'unocss/vite'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: 'Docs',
  description: '技术文档',
  lang: 'zh-cn',
  srcDir: 'src',
  vite: {
    plugins: [
      // 根据目录结构自动生成 nav 与 sidebar
      // https://github.com/Xaviw/vite-plugin-vitepress-auto-nav
      AutoNav(),
      Unocss(),
    ],
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '#/': `${path.resolve(__dirname, 'types')}/`,
      },
    },
  },
  themeConfig: {
    darkModeSwitchLabel: '切换主题',
    darkModeSwitchTitle: '切换暗色模式',
    docFooter: {
      next: '下一篇',
      prev: '上一篇',
    },
    externalLinkIcon: true,
    lastUpdated: {
      text: '最近更新',
    },
    lightModeSwitchTitle: '切换亮色模式',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除',
            footer: {
              closeText: '关闭',
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    sidebarMenuLabel: '全部文章',
    outline: {
      label: '目录',
      level: 'deep',
    },
    editLink: {
      pattern: 'https://gitee.com/xaviw/qd-docs/edit/master/src/:path',
      text: '修改本文',
    },
  },
  markdown: {
    defaultHighlightLang: 'js',
    lineNumbers: true,
    codeCopyButtonTitle: '复制',
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
    image: {
      lazyLoading: true,
    },
  },
})
