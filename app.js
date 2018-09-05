// Game variables
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Event listener for guess
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Event listener for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validation
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }

    // Check if correct number
    if(guess === winningNum) {
        // Game over, win
        gameOver(true, `${winningNum} is correct. Congratulations!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // Game over - lose
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
        } else {
            // Game continues - answer is wrong
            // Border to red
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Prompt user about wrong guess
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Random winning number function
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function for the flash message
function setMessage(flash, color) {
    message.style.color = color;
    message.textContent = flash;
}

// Game over function
function gameOver (won, flash) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Border to relevant color
    guessInput.style.borderColor = color;
    // Text to relevant color
    message.style.color = color;
    // Let the user know their result
    setMessage(flash)

    // Play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}
