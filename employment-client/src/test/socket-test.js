import io from 'socket.io-client'

//connect server and connection object
const socket = io('ws://localhost:4000')

socket.emit('sendMsg',{name: 'Louis Liu'})

console.log('client to server: ',{name: 'Louis Liu'})

socket.on('receiveMsg',function (data) {
    console.log('receive data from server: ', data)

})



