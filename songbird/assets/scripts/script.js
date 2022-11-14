import birdsData from '../birdsdata.js'

const startGameBtn = document.querySelector('.main__welcome-btn');
const navHove = document.querySelector('.header__nav-item-home');
const navStartGameBtn = document.querySelector('.header__nav-item-start');
const welcomeScreen = document.querySelector('.main__welcome-wrapper');
const gameAnswers = document.querySelector('.game__answers')


navHove.addEventListener('click', () => {
  window.location.href = 'index.html';
});

startGameBtn.addEventListener('click', startGame);
navStartGameBtn.addEventListener('click', startGame);

function startGame() {
  welcomeScreen.classList.add('hidden-block');
  navHove.classList.remove('header__nav-item_current');
  navStartGameBtn.classList.add('header__nav-item_current');
  welcomeScreen.addEventListener('transitionend', () => {
    welcomeScreen.classList.add('disabled-block');
  });

  let level = 0;
  startLevel(level)
}

function startLevel(level) {

  gameAnswers.innerHTML = "";
  birdsData[level].forEach(element => {
    let li = document.createElement('li');
    li.className = 'game__answer';
    li.textContent = element.name;
    gameAnswers.append(li);
  });

}