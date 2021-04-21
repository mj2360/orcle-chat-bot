const bayes = require("bayes"); 
const StopW = require("stopword"); 
const fs = require("fs"); 

const express = require("express"); 
var app = express(); 

var server = app.listen(3003); 

app.use(express.static("public")); 


var classyFire; 
fs.readFile('./classyFire.json', downloadedFile); 

const alphanumeric = /^[0-9a-zA-Z,';]+$/; 

function downloadedFile(error, data){
    if(error){
        console.log(error); 
    } else {
        classyFire = bayes.fromJson(data); 

        io.sockets.on('connection', newConnection); 
    }
}


var socket = require("socket.io"); 
var io = socket(server); 


function newConnection(socket){
    console.log("new connection made!" + socket.id); 


    socket.on('predict', predictMsg); 

    async function predictMsg(data){
        ml_data = cleanup(data); 

       var category = await classyFire.categorize(ml_data); 
       socket.emit('predict', category);
    }
}

function cleanup(tweet){
    //splits the tweet on a space
    //turning each word into an array item
    var temp_split_tweet = tweet.split(" ");
    //stores the useful words
    var temp_new_words = []; 
    temp_split_tweet = StopW.removeStopwords(temp_split_tweet); 
    for (var i=0; i<temp_split_tweet.length; i++){
        //test if words only contains letters or numbers
        if(alphanumeric.test(temp_split_tweet[i]) && temp_split_tweet[i].length > 2){
            temp_new_words.push(temp_split_tweet[i].toLowerCase());
        }
    }
    //get rid of duplicates
    //... is a spreader operator
    var uniq = [...new Set(temp_new_words)];
    var final_words = uniq.join(", ");
    return final_words;

}