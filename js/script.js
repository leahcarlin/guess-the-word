const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//add dots for placeholders of letter
const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

//click the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //      empty text of message element
    message.innerText = "";
    //      grab what was entered in input
    const guess = textInput.value;
    const goodGuess = checkInput(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    }
    textInput.value = "";
});

const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ) {
        message.innerText = "Please enter a letter";
    }
    else if (input.length > 1) {
        message.innerText = "Please enter one letter only";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z";
    }
    else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
    }
  };