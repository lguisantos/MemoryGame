const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;

function flipCard() {
    // trancando o click em outros cards
    if (lockBoard) return;

    // trancando duplo click
    if (this === firstCard) return;

    // adicionando uma classe
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    // second click
    secondCard = this

    checkForMatch();
}

function checkForMatch() {
    // Deu Match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unFlipCards() {
    lockBoard = true;

    //Não deu match
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1000)
}

function resetBoard() {
    [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null]
}

// Criando uma função auto invocada
(function shuffle() {
    cards.forEach(card => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition
    });
})();

cards.forEach(cards => cards.addEventListener('click', flipCard))