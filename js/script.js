const btnTrue = document.querySelector('.main__control-button-true');
const btnFalse = document.querySelector('.main__control-button-false');
const scoringField = document.querySelector('.main__scores-score');

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

        const startWord = document.querySelector('.main__card-start-word');
        const stressedVovel = document.querySelector('.main__card-stressed-letter');
        const endWord = document.querySelector('.main__card-end-word');
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
                        console.log(letter);
                        stressedVovel.textContent = letter;
                        console.log(stressedVovel.innerHTML);
                        endWord.textContent = word[1];
                        console.log(endWord.innerHTML);
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