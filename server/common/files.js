const OT = require('../ot')
const uuid = require('uuid')
class File {
  constructor (docId, fileName) {
    this.docId = docId
    this.fileName = fileName
    this.otServer = new OT.EditorSocketIOServer('', [], docId)
  }
}

const Files = new Map()

const getFiles = async (ctx) => {
  const files = []
  Files.forEach((value, key) => {
    files.push({docId: key, fileName: value.fileName})
  })
  ctx.body = {
    success: true,
    files
  }
}

const getFile = async (fileName) => {
  Files.forEach((value, key) => {
    if (value.fileName === fileName) {
      return value
    }
  })
  return null
}

const getFileByDocId = async (docId) => {
  return Files.get(docId)
}

const addFile = async (fileName) => {
  if (getFile(fileName) !== null) {
    const docId = uuid.v1()
    const file = new File(docId, fileName)
    Files.set(docId, file)
    return docId
  }
  return null
}

module.exports = {
  getFiles,
  addFile,
  getFileByDocId
}