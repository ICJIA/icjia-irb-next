/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')
const toc = require('markdown-toc')
const glob = require('glob-fs')({ gitignore: true })
const attrs = require('markdown-it-attrs/markdown-it-attrs.browser.js')
const namedHeaders = require('markdown-it-named-headers')
const md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  quotes: '“”‘’',
})
const utils = require('./lib/utils')
const config = require('./config.json')

const blacklist = [
  '.DS_Store',
  'placeholder.png',
  'placeholder.json',
  'placeholder.md',
]

const siteSections = ['meetings']

md.use(namedHeaders)
md.use(attrs)

const renderToHtml = function (markdown) {
  return md.render(markdown)
}

const files = glob.readdirSync('./content/**/*.md')

const api = files.map((file) => {
  const obj = {}
  const f = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
  const content = matter(f)
  const route = file.replace('.md', '').replace('content', '') + '/'
  let myRoute
  route === '/index/' ? (myRoute = '/') : (myRoute = route)
  obj.route = myRoute
  obj.markdown = content.content
  obj.title = content.data.title
  obj.route = `${myRoute}`
  obj.menuTitle = content.data.menuTitle
  obj.createdAt = content.data.createdAt
  obj.updatedAt = content.data.updatedAt
  obj.html = renderToHtml(content.content)
  obj.toc = toc(content.content).json
  obj.description = content.data.description
  obj.url = `https://icjia.illinois.gov${config.base}` + obj.route
  return obj
})

utils.saveJson(api, './static/api.json')
console.log('API created: ./static/api.json')
