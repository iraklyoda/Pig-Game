"use strict";

// Selecting elements
const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");

const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const current1El = document.getElementById("current--0");
const current2El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

// Starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add("hidden");

// variables
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Functions

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
};

btnNew.addEventListener("click", () => {
  score1El.textContent = 0;
  score2El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById(`current--0`).textContent =
  currentScore;
  document.getElementById(`current--1`).textContent =
  currentScore;
  document.querySelector(`.winner--0`).classList.add('hidden');
  document.querySelector(`.winner--1`).classList.add('hidden');


  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player2El.classList.remove("player--active");
  player1El.classList.add("player--active");

});


// Rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dices/dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`.winner--${activePlayer}`).classList.remove('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

