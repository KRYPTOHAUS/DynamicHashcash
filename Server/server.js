var express = require('express');
var sha256 = require('sha256')
var app = express();

var difficulty = 5;

//Express-Middleware (executed on every Request)
app.use(function (req, res, next) {
	var challenge = Math.random().toString(36).substring(7);
	res.header('challenge', challenge);
	res.header('difficulty', difficulty);
	if(req.header('solution'))
		if(sha256(challenge) == req.header('solution'))
			next();

	res.end("Not authorized!");
});

app.get('/', function(req, res){
	res.send('We are connected!');
});

app.listen(3000);