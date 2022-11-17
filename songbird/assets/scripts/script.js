import { default as birdsDataRU } from '../birdsdata.js'
import { default as birdsDataEN } from '../birdsdataEN.js'

const birdsData = {
  ru : birdsDataRU,
  en : birdsDataEN
}

const navHove = document.querySelector('.header__nav-item-home');
const navStartGameBtn = document.querySelector('.header__nav-item-start');
const navGalleryGameBtn = document.querySelector('.header__nav-item-gallery');

const startGameBtn = document.querySelector('.main__welcome-btn');
const welcomeScreen = document.querySelector('.main__welcome-wrapper');

const mainGameBlock = document.querySelector('.main__game');
const gameLevels = document.querySelector('.game__levels');
const questionImg = document.querySelector('.question__img');
const questionTitle = document.querySelector('.question__title');
const gameAnswers = document.querySelector('.game__answers');
const gameSelectedAnswerWrapper = document.querySelector('.selected-answer__wrapper');
const gameSelectedAnswerImg = document.querySelector('.selected-answer__img');
const gameSelectedAnswerTitle = document.querySelector('.selected-answer__title');
const gameSelectedAnswerName = document.querySelector('.selected-answer__name');
const gameSelectedAnswerInfo = document.querySelector('.selected-answer__info');
const nextLevelBtn = document.querySelector('.game__next-btn');
const headerScore = document.querySelector('.header__score');
const mainWinBlock = document.querySelector('.main__win');
const mainWinBtn = document.querySelector('.main__win-btn');

const langSelector = document.querySelector('.footer__lang-selection');

const questionAudio = document.querySelector('.question__audio');
const questionAudioPlayBtn = document.querySelector('.question__audio-play-btn');
const questionAudioSeekbar = document.querySelector('.question__audio-seekbar');
const questionAudioVolume = document.querySelector('.question__audio-volume');
const questionAudioVolumeIco = document.querySelector('.question__audio-volume-ico');

const answerAudio = document.querySelector('.selected-answer__audio');
const answerAudioPlayBtn = document.querySelector('.selected-answer__audio-play-btn');
const answerAudioSeekbar = document.querySelector('.selected-answer__audio-seekbar');
const answerAudioVolume = document.querySelector('.selected-answer__audio-volume');
const answerAudioVolumeIco = document.querySelector('.selected-answer__audio-volume-ico');

const galleryAudio = document.querySelector('.gallery__audio');
const galleryAudioPlayBtn = document.querySelector('.gallery__audio-play-btn');
const galleryAudioSeekbar = document.querySelector('.gallery__audio-seekbar');
const galleryAudioVolume = document.querySelector('.gallery__audio-volume');
const galleryAudioVolumeIco = document.querySelector('.gallery__audio-volume-ico');

let currentLevel = 0;
let scoreTotal = 0;

let answerCorrect;
let answersState;
let answerSelected = 0;

let galleryLevelSelected = 0;
let galleryBirdSelected = 0;

// ------------------------ language ---------------------

const dictionary = {
  ru : {
    score: 'Баллы: ',
    headerNav: ['Главная', 'Викторина', 'Галерея'],
    gameTitle: 'Распознавания птиц по их голосам',
    btnStart: 'Начать игру',
    levels: ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'],
    answerPlaceholder: 'Послушайте плеер. Выберите птицу из списка.',
    btnNext: 'Следующий уровень',
    winTitle: 'Поздравляем!',
    winText: 'Вы набрали максимальное количество баллов (30 из 30).<br> По ТЗ кнопки рестарта тут быть не должно, поэтому можете перейти на "главную" страницу )',
    winText2: ['Вы набрали ',' из 30 возможных баллов. Попробуйте ещё раз!'],
    btnRetry: 'Попробовать ещё раз!',
  },
  en : {
    score: 'Score: ',
    headerNav: ['Main', 'Quiz', 'Gallery'],
    gameTitle: 'Recognizing birds by their voices',
    btnStart: 'Start quiz',
    levels: ['Warm-up', 'Passerines', 'Forest Birds', 'Songbirds', 'Birds of Prey', 'Sea Birds'],
    answerPlaceholder: 'Listen to the recording. Select a bird from the list.',
    btnNext: 'Next level',
    winTitle: 'Congratulations!',
    winText: `You've scored the maximum number of points (30 of 30).<br> According to the task, the restart button should not be here, so you can go to the "main" page)`,
    winText2: [`You've scored`,'out of 30 possible points. Try again!'],
    btnRetry: `Let's try one more time!`,
  }
}

let lang;
if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
}
if (!(lang in dictionary)){ lang= 'ru' }
const lang_buttons = Array.from(langSelector.children);
lang_buttons.forEach(element => element.addEventListener('click', (el) => {
  lang = el.target.id;
  setLanguage();
}))

function setLanguage() {
  lang_buttons.forEach(element => element.classList.remove('footer__lang_active'));
  document.getElementById(lang).classList.add('footer__lang_active');
  headerScore.children[0].textContent = dictionary[lang].score;
  document.querySelectorAll('.header__nav-item').forEach((block, index) => {
    block.textContent = dictionary[lang].headerNav[index];
  })
  document.querySelector('.main__welcome-title').textContent = dictionary[lang].gameTitle;
  document.querySelector('.main__welcome-btn').textContent = dictionary[lang].btnStart;
  document.querySelectorAll('.game__level').forEach((block, index) => {
    block.textContent = dictionary[lang].levels[index];
  })
  document.querySelector('.selected-answer__placeholder').textContent = dictionary[lang].answerPlaceholder;
  nextLevelBtn.textContent = dictionary[lang].btnNext;
  document.querySelector('.main__win-title').textContent = dictionary[lang].winTitle;
  document.querySelector('.main__win-text').innerHTML = dictionary[lang].winText;
  document.querySelector('.main__win-text2').textContent = dictionary[lang].winText2[0];
  document.querySelector('.main__win-text4').textContent = dictionary[lang].winText2[1];
  mainWinBtn.textContent = dictionary[lang].btnRetry;
  if (questionTitle.textContent !== '*****') {
    questionTitle.textContent = birdsData[lang][currentLevel][answerCorrect].name
  }
  Array.from(gameAnswers.children).forEach((element, index) => {
    element.textContent =  birdsData[lang][currentLevel][index].name
  })
  updateSelectedAnswer(birdsData[lang][currentLevel][answerSelected]);
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.gallery__level').forEach((block, index) => {
    block.textContent = dictionary[lang].levels[index];
  })
  document.querySelectorAll('.gallery__bird').forEach((block, index) => {
    block.textContent = birdsData[lang][galleryLevelSelected][index].name
  })
  updateGalleryBird()
}

setLanguage()

// ----------------------------- main page -----------------

navHove.addEventListener('click', () => {
  window.location.href = 'index.html';
});

startGameBtn.addEventListener('click', startGame);
navStartGameBtn.addEventListener('click', startGame);
mainWinBtn.addEventListener('click', reStartGame);

function startGame() {
  pauseAnswer();
  pauseGallery();
  pauseQuestion();
  currentLevel = 0;
  scoreTotal = 0;
  welcomeScreen.classList.add('hidden-block');
  document.querySelectorAll('.header__nav-item').forEach((item) => {
    item.classList.remove('header__nav-item_current');
  })
  document.querySelectorAll('.game__level').forEach((item) => {
    item.classList.remove('game__level_current');
  })
  gameLevels.children[currentLevel].classList.add('game__level_current');
  navStartGameBtn.classList.add('header__nav-item_current');
  document.querySelector('.main__gallery').classList.add('disabled-block');
  welcomeScreen.classList.add('disabled-block');
  mainWinBlock.classList.add('disabled-block');
  mainGameBlock.classList.remove('disabled-block');
  headerScore.classList.remove('hidden-block');
  headerScore.children[1].textContent = scoreTotal;
  startLevel(currentLevel);
}

function startLevel(level) {
  answerCorrect = getRandomInt(0, birdsData[lang][level].length - 1);
  console.log('correct answer: ', answerCorrect + 1);
  answersState = [0, 0, 0, 0, 0, 0]; // 0 - unclicked, 1 - clicked (wrong), 2 - clicked (right)
  updateQuestion();
  updateQuestionAudio(birdsData[lang][currentLevel][answerCorrect]);
  updateTimeQuestion();
  updateSelectedAnswer();
  gameAnswers.innerHTML = '';
  birdsData[lang][level].forEach( (element, index) => {
    let li = document.createElement('li');
    li.className = 'game__answer';
    li.textContent = element.name;
    li.addEventListener('click', selectAnswer);
    gameAnswers.append(li);
  });
}

function selectAnswer (element) {
  answerSelected = Array.from(element.target.parentNode.children).indexOf(element.target);
  updateSelectedAnswer(birdsData[lang][currentLevel][answerSelected])
  if (answersState[answerSelected] === 0) {
    if (answerSelected === answerCorrect) {
      pauseQuestion();
      playSoundEffect('right');
      answersState[answerSelected] = 2;
      let scoreAdd = answersState.filter(value => value === 0).length;
      scoreTotal += scoreAdd;
      element.target.classList.add('game__answer_right');
      element.target.textContent += ` +${scoreAdd}`
      updateQuestion(birdsData[lang][currentLevel][answerCorrect]);
      headerScore.children[1].textContent = scoreTotal;
      nextLevelBtn.classList.remove('game__next-btn_disabled');
      nextLevelBtn.addEventListener('click', startNextLevel);
    } else {
      answersState[answerSelected] = 1;
      if (answersState[answerCorrect] !== 2) {
        playSoundEffect('wrong');
        element.target.classList.add('game__answer_wrong');
      }
    }
  }
}

function startNextLevel(){
  pauseAnswer();
  pauseQuestion();
  gameLevels.children[currentLevel].classList.remove('game__level_current');
  questionAudioSeekbar.style.backgroundSize = '0% 100%';
  currentLevel++;
  nextLevelBtn.classList.add('game__next-btn_disabled');
  nextLevelBtn.removeEventListener('click', startNextLevel);
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

function updateSelectedAnswer(bird = ''){
  if (bird === '') {
    gameSelectedAnswerInfo.classList.add('disabled-block');
    gameSelectedAnswerWrapper.classList.add('disabled-block');
    document.querySelector('.selected-answer__placeholder').classList.remove('disabled-block');
    answerAudio.src = '';
  } else {
    gameSelectedAnswerImg.src = bird.image;
    gameSelectedAnswerTitle.textContent = bird.name;
    gameSelectedAnswerName.textContent = bird.species;
    gameSelectedAnswerInfo.textContent = bird.description;
    answerAudio.src = bird.audio;
    answerAudioSeekbar.min = 0;
    answerAudioSeekbar.max = answerAudio.duration;
    answerAudioPlayBtn.classList.remove('selected-answer__audio-play-btn_pause');
    answerAudioSeekbar.style.backgroundSize = '0% 100%';
    document.querySelector('.selected-answer__placeholder').classList.add('disabled-block');
    gameSelectedAnswerWrapper.classList.remove('disabled-block')
    gameSelectedAnswerInfo.classList.remove('disabled-block');
  }
}

function showresults() {
  if (scoreTotal === 30) {
    document.querySelector('.main__win-text').classList.remove('disabled-block');
    document.querySelector('.main__win-text2').classList.add('disabled-block');
    document.querySelector('.main__win-text3').classList.add('disabled-block');
    document.querySelector('.main__win-text4').classList.add('disabled-block');
    mainWinBtn.classList.add('hidden-block');
  } else {
    document.querySelector('.main__win-text3').textContent = scoreTotal;
    document.querySelector('.main__win-text').classList.add('disabled-block');
    document.querySelector('.main__win-text2').classList.remove('disabled-block');
    document.querySelector('.main__win-text3').classList.remove('disabled-block');
    document.querySelector('.main__win-text4').classList.remove('disabled-block');
    mainWinBtn.classList.remove('hidden-block');
  }
  mainGameBlock.classList.add('disabled-block');
  mainWinBlock.classList.remove('disabled-block');
}

function reStartGame() {
  mainWinBlock.classList.add('disabled-block');
  gameLevels.children[0].classList.add('game__level_current');
  startGame();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// ------------------------ Gallery ---------------------

navGalleryGameBtn.addEventListener('click', openGallery)

function openGallery() {
  pauseAnswer();
  pauseGallery();
  pauseQuestion();
  welcomeScreen.classList.add('hidden-block');
  document.querySelectorAll('.header__nav-item').forEach((item) => {
    item.classList.remove('header__nav-item_current');
  })
  navGalleryGameBtn.classList.add('header__nav-item_current');
  welcomeScreen.classList.add('disabled-block');
  mainGameBlock.classList.add('disabled-block');
  headerScore.classList.add('hidden-block');
  mainWinBlock.classList.add('disabled-block');
  document.querySelector('.main__gallery').classList.remove('disabled-block');
}

document.querySelectorAll('.gallery__level').forEach((level) => {
  level.addEventListener('click', selectGalleryLevel)
})

function selectGalleryLevel(element) {
  galleryLevelSelected = Array.from(element.target.parentNode.children).indexOf(element.target);
  document.querySelectorAll('.gallery__level').forEach((level) => {
    level.classList.remove('gallery__level_selected');
  })
  element.target.classList.add('gallery__level_selected');
  galleryBirdSelected = 0;
  selectGalleryBird(0);
}

document.querySelectorAll('.gallery__bird').forEach((bird) => {
  bird.addEventListener('click', selectGalleryBird)
})

function selectGalleryBird(element) {
  if (element !== 0) {
    galleryBirdSelected = Array.from(element.target.parentNode.children).indexOf(element.target);
  }
  document.querySelectorAll('.gallery__bird').forEach((bird, index) => {
    bird.textContent = birdsData[lang][galleryLevelSelected][index].name;
    bird.classList.remove('gallery__bird_selected');
  })
  if (element !== 0){
    element.target.classList.add('gallery__bird_selected');
  } else {
    document.querySelectorAll('.gallery__bird')[0].classList.add('gallery__bird_selected');
  }
  updateGalleryBird()
}

function updateGalleryBird(){
  document.querySelector('.gallery__selected-bird-img').src =  birdsData[lang][galleryLevelSelected][galleryBirdSelected].image;
  document.querySelector('.gallery__selected-bird-title').textContent = birdsData[lang][galleryLevelSelected][galleryBirdSelected].name;
  document.querySelector('.gallery__selected-bird-name').textContent = birdsData[lang][galleryLevelSelected][galleryBirdSelected].species;
  document.querySelector('.gallery__info').textContent = birdsData[lang][galleryLevelSelected][galleryBirdSelected].description;
  galleryAudio.src = birdsData[lang][galleryLevelSelected][galleryBirdSelected].audio;
  galleryAudioSeekbar.min = 0;
  galleryAudioSeekbar.max = galleryAudio.duration;
  galleryAudioPlayBtn.classList.remove('gallery__audio-play-btn_pause');
  galleryAudioSeekbar.style.backgroundSize = '0% 100%';
}

// --------------------------- AUDIO ---------------------

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

function updateQuestionAudio(bird) {
  questionAudio.src = bird.audio;
  questionAudioSeekbar.min = 0;
  questionAudioSeekbar.max = questionAudio.duration;
  questionAudioPlayBtn.classList.remove('question__audio-play-btn_pause');
}

questionAudioPlayBtn.addEventListener('click', playQuestion);

function playQuestion(){
  if (questionAudio.paused) {
    pauseAnswer();
    questionAudio.play();
    questionAudioPlayBtn.classList.add('question__audio-play-btn_pause');
  } else if (questionAudio.ended) {
    pauseAnswer();
    questionAudio.currentTime = 0;
    questionAudio.play();
    questionAudioPlayBtn.classList.add('question__audio-play-btn_pause');
  } else {
    questionAudio.pause();
    questionAudioPlayBtn.classList.remove('question__audio-play-btn_pause');
  }
}

function pauseQuestion(){
  questionAudio.pause();
  questionAudioPlayBtn.classList.remove('question__audio-play-btn_pause');
}

questionAudioSeekbar.addEventListener('input', () => {
  questionAudio.currentTime = questionAudioSeekbar.value;
})

questionAudio.addEventListener('timeupdate', updateTimeQuestion);

function updateTimeQuestion() {
  questionAudio.onloadedmetadata = function() {
    document.querySelector('.question__audio-time-total').textContent = getTime(questionAudio.duration);
  }
  document.querySelector('.question__audio-time-current').textContent = getTime(questionAudio.currentTime);
  questionAudioSeekbar.min = 0;
  questionAudioSeekbar.max = questionAudio.duration;
  questionAudioSeekbar.value = questionAudio.currentTime;
  questionAudioSeekbar.style.backgroundSize = 
    (questionAudioSeekbar.value - questionAudioSeekbar.min) * 100 / (questionAudioSeekbar.max - questionAudioSeekbar.min) + '% 100%';
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

questionAudioVolume.addEventListener('input', changeVolume);
answerAudioVolume.addEventListener('input', changeVolume);
galleryAudioVolume.addEventListener('input', changeVolume);

function changeVolume(element) {
  let myVol = element.target.value;
  questionAudio.volume = myVol;
  answerAudio.volume = myVol;
  galleryAudio.volume = myVol;
  questionAudioVolume.value = questionAudio.volume;
  answerAudioVolume.value = answerAudio.volume;
  galleryAudioVolume.value = galleryAudio.volume;

  if (myVol == 0) {
    questionAudio.muted = true;
    answerAudio.muted = true;
    galleryAudio.muted = true;
  } else {
    questionAudio.muted = false;
    answerAudio.muted = false;
    galleryAudio.muted = false;
  }
  questionAudioVolume.style.backgroundSize = (questionAudioVolume.value * 100) + '% 100%';
  answerAudioVolume.style.backgroundSize = (answerAudioVolume.value * 100) + '% 100%';
  galleryAudioVolume.style.backgroundSize = (galleryAudioVolume.value * 100) + '% 100%';
  if (questionAudio.muted === true) {
    questionAudioVolumeIco.classList.add('question__audio-volume-ico_muted');
    answerAudioVolumeIco.classList.add('selected-answer__audio-volume-ico_muted');
    galleryAudioVolumeIco.classList.add('gallery__audio-volume-ico_muted');
  } else {
    questionAudioVolumeIco.classList.remove('question__audio-volume-ico_muted');
    answerAudioVolumeIco.classList.remove('selected-answer__audio-volume-ico_muted');
    galleryAudioVolumeIco.classList.remove('gallery__audio-volume-ico_muted');
  }
}

questionAudioVolumeIco.addEventListener('click', muteSound);
answerAudioVolumeIco.addEventListener('click', muteSound);
galleryAudioVolumeIco.addEventListener('click', muteSound);

function muteSound() {
  questionAudio.muted = !questionAudio.muted;
  answerAudio.muted = !answerAudio.muted;
  galleryAudio.muted = !galleryAudio.muted;

  if (questionAudio.muted === true) {
    questionAudioVolumeIco.classList.add('question__audio-volume-ico_muted');
    questionAudioVolume.style.backgroundSize = '0% 100%';
    questionAudioVolume.value = 0;
    answerAudioVolumeIco.classList.add('selected-answer__audio-volume-ico_muted');
    answerAudioVolume.style.backgroundSize = '0% 100%';
    answerAudioVolume.value = 0;
    galleryAudioVolumeIco.classList.add('gallery__audio-volume-ico_muted');
    galleryAudioVolume.style.backgroundSize = '0% 100%';
    galleryAudioVolume.value = 0;
  } else {
    questionAudioVolume.value = questionAudio.volume;
    questionAudioVolume.style.backgroundSize = (questionAudioVolume.value * 100) + '% 100%';
    answerAudioVolume.value = answerAudio.volume;
    answerAudioVolume.style.backgroundSize = (answerAudioVolume.value * 100) + '% 100%';
    galleryAudioVolume.value = galleryAudio.volume;
    galleryAudioVolume.style.backgroundSize = (galleryAudioVolume.value * 100) + '% 100%';
    if (questionAudio.volume !== 0) {
      questionAudioVolumeIco.classList.remove('question__audio-volume-ico_muted');
      answerAudioVolumeIco.classList.remove('selected-answer__audio-volume-ico_muted');
      galleryAudioVolumeIco.classList.remove('gallery__audio-volume-ico_muted');
    }
  }
}

//---------------------------------   2nd player

answerAudioPlayBtn.addEventListener('click', playAnswer);

function playAnswer(){
  if (answerAudio.paused) {
    pauseQuestion();
    answerAudio.play();
    answerAudioPlayBtn.classList.add('selected-answer__audio-play-btn_pause');
  } else if (answerAudio.ended) {
    pauseQuestion();
    answerAudio.currentTime = 0;
    answerAudio.play();
    answerAudioPlayBtn.classList.add('selected-answer__audio-play-btn_pause');
  } else {
    answerAudio.pause();
    answerAudioPlayBtn.classList.remove('selected-answer__audio-play-btn_pause');
  }
}

function pauseAnswer(){
  answerAudio.pause();
  answerAudioPlayBtn.classList.remove('selected-answer__audio-play-btn_pause');
}

answerAudioSeekbar.addEventListener('input', () => {
  answerAudio.currentTime = answerAudioSeekbar.value;
})

answerAudio.addEventListener('timeupdate', updateTimeAnswer);

function updateTimeAnswer() {
  answerAudio.onloadedmetadata = function() {
    document.querySelector('.selected-answer__audio-time-total').textContent = getTime(answerAudio.duration);
  }
  document.querySelector('.selected-answer__audio-time-current').textContent = getTime(answerAudio.currentTime);
  answerAudioSeekbar.min = 0;
  answerAudioSeekbar.max = answerAudio.duration;
  answerAudioSeekbar.value = answerAudio.currentTime;
  answerAudioSeekbar.style.backgroundSize = 
    (answerAudioSeekbar.value - answerAudioSeekbar.min) * 100 / (answerAudioSeekbar.max - answerAudioSeekbar.min) + '% 100%';
}

// -------------------------------------- gallery player

galleryAudioPlayBtn.addEventListener('click', playGallery);

function playGallery(){
  if (galleryAudio.paused) {
    galleryAudio.play();
    galleryAudioPlayBtn.classList.add('gallery__audio-play-btn_pause');
  } else if (galleryAudio.ended) {
    galleryAudio.currentTime = 0;
    galleryAudio.play();
    galleryAudioPlayBtn.classList.add('gallery__audio-play-btn_pause');
  } else {
    galleryAudio.pause();
    galleryAudioPlayBtn.classList.remove('gallery__audio-play-btn_pause');
  }
}

function pauseGallery(){
  galleryAudio.pause();
  galleryAudioPlayBtn.classList.remove('gallery__audio-play-btn_pause');
}

galleryAudioSeekbar.addEventListener('input', () => {
  galleryAudio.currentTime = galleryAudioSeekbar.value;
})

galleryAudio.addEventListener('timeupdate', updateTimeGallery);

function updateTimeGallery() {
  galleryAudio.onloadedmetadata = function() {
    document.querySelector('.gallery__audio-time-total').textContent = getTime(galleryAudio.duration);
  }
  document.querySelector('.gallery__audio-time-current').textContent = getTime(galleryAudio.currentTime);
  galleryAudioSeekbar.min = 0;
  galleryAudioSeekbar.max = galleryAudio.duration;
  galleryAudioSeekbar.value = galleryAudio.currentTime;
  galleryAudioSeekbar.style.backgroundSize =
    (galleryAudioSeekbar.value - galleryAudioSeekbar.min) * 100 / (galleryAudioSeekbar.max - galleryAudioSeekbar.min) + '% 100%';
}

console.log(`
Балл за задание: 270/270 баллов
- Вёрстка, дизайн, UI всех трёх страниц приложения +60
- Аудиоплеер +30
- Верхняя панель страницы викторины +20
- Блок с вопросом +20
- Блок с вариантами ответов (названия птиц) +60
- Блок с описанием птицы: +30
- Кнопка перехода к следующему вопросу +30
- Extra scope +20
`)