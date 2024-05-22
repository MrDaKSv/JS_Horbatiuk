const GAME_NODE = document.querySelector("#game-board");
const WINNING_TEXT = document.querySelector("#victory-message");
const TIMER_NODE = document.querySelector("#timer");
const MOVE_COUNTER_NODE = document.querySelector("#move-counter");
const START_GAME_BUTTON = document.querySelector("#new-game-button");
const DIFFICULTY_SELECTOR = document.querySelector("#difficulty");
const CARD_SET_SELECTOR = document.querySelector("#card-set");

const VISIBLE_CARD_CLASSNAME = "visible";
const CARD_FLIP_TIMEOUT_MS = 500;

const CARD_SETS = {
    fruits: ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"],
    emojis: ["😀", "😂", "😍", "🤔", "😎", "😭"]
};

let CARDS_AMOUNT = 12;
let CURRENT_CARD_SET = CARD_SETS.fruits;

let VISIBLE_CARDS = [];
let moveCounter = 0;
let timerInterval;
let seconds = 0;
let minutes = 0;

START_GAME_BUTTON.addEventListener("click", startGame);
DIFFICULTY_SELECTOR.addEventListener("change", updateSettings);
CARD_SET_SELECTOR.addEventListener("change", updateSettings);

function updateSettings() {
    const selectedDifficulty = parseInt(DIFFICULTY_SELECTOR.value);
    const selectedCardSet = CARD_SET_SELECTOR.value;

    CARDS_AMOUNT = selectedDifficulty;
    CURRENT_CARD_SET = CARD_SETS[selectedCardSet];

    // Початок нової гри після оновлення налаштувань
    startGame();
}

function startGame() {
    resetTimer();
    resetMoveCounter();
    VISIBLE_CARDS = [];
    [GAME_NODE, WINNING_TEXT].forEach((element) => (element.innerHTML = ""));

    const CARD_VALUES = generateArrayWithPairs(CURRENT_CARD_SET, CARDS_AMOUNT);

    if (!CARD_VALUES) return; // Якщо неможливо створити масив, зупиняємо гру

    CARD_VALUES.forEach(renderCard);

    const renderedCards = document.querySelectorAll(".card");

    renderedCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

    setTimeout(() => {
        renderedCards.forEach((card) =>
            card.classList.remove(VISIBLE_CARD_CLASSNAME)
        );
        startTimer();
    }, CARD_FLIP_TIMEOUT_MS * 2);
}

function generateArrayWithPairs(arr, fieldSize) {
    const neededPairs = Math.ceil(fieldSize / 2);
    const fullSet = [...arr];
    
    // Повторно додаємо елементи з початку масиву, якщо їх не вистачає
    while (fullSet.length < neededPairs) {
        fullSet.push(...arr);
    }

    const selectedElements = fullSet.slice(0, neededPairs);
    const randomArray = [...selectedElements, ...selectedElements];
    randomArray.sort(() => Math.random() - 0.5);

    return randomArray;
}

function renderCard(cardText = "") {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardFront.textContent = "?";
    cardBack.textContent = cardText;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    card.appendChild(cardInner);

    card.addEventListener("click", handleCardClick.bind(this, card));

    GAME_NODE.appendChild(card);
}

function handleCardClick(card) {
    if (card.classList.contains(VISIBLE_CARD_CLASSNAME) || VISIBLE_CARDS.length >= 2) {
        return;
    }

    card.classList.add(VISIBLE_CARD_CLASSNAME);
    VISIBLE_CARDS.push(card);

    if (VISIBLE_CARDS.length === 2) {
        incrementMoveCounter();
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = VISIBLE_CARDS;

    if (firstCard.querySelector(".card-back").textContent === secondCard.querySelector(".card-back").textContent) {
        VISIBLE_CARDS = [];
        checkVictory();
    } else {
        setTimeout(() => {
            firstCard.classList.remove(VISIBLE_CARD_CLASSNAME);
            secondCard.classList.remove(VISIBLE_CARD_CLASSNAME);
            VISIBLE_CARDS = [];
        }, CARD_FLIP_TIMEOUT_MS);
    }
}

function checkVictory() {
    const visibleCardsNodes = document.querySelectorAll(`.${VISIBLE_CARD_CLASSNAME}`);

    if (visibleCardsNodes.length === CARDS_AMOUNT) {
        stopTimer();
        const formattedTime =
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0");
        const victoryMessage = `Congratulations, you won! Time: ${formattedTime}`;
        WINNING_TEXT.textContent = victoryMessage;
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        const formattedTime =
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0");
        TIMER_NODE.textContent = formattedTime;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    TIMER_NODE.textContent = "0:00";
}

function incrementMoveCounter() {
    moveCounter++;
    MOVE_COUNTER_NODE.textContent = moveCounter;
}

function resetMoveCounter() {
    moveCounter = 0;
    MOVE_COUNTER_NODE.textContent = moveCounter;
}

// Початкове оновлення налаштувань і початок гри
updateSettings();
startGame();
