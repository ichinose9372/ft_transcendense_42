const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let gameState = "startScreen"; // 'startScreen', 'gameOn' のいずれかで管理
let animationFrameId;

const paddle = {
    x: canvas.width / 2 - 60,
    y: canvas.height - 30,
    width: 120,
    height: 16,
    dx: 12,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 16,
    dx: 5,
    dy: 5,
    speed: 8,
    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 5;
        this.dy = -5;
    },
};

const keyDown = {
    right: false,
    left: false,
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === "gameOn") {
        drawBall();
        drawPaddle();
        updateGameObjects();
    }
}

function drawBall() {
    ctx.fillStyle = "#0095DD";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle() {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function updateGameObjects() {
    movePaddle();
    moveBall();
    checkCollision();
}

function movePaddle() {
    if (keyDown.right && paddle.x < canvas.width - paddle.width)
        paddle.x += paddle.dx;
    if (keyDown.left && paddle.x > 0) paddle.x -= paddle.dx;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 壁との衝突
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0)
        ball.dx *= -1;
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0)
        ball.dy *= -1;
}

function checkCollision() {
    // パドルとの衝突
    if (
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width &&
        ball.y + ball.size > paddle.y
    ) {
        let collidePoint =
            (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        let angle = (collidePoint * Math.PI) / 4;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

function startGame() {
    if (gameState === "startScreen") {
        gameState = "gameOn";
        document.getElementById("startButton").disabled = true;
        document.getElementById("resetButton").disabled = false;
        gameLoop();
    }
}

function resetGame() {
    cancelAnimationFrame(animationFrameId);
    ball.reset();
    paddle.x = canvas.width / 2 - paddle.width / 2;
    showStartScreen();
}

function gameLoop() {
    draw();
    if (gameState === "gameOn") {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

function showStartScreen() {
    gameState = "startScreen";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText("ストップ", canvas.width / 2, canvas.height / 2);
    document.getElementById("startButton").disabled = false;
    document.getElementById("resetButton").disabled = true;
}

// イベントハンドラの設定
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("resetButton").addEventListener("click", resetGame);

document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") keyDown.right = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") keyDown.left = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") keyDown.right = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") keyDown.left = false;
});

showStartScreen();
