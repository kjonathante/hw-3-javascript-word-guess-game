
/*
params
  word = word to guess
  wildChar = character representing the word to guess
returns 
  an array of wildChar with the same length as the word to guess
*/
function createPlaceholder( word, wildChar ) {
  var blankWord = [];
  for (i=0; i < word.length; i++) {
    blankWord.push(wildChar);
  }
  return blankWord;
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

/*
purpose
  store the wrong letter that was guessed uniquely
params
  usedLetters - an array of wrong letters that was guessed (pass by reference)
  userInput - a char that the user guessed
*/
function logWrongGuess( usedLetters, userInput ) {
  if (usedLetters.indexOf(userInput) == -1 ) {
    usedLetters.push(userInput); 
  }
}

/*
purpose: check if there is still wildChar left in the placeholder
params
  placeHolder - an array of the word that the user is trying to guess
  wildChar - a char that represents that letters that the user haven't guess
return: true if the word was guessed correctly
*/
function isGuessRight (placeHolder, wildChar) {
  return (placeHolder.indexOf(wildChar) == -1);
}





function dispPlaceHolder( placeHolder ) {
  let str = "";
  for (let i=0; i < placeHolder.length; i++) {
    str += `<span>${placeHolder[i]}</span>`;
  }
  return str;
}



var wordToGuess = "tommorow";
var blankWord = [];
var usedLetters = [];
var blankWord = createPlaceholder("tomorrow", "#");
var win=0;
var life=12;
var remaininglife=0;


remaininglife = life;
document.querySelector('#win').innerHTML=win;
document.querySelector('#placeholder').innerHTML=dispPlaceHolder(blankWord);
document.querySelector('#remaininglife').innerHTML=remaininglife;
document.querySelector('#wrongletters').innerHTML=dispPlaceHolder(usedLetters);

function test(event) {
  const key = event.key.toLowerCase();

  if (key.length !== 1) {
      return;
  }

  const isLetter = (key >= "a" && key <= "z");
  const isNumber = (key >= "0" && key <= "9");
  if (isLetter || isNumber) {
    if ( ! checkMatch(wordToGuess, key, blankWord) ) {
      logWrongGuess( usedLetters, key);
      remainglife = life -  usedLetters.length;
    } else {
      if (isGuessRight(blankWord, "#")) {
        win++;
      }
    }
    document.querySelector('#win').innerHTML=win;
    document.querySelector('#placeholder').innerHTML=dispPlaceHolder(blankWord);
    document.querySelector('#remaininglife').innerHTML=remainglife;
    document.querySelector('#wrongletters').innerHTML=dispPlaceHolder(usedLetters);
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

