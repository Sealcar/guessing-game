const readline = require("readline");

// create an interface where we can talk to the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const checkGuess = (num, secretNumber) => {
  if (num > secretNumber) {
    console.log('Too high.');
    return false;
  } else if (num < secretNumber) {
    console.log('Too low.');
    return false;
  } else if (num === secretNumber) {
    console.log('Correct!');
    return true;
  } else {
    console.log('You did not enter a number.');
  }
};

function askGuess(secretNumber, limit) {
  rl.question('Enter a guess: ', answer => {
    if (checkGuess(Number(answer), secretNumber)) {
      rl.close();
    } else if (limit === 1) {
      console.log(`You are out of turns, the number was ${secretNumber}`);
      rl.close();
    } else {
      askGuess(secretNumber, limit - 1);
    }
  });
};

function randomInRange(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

function askRange(limit) {
  rl.question('Enter a max number: ', firstAnswer => {
    let max = Number(firstAnswer);
    rl.question('Enter a min number: ', secondAnswer => {
      let min = Number(secondAnswer);
      console.log(`I'm thinkin of a number between ${min} and ${max}...`);
      let secretNumber = randomInRange(min, max);
      askGuess(secretNumber, limit);
    });
  });
}

function askLimit() {
  rl.question('Enter a maximum turn limit: ', answer => {
    let limit = Number(answer);
    askRange(limit);
  });
}
askLimit();
