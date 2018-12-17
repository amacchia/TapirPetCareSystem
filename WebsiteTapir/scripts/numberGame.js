var secretNumber;
var remainingGuesses = 7;
var responseText;
const responseTooHigh = "Too High!";
const responseTooLow = "Too Low!";
const responseWin = "You Win!";
const responseLost = "You Lose!"

function startGame() {
    secretNumber = Math.floor((Math.random() * 100) + 1);
    console.log(secretNumber);
}

function checkGuess() {
    var guess = document.getElementById("guess").value;

    if (isNaN(guess) || guess > 100 || guess < 1) {
        alert("Please Enter a Valid Number");
        return;
    }

    guess = Number(guess);

    if (remainingGuesses === 0) {
        return;
    } else if (guess < secretNumber) {
        document.getElementById("response").innerHTML = responseTooLow;
    } else if (guess > secretNumber) {
        document.getElementById("response").innerHTML = responseTooHigh;
    } else {
        document.getElementById("response").innerHTML = responseWin;

        username = document.getElementById("username").textContent.substr(10);
        userFunds = Number(document.getElementById("currency").textContent.substr(10));
        var newFunds = userFunds + 10;
        var updatedCurrency = {
            currency: newFunds
        }
        updateUser(username, updatedCurrency);
    }

    remainingGuesses--;
    document.getElementById("guesses-left").innerHTML = "Guesses Left: " + remainingGuesses;

    if (remainingGuesses === 0) {
        document.getElementById("response").innerHTML = responseLost;
    }

}

function restartGame() {
    remainingGuesses = 7;
    document.getElementById("guesses-left").innerHTML = "Guesses Left: " + remainingGuesses;
    document.getElementById("response").innerHTML = "";
    document.getElementById("guess").value = "";
    startGame();
}