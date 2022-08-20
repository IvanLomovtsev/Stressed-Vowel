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
        const startWord = document.querySelector('.start-word');
        const stressedVovel = document.querySelector('.stressed-vowel');
        const endWord = document.querySelector('.end-word');
        function searchStressedVovel(currentWord) {
            let vowel = ["А", "У", "О","Ы", "Э", "Я", "Ю", "Ё", "И", "Е"];
            let word;
            vowel.forEach(letter =>{
                if (currentWord.indexOf(letter) !== -1){
                    if(currentWord.indexOf(letter)===0){
                        word = currentWord.split(letter);
                        startWord.textContent=''
                        stressedVovel.textContent = letter;
                        endWord.textContent = word[1];
                    }
                    else {
                        word = currentWord.split(letter);
                        startWord.textContent = word[0];
                        stressedVovel.textContent = letter;
                        endWord.textContent = word[1];
                    }
                }
        })
        }
        searchStressedVovel(currentWord);
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