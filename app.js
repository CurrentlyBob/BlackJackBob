/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let dealerSum = 0 
let userSum = 0
let dealerAceCount = 0
let userAceCount = 0
let secret, deck

let hit = true //can hit if sum is less than 21


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
function render() {
    startDeck();
}

function startDeck() {
    let cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'k',]
    let cardType = ['C', 'D', 'S', 'H',]
    deck = []
    for (let i = 0; i < cardType.length; i++) {
        for (let j = 0; j < cardValue.length; j++) {
           deck.push(cardValue[j] + " " + cardType[i])   
        }
        
    }
    console.log(deck)
 }
 
 
 
 
 render()