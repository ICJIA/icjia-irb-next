import webpack from 'webpack'
import utils from './lib/utils'

// console.log(utils.blacklist)

// function addBase(url) {
//   const base = process.env.NODE_ENV === 'production' ? '/irb/' : '/'
//   // console.log(base + url)
//   return base + url
// }

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: 'IRB | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/irb/favicon.ico' },

      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      // },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
      // },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/app.css', '@/assets/github-markdown.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/static-mixin.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /* Google Analytics ID: UA-150082887-9 */
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/vuetify',
      {
        /* module options */
      },
    ],
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     id: 'UA-150082887-9',
    //   },
    // ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-material-design-icons',
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/dotenv',

    '@nuxtjs/sitemap',
  ],
  sitemap: {
    hostname: 'https://icjia.illinois.gov/',
    gzip: true,
    exclude: [],
    routes: async () => {
      const files = []
      const { $content } = require('@nuxt/content')
      const pages = await $content().only(['path']).fetch()
      const meetings = await $content('meetings').only(['path']).fetch()

      const slashedPages = pages.map((p) => {
        p.path = `${p.path}/`
        return p
      })

      const slashedMeetings = meetings.map((p) => {
        p.path = `${p.path}/`
        return p
      })

      // ... add files to sitemap.xml
      utils.walkSync('./static', function (filePath, stat) {
        const obj = {}
        obj.path = filePath.replace('static/', '')
        if (!utils.blacklist.includes(obj.path)) files.push(obj)
      })

      const content = [...slashedPages, ...slashedMeetings, ...files]

      return content.map((item) =>
        item.path === '/index' ? '/' : `${item.path}`
      )
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    fullTextSearchFields: ['title', 'summary', 'slug'],
  },
  hooks: {
    'content:file:beforeInsert': (document) => {
      // ... add full markdown to returned $content object
      if (document.extension === '.md') {
        document.markdown = document.text
      }
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, { isDev }) {
      config.plugins.push(
        new webpack.DefinePlugin({
          STATIC_PATH: JSON.stringify(isDev ? '' : '/irb/'),
        })
      )
    },
  },
  router: {
    base: '/irb',
  },
  generate: {
    async routes() {
      // next comment to make VSCode ignore the "error"
      // @ts-ignore
      const { $content } = await require('@nuxt/content')
      const pages = await $content().only(['path']).fetch()
      const meetings = await $content('meetings').only(['path']).fetch()
      const files = [...pages, ...meetings]
      const paths = files.map((file) =>
        file.path === '/index' ? '/' : `${file.path}/`
      )
      return paths
    },
  },
}
