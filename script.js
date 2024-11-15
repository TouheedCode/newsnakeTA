const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const canvasSize = 400;
const speed = 100; // Speed of the game in ms

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let direction = 'RIGHT';
let food = {};
let score = 0;

// Create food at random position
function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00FF00' : '#00CC00';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
    let newHead = { ...snake[0] };

    switch (direction) {
        case 'UP':
            newHead.y -= gridSize;
            break;
        case 'DOWN':
            newHead.y += gridSize;
            break;
        case 'LEFT':
            newHead.x -= gridSize;
            break;
        case 'RIGHT':
            newHead.x += gridSize;
            break;
    }

    // Add new head to snake array
    snake.unshift(newHead);

    // Check if snake eats food
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        createFood(); // Generate new food
    } else {
        snake.pop(); // Remove tail if no food eaten
    }
}

// Check if snake hits wall or itself
function checkCollisions() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        resetGame();
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Reset the game to initial state
function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = 'RIGHT';
    score = 0;
    createFood();
}

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Change direction based on key input
function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (keyPressed === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (keyPressed === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (keyPressed === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Draw the entire game state
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    moveSnake();
    drawSnake();
    drawFood();
    checkCollisions();
    updateScore();
}

// Start the game loop
function gameLoop() {
    draw();
}

// Set interval for the game loop
setInterval(gameLoop, speed);

// Listen for key presses to change direction
document.addEventListener('keydown', changeDirection);

// Initialize the game
createFood();
