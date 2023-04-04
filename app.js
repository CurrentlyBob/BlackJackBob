/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let dealerSum, userSum, dealerAceCount, userAceCount, secretCard, deck;

let userHand = [];
let dealerHand = [];

let gameOver = false;

let hit = true; //can hit if sum is less than 21 DON'T FORGET

/*------------------------ Cached Element References ------------------------*/
let dealerHandEl = document.getElementById("dealer-hand")
let userHandEl = document.getElementById("user-hand")
let userSumEl = document.getElementById("user-sum")
let dealerSumEl = document.getElementById("dealer-sum")
let newGameEl = document.getElementById("new-game")
let hitBtnEl = document.getElementById("hit")
/*----------------------------- Event Listeners -----------------------------*/
newGameEl.addEventListener('click', () => startGame())
hitBtnEl.addEventListener('click', ()=> hitBtn())
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
  dealerSum = 0;
  userSum = 0;
  dealerAceCount = 0;
  userAceCount = 0;
  userHand = [];
  dealerHand = [];

  startDeck();
  shuffleDeck();

  secretCard = deck.pop();
  dealerHand.push(secretCard);
  dealerAceCount += hasAce(secretCard);

  dealCards();

  updateHand();
}

// Returns value of any given card
function getValue(card) {
  let givenVal = card.split("-");
  let val = givenVal[0]; //.split will seperate the num letter pair and val will be the number/face value applied to card
  if (isNaN(val)) {
    if (val === "A") return 11;
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
      dealerSum += getValue(dealerHand[i])
    }
    dealerHandEl.appendChild(cardImg);
    dealerSumEl.textContent = dealerSum
  }
  
  for (let i = 0; i < userHand.length; i++) {
    let cardImg = document.createElement("img");
    cardImg.src = `./PlayingCards/${userHand[i]}.png`;
    userHandEl.appendChild(cardImg);
    userSum += getValue(userHand[i])
  }
  userSumEl.innerText = userSum
  
}
function hitBtn() {
    let userCardImg = document.createElement("img")
    if(userSum < 21){
        hit = true
        userHand.push(deck.pop())
        userCardImg.src = `./playingCards/${userHand[userHand.length - 1]}.png`
        userHandEl.appendChild(userCardImg)
        userSum += getValue(userHand[userHand.length - 1])
    } if (userSum > 21){
        return
    }
    console.log(userHand);
}

function render() {
  startGame();

}

render();
