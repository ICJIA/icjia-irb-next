import webpack from 'webpack'
import utils from './lib/utils'

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

    script: [
      {
        src:
          'https://cdn.jsdelivr.net/gh/icjia/doit-accessibility/dist/index.js',
        async: true,
        body: true,
      },
    ],
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
  plugins: ['~/plugins/static-mixin.js', '~/plugins/ie11.client.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

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
    //   '@nuxtjs/google-gtag',
    //   {
    //     id: 'G-4DLM9P8M72',
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
    [
      '@nuxtjs/google-gtag',
      {
        id: 'G-4DLM9P8M72',
      },
    ],
  ],

  sitemap: {
    hostname: 'https://icjia.illinois.gov/',
    gzip: false,
    exclude: [],
    sitemaps: [
      {
        path: '/sitemap-content.xml',
        gzip: false,
        trailingSlash: true,
        routes: async () => {
          const { $content } = require('@nuxt/content')
          const pages = await $content().only(['path']).fetch()
          const meetings = await $content('meetings').only(['path']).fetch()
          const content = [...pages, ...meetings]
          return content.map((item) =>
            item.path === '/index' ? '/' : `${item.path}`
          )
        },
      },
      {
        path: '/sitemap-files.xml',
        gzip: false,
        trailingSlash: false,
        exclude: ['/', '/search'],
        routes: () => {
          const files = []
          utils.walkSync('./static', function (filePath, stat) {
            const obj = {}
            obj.path = filePath.replace('static/', '')
            if (!utils.blacklist.includes(obj.path)) files.push(obj)
          })
          return files.map((item) => item.path)
        },
      },
    ],
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
    markdown: {},
    liveEdit: false,
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
