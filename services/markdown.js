const namedHeaders = require('markdown-it-named-headers')
const attrs = require('markdown-it-attrs/markdown-it-attrs.browser.js')
const md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  quotes: '“”‘’',
})
md.use(namedHeaders)
md.use(attrs)

const renderToHtml = function (markdown) {
  return md.render(markdown)
}

export { renderToHtml }
