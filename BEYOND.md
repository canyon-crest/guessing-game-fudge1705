dark mode

toggle button in the top bar switches between light and dark
saves your preference to localStorage so it remembers when you refresh
found in initDarkMode() in extras.js

win streak

tracks how many wins in a row you get
resets to 0 if you give up
updateStreak() in extras.js, shows up as the 🔥 row

score quality banner

pops up after a win with a little rating based on how fast you guessed
goes from "first try! unbelievable!" all the way down to "yikes..."
showQualityBanner() in extras.js

guess counter + progress bar

shows how many guesses you've used this round below the input
progress bar fills up and turns red the more guesses you use
updateGuessCounter() in extras.js

shake animation

the message box shakes when you get a wrong guess
just a small css animation, wired up in shakeMsg() in extras.js

keyboard support

pressing enter in the guess box clicks the guess button
so you never have to touch the mouse
keydown listener near the bottom of extras.js

input validation

warns you if you type a number outside the range (like typing 50 on easy 1-3)
doesn't count it as a guess, just tells you to try again
patchMakeGuess() in extras.js

message color coding

the message box changes color depending on what happened
green = correct, red = gave up or hot hint, yellow = warm hint
setMsgStyle() in extras.js

css styling

full redesign with pastel colors, bubbly rounded corners, pill-shaped buttons
floating pastel bubbles animate in the background
uses the nunito font to make everything feel rounder and cuter
all in style.css