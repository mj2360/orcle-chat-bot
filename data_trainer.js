const Twit = require('twit'); 
const config = require("./config.js"); 
var T = new Twit(config); 
var fs = require("fs"); 

var StopW = require('stopword'); 

var bayes = require('bayes'); 
var classifier = bayes(); 

//only allows words with letters or numbers
const alphanumeric = /^[0-9a-zA-Z,';]+$/; 
//using trending words on twitter to affiliate those tweets with certain categories
var trends = {
    "AI": "tech",
    "blockchain": "tech",
    "iPhone": "tech", 
    "Touch ID": "tech", 
    "cryptocurrency": "tech", 
    "finance": "career", 
    "WeWork": "career",
    "market": "career",
    "forecast": "weather", 
    "climate": "weather", 
    "#meteorology": "weather",
    "climate change": "weather",
    "#weather": "weather",
    "COVID-19": "death", 
    "cancer": "death", 
    "disease": "death", 
    "Herpes": "death",
    "Shingles": "death",
    "Praise God": "love", 
    "just married": "love", 
    "#relationshipgoals": "love", 
    "V-Day": "love", 
    "Valentine's Day": "love"
}

//keeps track of where we are in the loop 
var index = 0; 
for ( let [key, value] of Object.entries(trends)){
//get a bunch of tweets 
    T.get('search/tweets', {q: key, count: 100}, async function(error, data, response){
        try{
            for (var i=0; i<data.statuses.length; i++){
                var temp_tweet = data.statuses[i].text; 
                var clean_words = cleanup(temp_tweet);
                var final_words = clean_words.join(", ");
                await classifier.learn(final_words, value);
            }
            index++;
            if(index == 23){
                var stateJson = classifier.toJson();
                fs.writeFile("./classyFire.json", stateJson, function(error,data){
                    if (error){
                        console.log(error); 
                    } else {
                        console.log("successfully saved");
                    }
                })
            }
        } catch (error) {
            console.log(error); 
        }
    }); 
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
    return uniq; 

}