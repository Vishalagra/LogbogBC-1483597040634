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
		Senr="20170234";
		break;
	case 'virksomhed':
		Senr="20071246";
		break;
	case 'kontrol':
		Senr="10006547";
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
	}else {
		res.render(path.join(__dirname, '../', 'views', 'error.ejs'));
	}
	
});



//send a message, socket might be closed...
function sendMsg(req, json){
	console.log('inside chaincode sendMsg');
	console.log('printing ws');
	//console.log('app.get(ws)' + req.app.get('ws'));
	if(req.app.get('ws')){
		try{
			console.log("trying to send finally");
			req.app.get('ws').send(JSON.stringify(json));
		}
		catch(e){
			console.log('[ws error] could not send msg', e);
		}
	}
}


router.post('/logEntry', function(req, res) {
	
	console.log("trying json parse on body" + req.body.cpr[0]);
	//console.log("trying non JSON" + req.body.navn);
	console.log("log entry body "+ JSON.stringify(req.body));
	
	//{"cpr":["3213","1213"],"navn":["re","123"],"date":["wet`1r","123"],"duration":["qwr","123"]}
			var index=0;
			var len =0;
	for (index = 0, len = req.body.cpr.length; index < len; ++index) {
	    console.log(req.body.cpr[index],req.body.navn[index],req.body.duration[index],req.body.date[index]);
	    var  Str= { "type" : "addToLogBog",
				"cprNum" : req.body.cpr[index],
				"VirkNum" : Senr,
				"cprNavn" : req.body.navn[index],
				"DOW"	: req.body.date[index],
				"NoOFHours":req.body.duration[index],
				"v": 1 };
			
			
			console.log("My variable   "+Str);
			sendMsg(req,Str);
	}
	
	res.render(path.join(__dirname, '../', 'views', 'logQuery.ejs'), {
        user: userlogin,
        query: "you can query the data  for senr here",
        senr: Senr
    });
});

router.post('/logQuery', function(req, res, next) {
	console.log("log query body"+req.body.searchSenr);
	 var obj = 	{
					type: 'searchLogBog',
					cprNum:'',
					VirkNum:'20071246',
					v:1
				}; 
	  console.log("My variable   "+obj);
		sendMsg(req,obj);
		
		console.log("searchresult "+ req.app.get('searchRes'));
		//console.log("searchresult "+ app.get('searchRes'));
  res.render(path.join(__dirname, '../', 'views', 'logQueryResult.ejs'),{
	  user: userlogin,
	  senr: Senr,
	  SearchSenr: req.body.searchSenr,
	  Result : req.app.get('searchRes')
  });
});

router.get('/error', function(req, res, next) {
	console.log("username and password"+req.body);
  res.render(path.join(__dirname, '../', 'views', 'error.ejs'));
});



router.get('/data', function(req,res){
	res.json([{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""},
		{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""},
		{"CPRNum":1002,"VirkNum":1011,"CPRNavn":"vishal","DOW":"20102006","NoOfHours":10,"Comments":""}]); 
	
});
module.exports = router;
