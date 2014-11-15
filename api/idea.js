var Idea, mongoose, newIdea;
var moment = require('moment');
//var _ = require('lodash');
mongoose = require("mongoose");

//var geetest = require('geetest')('6421f2c80c3a32f701f87ac7403b8b72');

var Idea = mongoose.model("Idea",{
  user_id:String,
 
  time:{ type: Date, default: Date.now }, 
  
  description: String,

  ideaboardName: String,

  title: String,
  email: String,
  //tags: [String],
  ip: String,
  //ip_2: String,
  comments: [
  {
    user_id: {type: String, ref: 'User'},
    content: String,
    date: { type: Date, default: Date.now }
  }]



});


var newIdea = function(req, res, next){
  //getClientIp(req);
	console.log("hi newIdea~");
  //console.log((req.headers['x-forwarded-for'] || '').split(',')[0]);
  //console.log(req.connection.remoteAddress);
  //console.log(req.headers);
	
  var newIdea = new Idea({
    user_id: req.param('user_id'),
    email: req.param("email"),
    title: req.param('title'),
		description: req.param('description'),
    ideaboardName: req.param('ideaboardName'),
		tags: req.param('tags'),
    ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || req._remoteAddress 
    //ip_2: req.headers['x-real-ip']
	});
  //console.log(req);
  //console.log(newIdea.ip);
  Idea.find({ip: newIdea.ip})
  .sort('-time')
  .exec(function(err, ideas){
    if(err){
      res.json(500,err);
    }else if(ideas && ideas.length!=0){
      var timeLastIdea = moment(ideas[0].time);
      var timeNow = moment();
      var timeDiff = timeNow.diff(timeLastIdea,'minutes');   
      console.log(timeDiff);
      if(timeDiff > 1){
        newIdea.save(function(err){
          if (err){
            console.log(err);
            res.json(500,err);
          }else{
            res.json(200,{success:newIdea.description});
          }
        });
      }else{
        console.log("You publish idea too quickly");
        res.json(401,{fail:"You publish idea too quickly"});
      }  //console.log(ideas);
    }else{
      newIdea.save(function(err){
          if (err){
            console.log(err);
            res.json(500,err);
          }else{
            res.json(200,{success:newIdea.description});
          }
      });
    }
  });

  //console.log(req._startTime);
  //Idea.find


};

var listIdea = function(req, res, next){
    Idea.find({ ideaboardName: req.param('ideaboardName') })
      .sort('-time')
      .exec(function(err, ideas){
        //console.log(ideas);
        if(!err){
            return res.send(ideas);
        }
        else{
            return console.log(err);
        }
    });
};

var listHackathonIdea = function (req, res, next){
      Idea.find({ })
      .sort('-time')
      .exec(function(err, ideas){
        //console.log(ideas);
        if(!err){
            return res.send(ideas);
        }
        else{
            return console.log(err);
        }
    });

}

var getClientAddress = function (req) {
    console.log((req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress);
    return (req.headers['x-forwarded-for'] || '').split(',')[0]; 
        //|| req.connection.remoteAddress;
};

exports.getIp = getClientAddress;
exports.newIdea = newIdea;
exports.listIdea = listIdea;
exports.listHackathonIdea = listHackathonIdea;