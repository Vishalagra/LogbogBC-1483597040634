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
		
	/*var obj = 	{
				type: 'get',
				//name: marbleName,
				//user: user,
				v: 1
			};*/
	
	/*var obj = 	{
			type: 'addToLogBog',
			cprNum:'1000',
			VirkNum:'1010',
			cprNavn:'Jyoti Gover',
			DOW:"20102016",
			NoOFHours:'10',
			v: 1
		};
	sendMsg(req,obj);*/
	//sendMsg(req,JSON.stringify({type: 'get', v:1}));
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
/*function sendMsg(req, json){
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
}*/
router.post('/logEntry', function(req, res) {
	
	console.log("trying to print log entry body"+req.body.cpr);
	console.log("trying new" + JSON.stringify(req.body.navn));
	
	console.log("log entry body "+ JSON.stringify(req.body));
	var obj = 	{
			type: 'addToLogBog',
			cprNum:'1002',
			VirkNum:'1011',
			cprNavn:'vishal',
			DOW:"20102006",
			NoOFHours:'10',
			v: 1
		};
	//sendMsg(req,obj);
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
	
	/*res.json([{"cpr": 9899553461, "navn": "Helene", "date": "20160101", "duration": "8"},
		{"cpr": 3567432178, "navn": "Helene", "date": "20160101", "duration": "8"},
		{"cpr": 3267894531, "navn": "Ola", "date": "20160101", "duration": "8"},
		{"cpr": 116743289, "navn": "Barito", "date": "20160101", "duration": "8"},
		{"cpr": 5643217843, "navn": "Mads", "date": "20160101", "duration": "8"},
		{"cpr": 3215674396, "navn": "Orion", "date": "20160101", "duration": "8"},
		{"cpr": 3761239075, "navn": "Palmes", "date": "20160101", "duration": "8"},
        {"cpr": 9056342901, "navn": "Yena", "date": "20160101", "duration": "8"},
        {"cpr": 8954321678, "navn": "Peter", "date": "20160101", "duration": "8"},
        {"cpr": 8764316789, "navn": "Santa", "date": "20160101", "duration": "8"}]);*/
});
module.exports = router;
