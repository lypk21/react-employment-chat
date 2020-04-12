var express = require('express');
var router = express.Router();
const {UserModel} = require('../db/models')
const md5 = require('blueimp-md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register',function (req,res) {
  const {username,password,type} = req.body

  UserModel.findOne({username},function (err,userDoc) {
    if(userDoc) {
      res.send({code:1,msg:'user already exist.'})
    } else {
      new UserModel({username,type,password:md5(password)}).save(function (err,user) {
        const data = {username,type,_id:user._id}  //remove password for response data
        res.cookie('user_id',user._id,{maxAge: 1000*60*60*24})
        res.send({code:0,data})
      })
    }
  })
})

module.exports = router;
