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

/* 1. DARK MODE TOGGLE
   Reads saved preference from localStorage so it
   persists between sessions.                       */
(function initDarkMode() {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) return;
 
  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    toggle.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }
 
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark");
 
  toggle.addEventListener("click", function () {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(!isDark);
  });
})();
 
 
/* 2. STREAK TRACKING
   Counts consecutive wins. Resets on give-up.
   We hook into the existing updateScore / giveUp
   logic via wrapper functions below.               */
var currentStreak = 0;
 
function updateStreak(won) {
  if (won) {
    currentStreak++;
  } else {
    currentStreak = 0;
  }
  var el = document.getElementById("streakDisplay");
  if (el) el.textContent = currentStreak;
}
 
 
/* 3. SCORE QUALITY BANNER
   Shows a fun animated label after each win.       */
function showQualityBanner(score, range) {
  var banner = document.getElementById("qualityBanner");
  if (!banner) return;
 
  var ratio = score / range;
  var label, color;
 
  if (score === 1) {
    label = "🏆 First try! Unbelievable!";
    color = "#f59e0b";
  } else if (ratio <= 0.1) {
    label = "🔥 Amazing!";
    color = "#10b981";
  } else if (ratio <= 0.3) {
    label = "👍 Great guess!";
    color = "#6c63ff";
  } else if (ratio <= 0.6) {
    label = "😐 Not bad.";
    color = "#6b7280";
  } else {
    label = "💀 Yikes...";
    color = "#ef4444";
  }
 
  banner.textContent = label;
  banner.style.display = "block";
  banner.style.color = color;
  banner.style.borderColor = color;
  banner.style.background = color + "18";
 
  setTimeout(function () {
    banner.style.display = "none";
  }, 2800);
}
 
 
/* 4. GUESS COUNTER DISPLAY + PROGRESS BAR
   Updates the visible guess counter and a colour-
   coded progress bar on every guess.               */
function updateGuessCounter(count, range) {
  var el = document.getElementById("guessCount");
  if (el) el.textContent = count;
 
  var bar = document.getElementById("progressBar");
  if (!bar) return;
 
  var maxGuesses = Math.ceil(Math.log2(range)) + 3;
  var pct = Math.min((count / maxGuesses) * 100, 100);
  bar.style.width = pct + "%";
 
  if (pct < 40) {
    bar.style.background = "#10b981";
  } else if (pct < 75) {
    bar.style.background = "#f59e0b";
  } else {
    bar.style.background = "#ef4444";
  }
}
 
 
/* 5. SHAKE ANIMATION on wrong guess
   Briefly shakes the message box for tactile feel. */
function shakeMsg() {
  var el = document.getElementById("msg");
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}
 
 
/* 6. MSG COLOUR CLASSES
   Adds semantic colour to the message box.         */
function setMsgStyle(type) {
  var el = document.getElementById("msg");
  if (!el) return;
  el.className = "";
  if (type === "success") el.classList.add("msg-success");
  else if (type === "danger") el.classList.add("msg-danger");
  else if (type === "warning") el.classList.add("msg-warning");
}
 
 
/* 7. KEYBOARD SUPPORT
   Pressing Enter in the guess input fires the
   Guess button (if it's enabled).                  */
document.getElementById("guess").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    var btn = document.getElementById("guessBtn");
    if (btn && !btn.disabled) btn.click();
  }
});
 
 
/* 8. INPUT VALIDATION — out-of-range warning
   Warns the player if they type a number outside
   the current range instead of just ignoring it.   */
(function patchMakeGuess() {
  var origGuessBtn = document.getElementById("guessBtn");
  if (!origGuessBtn) return;
 
  origGuessBtn.addEventListener("click", function abBeyondValidation(e) {
    var val = parseInt(document.getElementById("guess").value);
    if (!isNaN(val) && range > 0) {
      if (val < 1 || val > range) {
        var msg = document.getElementById("msg");
        msg.textContent = "Hey " + playerName + ", pick a number between 1 and " + range + "!";
        setMsgStyle("warning");
        shakeMsg();
        e.stopImmediatePropagation();
      }
    }
  }, true);
})();
 
 
/* ── HOOK INTO EXISTING FUNCTIONS ──
   Wrap the original play / makeGuess / giveUp so
   our extra features stay in sync without
   rewriting any autograded code.                   */
 
var _origPlay = play;
play = function () {
  _origPlay();
  updateGuessCounter(0, range);
  setMsgStyle("");
  var banner = document.getElementById("qualityBanner");
  if (banner) banner.style.display = "none";
};
 
var _origMakeGuess = makeGuess;
makeGuess = function () {
  _origMakeGuess();
  var msgText = document.getElementById("msg").textContent.toLowerCase();
  if (msgText.includes("correct")) {
    setMsgStyle("success");
    showQualityBanner(guessCount, range);
    updateStreak(true);
  } else if (msgText.includes("high") || msgText.includes("low")) {
    shakeMsg();
    var isHot  = msgText.includes("hot");
    var isWarm = msgText.includes("warm");
    setMsgStyle(isHot ? "danger" : isWarm ? "warning" : "");
    updateGuessCounter(guessCount, range);
  }
};
 
var _origGiveUp = giveUp;
giveUp = function () {
  _origGiveUp();
  setMsgStyle("danger");
  updateStreak(false);
};