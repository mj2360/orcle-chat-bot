
var input; 
var chatButon; 
var orcleRspns;
var chatBox;
var chatMsg = ""; 
var showOrclRspns ="";

var love_rspons = ["Yes, and live forever happily.",
"No, but you're not alone.", "Maybe that's bullshit."]

var death_rspons = ["Yes. Do not fear death.", "No, you only live once (I think).",
"Maybe."];

var weather_rspons = ["Yes, it is near.", "No, don't ask again.",
"How should I know."];

var career_rspons = ["Yes, it is your destiny.", "Um, fuck no.",
"Maybe, but don't bet on it."];

var tech_rspons = ["Yes, they will rule.", "No, but watch your back.",
"Maybe... maybe not. And always maybe."];


function setup(){
createCanvas(windowWidth, windowHeight); 

input = createInput('Ask me Anything...'); 
input.position(windowWidth/2 - 275, windowHeight/2 + 170); 
input.size(550); 
input.style('border-radius', 10); 
input.style('font-size', '32px'); 
input.style('padding', "10px"); 
input.style('background-color', '#C9BBC8'); 
input.style('color', '#7B7B8B');
chatButon = createButton("Submit"); 
chatButon.position(windowWidth/2 - 60, 1050);
chatButon.size(120);
chatButon.style('font-size', "26px"); 
chatButon.style('background-color', "#AAC9CE");
chatButon.style('color', "#A1A1A1");
chatButon.mousePressed(submitChat); 

orcleRspns = createP(); 

socket = io.connect('http://localhost:3003');
socket.on('predict', makePrediction);
}

function submitChat(){
    chatMsg = input.value(); 

    socket.emit('predict', chatMsg);
}

function makePrediction(data){
    if(data == 'love'){
       orcleRspns.html(love_rspons[Math.floor(Math.random() * love_rspons.length)]);
      } else if(data == 'death'){
            orcleRspns.html(death_rspons[Math.floor(Math.random() * death_rspons.length)]);
      } else if(data == 'career'){
            orcleRspns.html(career_rspons[Math.floor(Math.random() * career_rspons.length)]);
      } else if(data == 'weather'){
            orcleRspns.html(weather_rspons[Math.floor(Math.random() * weather_rspons.length)]);
      } else if(data == 'tech'){
            orcleRspns.html(tech_rspons[Math.floor(Math.random() * tech_rspons.length)]);
      }

      console.log(data);
      console.log(orcleRspns.html());
}

function draw(){
    strokeWeight();
    stroke("#B6B4C2"); 
    fill("#C9BBC8");
    rect(windowWidth/2 - 315, 450, 630, 350);

    textSize(36);
    fill('#EDEDED');
    stroke('#EDEDED');
    text(chatMsg, windowWidth/2 - 297, 560);

    textSize(36);
    fill('#7B7B8B');
    stroke('#7B7B8B');
    text(orcleRspns.html(), windowWidth/2 - 297, 630);
   
}
 