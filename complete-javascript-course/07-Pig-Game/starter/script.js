'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentScoreP0 = document.getElementById('current--0');
const currentScoreP1 = document.getElementById('current--1');

//scores of both players ,current and total
let currentScore = 0;
let player_0_total = 0;
let player_1_total = 0;
let playing = true;

//initializing both players score with 0 and hidding the dice
init();
function init() {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  player_0_total = 0;
  player_1_total = 0;
  playing = true;
}

//display the winner if total score goes above or equal to 100
// if (player_0_total >= 10) {
//   player0.classList.add('player--winner');
// } else if (player_1_total >= 100) {
//   player1.classList.add('player--winner');
// }

const switchToPlayer1 = function () {
  player0.classList.remove('player--active');
  player1.classList.add('player--active');
  currentScore = 0;
  currentScoreP0.textContent = currentScore;
};

const switchToPlayer0 = function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  currentScore = 0;
  currentScoreP1.textContent = currentScore;
};

const isPlayer0_Active = function () {
  return player0.classList.contains('player--active');
};

//generate random roll dice number (Roll dice functionality)
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random number for dice
    let randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomDiceNumber);
    //change the dice image as per dice numebr generated
    diceEL.src = `dice-${randomDiceNumber}.png`;
    diceEL.classList.remove('hidden');

    //if dice number is 1 switch player or else add diceNumber to currentScore of the player
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;

      isPlayer0_Active()
        ? (currentScoreP0.textContent = currentScore)
        : (currentScoreP1.textContent = currentScore);
    } else {
      //switch player if its 1
      if (isPlayer0_Active()) {
        switchToPlayer1();
      } else {
        switchToPlayer0();
      }
    }
  }
});

//record the current score in the toatl score of the respective player if click on hold button and then swtich the player
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to total score
    if (isPlayer0_Active()) {
      player_0_total += currentScore;
      score0EL.textContent = player_0_total;
      if (player_0_total >= 10) {
        player0.classList.add('player--winner');
        playing = false;
        diceEL.classList.add('hidden');
        currentScore = 0;
        return;
      }
      switchToPlayer1();
    } else {
      player_1_total += currentScore;
      score1EL.textContent = player_1_total;
      if (player_1_total >= 10) {
        player1.classList.add('player--winner');
        playing = false;
        diceEL.classList.add('hidden');
        currentScore = 0;
        return;
      }
      switchToPlayer0();
    }
  }
});

//on click of new button reset the game to initial stage and switch to player0 by default
btnNew.addEventListener('click', function () {
  init();

  if (isPlayer0_Active) {
    switchToPlayer0();
    currentScoreP0.textContent = currentScore;
  }
  //remove the player-winner class on the new game
  if (
    player0.classList.contains('player--winner') ||
    player1.classList.contains('player--winner')
  ) {
    player0.classList.contains('player--winner')
      ? player0.classList.remove('player--winner')
      : player1.classList.remove('player--winner');
  }
});
