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
    "J",
    "Q",
    "K",
  ];
  let cardType = ["C", "D", "S", "H"];
  deck = [];
  for (let i = 0; i < cardType.length; i++) {
    for (let j = 0; j < cardValue.length; j++) {
      deck.push(cardValue[j] + " " + cardType[i]);
    }
  }
  console.log(deck);
}

// Shuffles Deck Array using Math.Random
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let randomCard = deck[i];

    deck[i] = deck[randomIdx];
    deck[randomIdx] = randomCard;
  }
  console.log(deck);
}

// Intializes the game
function startGame() {
  secretCard = deck.pop();
  dealerHand.push(secretCard);
  dealerSum += getValue(secretCard);
  dealerAceCount += hasAce(secretCard);
  console.log(secretCard);
  console.log(dealerSum);
}

// Returns value of any given card
function getValue(card) {
  let givenVal = card.split(" ");
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
  // while hand is less than 2 cards
  // hand needs the top card
  while (userHand.length < 2) {
    userHand.push(deck.pop())
  }

  while(dealerHand.length < 2) {
    dealerHand.push(deck.pop())
  }

  console.log(userHand, dealerHand)

}

function render() {
  startDeck();
  shuffleDeck();
  startGame();
  dealCards();
}

render();
