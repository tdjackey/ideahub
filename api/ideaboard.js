var Ideaboard, mongoose, newIdeaboard;
var moment = require('moment');

mongoose = require("mongoose");


var Ideaboard = mongoose.model("Ideaboard",{
  
  time:{ type: Date, default: Date.now }, 

  ideaboardName: String,
  description: String,

  ip: String,
 

});


var newIdeaboard = function(req, res, next){
  //getClientIp(req);
  console.log("hi newIdeaboard~");
  //console.log((req.headers['x-forwarded-for'] || '').split(',')[0]);
  //console.log(req.connection.remoteAddress);
  //console.log(req.headers);
  
  var newIdeaboard = new Ideaboard({
    ideaboardName: req.param('ideaboardName'),
    description: req.param('description'),
        ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || req._remoteAddress 
    //ip_2: req.headers['x-real-ip']
  });
  //console.log(req);
  //console.log(newIdea.ip);
  Ideaboard.find({ip: newIdea.ip})
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
      newIdeaboard.save(function(err){
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

var listIdeaboard = function(req, res, next){
    Ideaboard.find({ })
      .sort('-time')
      .exec(function(err, ideaboards){
        //console.log(ideas);
        if(!err){
            return res.send(ideaboards);
        }
        else{
            return console.log(err);
        }
    });
};

var getClientAddress = function (req) {
    console.log((req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress);
    return (req.headers['x-forwarded-for'] || '').split(',')[0]; 
        //|| req.connection.remoteAddress;
};

exports.getIp = getClientAddress;
exports.newIdeaboard = newIdeaboard;
exports.listIdeaboard = listIdeaboard;
