/*
purpose: create an array of wildcard character representing each letter of the word
params
  word - word to guess
  wildChar - character to use as the wildcard character
returns: an array of wildcard character with the same length as the word to guess
*/
function createPlaceholder( word, wildChar ) {
  const blankWord = [];
  for (let i=0; i < word.length; i++) {
    blankWord.push(wildChar);
  }
  return blankWord;
}

/*
purpose: check if there is a match between the word and user input
returns: a boolean, true if there was a match
*/
function isMatch( word, userInput ) {
  let match = false;
  if ( word.indexOf(userInput) > -1 ) {
    match = true;
  }
  return match;
}

/*
purpose: store the letter that was correctly guessed
params
  word - word to guess
  userInput - letter that the user guessed
  coorectGuess - an array holding the wildcard and letters already guessed (pass by reference)
*/
function saveCorrectGuess(word, userInput, correctGuess) {
  if ( correctGuess.indexOf( userInput ) == -1) { // make sure it is not guessed yet
    for (let i=0; i < word.length; i++) {
      if (word[i] === userInput) {
        correctGuess[i] = userInput;
      }
    }
  }
}

/*
purpose: store the letter that was wrongly guessed
params
  userInput - letter that the user guessed
  wrongGuess - an array of letters that was wrongly guessed (pass by reference)
*/
function saveWrongGuess( userInput, wrongGuess ) {
  if (wrongGuess.indexOf(userInput) == -1 ) { // make sure it is unique
    wrongGuess.push(userInput); 
  }
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

/*
params
  word - word to guess
  userInput - a char that the user guessed
  placeHolder - an array holding the wildchar and letters already guessed (pass by reference)
returns 
  true if there at least one match
*/
function checkMatch( word, userInput, placeHolder) {
  var match = false;

  if ( placeHolder.indexOf( userInput ) == -1 ) {  // check if already guess letter
    for (i=0; i < word.length; i++) {
      if (word[i] === userInput) {
        placeHolder[i] = userInput;
        match=true;
      }
    }
  } else {
    match = true;
  }

  return match;
}




function dispPlaceHolder( placeHolder ) {
  let str = "";
  for (let i=0; i < placeHolder.length; i++) {
    str += `<span>${placeHolder[i]}</span>`;
  }
  return str;
}

function initGame() {
  wordToGuess = "tommorow";
  blankWord = createPlaceholder("tomorrow", "#");
  usedLetters = [];
  remainingLife = life = 12;
}

function updateDocument() {
  document.querySelector('#win').innerHTML=win;
  document.querySelector('#placeholder').innerHTML=dispPlaceHolder(blankWord);
  document.querySelector('#remaininglife').innerHTML=remainingLife;
  document.querySelector('#wrongletters').innerHTML=dispPlaceHolder(usedLetters);  
}

var win=0;
var wordToGuess;
var blankWord;
var usedLetters;
var life;
var remainingLife;

initGame();
updateDocument();

function test(event) {
  const key = event.key.toLowerCase();

  if (key.length !== 1) {
      return;
  }

  const isLetter = (key >= "a" && key <= "z");
  const isNumber = (key >= "0" && key <= "9");
  if (isLetter || isNumber) {

    if ( isMatch(wordToGuess, key) ) {
      saveCorrectGuess(wordToGuess, key, blankWord);
    } else {
      saveWrongGuess(key,usedLetters);
      remainingLife = life -  usedLetters.length;
      if (remainingLife == 0) {
        initGame();
      }
    }

    // if ( ! checkMatch(wordToGuess, key, blankWord) ) {
    //   logWrongGuess( usedLetters, key);
    //   remainglife = life -  usedLetters.length;
    // } else {
    //   if (isGuessRight(blankWord, "#")) {
    //     win++;
    //   }
    // }
    if (isGuessRight(blankWord, "#")) {
      win++;
      initGame();
    }
    updateDocument();
  }

  console.log(key);
}

document.onkeyup = test;


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

