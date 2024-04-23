const gameBoard = document.getElementById("game-board");
const startModal = document.getElementById("start-modal");
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start");
const gameScore = document.getElementById("game-score");

let GAME_SCORE = 0;
let cards;
let cardCounter = 0;
let clickCounter = 0;
let pickCard = true;
let gameCards = [];
let pickedCards = [];
let pickedCardHTML = [];

const deck = [
  { cardNbr: 1, cardFace: "TEDDY" },
  { cardNbr: 2, cardFace: "PEPPER" },
  { cardNbr: 3, cardFace: "MUDPIE" },
  { cardNbr: 4, cardFace: "POTATO" },
  { cardNbr: 5, cardFace: "CHOCOLATE" },
  { cardNbr: 6, cardFace: "JELLY" },
];
//Creates deck of cards when page loads
gameCards = deck.concat(deck);

//function to listen for card selection

//HELPER FUNCTIONS//
function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

const startBtnEvent = () => {
  startBtn.addEventListener("click", () => {
    console.log("START BTN");
    startModal.classList.add("hide");
    startScreen.classList.remove("start-screen");
  });
};

function getCardDetails(cardIndex) {
  let card = gameCards[cardIndex];
  return card;
}

function checkCardCount(cardCounter) {
  if (cardCounter >= 2) {
    return (pickCard = false);
  } else return (pickCard = true);
}

function selectCard(e) {
  if (!e.target.nextElementSibling.classList.contains("selected")) {
    let beforeCard = e.target;
    let afterCard = e.target.nextElementSibling;
    pickedCardHTML.push([beforeCard, afterCard]);
    beforeCard.classList.add("hide");
    afterCard.classList.remove("hide");
    afterCard.classList.add("selected");
    pickedCards.push(afterCard.getAttribute("value"));
    cardCounter += 1;
  }
  setTimeout(() => {
    checkCards(pickedCards);
  }, "500");
}

function checkCards(cards) {
  console.log(cards.length);
  if (cards.length != 2) {
  }
  if (cards.length == 2) {
    if (cards[0] == cards[1]) {
      console.log("MATCH!");
      updateScore((GAME_SCORE += 1));
      resetCounters();
      checkGameOver();
    }
    if (cards[0] != cards[1]) {
      console.log("NO MATCH!");
      pickedCardHTML.forEach((arr) => {
        arr[0].classList.remove("hide");
        arr[1].classList.remove("selected");
        arr[1].classList.add("hide");
      });
      resetCounters();
    }
  }
}
const resetCounters = () => {
  pickedCardHTML = [];
  pickedCards = [];
  cardCounter = 0;
};

const checkGameOver = () => {
  if (GAME_SCORE === deck.length) {
    console.log("GAME OVER");
    let modalContent = `<h3>Well Done!</h3><br><button class="start-btn" id="start-btn">Play Again!</button>`;
    startModal.innerHTML = modalContent;
    startModal.classList.remove("hide");
    startScreen.classList.add("start-screen");
    document.getElementById("start-btn").addEventListener("click", () => {
      initialiseGame();
      startModal.classList.add("hide");
      startScreen.classList.remove("start-screen");
    });
  }
};
function updateScore(GAME_SCORE) {
  score = gameScore;
  score.innerText = GAME_SCORE;
}

function setValue(card, cardValue) {
  if (pickCard) {
    card.innerText = cardValue;
  }
}

//Helper function to create new div and insert game card in div
const createCardDiv = (card, i) => {
  gameBoard.innerHTML += `<div class="game-card" id="${i}">
  <div class="card-before">?</div>
  <div class="card-after hide" value="${card.cardNbr}">${card.cardFace}</div>
  </div>`;
};

const createCards = () => {
  //console.log("page loaded");
  gameBoard.innerHTML = "";
  let i = 0;
  gameCards.forEach((card) => {
    cardDiv = createCardDiv(card, i);
    i += 1;
  });
};

const initialiseGame = () => {
  GAME_SCORE = 0;
  updateScore(GAME_SCORE);
  createCards();
  cards = document.querySelectorAll(".game-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      checkCardCount(cardCounter);
      if (pickCard) {
        selectCard(e);
        checkCardCount(pickedCards);
      }
    });
  });
};

initialiseGame();
startBtnEvent();
