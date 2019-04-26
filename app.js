/*
  GAME FUNCTION:
  - Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if he runs out of guesses
  - Let player choose to play again
*/

// Game variables
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max);
guessesLeft = 3;

// UI Elements
const gameUI = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign values to min and max (UI)
minNum.textContent = min;
maxNum.textContent = max;

// Listen for a guess
guessBtn.addEventListener('click', validateGuess);

// Play Again Event Listener

// Not using 'click' event because click would automatically reload the page
// before we get the chance to show the player the message, after loss or victory.
// The mousedown event listens for only the mouse actually been clicked again for the action to happen
gameUI.addEventListener('mousedown', e => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

function validateGuess(e) {
  // Collect the user's guess
  let guess = parseInt(guessInput.value);

  // Validate the Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if user entered the right number - victory!
  guess === winningNum ? victorySequence() : failureSequence();
  e.preventDefault();
}

// Set Message

// The function will expect two arguments - a color and the message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// The operations for victory for user
function victorySequence() {
  statusSequence(true, `${winningNum} is correct, YOU WIN!`, 'green');
}

// The operations for fai;ure for user
function failureSequence() {
  // Wrong Guess Sequence

  // Deduct 1 from 'Guesses'
  guessesLeft -= 1;

  guessesLeft === 0 ? gameOverSequence() : gameContinuesSequence();
}

// The operations when the game is over
function gameOverSequence() {
  statusSequence(false, `GAME OVER!!: ${guessInput.value} is incorrect, the correct number was ${winningNum}`);
}

// The operations when game continues
function gameContinuesSequence() {
  // Change the border color
  guessInput.style.borderColor = 'red';

  // Inform user of remaining tries
  setMessage(`${guessInput.value} is not correct, ${guessesLeft} guess(es) left`, 'red');

  // Clear input
  guessInput.value = '';
}

function statusSequence(victory, msg) {
  let color;
  victory === true ? (color = 'green') : (color = 'red');

  // Disable Input
  guessInput.disabled = true;

  // Change Color of Input box
  guessInput.style.borderColor = color;

  // Change text color
  message.style.color = color;

  // Send message to function
  setMessage(msg);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
