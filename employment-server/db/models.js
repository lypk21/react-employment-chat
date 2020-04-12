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

const UserModel = mongoose.model('user',UserSchema)

exports.UserModel = UserModel

// module.exports = xxx    //export only one
// exports.xxx = value  //export multiple items
