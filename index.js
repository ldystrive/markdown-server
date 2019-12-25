const Koa = require('koa')
const OT = require('./server/ot')
const Router = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaBodyparser = require ('koa-bodyparser')
const auth = require('./server/routes/auth')

const app = new Koa()
const router = Router({
  prefix: '/api'
})

const port = process.env.PORT || 3000

app.use(koaBodyparser())
app.use(json())


app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.state === 401) {
      ctx.state = 401
      ctx.body = {
        sucess: false,
        token: null,
        info: 'error'
      }
    } else {
      throw err
    }
  }
})

app.on('error', (err, ctx) => {
  console.log('error: ', err)
})



app.use(cors({
  origin: ctx => {
    return 'http://localhost:8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  // maxAge: 5,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


router.use('/auth', auth.router.routes())

app.use(router.routes())

const http = require('http').createServer(app.callback())

http.listen(port)
console.log(`listening ${port}`)

// const io = require('socket.io')(http)

// const server = new OT.EditorSocketIOServer('', [], 1)



app.use( async (ctx) => {
  ctx.body = 'hello'
})


// io.on('connection', socket => {
//   console.log('socket connection')
//   server.addClient(socket)
// })

// http.listen(3000)
