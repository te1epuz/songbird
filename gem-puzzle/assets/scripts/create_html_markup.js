export function create_html_markup () {

const body = document.querySelector("body");

let header = document.createElement("header");
let div_header__wrapper = document.createElement("div");
div_header__wrapper.className = "header__wrapper";
let div_header__nav = document.createElement("div");
div_header__nav.className = "header__nav";

let div1 = document.createElement("div");
let button_new_game_less = document.createElement("button");
button_new_game_less.id = "new_game_less";
button_new_game_less.textContent = "-";
let div_new_game_size = document.createElement("div");
div_new_game_size.id = "new_game_size";
div_new_game_size.textContent = "4x4";
let button_new_game_more = document.createElement("button");
button_new_game_more.id = "new_game_more";
button_new_game_more.textContent = "+";
div1.append(button_new_game_less, div_new_game_size, button_new_game_more);

let button_new_game_btn = document.createElement("button");
button_new_game_btn.id = "new_game_btn";
button_new_game_btn.textContent = "new game";

div_header__nav.append(div1, button_new_game_btn);

let div_win_window = document.createElement('div');
div_win_window.id = "win_window";
div_win_window.className = "hidden";
let div2 = document.createElement("div");
let p_win_message = document.createElement("p");
p_win_message.id = "win_message";
let button_win_message_btn = document.createElement("button");
button_win_message_btn.id = "win_message_btn";
button_win_message_btn.textContent = "Ok";

div2.append(p_win_message, button_win_message_btn);
div_win_window.append(div2);
div_header__wrapper.append(div_header__nav, div_win_window);
header.append(div_header__wrapper);

let main = document.createElement('main');
let div_main__wrapper = document.createElement('div');
div_main__wrapper.className = "main__wrapper";
let div_main__stats = document.createElement('div');
div_main__stats.className = "main__stats";
let div3 = document.createElement("div");
div3.innerHTML = `moves: <span id="main__stats_moves">0</span>`;
let div4 = document.createElement("div");
div4.innerHTML = `time: <span id="main__stats_time">00:00</span>`;
div_main__stats.append(div3, div4);

let div_main__game = document.createElement('div');
div_main__game.className = "main__game";

let ul_options = document.createElement('ul');
ul_options.className = "options";
let li1 = document.createElement('li');
li1.innerHTML = `<button class="main__top_score">top 10 score</button>`;
let li2 = document.createElement('li');
li2.innerHTML = `<button id="auto_save_btn"title="save game state on page reload">auto save</button>`;
let li3 = document.createElement('li');
li3.innerHTML = `<button id="sound_btn">sound</button>`;
ul_options.append(li1, li2, li3)

let div_main__top_results = document.createElement('div');
div_main__top_results.id = "main__top_results";
div_main__top_results.className = "hidden";

div_main__wrapper.append(div_main__stats, div_main__game, ul_options, div_main__top_results);
main.append(div_main__wrapper);

body.append(header, main);
}

// `<header>
//     <div class="header__wrapper">
//         <div class="header__nav">
//             <div>
//                 <button id="new_game_less">-</button>
//                 <div id="new_game_size">4х4</div>
//                 <button id="new_game_more">+</button>
//             </div>
//             <button id="new_game_btn">new game</button>
//         </div>
//         <div id="win_window" class="hidden">
//             <div>
//                 <p id="win_message">Hooray! You solved the puzzle </br> in si##:## and N moves!</p>
//                 <button id="win_message_btn">Ok</button>
//             </div>
//         </div>
//     </div>
// </header>
// <main>
//     <div class="main__wrapper">
//         <div class="main__stats">
//             <div>moves: <span id="main__stats_moves">0</span></div>
//             <div>time: <span id="main__stats_time">00:00</span></div>
//         </div>
//         <div class="main__game"></div>
//         <ul class="options">
//             <li><button class="main__top_score">top 10 score</button></li>
//             <li><button id="auto_save_btn"title="save game state on page reload">auto save</button></li>
//             <li><button id="sound_btn">sound</button></li>
//         </ul>
//         <div id="main__top_results" class="hidden"></div>
//     </div>
// </main>`