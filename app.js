//constants 
const columns = 20
const rows = 20
const cellCount = columns * rows 
const playButton = document.querySelector('#playButton')
const cellElements = []
const scoreDisplay = document.getElementById('score')
const TimeDisplay = document.getElementById('time')
const board = document.getElementById('board')
const startPosition = []

//variables 
let currentPosition = startPosition
let sankeLength = 1 
let snakespeed = 200; // ms per move 
let foodPosition = null;
let gameOver = false;
let time = 0;
let score = 0;
let snake = [startingPosition]
let intervalId = null;
let timeIntervalId = null


//function

function creatBoard () {
    for( let i = 0; i < cellCount; i++) { // used a loop 
    const cell = document.createElement('div'); // created a new div for cells
    cell.innerText = i;
    cell.dataset.index = i;// could have used id as well but dataset provides more information
    cell.style.width = `${100 / columns}%`; // for the columns 
    cell.style.height =`${100 / rows}%`;// 
    cell.classList.add('cell');
    cellElements.push('cell');
    board.appendChild('cell');
 }}
;

function placefoodRdm() {
   let idx
    idx = Math.floor(Math.random() * cellCount) // allows a random index to be found and this random index is used to determine where the food is placed
    snake.includes(idx)// this checks whether the snake contains the idx value, it returns true if it is found and false otherwise
        foodPosition = idx;
        updateBoard;

    }


function updateBoard() {
    cellElements.forEach(cell => cell.className = 'cell') // this resets each cell className to cell, and makes sure its in a default state removing any other classes that may have been there previously
snake.forEach(idx => cellElements[idx].classList.add('snake')) //iteratiing over array calling it 'snake' adding its classList to the cell
if (typeof foodPosition === 'number') {
    cellElements[foodposition].classList.add('food')// this adds the name 'food' to each area where the food is randomly place onn the game board 
}

}

function startGame() {
    if( gameOver === false) return;
    gameOver = false
    score = 0
    time = 0 
    snakeLength = 1
    snakeSpeed = 200
    snake = {startingPosition}
    currentPosition= startingPosition;
    scoreDisplay.textContent = 'score: 0'
    TimeDisplay.textContent = 'time: 0'
    playButton.disabled = true ;
    placefoodRdm()
    updateBoard();
    clearInterval(intervalId);
    intervalId = setInterval(moveSnake, snakeSpeed);
    clearInterval(timeIntervalId);
    timeIntervalId = setInterval (() => { 
        time++;
        TimeDisplay.textContent = `Time: ${time}`;
    }, 1000);
}

function moveSnake(event) {
    const keyPressed = event.code

    }











document.addEventListener('click', startGame)