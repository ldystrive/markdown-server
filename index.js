const Koa = require('koa')
const OT = require('./server/ot')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa()

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

const http = require('http').createServer(app.callback())
const io = require('socket.io')(http)

const server = new OT.EditorSocketIOServer('', [], 1)



app.use( async (ctx) => {
  ctx.body = 'hello'
})


io.on('connection', socket => {
  console.log('socket connection')
  server.addClient(socket)
})

http.listen(3000)
