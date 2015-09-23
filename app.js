var path = require('path');

//Initialize Express & server
var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(4100);
console.log('server listening on 4100');

//Set up socket.io
var io = require('socket.io')(server);

var candidate; 
var sdp_description; 

io.on('connection', function(client){
	console.log("Client connected");

	client.on('join', function(data){
		console.log(data)
		client.emit('messages', 'hello from server!')
	})	

	client.on('sdp-description', function(data){
		client.broadcast.emit("sdp-channel", data);
	})
})

//Set the view engine as embedded javascript
app.set('view engine', 'ejs');

/*Routes*/
app.get('/', function(req, res){
	res.render('index')
});

app.get('/webrtcio', function(req, res){
	res.render('web')
})

app.get('/meeting', function(req, res){
	res.render('meeting');
})

app.get('/student', function(req, res){
	res.render('student');
})

app.get('/multiconn', function(req, res){
	res.render('multiconn');
})

app.get('/multistudent', function(req, res){
	res.render('multistudent');
})

//Load external js files
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/mklibs'));