const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const getFile = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await getFile.text(0);
    //console.log(text);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();
 
//add dots for placeholders of letter
const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//click the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //      empty text of message element
    message.innerText = "";
    //      grab what was entered in input
    const guess = letterInput.value;
    const goodGuess = checkInput(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";   
});

const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter only";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z";
    } else {
        return input;
    }
};

//    show and update guessed letters
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter. Try again.";
    } else {
      guessedLetters.push(guess);
      updateGuessesRemaining(guess);
      showGuessedLetters();
      updateWord(guessedLetters);
      //console.log(guessedLetters);
    }
  };

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = letter;
        guessedLettersElement.append(li);    
    }
};

//    Update the Word in Progress
const updateWord =  function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkWon();
};

// count remaining guesses 
const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not include "${guess}".`;
       remainingGuesses -= 1;
    } else {
        message.innerText = `Correct! There is a "${guess}" in the word!`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Sorry, you have run out of guesses. The mystery word was "${word}." GAME OVER.`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanRemainingGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    }
};


// check if the player won
const checkWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
}

// restart game
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    message.innerText = "";
    guessedLettersElement.innerHTML = ""; 
    
    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});