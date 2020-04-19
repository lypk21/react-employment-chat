var express = require('express');
var router = express.Router();
const {UserModel,ChatModel} = require('../db/models')
const md5 = require('blueimp-md5')
const userFilter = {password:0, __v:0}


router.post('/api/register',function (req,res) {
  const {username,password,type} = req.body

  UserModel.findOne({username},function (err,userDoc) {
    if(userDoc) {
      res.send({code:1,msg:'user already existed.'})
    } else {
      new UserModel({username,type,password:md5(password)}).save(function (err,user) {
        const data = {username,type,_id:user._id}  //remove password for response data
        res.cookie('user_id',user._id,{maxAge: 1000*60*60*24})
        res.send({code:0,data})
      })
    }
  })
})

router.post('/api/login',function (req,res) {
    const {username,password} = req.body

    UserModel.findOne({username,password:md5(password)},userFilter,function (err,user) {
        if(user) {
          res.cookie('user_id',user._id,{maxAge: 1000*60*60*24})
          res.send({code:0,data:user})
        } else {
          res.send({code:1,msg:'username or password incorrect'})
        }
    })

})

router.post('/api/update',function (req,res) {
    const user_id = req.cookies.user_id
    if(!user_id) {
        return res.send({code:1,msg:'Please Login'})
    }
    const user = req.body
    UserModel.findByIdAndUpdate({_id:user_id},user,function (err,oldUser) {
        if (!oldUser) {
            res.clearCookie('user_id')
            res.send({code:1,msg:'Please Login'})
        } else {
            const {_id,username,type} = oldUser
            const data = Object.assign(user,{_id,username,type})
            res.send({code:0,data})
        }
    })
})

router.get('/api/user', function (req,res) {
    const user_id = req.cookies.user_id
    if(!user_id) {
        return res.send({code:1, msg:'Please Login'})
    }
    UserModel.findOne({_id:user_id},userFilter,function (err,user) {
        if(user) {
            res.send({code:0,data:user})
        } else {
            res.send({code:1, msg:'Please Login'})
        }
    })
})

router.get('/api/userlist',function (req,res) {
   const {type} = req.query

   UserModel.find({type},userFilter,function (err,users) {
           res.send({code:0,data:users})
   })
})

router.get('/api/msglist',function (req,res) {
    const user_id = req.cookies.user_id
    if(!user_id) {
        return res.send({code:1,msg:'Please login'})
    }
    UserModel.find({},userFilter,function (err, userDoc) {
       /* let users = {}
        userDoc.forEach((user) => {
            users[user._id] = {username:user.username, avatar: user.avatar}
        })*/

        const users = userDoc.reduce((users,user) => {
            users[user._id] = {username:user.username,avatar:user.avatar}
            return users
        },{})

        ChatModel.find({'$or':[{from:user_id}, {to:user_id}]},userFilter,function (err,chatMsgs) {
            res.send({code:0,data:{users,chatMsgs}})
        })

    })

})

router.post('/api/readmsg',function (req,res) {
    const {from} = req.body
    const to = req.cookies.user_id

    ChatModel.update({from,to,read:false},{read:true},{multi:true},function (err,doc) {
        console.log(doc)
        res.send({code:0,data:doc.nModified})
    })
})

module.exports = router;
