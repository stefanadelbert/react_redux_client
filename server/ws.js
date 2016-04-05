// ------------------------------------
// Websocket server
// ------------------------------------

import socketio from 'socket.io'
import config from '../config'

const io = socketio()
const port = config.server_port + 1
const host = config.server_host
const interval = parseInt(process.argv[2]) || 500

io.on('connection', (socket) => {
  console.log('client connected to socket.io, pushing data every %s ms', interval)

  function sendData() {
    const data = new Date().valueOf()
    io.emit('somedata', data)
    console.log(`Sent ${data}`)
  }

  setInterval(sendData, interval)
})


io.listen(port)
console.log(`Websocket server is now running at http://${host}:${port}.`)

export default io
