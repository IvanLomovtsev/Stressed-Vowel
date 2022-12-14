const buttonTrue = document.querySelector('.main__control-button-true');
const buttonFalse = document.querySelector('.main__control-button-false');
const scoringField = document.querySelector('.main__scores-score');
const startWord = document.querySelector('.main__card-start-word');
const stressedLetter = document.querySelector('.main__card-stressed-letter');
const endWord = document.querySelector('.main__card-end-word');
const lossHealh = document.querySelector('.main__health-loss');
const losePopupBackground = document.querySelector('.popup');
const losePopup = document.querySelector('.popup__elements');
const finalScores = document.querySelector('.popup__elements-message-scores');


let currentWord = '';
let testCurentWord = '';
let trueWord = '';
let score = 0;
let health = 0;
scoringField.textContent = score;
lossHealh.style.width = "0%";
let updateHealth = setInterval(()=>{
    health+=1;
    lossHealh.style.width = health + '%';
    if (health === 100){
        clearInterval(updateHealth);
        finalScores.textContent = score;
        losePopup.style.top = "0"
        losePopupBackground.style.top = "0";
        losePopup.style.top = "25vw";
    }
},300);

function getNewWord() {
    const words = 'js/data.json';
    fetch(words)
      .then(res => res.json())
      .then(data => { 
        let numTestStressedVowel;
        const num = getRandomIntInclusive(0, data.length-1);
        currentWord = data[num]["true"];
        const choice = getRandomIntInclusive(0, 1);
        console.log(currentWord);
        console.log(choice);
        if (choice === 0){
            testCurentWord = currentWord;
            let upVowel = ["А", "У", "О", "Ы", "Э", "Я", "Ю", "Ё", "И", "Е"];
            upVowel.forEach (letter =>{
                let searchVowel = testCurentWord.indexOf(letter);
                if (searchVowel !== (-1)){
                    numTestStressedVowel = searchVowel;
                }
            })
        }
        else {
            let lowCurrentWord = currentWord.toLowerCase();
            let lowVowel = ["а", "у", "о", "ы", "э", "я", "ю", "ё", "и", "е"];
            let arrayVowels = [];
            lowCurrentWord = lowCurrentWord.split('');
            lowVowel.forEach (letter =>{
                for (let i=0; i<lowCurrentWord.length; i++) {
                    if (letter==lowCurrentWord[i]){
                        arrayVowels.push(i);
                    }
                }
            })
            
            numTestStressedVowel = arrayVowels[getRandomIntInclusive(0, arrayVowels.length-1)];
            lowCurrentWord[numTestStressedVowel] = lowCurrentWord[numTestStressedVowel].toUpperCase();
            testCurentWord = lowCurrentWord.join('')   
        }
        console.log(numTestStressedVowel);
        startWord.textContent = testCurentWord.slice(0,numTestStressedVowel);
        stressedLetter.textContent = testCurentWord[numTestStressedVowel];
        endWord.textContent = testCurentWord.slice(numTestStressedVowel+1);

      });
    }
getNewWord();
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
buttonTrue.addEventListener("click", () => {
    if (currentWord == testCurentWord){
        score+=100;
        health-=10;
        if (health<=0){
            health = 0;
        }
        scoringField.textContent = score;
        getNewWord();
    }
    else {
        score-=100;
        if (score<=0){
            score = 0;
        }
        health+=10;
        scoringField.textContent = score;
        getNewWord();
    }
})
buttonFalse.addEventListener("click", () => {
    if (currentWord !== testCurentWord){
        score+=100;
        health-=10;
        if (health<=0){
            health = 0;
        }
        scoringField.textContent = score;
        getNewWord();
    }
    else {
        score-=100;
        if (score<=0){
            score = 0;
        }
        health+=10;
        scoringField.textContent = score;
        getNewWord();
    }
})