import { create_html_markup } from "./assets/scripts/create_html_markup.js";
create_html_markup();

const new_game_btn = document.getElementById('new_game_btn');
const sound_btn = document.getElementById('sound_btn');
const main__game = document.querySelector('.main__game');
const main__top_score = document.querySelector('.main__top_score');

let autoSave = true;
let muteSound = false;
let boardSize = 4;  //default board size
let boardSizeSelected = 4;
let board = [];
let moves;
let minutes;
let seconds;
let cron; // timer
let topScore = []

window.addEventListener('load', () => {
    getLocalStorage();
    drawBoard(); // if local storage is empty or no 'auto save' is selected default board 4x4 is drawn
    startTimer();
    showTopScore();
})

function getLocalStorage() {
    if(localStorage.getItem('autoSave')){
        autoSave = localStorage.getItem('autoSave');
        if (autoSave === 'false') {
            autoSave = false;
            auto_save_btn.classList.add('btn_pressed');
        } else {
        autoSave = true;
        }
    }
    if(localStorage.getItem('muteSound')){
        muteSound = localStorage.getItem('muteSound');
        if (muteSound === 'true') {
            muteSound = true;
            audio_move.muted = true;
            audio_menu.muted = true;
            audio_win.muted = true;
            sound_btn.classList.add('btn_pressed');
        } else {
            muteSound = false;
        }
    }

    if(localStorage.getItem('moves')) {
        moves = +localStorage.getItem('moves');
    } else {
        moves = 0;
    }
    if(localStorage.getItem('boardSize')) {
        boardSize = localStorage.getItem('boardSize');
        new_game_size.textContent = boardSize+"x"+boardSize;
        boardSizeSelected = boardSize;
    } else {
    }
    if(localStorage.getItem('minutes')) {
        minutes = localStorage.getItem('minutes');
    } else {
        minutes = 0;
    }
    if(localStorage.getItem('seconds')) {
        seconds = localStorage.getItem('seconds');
        main__stats_time.innerText = returnData(minutes) + ':' + returnData(seconds);
    } else {
        seconds = 0;
    }
    if(localStorage.getItem('board')) {
        board = localStorage.getItem('board').split(',').map(Number);
        generateBoard(boardSize, board);
    } else {
        board = [];
        generateBoard(boardSize);
    }
    if(localStorage.topScore) {
        topScore = JSON.parse(localStorage.topScore);
    }
}

function setLocalStorage() {
    if (autoSave === true) {
        localStorage.setItem('moves', moves);
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('seconds', seconds);
        localStorage.setItem('board', board);
        localStorage.setItem('boardSize', boardSizeSelected);
    } else {
        localStorage.clear();
    }
    localStorage.setItem('autoSave', autoSave);
    localStorage.setItem('muteSound', muteSound);
    localStorage.topScore = JSON.stringify(topScore);
}
window.addEventListener('beforeunload', setLocalStorage)

// ------- SETTINGS -----------

new_game_less.addEventListener('click', () => {
    audio_move.play();
    boardSize--;
    if (boardSize < 2) {
        boardSize = 2;
    }
    new_game_size.textContent = boardSize+"x"+boardSize;
})

new_game_more.addEventListener('click', () => {
    audio_move.play();
    boardSize++;
    if (boardSize > 8) {
        boardSize = 8;
    }
    new_game_size.textContent = boardSize+"x"+boardSize;
})

auto_save_btn.addEventListener('click', () => {
    audio_menu.play();
    if (autoSave === true) {
        autoSave = false;
        auto_save_btn.classList.add('btn_pressed');
    } else {
        autoSave = true;
        auto_save_btn.classList.remove('btn_pressed');
    }
})

main__top_score.addEventListener('click', () => {
    main__top_results.classList.toggle('hidden');
})


// ------------- TIMER --------------

function startTimer() {
    clearInterval(cron);
    cron = setInterval(() => { timer(); }, 1000);
}

function stopTimer() {
    clearInterval(cron);
}

function timer() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes == 100) {
      minutes = 99;
    }
    main__stats_time.innerText = returnData(minutes) + ':' + returnData(seconds);
}

function returnData(input) {
    return input > 9 ? input : `0${input}`
}

function resetTimer() {
    minutes = 0;
    seconds = 0;
    main__stats_time.innerText = returnData(minutes) + ':' + returnData(seconds);
}

// -------------- MAIN GAME ------------------

new_game_btn.addEventListener('click', () => {
    audio_menu.play();
    moves = 0;
    board = [];
    generateBoard(boardSize);
    drawBoard();
    resetTimer();
    localStorage.setItem('boardSize', boardSize); // save to local only on new boardSize confirm!!!
    boardSizeSelected = boardSize;
})

function generateBoard(size, savedBoard = 0) {
    let piecesSourse = [];
    if (!savedBoard) { // if no board data is given - generate new array and shuffle it
        for (let i = 0; i < size ** 2; i++){
            piecesSourse.push(i);
        }
        shuffleArray(piecesSourse);
    } else {
        piecesSourse = savedBoard.reverse(); // next poping goes backwards
    }
    board = [];
    main__game.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    main__game.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let row = 0; row < size; row++) {
        board[row] = []
        for (let column = 0; column < size; column++){
            board[row][column] = piecesSourse.pop();
        }
    }

    let evenOrOddCheckSumm = 0; // check for solvability
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++){
            if (board[row][column] === 0){ // if empty cell
                if (size % 2 === 0) { // if board 2, 4, 6 or 8 - add row number
                    evenOrOddCheckSumm = evenOrOddCheckSumm + row + 1;
                }
                continue;
            }
            for (let subColumn = column + 1; subColumn < size; subColumn++){ // check rest of current row
                if (board[row][subColumn] === 0){
                    continue;
                }
                if (board[row][subColumn] < board[row][column]){
                    evenOrOddCheckSumm += 1;
                }
            }
            for (let subRow = row + 1; subRow < size; subRow++) { // check other rows
                for (let subColumn = 0; subColumn < size; subColumn++){
                    if (board[subRow][subColumn] === 0){
                        continue;
                    }
                    if (board[subRow][subColumn] < board[row][column]){
                        evenOrOddCheckSumm += 1;
                    }
                }
            }
        }
    }
    if (evenOrOddCheckSumm % 2 !== 0) { // unsolvable
        generateBoard(size);
    }
    if (checkVictory()) { //auto victory - reshuffle!!!
        generateBoard(size);
    }

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function drawBoard() {
    main__game.innerHTML = "";
    main__game.style.fontSize = `${(9 - board.length)*0.8}em` // adaptive resizing from 2x2 to 8x8 is stupid
    board.forEach ((row, rowIndex) => {
        row.forEach ((value, columnIndex) => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('main__game_square');
            newDiv.setAttribute('data-row', rowIndex);
            newDiv.setAttribute('data-column', columnIndex);
            newDiv.setAttribute('data-value', value);
            if (value === 0) {
                newDiv.classList.add('main__game_square_empty');
            }
            newDiv.innerHTML = value;

            if (checkMovabilityDirection(newDiv)) {
                newDiv.addEventListener('mousedown', dragAndDrop);
            }

            if (checkMovabilityDirection(newDiv)) {
                newDiv.addEventListener('touchstart', touchDragAndDrop);
            }

            newDiv.addEventListener('click', movePuzzle);


            main__game.append(newDiv);
        })
    })
    main__stats_moves.textContent = moves;
    if (checkVictory()) {
        winGame()
    }
}

function checkVictory() {
    let winCheckArray = board.flat(Infinity);
    winCheckArray.pop();
    let numbersInPlace = 0;
    winCheckArray.forEach((value, index) => {
        if (value === index + 1) {
            numbersInPlace++;
        }
    })
    if (numbersInPlace === winCheckArray.length) {
        return true;
    }
    return false;
}

function checkMovabilityDirection(piece) {
    let currentRow = +piece.dataset.row;
    let currentColumn = +piece.dataset.column;
    let currentValue = +piece.dataset.value;
    if (currentValue === 0) {
        return false;
    } else if (currentRow > 0 && board[currentRow - 1][currentColumn] === 0){ // move up possible
        piece.dataset.direction = 'up';
        return 'up';
    } else if (currentRow < board.length - 1 && board[currentRow + 1][currentColumn] === 0){ // move down possible
        piece.dataset.direction = 'down';
        return 'down';
    } else if (currentColumn > 0 && board[currentRow][currentColumn - 1] === 0){ // move left possible
        piece.dataset.direction = 'left';
        return 'left';
    } else if (currentColumn < board.length - 1 && board[currentRow][currentColumn + 1] === 0){ // move right possible
        piece.dataset.direction = 'right';
        return 'right';
    }
}

function movePuzzle(piece) {
    let currentRow = +piece.target.dataset.row;
    let currentColumn = +piece.target.dataset.column;
    let currentValue = +piece.target.dataset.value;

    if (currentValue === 0) {
        return;
    } else if (currentRow > 0 && board[currentRow - 1][currentColumn] === 0){ // move up possible
        board[currentRow][currentColumn] = 0;
        board[currentRow - 1][currentColumn] = currentValue;
        move('up');
    } else if (currentRow < board.length - 1 && board[currentRow + 1][currentColumn] === 0){ // move down possible
        board[currentRow][currentColumn] = 0;
        board[currentRow + 1][currentColumn] = currentValue;
        move('down');
    } else if (currentColumn > 0 && board[currentRow][currentColumn - 1] === 0){ // move left possible
        board[currentRow][currentColumn] = 0;
        board[currentRow][currentColumn - 1] = currentValue;
        move('left');
    } else if (currentColumn < board.length - 1 && board[currentRow][currentColumn + 1] === 0){ // move right possible
        board[currentRow][currentColumn] = 0;
        board[currentRow][currentColumn + 1] = currentValue;
        move('right');
    }

    function move(direction){
        moves++;
        main__stats_moves.textContent = moves;
        audio_move.play();
        piece.target.style.transition = '0.2s';
        let transX = piece.target.style.left ? Math.abs(parseInt(piece.target.style.left, 10)) : 0;
        let transY = piece.target.style.top ? Math.abs(parseInt(piece.target.style.top, 10)) : 0;

        switch (direction) {
            case 'up':
                piece.target.style.transform = `translateY(-${piece.target.offsetWidth - transY}px)`;
            break;
            case 'down':
                piece.target.style.transform = `translateY(${(piece.target.offsetWidth - transY)}px)`;
            break;
            case 'left':
                piece.target.style.transform = `translateX(-${piece.target.offsetWidth - transX}px)`;
            break;
            case 'right':
                piece.target.style.transform = `translateX(${(piece.target.offsetWidth - transX)}px)`;
            break;
        }

        setTimeout(() => {drawBoard();}, 200);
    }
}

function dragAndDrop(event) { // ----------------------------- DRAG AND DPOR :(
    event.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    let shiftX = event.clientX;
    let shiftY = event.clientY;
    let newLeft;
    let newTop;

    function onMouseMove(move_event) {

        newLeft = move_event.clientX - shiftX;
        newTop = move_event.clientY - shiftY;

        if (Math.abs(newLeft) > 10 || Math.abs(newTop) > 10) {
            event.target.removeEventListener('click', movePuzzle); // keep click event when hand is shaky
        }

        if (event.target.dataset.direction === 'right'){
            if (newLeft > event.target.offsetWidth + 1) {
                newLeft = event.target.offsetWidth + 1;
            }
            if (newLeft < 0) {
                newLeft = 0;
            }
            event.target.style.left = newLeft + 'px';
        }
        if (event.target.dataset.direction === 'left'){
            if (newLeft < -event.target.offsetWidth - 1 ) {
                newLeft = -event.target.offsetWidth - 1;
            }
            if (newLeft > 0) {
                newLeft = 0;
            }
            event.target.style.left = newLeft + 'px';
        }
        if (event.target.dataset.direction === 'down'){
            if (newTop > event.target.offsetWidth + 1) {
                newTop = event.target.offsetWidth + 1;
            }
            if (newTop < 0) {
                newTop = 0;
            }
            event.target.style.top = newTop + 'px';
        }
        if (event.target.dataset.direction === 'up'){
            if (newTop < -event.target.offsetWidth - 1 ) {
                newTop = -event.target.offsetWidth - 1;
            }
            if (newTop > 0) {
                newTop = 0;
            }
            event.target.style.top = newTop + 'px';
        }
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);

        if (Math.abs(newLeft) < event.target.offsetWidth / 4) {
            event.target.style.left = '0px'
        }
        if (Math.abs(newLeft) >= event.target.offsetWidth / 4) {
            movePuzzle(event);
        }
        if (Math.abs(newTop) < event.target.offsetWidth / 4) {
            event.target.style.top = '0px'
        }
        if (Math.abs(newTop) >= event.target.offsetWidth / 4) {
            movePuzzle(event);
        }
    }
    event.target.addEventListener('click', movePuzzle);
}

function touchDragAndDrop(event) { // ----------------------------- DRAG AND DPOR mor mobile:(
    // event.preventDefault();
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    // document.documentElement.style.overflow = 'hidden';

    let shiftX = event.touches[0].clientX;
    let shiftY = event.touches[0].clientY;
    let newLeft;
    let newTop;

    function onTouchMove(move_event) {

        newLeft = move_event.touches[0].clientX - shiftX;
        newTop = move_event.touches[0].clientY - shiftY;

        if (Math.abs(newLeft) > 10 || Math.abs(newTop) > 10) {
            event.target.removeEventListener('click', movePuzzle); // keep click event when hand is shaky
        }

        if (event.target.dataset.direction === 'right'){
            if (newLeft > event.target.offsetWidth + 1) {
                newLeft = event.target.offsetWidth + 1;
            }
            if (newLeft < 0) {
                newLeft = 0;
            }
            event.target.style.left = newLeft + 'px';
        }
        if (event.target.dataset.direction === 'left'){
            if (newLeft < -event.target.offsetWidth - 1 ) {
                newLeft = -event.target.offsetWidth - 1;
            }
            if (newLeft > 0) {
                newLeft = 0;
            }
            event.target.style.left = newLeft + 'px';
        }
        if (event.target.dataset.direction === 'down'){
            if (newTop > event.target.offsetWidth + 1) {
                newTop = event.target.offsetWidth + 1;
            }
            if (newTop < 0) {
                newTop = 0;
            }
            event.target.style.top = newTop + 'px';
        }
        if (event.target.dataset.direction === 'up'){
            if (newTop < -event.target.offsetWidth - 1 ) {
                newTop = -event.target.offsetWidth - 1;
            }
            if (newTop > 0) {
                newTop = 0;
            }
            event.target.style.top = newTop + 'px';
        }
    }

    function onTouchEnd() {
        document.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('touchmove', onTouchMove);
        // document.documentElement.style.overflow = 'auto';

        if (Math.abs(newLeft) < event.target.offsetWidth / 4) {
            event.target.style.left = '0px'
        }
        if (Math.abs(newLeft) >= event.target.offsetWidth / 4) {
            movePuzzle(event);
        }
        if (Math.abs(newTop) < event.target.offsetWidth / 4) {
            event.target.style.top = '0px'
        }
        if (Math.abs(newTop) >= event.target.offsetWidth / 4) {
            movePuzzle(event);
        }
        // movePuzzle(event);
    }
    event.target.addEventListener('click', movePuzzle);
}

// ----------------- WIN THE GAME --------------

function winGame() {
    stopTimer();
    audio_win.play();
    win_message.innerHTML = `Hooray! You solved the puzzle </br> in ${returnData(minutes) + ':' + returnData(seconds)} and ${moves} moves!`
    win_window.classList.remove('hidden');

    let newTopScore = []
    newTopScore.push(moves);
    newTopScore.push(returnData(minutes) + ':' + returnData(seconds));
    newTopScore.push(seconds); // required for sorting
    newTopScore.push(board.length + 'x' + board.length);
    topScore.push(newTopScore);
    showTopScore();

    win_message_btn.addEventListener('click', () => {
        win_window.classList.add('hidden');
        moves = 0;
        minutes = 0;
        seconds = 0;
        main__stats_time.innerText = returnData(minutes) + ':' + returnData(seconds);
        generateBoard(board.length);
        drawBoard();
        startTimer();
    })
}

// ----------- TOP SCORE --------

function showTopScore() {
    if (topScore.length === 0){
        main__top_results.innerHTML = '';
        const newDiv = document.createElement("div");
        newDiv.textContent = 'no winners yet...';
        main__top_results.append(newDiv);
    }
    else {
        topScore.sort((a,b) => a[0] === b[0] ? a[2] - b[2] : a[0] - b[0]);
        if (topScore.length > 10) {
           topScore.splice(-1, 1);
        }
        main__top_results.innerHTML = '';
        topScore.forEach(value => {
            const newDiv = document.createElement("div");
            newDiv.textContent = `moves: ${value[0]}  time: ${value[1]}  board size: ${value[3]}`
            main__top_results.append(newDiv);
        })
        const newDiv = document.createElement("div");
        newDiv.textContent = "(reset top 10...)";
        newDiv.style.fontSize = "0.75em";
        newDiv.style.cursor = "pointer";
        newDiv.addEventListener('click', () => {
            topScore = [];
            showTopScore();
        });
        main__top_results.append(newDiv);
    }
}

// ---------- SOUND ---------

const audio_menu = new Audio("assets/sounds/sound_menu.mp3");
const audio_move = new Audio("assets/sounds/sound_move.wav");
const audio_win = new Audio("assets/sounds/sound_win.wav");

sound_btn.addEventListener('click', () => {
    if (muteSound === false) {
        muteSound = true;
        audio_move.muted = true;
        audio_menu.muted = true;
        audio_win.muted = true;
        sound_btn.classList.add('btn_pressed');
    } else {
        muteSound = false;
        audio_move.muted = false;
        audio_menu.muted = false;
        audio_win.muted = false;
        sound_btn.classList.remove('btn_pressed');
        audio_menu.play();
    }
})