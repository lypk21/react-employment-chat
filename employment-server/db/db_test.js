const  mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/employment_test')

const conn = mongoose.connection
conn.on('connected', function () {
    console.log('connect successfully')
})

const userSchema = mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    avatar:{type:String}
})

const UserModel = mongoose.model('user',userSchema)

//create doc
/*function testSave() {
    //create user model instance
    const userModel = new UserModel({username: 'Jim', password: md5('234'), type:'employee'})
    userModel.save(function (error,user) {
        console.log('save()',error,user)
    })
}

testSave()*/

/*function testFind() {
    //find collection
    UserModel.find(function (error,users) {
        console.log('find()',error,users)
    })

    //find doc
    UserModel.findOne({_id:'5e9325b55c39605bba0912fe'},function (error,user) {
        console.log('findOne()',error,user)
    })
    UserModel.findOne({username:'Jim'},function (error,user) {
        console.log('findOne()',error,user)
    })



}
testFind()*/

/*function testUpdate() {
    UserModel.findByIdAndUpdate(
        {_id:'5e9325b55c39605bba0912fe'},
        {username:'Jack'},
        function (error,oldUser) {
        console.log('findByIdAndUpdate()',error,oldUser)
    })
}

testUpdate()*/

function testDelete() {
    UserModel.remove({_id:'5e9325b55c39605bba0912fe'},function (error,doc) {
        console.log('remove()',error,doc)
    })
}

testDelete()


