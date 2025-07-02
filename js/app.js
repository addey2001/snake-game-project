//constants 
const columns = 20
const rows = 20
const cellCount = columns * rows 
const playButton = document.querySelector('#playButton')
const cellElements = []
const scoreDisplay = document.getElementById('score')
const TimeDisplay = document.getElementById('time')
const board = document.getElementById('board')
const startPosition = [188,189,190]

//variables 
let snakeLength = 1 
let snakespeed = 1; // ms per move 
let foodPosition = null;
let gameOver = false;
let time = 0;
let score = 0;
let snake = [...startPosition]
let intervalId = null;
let timeIntervalId = null


//function
function addSnake() {
snake.forEach(idx => cellElements[idx].classList.add('snake')) //iteratiing over array calling it 'snake' adding its classList to the cell

}



function createBoard () {
    for( let i = 0; i < cellCount; i++) { // used a loop 
    const cell = document.createElement('div'); // created a new div for cells
    cell.innerText = i;
    cell.dataset.index = i;// could have used id as well but dataset provides more information
    cell.style.width = `${100 / columns}%`; // for the columns 
    cell.style.height =`${100 / rows}%`;// 
    cell.classList.add('cell');
    cellElements.push(cell);
    board.appendChild(cell
    );
 }}
;


function removeSnake() {
    snake.forEach(idx => cellElements[idx].classList.remove('snake')) //iteratiing over array calling it 'snake' adding its classList to the cell
}



function placefoodRdm() {
   let idx
    idx = Math.floor(Math.random() * cellCount) // allows a random index to be found and this random index is used to determine where the food is placed
    snake.includes(idx)// this checks whether the snake contains the idx value, it returns true if it is found and false otherwise
        foodPosition = idx;
        updateBoard;

    }




function updateBoard() {
    addSnake()
    removeSnake()
}



 function init() {
    createBoard();
    addSnake();
    placefoodRdm();
    updateBoard();
}

function moveSnake(event) {
    let head = startPosition[startPosition.length - 1]; // get the last element of the snake array
    let newHead = head; // initialize newHead to the current head position
    // Determine direction based on key pressed
  const keyPressed = event.key
  removeSnake(); // remove the snake from the board before moving it
    

    if (keyPressed === 'ArrowUp') {
                newHead -= columns; // move up
    }
    else if (keyPressed === 'ArrowDown') {
                newHead += columns; // move down
    }
    else if (keyPressed === 'ArrowLeft') {
                newHead -= 1; // move left
           
    } else if (keyPressed === 'ArrowRight') {
                newHead += 1; // move right
        }
     else {
        // Default movement to the right if no event is provided
        newHead += 1;
    }
    addSnake();
}
document.addEventListener('keyup', moveSnake); // listen for keydown events to move the snake
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*Check for collisions with walls or self
    if (
        newHead < 0 || 
        newHead >= cellCount || 
        (newHead % columns === 0 && head % columns === columns - 1) || 
        (newHead % columns === columns - 1 && head % columns === 0) ||
        snake.includes(newHead) // check if the new head collides with the snake itself
    ) {
        gameOver = true;
        clearInterval(intervalId);
        clearInterval(timeIntervalId);
        alert('Game Over! Your score: ' + score);
        return;
    }

    // Add new head to the snake
    currentPosition.push(newHead);
    snake.push(newHead);

    // Check for food consumption
    if (newHead === foodPosition) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        snakeLength++;
        placefoodRdm(); // Place new food after eating
    } else {
        // Remove tail if not eating food
        const tail = currentPosition.shift();
        const tailIndex = snake.indexOf(tail);
        if (tailIndex > -1) {
            snake.splice(tailIndex, 1);
        }
    }

    updateBoard(); // Update the board after moving the snake
   

}
    */function startGame() {
        addSnake();
        moveSnake(event)
        placefoodRdm()
        moveSnake();
        

    if(gameOver) {
        snake = [... startPosition]
        score = 0 
        scoreDisplay.textContent = ` score: ${score}`
        time = 0;
        TimeDisplay.textContent = `Time: ${time}s`
        gameOver = false;
        snakespeed = 100
        clearInterval(intervalId)
        clearInterval(timeIntervalId)
    }
}



// Event Listeners
playButton.addEventListener('click', startGame)


console.log(playButton)


// on page load 
init();