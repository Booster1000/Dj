song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
    song = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    Posenet = ml5.poseNet(camera, modelLoaded);
    Posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model loaded successfuly!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(camera, 0, 0, 600, 450);

    fill("orangred");
    strokeWeight(7);
    stroke('aqua');

    if (scoreRightWrist > 0) {
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "SPEED = " + "0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "SPEED = " + "1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "SPEED = " + "1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "SPEED = " + "2x";
            song.rate(2);
        } else if (rightWristY > 400) {
            document.getElementById("speed").innerHTML = "SPEED = " + "2.5x";
            song.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0) {
        circle(leftWristX, leftWristY, 20)
        i = Number(leftWristY);
        remove_decimals = Math.floor(i);
        volume = remove_decimals / 450;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "VOLUME" + volume;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function playsong() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stopsong() {
    song.stop();
}