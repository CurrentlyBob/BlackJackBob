/*-------------------------------- Constants --------------------------------*/
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "A",
  "Jack",
  "Queen",
  "King",
];
const cardTypes = ["C", "D", "S", "H"];
const cardBackImg = "assets/playing-cards/CardBack.png";

/*---------------------------- Variables (state) ----------------------------*/
let gameState = {
  dealerSum: 0,
  userSum: 0,
  dealerAceCount: 0,
  userAceCount: 0,
  secretCard: "",
  deck: [],
  userHand: [],
  dealerHand: [],
  dealerRevealed: false,
  gameOver: false,
  canHit: true,
  canBet: true,
  userBalance: 1000,
  userBet: 0,
};
/*------------------------ Cached Element References ------------------------*/

const dealerHandEl = document.getElementById("dealer-hand");
const userHandEl = document.getElementById("user-hand");
const userSumEl = document.getElementById("user-sum");
const dealerSumEl = document.getElementById("dealer-sum");
const newGameEl = document.getElementById("new-game");
const hitBtnEl = document.getElementById("hit");
const standBtnEl = document.getElementById("stand");
const resultsEl = document.getElementById("results");
const betBalanceEl = document.getElementById("balance");
const bet10El = document.getElementById("bet10");
const bet50El = document.getElementById("bet50");
const bet100El = document.getElementById("bet100");
const potEl = document.getElementById("pot");
/*----------------------------- Event Listeners -----------------------------*/
newGameEl.addEventListener("click", () => resetGame());
hitBtnEl.addEventListener("click", () => hitBtn());
standBtnEl.addEventListener("click", () => stand());
bet10El.addEventListener("click", () => bet(bet10El.value));
bet50El.addEventListener("click", () => bet(bet50El.value));
bet100El.addEventListener("click", () => bet(bet100El.value));
/*-------------------------------- Functions --------------------------------*/

// Creates a new Card Deck
function initializeDeck() {
  const deck = [];
  for (let i = 0; i < cardTypes.length; i++) {
    for (let j = 0; j < cardValues.length; j++) {
      deck.push(`${cardValues[j]}-${cardTypes[i]}`);
    }
  }
  return deck;
}

// Shuffles Deck Array using Math.Random
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let randomCard = deck[i];

    deck[i] = deck[randomIdx];
    deck[randomIdx] = randomCard;
  }
  return deck;
}

// Deals cards to player and dealer
function dealCards(deck) {
  const userHand = [];
  const dealerHand = [];

  while (userHand.length < 2) {
    userHand.push(deck.pop());
  }

  while (dealerHand.length < 2) {
    dealerHand.push(deck.pop());
  }

  const secretCard = dealerHand[0];

  return { userHand, dealerHand, secretCard };
}

// Returns number value of card
function getCardValue(card) {
  const value = card.split("-")[0];
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
}

// Count the number of aces in a hand
function countAces(hand) {
  let count = 0;

  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    if (card.includes("A")) {
      count++;
    }
  }

  return count;
}

// Calculates the sum of a hand, and looks for aces
function getHandSum(hand, aceCount) {
  let sum = hand.reduce((total, card) => total + getCardValue(card), 0);

  while (sum > 21 && aceCount > 0) {
    sum -= 10;
    aceCount--;
  }

  return sum;
}

//updates UI in accordance to the current game state
function updateUI(gameState) {
  console.log(gameState.userBalance);
  dealerHandEl.innerHTML = "";
  userHandEl.innerHTML = "";
  potEl.innerText = "$" + parseInt(gameState.userBet);
  gameState.dealerSum = gameState.dealerRevealed
    ? getHandSum(gameState.dealerHand, gameState.dealerAceCount)
    : getHandSum(gameState.dealerHand, gameState.dealerAceCount) -
      getCardValue(gameState.secretCard);
  gameState.userSum = getHandSum(gameState.userHand, gameState.userAceCount);

  for (let card of gameState.dealerHand) {
    const cardImg = document.createElement("img");
    if (gameState.canBet) {
      dealerSumEl.innerText = "??";
      cardImg.src = cardBackImg;
    } else if (gameState.dealerRevealed || card !== gameState.secretCard) {
      cardImg.src = `assets/playing-cards/${card}.png`;
      dealerSumEl.innerText = gameState.dealerSum;
    } else {
      cardImg.src = cardBackImg;
    }

    dealerHandEl.appendChild(cardImg);
  }

  for (let card of gameState.userHand) {
    const cardImg = document.createElement("img");
    if (gameState.canBet) {
      cardImg.src = cardBackImg;
      userSumEl.innerText = "??";
    } else {
      cardImg.src = `assets/playing-cards/${card}.png`;
      userSumEl.innerText = gameState.userSum;
    }
    userHandEl.appendChild(cardImg);
  }

  betBalanceEl.innerText = "$" + gameState.userBalance;
  potEl.innerText = "$" + parseInt(gameState.userBet);
}

// Starts the Game
function startGame() {
  gameState.deck = initializeDeck();
  gameState.deck = shuffleDeck(gameState.deck);
  const { userHand, dealerHand, secretCard } = dealCards(gameState.deck);

  gameState.userHand = userHand;
  gameState.dealerHand = dealerHand;
  gameState.secretCard = secretCard;

  updateUI(gameState);
}

// Handle the "hit" button click
function hitBtn() {
  if (gameState.canBet) return;

  gameState.canBet = false;
  if (!gameState.canHit || gameState.gameOver) {
    return;
  }
  gameState.userHand.push(gameState.deck.pop());
  gameState.userAceCount = countAces(gameState.userHand);
  updateUI(gameState);
  if (gameState.userSum > 21) {
    gameState.gameOver = true;
    resultsEl.innerText = "You lose! Click 'New Game' to play again.";
    gameState.canHit = false;
    gameState.dealerRevealed = true;
    updateUI(gameState);
  }
}

// Reveals the Dealer Card
function revealDealerCard() {
  gameState.dealerRevealed = true;
  updateUI(gameState);
}

// Player chooses to end their turn
function stand() {
  if (gameState.canBet) return;
  gameState.canBet = false;
  gameState.canHit = false;
  revealDealerCard();
  while (gameState.dealerSum < 17) {
    gameState.dealerHand.push(gameState.deck.pop());
    gameState.dealerAceCount = countAces(gameState.dealerHand);
    gameState.dealerSum = getHandSum(
      gameState.dealerHand,
      gameState.dealerAceCount
    );
    updateUI(gameState);
  }
  if (gameState.dealerSum > 21) {
    gameState.userBalance += gameState.userBet * 2;
    gameState.userBet = 0;
    resultsEl.innerText = "You win! Click 'New Game' to play again.";
    gameState.gameOver = true;
  }
  if (gameState.dealerSum > gameState.userSum && !gameState.gameOver) {
    gameState.userBet = 0;
    resultsEl.innerText = "You lose! Click 'New Game' to play again.";
    gameState.gameOver = true;
  }
  if (gameState.dealerSum === gameState.userSum && !gameState.gameOver) {
    gameState.userBalance += gameState.userBet;
    gameState.userBet = 0;
    resultsEl.innerText = "It's a tie! Click 'New Game' to play again.";
    gameState.gameOver = true;
  }
  if (gameState.dealerSum < gameState.userSum && !gameState.gameOver) {
    gameState.userBalance += gameState.userBet * 2;
    gameState.userBet = 0;
    resultsEl.innerText = "You win! Click 'New Game' to play again.";
    gameState.gameOver = true;
  }

  updateUI(gameState);
}

//Handles Bet Mechanic
function bet(betValue) {
  if (gameState.canBet && gameState.userBalance >= betValue) {
    gameState.userBet += parseInt(betValue);
    gameState.userBalance -= parseInt(betValue);
    gameState.canBet = false;
    updateUI(gameState);
  }
}
//Sets the state of the game back to original values/creates and reshuffles deck
function resetGame() {
  resultsEl.innerText = "";
  gameState.dealerSum = 0;
  gameState.userSum = 0;
  gameState.dealerAceCount = 0;
  gameState.userAceCount = 0;
  gameState.secretCard = "";
  gameState.deck = [];
  gameState.userHand = [];
  gameState.dealerHand = [];
  gameState.dealerRevealed = false;
  gameState.gameOver = false;
  gameState.canHit = true;
  gameState.canBet = true;
  gameState.userBet = 0;

  console.log(gameState);
  startGame();
}
//Renders the Game on Load
function render() {
  startGame();
}
render();
