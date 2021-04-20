const bayes = require("bayes"); 
const StopW = require("stopword"); 
const fw = require("fw"); 

const express = require("express"); 
var app = express(); 

var sever = app.listen(3003); 

app.use(express.static("public")); 

var socket = require("socket.io"); 