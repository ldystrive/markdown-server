const auth = require('../common/user')
const Router = require('koa-router')
const router = Router()

router.post('/user', auth.postUserAuth)
router.put('/user', auth.addUser)

module.exports = {
  router
}
