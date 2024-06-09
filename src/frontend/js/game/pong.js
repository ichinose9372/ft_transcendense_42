function pongEventHandlers() {
  const gameContainer = document.getElementById("game-container");
  if (gameContainer) {
    gameContainer.appendChild(renderer.domElement);
    initParticipantText();
  }
  // スタートボタン
  const startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", startPong);
  }
  // 中断ボタン
  const pauseButton = document.getElementById("pause-button");
  if (pauseButton) {
    pauseButton.addEventListener("click", togglePause);
  }
  // モーダル
  const tournamentModal = document.getElementById("tournamentModal");
  if (tournamentModal) {
    tournamentModal.addEventListener("hidden.bs.modal", function () {
      const tournamentDraw = document.getElementById("tournamentDraw");
      if (tournamentDraw) {
        tournamentDraw.innerHTML = "";
      }
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());

      document.body.classList.remove("modal-open");
    });
  }
  // TODO : モーダルテスト用→ボタンではなく試合の流れに合わせて表示するようにする
  const modalTestButton = document.getElementById("modalTestButton");
  if (modalTestButton) {
    modalTestButton.addEventListener("click", () => {
      // TODO : この関数を適切な位置で呼び出せば良い
      openModal();
    });
  }

  // pongの画面上でリロードした場合、トップページにリダイレクト
  if (gameContainer) {
    window.addEventListener('load', () => {
      const perfEntries = performance.getEntriesByType("navigation");
      const isReload = perfEntries[0].type === 'reload';
      if (isReload) {
        window.location.href = '/';
      }
    });
  }
}

// モーダルを開き，トーナメントを描画
function openModal() {
  let myModal = new bootstrap.Modal(
    document.getElementById("tournamentModal"),
    {
      keyboard: false,
    }
  );
  myModal.show();
  tournamentDraw();
}

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

// ライティングの設定
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// 背景の作成
const backgroundWidth = 120;
const backgroundHeight = 50;
const backgroundDepth = 1;
const backgroundGeometry = new THREE.BoxGeometry(
  backgroundWidth,
  backgroundHeight,
  backgroundDepth
);
const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
background.position.set(0, 0, -5);
scene.add(background);

// ボールの作成
const ballRadius = 1;
const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// パドルの作成
const paddleWidth = 1;
const paddleHeight = 8;
const paddleDepth = 2;
const paddleGeometry = new THREE.BoxGeometry(
  paddleWidth,
  paddleHeight,
  paddleDepth
);
const paddleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
leftPaddle.position.set(-backgroundWidth / 2 + paddleWidth, 0, 0);
scene.add(leftPaddle);

const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
rightPaddle.position.set(backgroundWidth / 2 - paddleWidth, 0, 0);
scene.add(rightPaddle);

// ゴールの作成
const goalWidth = 1;
const goalHeight = 50;
const goalGeometry = new THREE.PlaneGeometry(goalWidth, goalHeight);
const goalMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

const leftGoal = new THREE.Mesh(goalGeometry, goalMaterial);
leftGoal.position.set(-backgroundWidth / 2 + goalWidth, 0, 0);
scene.add(leftGoal);

const rightGoal = new THREE.Mesh(goalGeometry, goalMaterial);
rightGoal.position.set(backgroundWidth / 2 - goalWidth, 0, 0);
scene.add(rightGoal);

// 上下の壁の作成
const wallWidth = backgroundWidth;
const wallHeight = 1;
const wallDepth = 1;
const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const topWall = new THREE.Mesh(wallGeometry, wallMaterial);
topWall.position.set(0, backgroundHeight / 2 + 1, 0);
scene.add(topWall);

const bottomWall = new THREE.Mesh(wallGeometry, wallMaterial);
bottomWall.position.set(0, -backgroundHeight / 2 - 1, 0);
scene.add(bottomWall);

// 中央の点線の作成
const dashedLineWidth = 0.2;
const dashedLineHeight = backgroundHeight;
const dashedLineDepth = 1;
const dashedLineGeometry = new THREE.PlaneGeometry(
  dashedLineWidth,
  dashedLineHeight
);
const dashedLineMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});

const dashedLine = new THREE.Mesh(dashedLineGeometry, dashedLineMaterial);
dashedLine.position.set(0, 0, 0);
scene.add(dashedLine);

// ボールの初期位置と速度
const ballSpeed = 0.5;
const ballVelocity = new THREE.Vector3(ballSpeed, ballSpeed, 0);

function updateBall() {
  // ボールの位置を速度に基づいて更新
  ball.position.add(ballVelocity);

  // ボールが上下の壁に衝突した場合、速度のY成分を反転
  if (
    ball.position.y > backgroundHeight / 2 ||
    ball.position.y < -backgroundHeight / 2
  ) {
    ballVelocity.y = -ballVelocity.y;
  }
}

// パドルの移動速度
const paddleSpeed = 0.5;

function updatePaddles() {
  // 左パドルの移動
  if (
    keys.w &&
    leftPaddle.position.y < backgroundHeight / 2 - paddleHeight / 2
  ) {
    leftPaddle.position.y += paddleSpeed;
  } else if (
    keys.s &&
    leftPaddle.position.y > -backgroundHeight / 2 + paddleHeight / 2
  ) {
    leftPaddle.position.y -= paddleSpeed;
  }

  // 右パドルの移動
  if (
    keys.ArrowUp &&
    rightPaddle.position.y < backgroundHeight / 2 - paddleHeight / 2
  ) {
    rightPaddle.position.y += paddleSpeed;
  } else if (
    keys.ArrowDown &&
    rightPaddle.position.y > -backgroundHeight / 2 + paddleHeight / 2
  ) {
    rightPaddle.position.y -= paddleSpeed;
  }
}

// キーボードのイベントリスナーを追加
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// キーボードの入力を保持するオブジェクト
const keys = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
};

// キーボードのイベントリスナーを追加
document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
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

// 参加者名を表示するテキストの作成
let leftParticipantText;
let rightParticipantText;

function updateParticipantNames(leftName, rightName) {
  if (leftParticipantText) {
    leftParticipantText.textContent = leftName;
  }
  if (rightParticipantText) {
    rightParticipantText.textContent = rightName;
  }
}

// 現在の試合オブジェクトの作成
let currentMatch = null;

function initParticipantText() {
  leftParticipantText = document.getElementById("left-participant");
  rightParticipantText = document.getElementById("right-participant");

  const matches = appState.getStateByKey("matches");
  currentMatch = null;

  if (matches && matches.length > 0) {
    for (let i = matches.length - 1; i >= 0; i--) {
      const matchArray = matches[i];

      if (
        matchArray &&
        matchArray.leftParticipant !== "" &&
        matchArray.rightParticipant !== "" &&
        matchArray.leftScore === 0 &&
        matchArray.rightScore === 0
      ) {
        currentMatch = matchArray;
        break;
      }
    }
  }

  if (currentMatch) {
    updateParticipantNames(
      currentMatch.leftParticipant,
      currentMatch.rightParticipant
    );
  } else {
    console.warn("No match found with both participants.");
    updateParticipantNames("", "");
  }
}

function updateMatchData(winner) {
  if (currentMatch) {
    const matches = appState.getStateByKey("matches");
    const updatedMatches = matches.map((match) => {
      if (match.matchId === currentMatch.matchId) {
        return {
          ...match,
          leftScore: leftScore,
          rightScore: rightScore,
          finishedTimestamp: getCurrentTimestamp(),
        };
      }
      return match;
    });

    const parentMatch = matches.find(
      (match) => match.matchId === currentMatch.parentMatchId
    );

    if (parentMatch) {
      const updatedParentMatch = {
        ...parentMatch,
        leftParticipant:
          parentMatch.leftParticipant === ""
            ? winner
            : parentMatch.leftParticipant,
        rightParticipant:
          parentMatch.leftParticipant !== "" && parentMatch.rightParticipant === ""
            ? winner
            : parentMatch.rightParticipant,
      };

      const updatedMatchesWithParent = updatedMatches.map((match) => {
        if (match.matchId === parentMatch.matchId) {
          return updatedParentMatch;
        }
        return match;
      });

      appState.setState({ matches: updatedMatchesWithParent });
    } else {
      appState.setState({ matches: updatedMatches });
    }
  }
}

function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
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
  const leftScoreEl = document.getElementById("left-score");
  const rightScoreEl = document.getElementById("right-score");
  // スコアを表示するHTML要素を更新

  if (leftScoreEl) {
    leftScoreEl.textContent = leftScore;
  }
  if (rightScoreEl) {
    rightScoreEl.textContent = rightScore;
  }
}

function checkGameOver() {
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  if (leftScore === 2 || rightScore === 2) {
    // ゲームを終了し、勝者を表示
    const winner = leftScore === 2 ? currentMatch.leftParticipant : currentMatch.rightParticipant;
    showGameOverMessage(winner);

    // ゲームを一時停止する
    isPaused = true;
    pauseButton.style.display = "none";
    startButton.style.display = "inline-block";

    // 試合データを更新
    updateMatchData(winner);

    // 1秒後にモーダルを自動で開く
    setTimeout(() => {
      openModal();
    }, 1000);
  }
}

function startPong() {
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  const gameOverMessage = document.getElementById("game-over-message");
  // ゲームを開始する処理を実装
  isPaused = false;
  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";

  // ボールを初期位置に戻す
  resetBall();

  // スコアをリセット
  leftScore = 0;
  rightScore = 0;
  updateScore();

  // ゲームオーバーメッセージを非表示にする
  gameOverMessage.style.display = "none";
}

let isPaused = true; // ゲーム開始前は一時停止状態にする

function togglePause() {
  const pauseButton = document.getElementById("pause-button");
  isPaused = !isPaused;
  let label = ""
  const language = appState.getStateByKey("language");
  if (language === "ja") {
    label = isPaused ? "ゲーム再開" : "ゲーム一時停止";
  } else if (language === "fr") {
    label = isPaused ? "Reprendre le jeu" : "Mettre le jeu en pause";
  } else {
    label = isPaused ? "Resume Game" : "Pause Game";
  }
  if (isPaused) {
    pauseButton.textContent = label;
  } else {
    pauseButton.textContent = label;
  }
}

function showGameOverMessage(winner) {
  const gameOverMessage = document.getElementById("game-over-message");
  if (gameOverMessage) {
    gameOverMessage.textContent = `Game Over! ${winner} wins!`;
    gameOverMessage.style.display = "block";
  }
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
    initParticipantText();
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
window.addEventListener("resize", onWindowResize);

// デバッグ
// デバッグ用: ボールの位置を確認
console.log("Ball position:", ball.position);

// デバッグ用: パドルの位置を確認
console.log("Left paddle position:", leftPaddle.position);
console.log("Right paddle position:", rightPaddle.position);

// デバッグ用: ゴールの位置を確認
console.log("Left goal position:", leftGoal.position);
console.log("Right goal position:", rightGoal.position);

function initPong() {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    pongEventHandlers();
  });
}

initPong();
