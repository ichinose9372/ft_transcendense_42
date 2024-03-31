// キャンバスとコンテキストの取得
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById('startButton'); // スタートボタンの取得

// ゲームが既に開始されたかどうかのフラグ
let gameStarted = false;

// ゲーム開始/中断ボタンのクリックイベントを管理する関数
function toggleGame() {
  if (!gameStarted) {
    gameStarted = true; // ゲーム開始状態に更新
    startButton.textContent = '中断'; // ボタンのテキストを「中断」に変更
    gameLoop(); // ゲームループを開始
    startButton.style.display = 'block'; // 中断ボタンを表示する
  } else {
    gameStarted = false; // ゲーム中断状態に更新
    cancelAnimationFrame(gameLoopId); // ゲームループを停止
    startButton.textContent = 'ゲーム開始'; // ボタンのテキストを「ゲーム開始」に戻す
    // resetGame(); // ゲームの状態をリセット
    startButton.style.display = 'block'; // ゲーム開始ボタンを再表示
  }
}

// スタートボタンにクリックイベントを追加
startButton.addEventListener('click', toggleGame);

// ゲームの状態
const gameState = {
  player1Score: 0,
  player2Score: 0,
  ball: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5,
    color: 'WHITE'
  },
  paddleWidth: 10,
  paddleHeight: 100,
  player1: {
    x: 0,
    y: canvas.height / 2 - 50,
    speed: 10
  },
  player2: {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    speed: 10
  }
};

// キーボード入力の状態を保持するオブジェクト
const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  w: false,
  s: false
};

// キーダウンイベント
document.addEventListener('keydown', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }
});

// キーアップイベント
document.addEventListener('keyup', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
});

// ゲームの状態をリセットする関数（スコアと位置を初期化）
function resetGame() {
  // ボールとプレイヤーの位置を中央に設定
  gameState.ball.x = canvas.width / 2;
  gameState.ball.y = canvas.height / 2;
  gameState.player1.y = canvas.height / 2 - gameState.paddleHeight / 2;
  gameState.player2.y = canvas.height / 2 - gameState.paddleHeight / 2;

  // スコアをリセット
  gameState.player1Score = 0;
  gameState.player2Score = 0;

  // キャンバスをクリア
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw(); // 初期画面の描画
}

// キーが押されたときのイベントを追加
document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp': // 矢印上キー
        if (gameState.player2.y > 0) {
          gameState.player2.y -= gameState.player2.speed;
        }
        break;
      case 'ArrowDown': // 矢印下キー
        if (gameState.player2.y < canvas.height - gameState.paddleHeight) {
          gameState.player2.y += gameState.player2.speed;
        }
        break;
      case 'w': // Wキー
        if (gameState.player1.y > 0) {
          gameState.player1.y -= gameState.player1.speed;
        }
        break;
      case 's': // Sキー
        if (gameState.player1.y < canvas.height - gameState.paddleHeight) {
          gameState.player1.y += gameState.player1.speed;
        }
        break;
    }
  });

// ゲームの更新
function update() {
  // プレイヤー1のパドル制御
  if (keysPressed['w'] && gameState.player1.y > 0) {
    gameState.player1.y -= gameState.player1.speed;
  }
  if (keysPressed['s'] && gameState.player1.y < canvas.height - gameState.paddleHeight) {
    gameState.player1.y += gameState.player1.speed;
  }

  // プレイヤー2のパドル制御
  if (keysPressed['ArrowUp'] && gameState.player2.y > 0) {
    gameState.player2.y -= gameState.player2.speed;
  }
  if (keysPressed['ArrowDown'] && gameState.player2.y < canvas.height - gameState.paddleHeight) {
    gameState.player2.y += gameState.player2.speed;
  }
  // ボールの位置を更新
  gameState.ball.x += gameState.ball.speedX;
  gameState.ball.y += gameState.ball.speedY;

  // ボールが上下の壁に当たったら反射
  if (gameState.ball.y + gameState.ball.radius > canvas.height ||
      gameState.ball.y - gameState.ball.radius < 0) {
    gameState.ball.speedY = -gameState.ball.speedY;
  }

  // パドルとの衝突判定
  if (gameState.ball.x - gameState.ball.radius < gameState.player1.x + gameState.paddleWidth &&
    gameState.ball.y > gameState.player1.y &&
    gameState.ball.y < gameState.player1.y + gameState.paddleHeight ||
    gameState.ball.x + gameState.ball.radius > gameState.player2.x &&
    gameState.ball.y > gameState.player2.y &&
    gameState.ball.y < gameState.player2.y + gameState.paddleHeight){
        gameState.ball.speedX = -gameState.ball.speedX; // ボールを反射させる
    }

    // ボールが左右の壁に当たった場合のスコア更新
  if (gameState.ball.x + gameState.ball.radius > canvas.width) {
    gameState.player1Score++; // プレイヤー1のスコアを加算
    resetBall();
  } else if (gameState.ball.x - gameState.ball.radius < 0) {
    gameState.player2Score++; // プレイヤー2のスコアを加算
    resetBall();
    // TODO: キーボード入力によるパドルの制御
    }
}

// ゲームの描画
function draw() {
  // 背景を描画
  context.fillStyle = 'BLACK';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // ボールを描画
  context.fillStyle = gameState.ball.color;
  context.beginPath();
  context.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI*2, false);
  context.closePath();
  context.fill();

  // パドルを描画
  context.fillStyle = 'WHITE';
  context.fillRect(gameState.player1.x, gameState.player1.y, gameState.paddleWidth, gameState.paddleHeight);
  context.fillRect(gameState.player2.x, gameState.player2.y, gameState.paddleWidth, gameState.paddleHeight);

  // スコアを描画
  context.font = '35px Arial';
  context.fillText(gameState.player1Score, canvas.width / 4, canvas.height / 5);
  context.fillText(gameState.player2Score, 3 * canvas.width / 4, canvas.height / 5);

  // 真ん中の線を描画
  context.beginPath(); // パスの開始
  context.setLineDash([5, 15]); // 線のスタイルを点線に設定
  context.moveTo(canvas.width / 2, 0); // 線の開始点（キャンバスの中央上部）
  context.lineTo(canvas.width / 2, canvas.height); // 線の終了点（キャンバスの中央下部）
  context.strokeStyle = 'WHITE'; // 線の色
  context.lineWidth = 2; // 線の太さ
  context.stroke(); // 線を描画
}

// ボールの位置をリセットする関数
function resetBall() {
    gameState.ball.x = canvas.width / 2;
    gameState.ball.y = canvas.height / 2;
    gameState.ball.speedX = -gameState.ball.speedX;
    gameState.ball.speedY = -gameState.ball.speedY;
  }

// ゲームループのIDを保持する変数
let gameLoopId;
// ゲームループ
function gameLoop() {
  if (gameStarted) {
      update(); // ゲーム状態の更新
      draw();   // ゲームの描画
      gameLoopId = requestAnimationFrame(gameLoop); // 次のフレームを要求し、IDを保存
  }
}

// ゲーム画面の描画
draw();
// 初期画面のセットアップ
resetGame();

