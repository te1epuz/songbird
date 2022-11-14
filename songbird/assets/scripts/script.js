import birdsData from '../birdsdata.js'

const startGameBtn = document.querySelector('.main__welcome-btn');
const navHove = document.querySelector('.header__nav-item-home');
const welcomeScreen = document.querySelector('.main__welcome-wrapper');
const navStartGameBtn = document.querySelector('.header__nav-item-start');

const mainGameBlock = document.querySelector('.main__game');
const gameLevels = document.querySelector('.game__levels');
const questionImg = document.querySelector('.question__img');
const questionTitle = document.querySelector('.question__title');
const gameAnswers = document.querySelector('.game__answers');
const nextLevelBtn = document.querySelector('.game__next-btn');


navHove.addEventListener('click', () => {
  window.location.href = 'index.html';
});

startGameBtn.addEventListener('click', startGame);
navStartGameBtn.addEventListener('click', startGame);


let currentLevel = 0;
let scoreTotal = 0;
function startGame() {
  welcomeScreen.classList.add('hidden-block');
  navHove.classList.remove('header__nav-item_current');
  navStartGameBtn.classList.add('header__nav-item_current');
  welcomeScreen.addEventListener('transitionend', () => {
    welcomeScreen.classList.add('disabled-block');
    mainGameBlock.classList.remove('disabled-block');

  });

  currentLevel = 0;
  scoreTotal = 0;
  startLevel(currentLevel)
}

let answerCorrect;
let answersState;

function startLevel(level) {
  console.log('start level: ' + level)
  answerCorrect = getRandomInt(0, birdsData[level].length - 1);
  console.log(birdsData[level].length, answerCorrect);
  answersState = [0, 0, 0, 0, 0, 0]; // 0 - unclicked, 1 - clicked (wrong), 2 - clicked (right)
  updateQuestion();

  gameAnswers.innerHTML = "";
  birdsData[level].forEach( (element, index) => {
    let li = document.createElement('li');
    li.className = 'game__answer';
    li.textContent = element.name;
    li.addEventListener('click', selectAnswer)
    gameAnswers.append(li);
  });

}

function selectAnswer (element) {
  let elementIndex = Array.from(element.target.parentNode.children).indexOf(element.target);
  
  if (answersState[elementIndex] === 0) {
    if (elementIndex === answerCorrect) {
      console.log('correct')
      answersState[elementIndex] = 2;
      let scoreAdd = answersState.filter(value => value === 0).length;
      scoreTotal += scoreAdd;
      console.log('total score: ' + scoreTotal)
      element.target.classList.add('game__answer_right');
      element.target.textContent += ` +${scoreAdd}`

      updateQuestion(birdsData[currentLevel][answerCorrect]);

      nextLevelBtn.classList.remove('game__next-btn_disabled');
      nextLevelBtn.addEventListener('click', startNextLevel)

    } else {
      answersState[elementIndex] = 1;
      if (answersState[answerCorrect] !== 2) {
        element.target.classList.add('game__answer_wrong');
      }
    }

  }
      console.log(answersState)
}

function startNextLevel(){
  console.log(gameLevels.children)
  gameLevels.children[currentLevel].classList.remove('game__level_current');
  currentLevel++;

  if (currentLevel === 6){
    console.log('WIN') // <<<<<------------------------ add win function
  }

  gameLevels.children[currentLevel].classList.add('game__level_current');
  startLevel(currentLevel);
}

function updateQuestion(bird = ''){
  if (bird === '') {
    questionImg.src = 'assets/images/unknown-bird.png';
    questionTitle.textContent = '*****';
  } else {
    questionImg.src = bird.image;
    questionTitle.textContent = bird.name;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}