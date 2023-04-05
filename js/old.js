// // Intializes the game
// function startGame() {
//   dealerHandEl.innerHTML = "";
//   userHandEl.innerHTML = "";
//   dealerSum = 0;
//   userSum = 0;
//   dealerAceCount = 0;
//   userAceCount = 0;
//   userHand = [];
//   dealerHand = [];
//   canHit = true;
//   showDealer = false;
//   dealerRevealed = false;

//   startDeck();
//   shuffleDeck();

//   secretCard = deck.pop();
//   dealerHand.push(secretCard);
//   dealerAceCount += hasAce(secretCard);

//   dealCards();

//   updateHand();
// }

// Returns value of any given card
// function getValue(card) {
//   let givenVal = card.split("-");
//   let val = givenVal[0]; //.split will seperate the num letter pair and val will be the number/face value applied to card
//   if (isNaN(val)) {
//     if (val === "A") return 11;
//     if (val !== "A") return 10;
//   } else {
//     return parseInt(val);
//   }
// }

// // If
// function hasAce(hand) {
//   let count = 0;

//   for (let i = 0; i < hand.length; i++) {
//     let card = hand[i];
//     if (card.includes("A")) {
//       count++;
//     }
//   }

//   return count;
// }

// function dealCards() {
//   while (userHand.length < 2) {
//     userHand.push(deck.pop());
//   }
//   while (dealerHand.length < 2) {
//     dealerHand.push(deck.pop());
//   }

//   console.log(userHand, dealerHand);
// }

// function updateHand() {
//   for (let i = 0; i < dealerHand.length; i++) {
//     let cardImg = document.createElement("img");
//     if (i === 0) {
//       cardImg.src = `./PlayingCards/CardBack.png`;
//     } else {
//       cardImg.src = `./PlayingCards/${dealerHand[i]}.png`;
//       dealerSum += getValue(dealerHand[i]);
//     }
//     dealerHandEl.appendChild(cardImg);
//     dealerSumEl.textContent = dealerSum;
//     dealerAceCount = hasAce(dealerHand);
//   }

//   for (let i = 0; i < userHand.length; i++) {
//     let cardImg = document.createElement("img");
//     cardImg.src = `./PlayingCards/${userHand[i]}.png`;
//     userHandEl.appendChild(cardImg);
//     userSum += getValue(userHand[i]);
//     userAceCount = hasAce(userHand);
//   }
//   userSumEl.innerText = userSum;
// }

// function hitBtn() {
//   let userCardImg = document.createElement("img");
//   if (userSum < 21 && canHit) {
//     let newCard = deck.pop();
//     userHand.push(newCard);
//     userCardImg.src = `./playingCards/${userHand[userHand.length - 1]}.png`;
//     userHandEl.appendChild(userCardImg);
//     userSum += getValue(userHand[userHand.length - 1]);

//     userSumEl.innerText = userSum;

//     if (newCard.split("-").includes("A")) {
//       userAceCount++;
//     }
//   }
//   if (userSum > 21 && userAceCount > 0) {
//     userSum -= 10;
//     userAceCount--;
//     userSumEl.innerText = userSum;
//   }

//   if (userSum > 21) {
//     canHit = false;
//     console.log("Bust");
//   }
//   console.log(userHand);
// }
// function dealerHit() {
//   let dealerCardImg = document.createElement("img");
//   while (dealerSum < 17) {
//     let newCard = deck.pop();
//     dealerHand.push(newCard);
//     dealerCardImg.src = `./playingCards/${
//       dealerHand[dealerHand.length - 1]
//     }.png`;
//     dealerHandEl.appendChild(dealerCardImg);
//     dealerSum += getValue(dealerHand[dealerHand.length - 1]);
//     dealerSumEl.innerText = dealerSum;

//     if (newCard.split("-").includes("A")) {
//       dealerAceCount++;
//     }
//   }
// }

//// User clicks Stand
//// Dealer Card Revealed
//// Dealer Sum Updated after card revealed for both cards
//// If Dealer value is less than 17 => Dealer Hits
// If Dealer value is greater than 17 => dealer stands
// Compare Values
// Update Win Message
// If Dealer Busts -> Player Wins
// If Player Busts -> Dealer Wins and end game
// If Player Stands -> Dealer must be >= 17
// If Tie -> "Push" (Tie)

// function revealDealer() {
//   if (!dealerRevealed) {
//     dealerRevealed = true;
//     dealerHandEl.children[0].src = `./PlayingCards/${dealerHand[0]}.png`;
//     dealerSum += getValue(dealerHand[0]);
//     dealerSumEl.innerText = dealerSum;
//   }
// }

// function stand() {
//   canHit = false;
//   revealDealer();

//   dealerHit();
// }