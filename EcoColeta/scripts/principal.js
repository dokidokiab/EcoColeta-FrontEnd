const cardSlider = document.querySelector('.card-slider');
const cards = document.querySelectorAll('.card');

let cardIndex = 0;

function showCard(index) {
    cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

showCard(cardIndex);

setInterval(() => {
    cardIndex = (cardIndex + 1) % 3;
    showCard(cardIndex);
}, 3000);
