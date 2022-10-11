// burger menu handler

const header__burger_button = document.querySelector(".header__burger_button");
const header__navigation = document.querySelector(".header__navigation");
const header__burger_x = document.querySelector(".header__burger_x");
const header__burger_black_bg = document.querySelector(".header__burger_black_bg");

header__burger_button.addEventListener('click', () => {
	header__navigation.classList.add('header__nav_burger_active');
	header__burger_black_bg.classList.add('black_bg_active');
	document.body.classList.add('hide_overflow');
})

header__burger_x.addEventListener('click', headerBurgerClose);
header__burger_black_bg.addEventListener('click', headerBurgerClose);

function headerBurgerClose () {
	header__navigation.classList.remove('header__nav_burger_active');
	header__burger_black_bg.classList.remove('black_bg_active');
	document.body.classList.remove('hide_overflow');
}

// Amount handler

let radio_amount = document.querySelectorAll('.radio_amount');
let another_amount = document.getElementById('another_amount');

radio_amount.forEach((input) => {
  input.addEventListener('input', () => {
    another_amount.value = input.value;
  })
})

another_amount.addEventListener('input', () => {

  if (another_amount.value < 0) {
      another_amount.value = Math.abs(another_amount.value);
  }

  if (another_amount.value > 9999) {
      another_amount.value = 9999;
  }

    radio_amount.forEach((radio) => {
      radio.checked = false;
      if (another_amount.value == radio.value) {
        radio.checked = true;
      }
    })
})