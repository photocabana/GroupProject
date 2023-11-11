const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')
const port = 8000
app.use(cors())

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

// io.on is the method that listens for socket events
//     and accepts a callback function that will be invoked
//     when a socket event is detected
let users = []
let messages = []
io.on("connection", (socket) => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log(socket.id)
    socket.on('joined-server', data => {
        users.push({ name: data, id: socket.id })
        io.emit('new-user', {users, messages})
    })

    socket.on('send-message', data => {
        messages.push(data)
        io.emit('new-message', messages)
    })


    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id)
        io.emit('user-disconnected', users)
    })
})