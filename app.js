var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors = require('cors');
var mongoose = require('mongoose');

var routes = require('./routes/index');
//var users = require('./routes/users');

var Idea = require("./api/idea");
var Ideaboard = require("./api/ideaboard");
var User = require("./api/user");

mongoose.connect("mongodb://localhost/IdeaHub");

var app = module.exports = express();

app.use(express.static(path.join(__dirname, 'static')));


app.use(bodyParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
//app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);


//User 操作
app.post('/user', User.newUser);
app.get('/user', User.listUser);

//Idea 操作
app.post('/idea',Idea.newIdea);
app.get('/getIp',Idea.getIp);
app.get('/idea',Idea.listIdea);

//Ideaboard 操作
app.post('/ideaboard',Ideaboard.newIdeaboard);
app.get('/ideaboard',Ideaboard.listIdeaboard);
app.get('/api/:ideaboard',Idea.listHackathonIdea);
app.get('/api/',Idea.listIdea);
app.get('/users', function(req, res, next) {
    //return next(error(401, 'user list is empty'));
    return res.send("test_user");
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
error = function(status, msg) {
    var err;
    err = new Error(msg);
    err.status = status;
    return err;
};
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

if (!module.parent) {
  app.listen(3009);
  console.log("Express started at 3009");
}

module.exports = app;
