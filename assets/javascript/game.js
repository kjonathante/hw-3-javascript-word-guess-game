const life=11; /* number of guess each round */
const wildcard = "#"; /* wildcard char use */
const videoPath = "assets/videos/";

let win=0;
let wordToGuess; /* a string, the secret word */
let blankWord; /* an array of wildcard char for the secret word and the correct guessed letters*/
let usedLetters; /* an array of wrong guessed letters*/
let remainingLife; /* number of guess remaining */

/* DOM Elements */
const correctSoundDom = document.getElementById('correct');
const wrongSoundDom = document.getElementById('wrong');
let secretWordDom = document.getElementById("secret-word");
let wrongLettersDom = document.getElementById("wrongletters");
let scoreDom = document.getElementById("score");
let lifeDom = document.getElementById("life");
let modalMsgDom = document.getElementById("modal-text");
let modalBtnDom = document.getElementById("modal-button");
let mainModalDom = document.getElementById("main-modal");

const linesSVG = document.querySelectorAll("g g");

secretWordDom.innerHTML = createPanel("hangman".split(""));
scoreDom.innerText = win;
lifeDom.innerText = life;
showMainModal( "Welcome to Hangman", "Start");

modalBtnDom.onclick = (() => {
  mainModalDom.style.display = "none";
  initGame();
  updateDocument();
  document.onkeyup = hangman;
});

function hangman(event) {
  const key = event.key.toLowerCase();

  if (key.length !== 1) {
      return;
  }

  const isLetter = (key >= "a" && key <= "z");
  const isNumber = (key >= "0" && key <= "9");
  if (isLetter || isNumber) {

    if ( isMatch(wordToGuess, key) ) {
      if ( saveCorrectGuess(wordToGuess, key, blankWord) > 0 ) {
        correctSoundDom.currentTime = .5;
        correctSoundDom.play();
      }
    } else {
      if (saveWrongGuess(key,usedLetters)) {
        wrongSoundDom.currentTime = .5;
        wrongSoundDom.play();
      }
      remainingLife = life - usedLetters.length;
      linesSVG[usedLetters.length-1].setAttribute("display", "block");
    }

    if (isGuessRight(blankWord, wildcard)) {
      win++;
      document.onkeyup = null;
      showVideo();
      showMainModal("You got it.", "Continue");
    }

    updateDocument();
    
    if (remainingLife == 0) { // end of game
      document.onkeyup = null;
      showMainModal("Sorry. Try again.", "Continue");
    }
  }

  console.log(key);
}


/*
purpose: initialize global variables use in the the game
*/
function initGame() {
  wordToGuess = "dolphin";
  blankWord = createPlaceholder(wordToGuess, wildcard);
  usedLetters = [];
  remainingLife = life;
  const lines = linesSVG.length;
  for(let i=0; i<lines; i++) {
    linesSVG[i].setAttribute("display", "none");
  }
}

/*
purpose: create an array of wildcard character representing each letter of the word
params
  word - word to guess
  wildChar - character to use as the wildcard character
returns: an array of wildcard character with the same length as the word to guess
*/
function createPlaceholder( word, wildChar ) {
  const blankWord = [];
  const length = word.length;
  for (let i=0; i < length; i++) {
    blankWord.push(wildChar);
  }
  return blankWord;
}

/*
purpose: check if there is a match between the word and user input
returns: a boolean, true if there was a match
*/
function isMatch( word, userInput ) {
  return ( word.indexOf(userInput) > -1 );
}

/*
purpose: store the letter that was correctly guessed
params
  word - word to guess
  userInput - letter that the user guessed
  coorectGuess - an array holding the wildcard and letters already guessed (pass by reference)
returns: a number indicating the number of times the letter was push into the correctGuess array
*/
function saveCorrectGuess( word, userInput, correctGuess ) {
  let save = 0;
  if ( correctGuess.indexOf( userInput ) == -1) { // make sure it is not guessed yet
    const length=word.length;
    for (let i=0; i < length; i++) {
      if (word[i] === userInput) {
        correctGuess[i] = userInput;
        save++;
      }
    }
  }
  return save;
}

/*
purpose: store the letter that was wrongly guessed
params
  userInput - letter that the user guessed
  wrongGuess - an array of letters that was wrongly guessed (pass by reference)
returns: a boolean indicating if the letter was added to the array
*/
function saveWrongGuess( userInput, wrongGuess ) {
  let save = false;
  if (wrongGuess.indexOf(userInput) == -1 ) { // make sure it is unique
    wrongGuess.push(userInput); 
    save = true;
  }
  return save;
}

/*
purpose: check if all letters of the word was correctly guessed
params
  correctGuess - an array holding the wildchar and letters already guessed
  wildChar - a char that represents that letters that the user haven't guess
returns: a boolean, true if the word was guessed correctly
*/
function isGuessRight (correctGuess, wildChar) {
  return (correctGuess.indexOf(wildChar) == -1);
}

function createPanel( placeHolder ) {
  let str = "";
  const length = placeHolder.length;
  for (let i=0; i < length; i++) {
    str += `<span class="panel">${placeHolder[i]}</span>`;
  }
  return str;
}


function updateDocument() {
  secretWordDom.innerHTML=createPanel(blankWord);
  scoreDom.innerText=win;
  lifeDom.innerText=remainingLife;
  wrongLettersDom.innerHTML=createPanel(usedLetters);  
}


function showMainModal(msgText, btnText) {
  modalMsgDom.innerText = msgText;
  modalBtnDom.innerText = btnText;
  mainModalDom.style.display = "block";
}

function showVideo()
{
  document.getElementById("hangmansvg").style.display="none";
  document.getElementById("divVideo").style.display="block";
  const video = document.getElementById('video');
  const mp4 = document.getElementById('mp4');

  video.height = "310";
  mp4.src = videoPath + wordToGuess +".webm";

  video.load();
  // video.play();
}
// var guesses = "taoimeruw";
// for (y=0; y < guesses.length; y++) {
//   var inputLetter = guesses[y];
//   var gotIt=false;

//   if ( ! checkMatch("tomorrow", inputLetter, blankWord) ) {
//     logWrongGuess( usedLetters, inputLetter);
//   }

//   gotIt = isGuessRight(blankWord, "#");

//   console.log( y + " of " + guesses.length)
//   console.log(wordToGuess); 
//   console.log(blankWord.join());
//   console.log(gotIt);
//   setTimeout
// }

