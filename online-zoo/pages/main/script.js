import petsData from "../../assets/pets/pets.js";

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
		div.innerHTML = `	<img src="${pets_list[i].imageSrc}" alt="pet photo">
							<div class="pets__card_caption">
								<h2>${pets_list[i].petName}</h2>
								<p>${pets_list[i].region}</p>
								<img src="${pets_list[i].food}" alt="pet food">
							</div>`;
		carousel_row1_wrapper.append(div);
		let div2 = document.createElement('div');
		div2.className = "pets__card";
		div2.innerHTML = `	<img src="${pets_list[i+3].imageSrc}" alt="pet photo">
							<div class="pets__card_caption">
								<h2>${pets_list[i+3].petName}</h2>
								<p>${pets_list[i+3].region}</p>
								<img src="${pets_list[i+3].food}" alt="pet food">
							</div>`;
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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// TESTIMONIALS CAROUSEL

let testimonial_cards_block = document.querySelector('.testimonial_cards_block');
let testimonial_slider = document.getElementById('testimonial_slider');

testimonial_slider.addEventListener('input', scrollTestimonials);

let testimonials_names = ['The Alien', 'Joe the carpenter', 'Michael Scott', 'Michael John', 'Oskar Samborsky', 'Fredericka Michelin', 'Mila Riksha', 'Will Smith', 'Barrak Obama', 'Unknown person', 'Anonymous User'];
let testimonials_countries = ['Local Austria', 'Nonlocal Austria', 'Local Australia', 'Unknown country', 'Cold Iceland', 'U S A', 'North Canada', 'Moon', 'The outer ring']
let testimonials_text = `The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.<br>`
generateFeedback();

function generateFeedback() {
	testimonial_cards_block.innerHTML = ``;
	for (let i = 1; i < 12; i++) {
		let div = document.createElement('div');
		div.className = "testimonial_card_outer";
		div.innerHTML = `<div class="testimonial_card">
							<div class="testimonial_card_header">
							<img src="../../assets/images/photo${getRandomInt(0, 4)}.png" alt="no photo">
							<div class="testimonial_card_caption">
								<h3 class="testimonial_card_name">${testimonials_names[getRandomInt(0, testimonials_names.length - 1)]}</h3>
								<span class="testimonial_card_country">${testimonials_countries[getRandomInt(0, testimonials_countries.length - 1)]}</span><span>&nbsp;&nbsp;•&nbsp;</span><span>Today</span>
							</div>
							</div>
							<div class="testimonial_card_text">
							<p>${testimonials_text.repeat(getRandomInt(1, 4))}</p>
							</div>
						</div>`;
		testimonial_cards_block.append(div);
	}
}

function scrollTestimonials() {
	console.log(testimonial_slider.value);
	testimonial_cards_block.style.transform = `translateX(${-297 * testimonial_slider.value + 297}px)`;
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// TESTIMONIALS POPUP

let testimonial_card_outer = document.querySelectorAll('.testimonial_card_outer');

testimonial_card_outer.forEach (card => {
	card.addEventListener('click', testimonialsPopUp);
})

function testimonialsPopUp() {
	if (window.innerWidth > 980) {
		return;
	}

	let div = document.createElement('div');
	div.setAttribute('id','testimonials_popup');
	div.innerHTML = '<div class="popup_black_bg"></div>';
	let div2 = this.cloneNode(true);
	let div3 = document.createElement('div');
	div3.innerHTML = '<div class="popup_x"></div>'
	div2.append(div3);
	div.prepend(div2);
	testimonial_cards_block.prepend(div);

	document.body.classList.add('hide_overflow');

	window.addEventListener("resize", resizeListener);
	function resizeListener() {
		if (window.innerWidth > 980) {
			popUpClose ()
			return;
		}
	}

	const popup_x = document.querySelector(".popup_x");
	const popup_black_bg = document.querySelector(".popup_black_bg");
	popup_x.addEventListener('click', popUpClose);
	popup_black_bg.addEventListener('click', popUpClose);

	function popUpClose () {
		div.remove();
		document.body.classList.remove('hide_overflow');
	}

}

