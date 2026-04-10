let answer = 0;
let guessCount = 0;
let range = 0;
let startTime = 0;
const scores = [];
const roundTimes = [];

function liveTime() {
    let date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    if ((day % 10 == 1) && (day != 11)) {
        day += "st";
    }
    else if (day % 10 == 2 && day != 12) {
        day += "nd";
    }
    else if (day % 10 == 3 && day != 13) {
        day += "rd";
    }
    else {
        day += "th";
    }
    let year = date.getFullYear();
    let currentTime = date.toLocaleTimeString();
    document.getElementById("date").textContent = month + " " + day + ", " + year + ". Current time: " + currentTime;
}
liveTime();
setInterval(liveTime, 1000);

let playerName = prompt("Enter your name: ").toLowerCase();
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play() {
    startTime = new Date().getTime();
    let levels = document.getElementsByName("level");
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].checked) {
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Hello, " + playerName + "! To play, guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess() {
    let guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        msg.textContent = "Stupid " + playerName + ", enter a valid number";
        return;
    }
    guessCount++;
    if (guess == answer) {
        msg.textContent = "Correct! It took " + playerName + " " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if (guess < answer) {
        if (Math.abs(guess - answer) <= 2) {
            msg.textContent = playerName + ", you're hot! Too low, try again.";
        }
        else if (Math.abs(guess - answer) <= 5) {
            msg.textContent = playerName + ", you're warm. Too low, try again.";
        }
        else {
            msg.textContent = playerName + ", you're cold. Too low, try again.";
        }
    }
    else {
        if (Math.abs(guess - answer) <= 2) {
            msg.textContent = playerName + ", you're hot! Too high, try again.";
        }
        else if (Math.abs(guess - answer) <= 5) {
            msg.textContent = playerName + ", you're warm. Too high, try again.";
        }
        else {
            msg.textContent = playerName + ", you're cold. Too high, try again.";
        }
    }
}

function giveUp() {
    updateScore(range);
    resetGame();

}

function updateScore(score) {
    scores.push(score);
    wins.textContent = "Total Wins: " + scores.length;
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a, b) {return a - b;});

    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < lb.length; i++) {
        if (i < scores.length) {
            lb[i].textContent = scores[i];
        }
    }

    let endTime = new Date().getTime();
    let gameTime = (endTime - startTime)/1000;

    roundTimes.push(gameTime);
    let fastestTime = Math.min(...roundTimes);
    document.getElementById("fastest").textContent = "Fastest Game: " +fastestTime.toFixed(2);

    let avgTime = (roundTimes.reduce((sum, time) => sum + time, 0))/roundTimes.length;
    document.getElementById('avgTime').textContent = "Average Time: " + avgTime.toFixed(2);
}

function resetGame() {
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;

}