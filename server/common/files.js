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
  return new Promise( (resolve, reject) => {
    Files.forEach((value, key) => {
      if (value.fileName === fileName) {
        resolve(value)
      }
    })
    reject('not found')
  })
}

const getFileByDocId = async (docId) => {
  return Files.get(docId)
}

const addFile = async (fileName) => {
  return await getFile(fileName)
    .then((value) => {
      return null
    })
    .catch((err) => {
      const docId = uuid.v1()
      const file = new File(docId, fileName)
      Files.set(docId, file)
      return docId  
    })
}

module.exports = {
  getFiles,
  addFile,
  getFileByDocId
}