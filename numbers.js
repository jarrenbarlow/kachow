
let guessNumber = Math.floor(Math.random() * 10 + 1);

function numberGuess() {

    var guess = document.getElementById("guess").value;

    let tries = 0; 
    let maxAttempts = 3; 

    let output = document.getElementById("output");

    if(guessNumber == guess) 
    {
        output.innerHTML = (`You guessed correctly, your number was ${guessNumber}`)
    }

    else if (guessNumber > guess) 
    {
        output.innerHTML = ("Not quite, number is too small")
    }

    else 
    {
        output.innerHTML = ("Not quite, number is too large")
    }

}