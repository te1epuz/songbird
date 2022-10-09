import petsData from "../../assets/pets/pets.js";

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




// PETS carousel

const pets__btn_left = document.getElementById("pets__btn_left");
const pets__btn_right = document.getElementById("pets__btn_right");
const carousel_row1_wrapper = document.querySelector(".carousel_row1_wrapper")
const carousel_row2_wrapper = document.querySelector(".carousel_row2_wrapper")

pets__btn_right.addEventListener('click', slideCarouselRight);
pets__btn_left.addEventListener('click', slideCarouselLeft);

function slideCarouselRight (){
	pets__btn_right.disabled = true;
	pets__btn_left.disabled = true;
	let pets_list = [ ...petsData];
	shuffleArray(pets_list);
	for (let i = 0; i < 3; i++) {
		let div = document.createElement('div');
		div.className = "pets__card";
		div.innerHTML = `<img src="${pets_list[i].imageSrc}" alt="pet photo"><div class="pets__card_caption"><h2>${pets_list[i].petName}</h2><p>${pets_list[i].region}</p><img src="${pets_list[i].food}" alt="pet food"></div>`;
		carousel_row1_wrapper.append(div);
		let div2 = document.createElement('div');
		div2.className = "pets__card";
		div2.innerHTML = `<img src="${pets_list[i+3].imageSrc}" alt="pet photo"><div class="pets__card_caption"><h2>${pets_list[i+3].petName}</h2><p>${pets_list[i+3].region}</p><img src="${pets_list[i+3].food}" alt="pet food"></div>`;
		carousel_row2_wrapper.append(div2);
	}
	carousel_row1_wrapper.style.transition = "700ms";
	carousel_row2_wrapper.style.transition = "700ms";
	carousel_row1_wrapper.style.transform = "translateX(-50%)";
	carousel_row2_wrapper.style.transform = "translateX(-50%)";

  setTimeout(() => {
	    carousel_row1_wrapper.firstElementChild.remove();
	    carousel_row1_wrapper.firstElementChild.remove();
	    carousel_row1_wrapper.firstElementChild.remove();
		carousel_row2_wrapper.firstElementChild.remove();
	    carousel_row2_wrapper.firstElementChild.remove();
	    carousel_row2_wrapper.firstElementChild.remove();
	    carousel_row1_wrapper.style.transition = "0ms";
	    carousel_row2_wrapper.style.transition = "0ms";
		carousel_row1_wrapper.style.transform = "translateX(0%)";
		carousel_row2_wrapper.style.transform = "translateX(0%)";
		pets__btn_right.disabled = false;
		pets__btn_left.disabled = false;
	  }, 700);
}

function slideCarouselLeft (){
	pets__btn_left.disabled = true;
	pets__btn_right.disabled = true;
	let pets_list = [ ...petsData];
	shuffleArray(pets_list);
	carousel_row1_wrapper.style.transition = "0ms";
	carousel_row2_wrapper.style.transition = "0ms";
	carousel_row1_wrapper.style.transform = "translateX(-50%)";
	carousel_row2_wrapper.style.transform = "translateX(-50%)";
	for (let i = 0; i < 3; i++) {
		let div = document.createElement('div');
		div.className = "pets__card";
		div.innerHTML = `<img src="${pets_list[i].imageSrc}" alt="pet photo"><div class="pets__card_caption"><h2>${pets_list[i].petName}</h2><p>${pets_list[i].region}</p><img src="${pets_list[i].food}" alt="pet food"></div>`;
		carousel_row1_wrapper.prepend(div);
		let div2 = document.createElement('div');
		div2.className = "pets__card";
		div2.innerHTML = `<img src="${pets_list[i+3].imageSrc}" alt="pet photo"><div class="pets__card_caption"><h2>${pets_list[i+3].petName}</h2><p>${pets_list[i+3].region}</p><img src="${pets_list[i+3].food}" alt="pet food"></div>`;
		carousel_row2_wrapper.prepend(div2);
	}
	setTimeout(() => {
		carousel_row1_wrapper.style.transition = "700ms";
		carousel_row2_wrapper.style.transition = "700ms";
		carousel_row1_wrapper.style.transform = "translateX(0%)";
		carousel_row2_wrapper.style.transform = "translateX(0%)";
	  }, 0);

	setTimeout(() => {
		carousel_row1_wrapper.lastElementChild.remove();
		carousel_row1_wrapper.lastElementChild.remove();
		carousel_row1_wrapper.lastElementChild.remove();
		carousel_row2_wrapper.lastElementChild.remove();
		carousel_row2_wrapper.lastElementChild.remove();
		carousel_row2_wrapper.lastElementChild.remove();
		carousel_row1_wrapper.style.transition = "0ms";
		carousel_row2_wrapper.style.transition = "0ms";
		pets__btn_left.disabled = false;
		pets__btn_right.disabled = false;
	}, 700);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
		[array[i], array[j]] = [array[j], array[i]];
	}
}

