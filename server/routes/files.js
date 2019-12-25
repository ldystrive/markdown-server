const Router = require('koa-router')
const files = require('../common/files')

const router = Router()

router.get('/getFiles', files.getFiles)
router.put('/addFile', async ctx => {
  const fileName = ctx.request.body.fileName
  const docId = files.addFile(fileName)
  if (docId !== null) {
    ctx.body = {
      success: false,
      info: '此文件已存在'
    }
  } else {
    ctx.body = {
      success: true,
      docId: docId
    }
  }
})

module.exports = {
  router
}
