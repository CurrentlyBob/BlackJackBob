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
const cardBackImg = "./PlayingCards/CardBack.png";

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
  bet: 0,
  balance: 100,
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

/*----------------------------- Event Listeners -----------------------------*/
newGameEl.addEventListener("click", () => startGame());
hitBtnEl.addEventListener("click", () => hitBtn());
standBtnEl.addEventListener("click", () => stand());

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
  console.log(sum);

  while (sum > 21 && aceCount > 0) {
    sum -= 10;
    aceCount--;
  }

  return sum;
}

function updateUI(gameState) {
  dealerHandEl.innerHTML = "";
  userHandEl.innerHTML = "";
  gameState.dealerSum = getHandSum(
    gameState.dealerHand,
    gameState.dealerAceCount
  );
  gameState.userSum = getHandSum(gameState.userHand, gameState.userAceCount);

  dealerSumEl.innerText = gameState.dealerSum;
  userSumEl.innerText = gameState.userSum;

  for (let card of gameState.dealerHand) {
    const cardImg = document.createElement("img");
    cardImg.src =
      gameState.dealerRevealed || card === gameState.secretCard
        ? `./PlayingCards/${card}.png`
        : cardBackImg;
    dealerHandEl.appendChild(cardImg);
  }
  for (let card of gameState.userHand) {
    const cardImg = document.createElement("img");
    cardImg.src = `./PlayingCards/${card}.png`;
    userHandEl.appendChild(cardImg);
  }
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
  if (gameState.userSum < 21 && gameState.canHit) {
    gameState.userHand.push(gameState.deck.pop());
    gameState.userAceCount = countAces(gameState.userHand);
    updateUI(gameState);
    if (gameState.userSum > 21) {
      gameState.canHit = false;
      console.log("Bust");
    }
  }
}


// Reveals the Dealer Card
function revealDealerCard() {
  gameState.dealerRevealed = true;
  updateUI(gameState);
}


// Player chooses to end their turn
function stand() {
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
  if (gameState.dealerSum > 21 || gameState.userSum > gameState.dealerSum) {
    resultsEl.innerText = "Player wins!";
  } else if (gameState.dealerSum > gameState.userSum) {
    resultsEl.innerText = "Dealer wins!";
  } else {
    resultsEl.innerText = "Push!";
  }
}



function render() {
  startGame();
}

render();