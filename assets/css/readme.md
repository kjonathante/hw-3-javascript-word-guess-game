Pseudocode for main logic of word guess

create an array as placeholder for the word to be guess with '*'

loop thru the word to be guess and do the following:

  check if there is a match between the word to be guess and the user input
    trigger a flag that there was a match
    update the placeholder array where the match occured

  check if the match flag was not triggered
    check if the user input is not in the array
      pop the user input to the array

  check if the placeholder does not have '*' 
    the user guess the word

