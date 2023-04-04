/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let dealerSum = 0;
let userSum = 0;
let dealerAceCount = 0;
let userAceCount = 0;
let secretCard, deck;

let userHand = [];
let dealerHand = [];

let hit = true; //can hit if sum is less than 21 DON'T FORGET

/*------------------------ Cached Element References ------------------------*/
let dealerHandEl = document.getElementById("dealer-hand")
let userHandEl = document.getElementById("user-hand")
let userSumEl = document.getElementById("user-sum")
let dealerSumEl = document.getElementById("dealer-sum")

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

function startDeck() {
  let cardValue = [
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
  let cardType = ["C", "D", "S", "H"];
  deck = [];
  for (let i = 0; i < cardType.length; i++) {
    for (let j = 0; j < cardValue.length; j++) {
      deck.push(cardValue[j] + "-" + cardType[i]);
    }
  }
}

// Shuffles Deck Array using Math.Random
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let randomCard = deck[i];

    deck[i] = deck[randomIdx];
    deck[randomIdx] = randomCard;
  }
}

// Intializes the game
function startGame() {
  dealerHandEl.innerHTML = "";
  userHandEl.innerHTML = "";

  startDeck();
  shuffleDeck();
  secretCard = deck.pop();
  dealerHand.push(secretCard);
  dealerSum += getValue(secretCard);
  dealerAceCount += hasAce(secretCard);

  dealCards();
}

// Returns value of any given card
function getValue(card) {
  let givenVal = card.split("-");
  let val = givenVal[0]; //.split will seperate the num letter pair and val will be the number/face value applied to card
  if (isNaN(val)) {
    if (val === "A") {
      return 11;
    }
    if (val !== "A") return 10;
  } else {
    return parseInt(val);
  }
}

// If
function hasAce(card) {
  if (card[0] == "A") {
    return 1;
  } else {
    return 0;
  }
}

function dealCards() {
  while (userHand.length < 2) {
    userHand.push(deck.pop());
  }
  while (dealerHand.length < 2) {
    dealerHand.push(deck.pop());
  }

  console.log(userHand, dealerHand)
}

function updateHand() {

  for (let i = 0; i < dealerHand.length; i++) {
    let cardImg = document.createElement("img");
    if (i === 0) {
      cardImg.src = `./PlayingCards/CardBack.png`;
    } else {
      cardImg.src = `./PlayingCards/${dealerHand[i]}.png`;
    }
    dealerHandEl.appendChild(cardImg);
  }

  for (let i = 0; i < userHand.length; i++) {
    let cardImg = document.createElement("img");
    cardImg.src = `./PlayingCards/${userHand[i]}.png`;
    userHandEl.appendChild(cardImg);
  }
}

function render() {
  startGame();
  updateHand();
}

render();
