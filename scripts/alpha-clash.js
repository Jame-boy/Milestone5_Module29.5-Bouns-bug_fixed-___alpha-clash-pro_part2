let isGamePlayOn = false;
artBoard = document.getElementById("art-board");

function play() {
    console.log('play button clicked');
    // hide everything show only the playground
    hideElementById('home-screen');
    hideElementById('final-score');
    showElementById('play-ground');

    // reset score and life
    setTextElementValueById('current-life', 5);
    setTextElementValueById('current-score', 0);

    isGamePlayOn = true;
    showModalVar = false;

    continueGame();
}

document.addEventListener('keyup', handleKeyboardKeyUpEvent);
const audio = new Audio();

function handleKeyboardKeyUpEvent(event) {
    const playerPressed = event.key;
    console.log('player pressed', playerPressed);

    if (!isGamePlayOn) return;

    // stop the game if pressed 'Esc'
    if (playerPressed === 'Escape') {
        gameOver();
    }

    // key player is expected to press
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();

    // check right or wrong key pressed
    if (playerPressed === expectedAlphabet) {
        console.log('you got a point!');

        // audio.src = "../audio/seccessSound.mp3";
        // to listen on github
        audio.src = "seccessSound.mp3";
        audio.play();

        const currentScore = getTextElementValueById('current-score');
        const updatedScore = currentScore + 1;
        setTextElementValueById('current-score', updatedScore);

        const newScore = currentScore + 1;

        // start a new round
        removeBackgroundColorById(expectedAlphabet);
        continueGame();
    }
    else {
        console.log('ধুর ভাইয়া বা আপু...right key press koro');

        // audio.src = "../audio/wrongAnswer.mp3";
        //to listen sound in github
        audio.src = "wrongAnswer.mp3";
        audio.play();

        const currentLife = getTextElementValueById('current-life');
        const updatedLife = currentLife - 1;

        // added red gradient on score board
        const updatedLifePercentage = (updatedLife / 5) * 100;
        artBoard.style.background = `linear-gradient(#FFFFFFB3 ${updatedLifePercentage}%, red)`;

        setTextElementValueById('current-life', updatedLife);

        if (updatedLife === 0) {
            gameOver();
        }
    }
}

function continueGame() {
    // step -1: generate a random alphabet
    const alphabet = getARandomAlphabet();
    // console.log('your random alphabet', alphabet);

    // set randomly generated alphabet to the screen (show it)
    const currentAlphabetElement = document.getElementById('current-alphabet');
    currentAlphabetElement.innerText = alphabet;

    // set background color
    setBackgroundColorById(alphabet);
}


function gameOver() {
    hideElementById('play-ground');
    showElementById('final-score');
    // update final score
    // 1.get the final score
    const lastScore = getTextElementValueById('current-score');
    console.log(lastScore);
    setTextElementValueById('last-score', lastScore);

    // clear the last selected alphabet highlight
    const currentAlphabet = getElementTextById('current-alphabet');
    // console.log(currentAlphabet);
    removeBackgroundColorById(currentAlphabet);
    isGamePlayOn = false;
    showModalVar = true;

    artBoard.style.background = `linear-gradient(#FFFFFFB3 100%, red)`;
}

let showModalVar = false;
function modalOpen(event) {
    console.log(event);
    if (event.clientY < 20 && showModalVar) {
        my_modal_3.showModal();
    }
}
document.body.onmousemove = modalOpen;