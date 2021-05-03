song1="";
song2="";
song1_status="";
song2_status="";
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
rightwristX=0;
rightwristY=0;
function preload(){
song1=loadSound("country.mp3");
song2=loadSound("silent.mp3")
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded)
poseNet.on("pose",gotPoses);
}
function gotPoses(results){
if(results.length >0){
console.log(results);
scoreleftwrist=results[0].pose.keypoints[9].score;
scorerightwrist=results[0].pose.keypoints[10].score;
console.log("score left wrist="+scoreleftwrist+" scorerightwrist="+scorerightwrist);
leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log("leftwristx= "+leftwristX+" ,leftwristy="+leftwristY);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwrist= "+rightwristX+" ,rightwristy="+rightwristY);
}
}
function modelloaded(){
    console.log("posenet is initialized");
}
function draw(){
image(video,0,0,600,500);
fill("#0000FF");
stroke("#0000FF");
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
if(scoreleftwrist > 0.2){
circle(leftwristX,leftwristY,20);
song2.stop();
if(song1_status==false){
    song1.play();
    document.getElementById("song").innerHTML="playing-country roads";
}
}
if(scorerightwrist>0.2){
    circle(rightwristX,rightwristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="playing-silent night";
    }    
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}