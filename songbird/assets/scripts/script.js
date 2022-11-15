import birdsData from '../birdsdata.js'

const navHove = document.querySelector('.header__nav-item-home');
const navStartGameBtn = document.querySelector('.header__nav-item-start');

const startGameBtn = document.querySelector('.main__welcome-btn');
const welcomeScreen = document.querySelector('.main__welcome-wrapper');

const mainGameBlock = document.querySelector('.main__game');
const gameLevels = document.querySelector('.game__levels');
const questionImg = document.querySelector('.question__img');
const questionTitle = document.querySelector('.question__title');
const gameAnswers = document.querySelector('.game__answers');
const gameSelectedAnswer = document.querySelector('.game__selected-answer');
const gameSelectedAnswerWrapper = document.querySelector('.selected-answer__wrapper');
const gameSelectedAnswerImg = document.querySelector('.selected-answer__img');
const gameSelectedAnswerTitle = document.querySelector('.selected-answer__title');
const gameSelectedAnswerName = document.querySelector('.selected-answer__name');
const gameSelectedAnswerInfo = document.querySelector('.selected-answer__info');
const nextLevelBtn = document.querySelector('.game__next-btn');
const headerScore = document.querySelector('.header__score');
const mainWinBlock = document.querySelector('.main__win');
const mainWinText = document.querySelector('.main__win-text');
const mainWinBtn = document.querySelector('.main__win-btn');

const questionAudio = document.querySelector('.question__audio');
const questionAudioPlayBtn = document.querySelector('.question_audio-play-btn');
const questionAudioSeekbar = document.querySelector('.question_audio-seekbar');
const questionAudioVolume = document.querySelector('.question_audio-volume');

navHove.addEventListener('click', () => {
  window.location.href = 'index.html';
});

startGameBtn.addEventListener('click', startGame);
navStartGameBtn.addEventListener('click', startGame);
mainWinBtn.addEventListener('click', reStartGame);

let currentLevel = 0;
let scoreTotal = 0;

function startGame() {
  welcomeScreen.classList.add('hidden-block');
  navHove.classList.remove('header__nav-item_current');
  navStartGameBtn.classList.add('header__nav-item_current');
  welcomeScreen.classList.add('disabled-block');
  mainGameBlock.classList.remove('disabled-block');
  headerScore.classList.remove('hidden-block');

  currentLevel = 0;
  scoreTotal = 0;
  headerScore.textContent = `Score: ${scoreTotal}`;
  startLevel(currentLevel);
}

let answerCorrect;
let answersState;

function startLevel(level) {
  answerCorrect = getRandomInt(0, birdsData[level].length - 1);
  console.log('correct answer: ', answerCorrect + 1);
  answersState = [0, 0, 0, 0, 0, 0]; // 0 - unclicked, 1 - clicked (wrong), 2 - clicked (right)
  updateQuestion();
  updateQuestionAudio(birdsData[currentLevel][answerCorrect]);
  updateTimeQuestion();
  changeVolume();
  updateSelecredAnswer();

  gameAnswers.innerHTML = '';
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
  updateSelecredAnswer(birdsData[currentLevel][elementIndex])
  if (answersState[elementIndex] === 0) {
    if (elementIndex === answerCorrect) {
      pauseQuestion();
      playSoundEffect('right');
      answersState[elementIndex] = 2;
      let scoreAdd = answersState.filter(value => value === 0).length;
      scoreTotal += scoreAdd;
      element.target.classList.add('game__answer_right');
      element.target.textContent += ` +${scoreAdd}`

      updateQuestion(birdsData[currentLevel][answerCorrect]);
      headerScore.textContent = `Score: ${scoreTotal}`;

      nextLevelBtn.classList.remove('game__next-btn_disabled');
      nextLevelBtn.addEventListener('click', startNextLevel)

    } else {
      answersState[elementIndex] = 1;
      if (answersState[answerCorrect] !== 2) {
        playSoundEffect('wrong');
        element.target.classList.add('game__answer_wrong');
      }
    }

  }
}

function startNextLevel(){
  gameLevels.children[currentLevel].classList.remove('game__level_current');
  currentLevel++;
  nextLevelBtn.classList.add('game__next-btn_disabled');
  nextLevelBtn.removeEventListener('click', startNextLevel)

  if (currentLevel === 6){
    playSoundEffect('victory');
    showresults();
  } else {
    gameLevels.children[currentLevel].classList.add('game__level_current');
    startLevel(currentLevel);
  }
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

function updateSelecredAnswer(bird = ''){
  if (bird === '') {
    gameSelectedAnswerInfo.textContent = 'Послушайте плеер. Выберите птицу из списка.';
    gameSelectedAnswerWrapper.classList.add('disabled-block')
  } else {
    gameSelectedAnswerImg.src = bird.image;
    gameSelectedAnswerTitle.textContent = bird.name;
    gameSelectedAnswerName.textContent = bird.species;
    gameSelectedAnswerInfo.textContent = bird.description;
    gameSelectedAnswerWrapper.classList.remove('disabled-block')
  }
}

function showresults() {

  mainGameBlock.classList.add('disabled-block');
  mainWinBlock.classList.remove('disabled-block');
  if (scoreTotal === 30) {
    mainWinText.innerHTML = 'Вы набрали максимальное количество баллов (30 из 30).<br> По ТЗ кнопки рестарта тут быть не должно, поэтому можете перейти на "главную" страницу )'
    mainWinBtn.classList.add('hidden-block');
  } else {
    mainWinText.innerHTML = `Вы набрали ${scoreTotal} из 30 возможных баллов. Попробуйте ещё раз!`
  }
 


}

function reStartGame() {

  mainWinBlock.classList.add('disabled-block');
  gameLevels.children[0].classList.add('game__level_current');
  mainWinBtn.classList.remove('hidden-block');
  startGame();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// --------------------------- AUDIO ---------------------

function updateQuestionAudio(bird) {
  questionAudio.src = bird.audio;
  questionAudioSeekbar.min = 0;
  questionAudioSeekbar.max = questionAudio.duration;
  questionAudioPlayBtn.textContent = 'play';
}

questionAudioPlayBtn.addEventListener('click', playQuestion);

function playQuestion(){
  if (questionAudio.paused) {
    questionAudio.play();
    questionAudioPlayBtn.textContent = 'stop';
  } else if (questionAudio.ended) {
    questionAudio.currentTime = 0;
    questionAudio.play();
    questionAudioPlayBtn.textContent = 'stop';
  } else {
    questionAudio.pause();
    questionAudioPlayBtn.textContent = 'play';
  }
}

function pauseQuestion(){
  questionAudio.pause();
  questionAudioPlayBtn.textContent = 'play';
}

function playSoundEffect(sound) {
  let soundEffect;
  switch (sound) {
    case 'right':
      soundEffect = new Audio('assets/sounds/answer-right.mp3');
      break;
    case 'wrong':
      soundEffect = new Audio('assets/sounds/answer-wrong.wav');
      break;
    case 'victory':
      soundEffect = new Audio('assets/sounds/victory.wav');
      break;
    default:
      console.log("no sound found for " + sound);
  }
  soundEffect.volume = questionAudioVolume.value;
  soundEffect.play();
}

questionAudioVolume.addEventListener('input', changeVolume);
questionAudio.addEventListener('timeupdate', updateTimeQuestion);

function changeVolume() {
  let myVol = questionAudioVolume.value;
  questionAudio.volume = myVol;
  if (myVol == 0) {
    questionAudio.muted = true;
  } else {
    questionAudio.muted = false;
  }
}

function updateTimeQuestion() {
  questionAudio.onloadedmetadata = function() {
    document.querySelector('.question_audio-time-total').textContent = getTime(questionAudio.duration);
  }
  document.querySelector('.question_audio-time-current').textContent = getTime(questionAudio.currentTime);
  questionAudioSeekbar.min = questionAudio.startTime;
  questionAudioSeekbar.max = questionAudio.duration;
  questionAudioSeekbar.value = questionAudio.currentTime;
}

function getTime(time) {
  let sec = time;
  sec = sec % 3600;
  let min = Math.floor(sec / 60);
  sec = Math.floor(sec % 60);
  if (sec.toString().length < 2) { sec = "0" + sec; }
  if (min.toString().length < 2) { min = "0" + min; }
  return min + ":" + sec;
}

questionAudioSeekbar.addEventListener('input', () => {
  questionAudio.currentTime = questionAudioSeekbar.value;
})
// fires when seekbar is changed
// function ChangeTheTime() {
//   
// }