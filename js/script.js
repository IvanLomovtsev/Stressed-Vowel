const btnTrue = document.querySelector('.btn-true');
const btnFalse = document.querySelector('.btn-false');
const scoringField = document.querySelector('.score');

let currentWord = '';
let trueWord = '';
let score = 0;
scoringField.textContent = score;

function getNewWord() {
    const words = 'js/data.json';
    fetch(words)
      .then(res => res.json())
      .then(data => { 
        const num = getRandomIntInclusive(0, data.length-1);
        const numCurrentWord = getRandomIntInclusive(0, Object.keys(data[num]).length-1);
        currentWord = data[num][(Object.keys(data[num])[numCurrentWord])];
        trueWord = data[num]['true'];
        const displayedWord = document.querySelector('.word');
        console.log(currentWord);
        displayedWord.textContent = currentWord;
      });
    }
getNewWord();
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
btnTrue.addEventListener("click", compareWord => {
    if (currentWord === trueWord){
        score+=100;
        scoringField.textContent = score;
        getNewWord();
    }
    else {
        score-=100;
        scoringField.textContent = score;
        getNewWord();
    }
})
btnFalse.addEventListener("click", compareWord => {
    if (currentWord !== trueWord){
        score+=100;
        scoringField.textContent = score;
        getNewWord();
    }
    else {
        score-=100;
        scoringField.textContent = score;
        getNewWord();
    }
})