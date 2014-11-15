var User, mongoose, newUser, Invitation;
var crypto = require('crypto');
//var uuid = require('node-uuid');
//var redis = require('redis');

//var _ = require('lodash');
mongoose = require("mongoose");

User = mongoose.model("User",{
  _id: String,
  joined_at: {type:Date, default:Date.now}
});

var newUser = function(req, res, next){
  console.log('hi newUser~');
  var newUser = new User({
      _id: req.param('user_id')
  });

  User.findById(req.param('user_id'),function(err,user){
    if(user){
      console.log("This name is already choosen");
      res.json(400,err);
    }else{
      newUser.save(function(err){
        if(err){
            console.log(err);
            res.json(500,err);
        }else{
          res.json(200,{success:newUser._id});
        }
      });
    }
  });
};


var listUser = function(req, res, next){
  console.log("hi~ listUser");
  User.find({ },null,
    function(err, users){
      console.log(users);
    if(!err){
      return res.send(users);
    }
    else{
      return console.log(err);
    }
  });
};

exports.newUser = newUser;
exports.listUser = listUser;