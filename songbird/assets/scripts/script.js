const startGameBtn = document.querySelector('.main__welcome-btn');
const navHove = document.querySelector('.header__nav-item-home');
const navStartGameBtn = document.querySelector('.header__nav-item-start');
const welcomeScreen = document.querySelector('.main__welcome-wrapper');


navHove.addEventListener('click', () => {
  window.location.href = 'index.html';
});

startGameBtn.addEventListener('click', startGame);
navStartGameBtn.addEventListener('click', startGame);

function startGame() {
  console.log(111)
  welcomeScreen.classList.add('hidden-block');
  navHove.classList.remove('header__nav-item_current');
  navStartGameBtn.classList.add('header__nav-item_current');

  welcomeScreen.addEventListener('transitionend', () => {
    welcomeScreen.classList.add('disabled-block');
  });



}