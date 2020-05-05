const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false

function flipCard() {
    // trancando o click em outros cards
    if (lockBoard) return;

    // trancando duplo click
    if (this === firstCard) return

    // se a classe existir, remove, senão adicione
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;
        console.log(firstCard)

        checkForMatch()
    }
}

function checkForMatch() {
    // Deu Match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

function unFlipCards() {
    lockBoard = true;

    //Não deu match
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        lockBoard = false
    }, 1000)
}

function resetBoard() {
    hasFlippedCard, lockBoard = [false, false]
    firstCard, secondCard = [null, null]
}

// Criando uma função auto invocada
(function shuffle() {
    cards.forEach(cad => {
        let ramdomPosition = Math.floor(Math.ramdom() * 12);
        cards.style.order = ramdomPosition
    })
})()

cards.forEach(cards => cards.addEventListener('click', flipCard))