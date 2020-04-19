module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection',function (socket) {
        console.log('server is connecting')
        socket.on('sendMsg', function (data) {
            console.log('server receive data: ', data)
            //deal with data
            data.name = data.name.toUpperCase()

            //send to client
            socket.emit('receiveMsg',data)

        })
    })
}