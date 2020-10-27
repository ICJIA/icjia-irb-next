const fs = require('fs')
const path = require('path')

const findInDir = function (dir, filter, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const fileStat = fs.lstatSync(filePath)

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList)
    } else if (filter.test(filePath)) {
      fileList.push(filePath)
    }
  })

  return fileList
}

const saveJson = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const walkSync = function (currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}

const filterUndefined = function (arr) {
  const temp = []
  for (const i of arr) i && temp.push(i)
  return temp
}

const blacklist = [
  '.DS_Store',
  'placeholder.png',
  'placeholder.json',
  'placeholder.md',
  '_headers',
  'robots.txt',
  '404.html',
  'api.json',
  'search.json',
  'favicon.ico',
  'google0bc0c1c6e02aa032.html',
]

module.exports = {
  findInDir,
  saveJson,
  walkSync,
  filterUndefined,
  blacklist,
}
