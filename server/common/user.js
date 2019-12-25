const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const users = new Map()

const addUser = async (ctx) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password,salt)
  if (users.has(username)) {
    ctx.body = {
      success: false,
      info: "已经存在该用户"
    }
  } else {
    users.set(username, hash)
    ctx.body = {
      success: true
    }
  }
}

const postUserAuth = async (ctx) => {
  const data = ctx.request.body
  console.log(data)
  if (users.has(data.username) === true) {
    const password = users.get(data.username)
    if (!bcrypt.compareSync(data.password, password)) {
      ctx.body = {
        success: false,
        info: '密码错误'
      }
    } else {
      const userToken = {
        username: data.username,
      }
      const secret = 'project2019'
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在'
    }
  }
}

module.exports = {
  postUserAuth,
  users,
  addUser
}
