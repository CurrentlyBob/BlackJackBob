/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let dealerSum = 0;
let userSum = 0;
let dealerAceCount = 0;
let userAceCount = 0;
let secretCard, deck;

let hit = true; //can hit if sum is less than 21 DON'T FORGET

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
function render() {
  startDeck();
  shuffleDeck();
  startGame();
}

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
    "k",
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

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let randomCard = deck[i];

    deck[i] = deck[randomIdx];
    deck[randomIdx] = randomCard;
  }
  console.log(deck);
}

function startGame() {
  secret = deck.pop();
  dealerSum += getValue(secretCard)
  dealerAceCount += hasAce(secretCard)
  console.log(secretCard)
  console.log(dealerSum)
}

function getValue(card) {
  let givenVal = card.split(" ");
  let val = givenVal[0]; //.split will seperate the num letter pair and val will be the number/face value applied to card
  if (isNaN(val)) {
    if (val === "A") {
      return 11;
    }
    if (val !== "A") return 10;
  } 
    else {
        return parseInt(val);
  }
}
function hasAce(card) {
    if (card[0] == "A") {
        return 1
    } else{
        return 0
    }
}

render();
