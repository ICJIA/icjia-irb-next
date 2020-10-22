/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')
const toc = require('markdown-toc')
const glob = require('glob-fs')({ gitignore: true })
const utils = require('./lib/utils')

const blacklist = [
  '.DS_Store',
  'placeholder.png',
  'placeholder.json',
  'placeholder.md',
]

const searchIndex = []

const files = glob.readdirSync('./content/**/*.md')

files.forEach((file) => {
  const f = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
  const m = matter(f)
  const route = file.replace('.md', '').replace('content', '')
  const obj = {}
  route === '/index' ? (obj.route = '/') : (obj.route = route)
  obj.headings = toc(m.content).json.map((t) => {
    return t.content
  })
  obj.title = m.data.title
  obj.description = m.data.description
  searchIndex.push(obj)
})

utils.saveJson(searchIndex, './static/search.json')
console.log(`Site meta created: ./static/search.json"`)
