module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection',function (socket) {
        console.log('server is connected')
        socket.on('sendMsg',function ({from,to,content}) {
            console.log('from client: ',{from,to,content})
            const {ChatModel} = require('../db/models')
            const chat_id = [from,to].sort().join("_")
            const create_time = Date.now()
            new ChatModel({from,to,chat_id,content,read:false,create_time}).save(function (err,chat) {
                io.emit('receiveMsg',chat)
            })
        })
    })
}