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