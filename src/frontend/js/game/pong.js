// シーンの作成
const scene = new THREE.Scene();

// カメラの設定
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

// レンダラーの設定
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// ライティングの設定
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// ボールの作成
const ballRadius = 1;
const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// パドルの作成
const paddleWidth = 1;
const paddleHeight = 4;
const paddleDepth = 1;
const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
const paddleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
leftPaddle.position.set(-20, 0, 0);
scene.add(leftPaddle);

const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
rightPaddle.position.set(20, 0, 0);
scene.add(rightPaddle);

// ゴールの作成
const goalWidth = 1;
const goalHeight = 10;
const goalGeometry = new THREE.PlaneGeometry(goalWidth, goalHeight);
const goalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });

const leftGoal = new THREE.Mesh(goalGeometry, goalMaterial);
leftGoal.position.set(-30, 0, 0);
scene.add(leftGoal);

const rightGoal = new THREE.Mesh(goalGeometry, goalMaterial);
rightGoal.position.set(30, 0, 0);
scene.add(rightGoal);

// 背景の作成
const backgroundWidth = 100;
const backgroundHeight = 50;
const backgroundDepth = 1;
const backgroundGeometry = new THREE.BoxGeometry(backgroundWidth, backgroundHeight, backgroundDepth);
const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
background.position.set(0, 0, -5);
scene.add(background);

// ボールの初期位置と速度
const ballSpeed = 0.2;
const ballVelocity = new THREE.Vector3(ballSpeed, ballSpeed, 0);

function updateBall() {
  // ボールの位置を速度に基づいて更新
  ball.position.add(ballVelocity);

  // ボールが上下の壁に衝突した場合、速度のY成分を反転
  if (ball.position.y > backgroundHeight / 2 || ball.position.y < -backgroundHeight / 2) {
    ballVelocity.y = -ballVelocity.y;
  }
}

// パドルの移動速度
const paddleSpeed = 0.5;

function updatePaddles() {
  // 左パドルの移動
  if (keys.w && leftPaddle.position.y < backgroundHeight / 2 - paddleHeight / 2) {
    leftPaddle.position.y += paddleSpeed;
  } else if (keys.s && leftPaddle.position.y > -backgroundHeight / 2 + paddleHeight / 2) {
    leftPaddle.position.y -= paddleSpeed;
  }

  // 右パドルの移動
  if (keys.ArrowUp && rightPaddle.position.y < backgroundHeight / 2 - paddleHeight / 2) {
    rightPaddle.position.y += paddleSpeed;
  } else if (keys.ArrowDown && rightPaddle.position.y > -backgroundHeight / 2 + paddleHeight / 2) {
    rightPaddle.position.y -= paddleSpeed;
  }
}

// キーボードのイベントリスナーを追加
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// キーボードの入力を保持するオブジェクト
const keys = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false
};

// キーボードのイベントリスナーを追加
document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

function checkPaddleCollision() {
  // ボールと左パドルの衝突判定
  if (
    ball.position.x - ballRadius <= leftPaddle.position.x + paddleWidth / 2 &&
    ball.position.y >= leftPaddle.position.y - paddleHeight / 2 &&
    ball.position.y <= leftPaddle.position.y + paddleHeight / 2
  ) {
    ballVelocity.x = -ballVelocity.x;
  }
  // ボールと右パドルの衝突判定
  if (
    ball.position.x + ballRadius >= rightPaddle.position.x - paddleWidth / 2 &&
    ball.position.y >= rightPaddle.position.y - paddleHeight / 2 &&
    ball.position.y <= rightPaddle.position.y + paddleHeight / 2
  ) {
    ballVelocity.x = -ballVelocity.x;
  }
}

let leftScore = 0;
let rightScore = 0;

function checkGoalCollision() {
  // ボールが左ゴールに入った場合
  if (ball.position.x - ballRadius <= leftGoal.position.x) {
    rightScore++;
    resetBall();
  }

  // ボールが右ゴールに入った場合
  if (ball.position.x + ballRadius >= rightGoal.position.x) {
    leftScore++;
    resetBall();
  }
}

function resetBall() {
  // ボールを初期位置に戻す
  ball.position.set(0, 0, 0);
  // ボールの速度をランダムな方向に設定
  const randomDirection = Math.random() > 0.5 ? 1 : -1;
  ballVelocity.x = ballSpeed * randomDirection;
  ballVelocity.y = ballSpeed * randomDirection;
}

function updateScore() {
  // スコアを表示するHTML要素を更新
  document.getElementById('left-score').textContent = leftScore;
  document.getElementById('right-score').textContent = rightScore;
}

function checkGameOver() {
  if (leftScore === 11 || rightScore === 11) {
    // ゲームを終了し、勝者を表示
    const winner = leftScore === 11 ? 'Left Player' : 'Right Player';
    showGameOverMessage(winner);
    
    // ゲームを一時停止する
    isPaused = true;
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline-block';
  }
}

// スタートボタン
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
  // ゲームを開始する処理を実装
  isPaused = false;
  startButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
  
  // ボールを初期位置に戻す
  resetBall();
  
  // スコアをリセット
  leftScore = 0;
  rightScore = 0;
  updateScore();
  
  // ゲームオーバーメッセージを非表示にする
  gameOverMessage.style.display = 'none';
}

// 中断ボタン
const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', togglePause);

let isPaused = true; // ゲーム開始前は一時停止状態にする

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = 'Resume Game';
  } else {
    pauseButton.textContent = 'Pause Game';
  }
}

function showGameOverMessage(winner) {
  const gameOverMessage = document.getElementById('game-over-message');
  gameOverMessage.textContent = `Game Over! ${winner} wins!`;
  gameOverMessage.style.display = 'block';
}

function animate() {
  // ゲームの状態を更新
  if (!isPaused) {
    updateBall();
    updatePaddles();
    checkPaddleCollision();
    checkGoalCollision();
    updateScore();
    checkGameOver();
  }

  // シーンをレンダリング
  renderer.render(scene, camera);

  // 次のフレームをリクエスト
  requestAnimationFrame(animate);
}

// アニメーションループを開始
animate();

function onWindowResize() {
  // カメラのアスペクト比を更新
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // レンダラーのサイズを更新
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ウィンドウのリサイズイベントリスナーを追加
window.addEventListener('resize', onWindowResize);


// デバッグ
// デバッグ用: ボールの位置を確認
console.log('Ball position:', ball.position);

// デバッグ用: パドルの位置を確認
console.log('Left paddle position:', leftPaddle.position);
console.log('Right paddle position:', rightPaddle.position);

// デバッグ用: ゴールの位置を確認
console.log('Left goal position:', leftGoal.position);
console.log('Right goal position:', rightGoal.position);