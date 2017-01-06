var express = require('express');
var router = express.Router();
var path = require('path');
var userlogin;
var pwd ;
var Senr;
/* GET home page. */
var tagline;
var app = require('../app');

router.get('/', function(req, res, next) {
	
  res.render(path.join(__dirname, '../', 'views', 'index.ejs'));
});
router.post('/login', function(req, res) {
	console.log("inside post");
	//{"username":"sfd","password":"dsa"}
	userlogin=req.body.username;
	pwd = req.body.password;
	console.log("user "+userlogin+" "+"password "+pwd);
	
	tagline = "Please enter some data for your Company employee.";
    switch(userlogin){
	case 'skat':
		Senr=20170234;
		break;
	case 'virksomhed':
		Senr='20071246';
		break;
	case 'kontrol':
		Senr='10006547';
		break;
		
}
	
	
	if(userlogin==='skat'|| userlogin==='virksomhed'){
		console.log(' skat virksomhed user ');
		
	res.render(path.join(__dirname, '../', 'views', 'logEntry.ejs'), {
        user: userlogin,
        tagline: tagline,
        senr: Senr
    });
	}else if(userlogin==='kontrol'){
		res.render(path.join(__dirname, '../', 'views', 'logQuery.ejs'), {
	        user: userlogin,
	        tagline: tagline,
	        senr: Senr
	    });
	}else 
		res.render(path.join(__dirname, '../', 'views', 'error.ejs'));
	
});

//send a message, socket might be closed...
function sendMsg(req, json){
	console.log('inside AngulargJS sendMsg');
	console.log('printing ws');
	console.log('app.get(ws)' + req.app.get('ws'));
	if(req.app.get('ws')){
		try{
			req.app.get('ws').send(JSON.stringify(json));
		}
		catch(e){
			console.log('[ws error] could not send msg', e);
		}
	}
}


router.post('/logEntry', function(req, res) {
	
	console.log("trying new" + JSON.stringify(req.body.navn));
	console.log("trying non JSON" + req.body.navn);
	console.log("log entry body "+ JSON.stringify(req.body));
	//{"cpr":["as","sr"],"navn":["sdf","weer"],"date":["qweff","wer"],"duration":["wer","wer"]}
	var index, len;
	var cpr = JSON.stringify(req.body.cpr);
	var navn=JSON.stringify(req.body.navn);
	var DOW = JSON.stringify(req.body.date);
	var NoOFHours=JSON.stringify(req.body.duration);
	
	for (index = 0, len = cpr.length; index < len; ++index) {
	    console.log(cpr[index],navn[index],NoOFHours[index],DOW[index]);
	   var  Str= "{type: 'addToLogBog'," +
			"cprNum:'"+cpr[index]+"',"+
			"VirkNum:'"+Senr+"',"+
			"cprNavn:'"+navn[index]+"',"+
			"DOW:'"+DOW[index]+"',"+
			"NoOFHours:'"+NoOFHours[index]+"',"+
			"v: 1}";
			
			
			console.log("My variable   "+Str);
			sendMsg(req,Str);
	}
	
	res.render(path.join(__dirname, '../', 'views', 'logQuery.ejs'), {
        user: userlogin,
        tagline: tagline,
        senr: Senr
    });
});

router.get('/error', function(req, res, next) {
	console.log("username and password"+req.body);
  res.render(path.join(__dirname, '../', 'views', 'error.ejs'));
});

router.get('/title',function(req,res){
	res.json([{ title: 'LogEntry Page' }]);
});

router.get('/data', function(req,res){
	res.json([{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""},
		{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""},
		{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""}]); 
	
});
module.exports = router;
