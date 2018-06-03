
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

var wordToGuess = "tommorow";
var blankWord = [];
var usedLetters = [];
var blankWord = createPlaceholder("tomorrow", "#");

var guesses = "taoimeruw"

for (y=0; y < guesses.length; y++) {
  var inputLetter = guesses[y];
  var gotIt=false;

  if ( ! checkMatch("tomorrow", inputLetter, blankWord) ) {
    logWrongGuess( usedLetters, inputLetter);
  }
  
  gotIt = isGuessRight(blankWord, "#");

  console.log( y + " of " + guesses.length)
  console.log(wordToGuess); 
  console.log(blankWord.join());
  console.log(usedLetters.join());
  console.log(gotIt);
}

