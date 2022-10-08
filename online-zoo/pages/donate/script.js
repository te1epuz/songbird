// burger menu handler

const header__burger_button = document.querySelector(".header__burger_button");
const header__navigation = document.querySelector(".header__navigation");
const header__burger_x = document.querySelector(".header__burger_x");
const header__burger_black_bg = document.querySelector(".header__burger_black_bg");

header__burger_button.addEventListener('click', () => {
  header__navigation.classList.add('header__nav_burger_active');
  header__burger_black_bg.classList.add('black_bg_active');
})

header__burger_x.addEventListener('click', () => {
  header__navigation.classList.remove('header__nav_burger_active');
  header__burger_black_bg.classList.remove('black_bg_active');
})

header__burger_black_bg.addEventListener('click', () => {
  header__navigation.classList.remove('header__nav_burger_active');
  header__burger_black_bg.classList.remove('black_bg_active');
})