//*********__MODULE DEPENDENCIES__**************
var express         = require('express'),
    filesystem      = require('fs'),
    path 			= require('path'),
    http            = require('http'),
    socket          = require('socket.io')

//-//__Express Stuff
var app = express();
require('./config/express')(app)

//-//__Socket.io Config
var server  = http.createServer(app)
var io      = socket.listen(server)

//-//__Start the server
server.listen(3000)

//-//__Router Config
require('./config/routes')(app, io);

console.log('listening on port 3000')

//EXPOSE APPLICATION
exports = module.exports = app