const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/employment_chat')

const conn = mongoose.connection

conn.on('connected',() => {
    console.log('connect successfully')
})

//doc structure
const UserSchema = mongoose.Schema({
    username: {type: String,require: true},
    password: {type: String,require: true},
    type: {type: String,require: true},
    avatar: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type:String}
})

const ChatSchema = mongoose.Schema({
    from: {type:String, require:true},
    to: {type:String, require:true},
    chat_id: {type:String, require:true},
    content: {type:String, require:true},
    read: {type:Boolean, default:false},
    create_time: {type:Number}
})

const UserModel = mongoose.model('user',UserSchema)
const ChatModel = mongoose.model('chat',ChatSchema)


exports.UserModel = UserModel

exports.ChatModel = ChatModel

// module.exports = xxx    //export only one
// exports.xxx = value  //export multiple items
