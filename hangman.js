const prompt = require('prompt-sync')();
const countriesCapitals = require('./countries-and-capitals');
const capitals = countriesCapitals.map(e => e.city);
const countries = countriesCapitals.map(e => e.country);

let secretWord;
let playing = false;
let wrongGuesses;
let limit = 4;
let solution;

function displayBoard() {
    console.log(solution.join(" "));
}

function playAgainDialogue() {
    if (confirm("Play again?")) {
        console.log("");
        play();
    }
    console.log("Goodbye!");
}

function play() {
    playing = true;
    secretWord = countries[Math.floor(Math.random() * countries.length)];
    wrongGuesses = 0;
    const numLetters = secretWord.length;
    solution = new Array(numLetters).fill("_");
    console.log("Guess one letter at a time to reveal the secret word.");
    while (playing) {
        displayBoard();
        playerTurn();
    }
}

function playerTurn() {
    if (wrongGuesses >= limit) {
        console.log("You have used all your guesses. Game Over.");
        playing = false;
        playAgainDialogue();
        return;
    }
    if (solution.join("") === secretWord) {
        console.log("Yay, you guessed it!");
        playing = false;
        playAgainDialogue();
        return;
    }
    let remainingGuesses = limit - wrongGuesses;
    let playerGuess = prompt("Guess a letter. You have " + remainingGuesses + " remaining guesses" ).toLowerCase();
    if (secretWord.indexOf(playerGuess) === -1) {
        console.log("That letter in not in the secret word.");
        wrongGuesses += 1;
        return;
    }
    console.log("Well done.");
    solution.forEach(function(val, index) {
        if (secretWord.split("")[index] === playerGuess) {
            solution[index] = playerGuess;
        }
    } );
}

document.getElementById("play").addEventListener("click", play);