var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// var methodOverride = require('method-override');
var PORT = process.env.PORT || 8080;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Serve static content for the app from the "public" directory in the application directory.
// this goes before any body-parser calls - static files dont need parsing.
// app.use(express.static(__dirname + "/public"));
// app./use("/public", express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded 
// found urlencoded extended must be true for nested arrays and for post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// parse an HTML body into a string 
app.use(bodyParser.text({ type: 'text/html' }));

// populate database initially - dont erase existing data
require("./controllers/apiController.js")(app);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    // send message to everyone
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});


http.listen(8080, function(){
console.log('listening on *:8080');
});


// app.listen(PORT);



