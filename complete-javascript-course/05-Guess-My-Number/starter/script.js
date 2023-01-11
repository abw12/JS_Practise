'use strict';
// document.querySelector('.score').textContent = 12;

const secrectFunction = function () {
  const rNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(rNumber);
  return rNumber;
};

const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

let secrectNumber = secrectFunction();
let score = 20;
let highScore = 0;

//again button listner
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  secrectNumber = secrectFunction();
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
});

//check button listener
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //check if input is non-empty
  if (!guess) {
    //since in JS 0 is a falsy value we can check if its not equal to zero
    displayMessage('Not A Valid Input ⛔');
  } else if (guess == secrectNumber) {
    displayMessage('😎 You guessed it right!');
    document.querySelector('.number').textContent = secrectNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess != secrectNumber) {
    displayMessage(
      guess > score ? '😒 Guessed Too High!' : '🥱 Guessed Too Low!'
    );
    document.querySelector('.score').textContent = --score;
  }

  //   else if (guess > secrectNumber) {
  //     document.querySelector('.message').textContent = '😒 Guessed Too High!';
  //     document.querySelector('.score').textContent = --score;
  //   } else if (guess < secrectNumber) {
  //     document.querySelector('.message').textContent = '🥱 Guessed Too Low!';
  //     document.querySelector('.score').textContent = --score;
  //   }

  if (score < 1) {
    document.querySelector('.message').textContent = 'You Lose the game! 😢';
    document.querySelector('body').style.backgroundColor = 'red';
    document.querySelector('.score').textContent = 0;
  }
});
