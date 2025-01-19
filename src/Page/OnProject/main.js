// 캔버스 및 기본 설정
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let gameover = false;
let score = 0;

const spaceship = {
  x: canvas.width / 2 - 32,
  y: canvas.height - 64,
  width: 64,
  height: 64,
};

const keyDown = {};
const bulletList = [];
const enemyList = [];

// 게임 상태 초기화
function resetGameState() {
  gameover = false;
  score = 0;
  bulletList.length = 0; // 총알 배열 초기화
  enemyList.length = 0;  // 적 배열 초기화
}


// 유틸리티 함수
function generateRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 이미지 로드
function loadImages() {
  backgroundImage = loadImage("images/background.jpg");
  spaceshipImage = loadImage("images/spaceship.png");
  bulletImage = loadImage("images/bullet.png");
  enemyImage = loadImage("images/enemy.png");
  gameoverImage = loadImage("images/gameover.jpg");
}

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// 키보드 이벤트 설정
function setupKeyboardListener() {
  document.addEventListener("keydown", (event) => {
    keyDown[event.keyCode] = true;
  });

  document.addEventListener("keyup", (event) => {
    delete keyDown[event.keyCode];
    if (event.keyCode === 32) createBullet(); // 스페이스바로 총알 생성
  });
}

// 총알 클래스
class Bullet {
  constructor() {
    this.x = spaceship.x + spaceship.width / 2 - 4;
    this.y = spaceship.y;
    this.alive = true;
  }

  update() {
    this.y -= 7;
    this.checkHit();
  }

  checkHit() {
    for (let i = 0; i < enemyList.length; i++) {
      const enemy = enemyList[i];
      if (this.y <= enemy.y + enemy.height && this.x >= enemy.x && this.x <= enemy.x + enemy.width) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1); // 적 제거
        break;
      }
    }
  }
}

function createBullet() {
  bulletList.push(new Bullet());
}

// 적 클래스
class Enemy {
  constructor() {
    this.x = generateRandomValue(0, canvas.width - 32);
    this.y = 0;
    this.width = 32;
    this.height = 32;
  }

  update() {
    this.y += 5;
    if (this.y >= canvas.height) {
      gameover = true; // 게임 종료
    }
  }
}

function createEnemy() {
  setInterval(() => {
    enemyList.push(new Enemy());
  }, 1000);
}

// 게임 업데이트
function update() {
  // 우주선 이동
  if (37 in keyDown) spaceship.x -= 5; // 왼쪽
  if (39 in keyDown) spaceship.x += 5; // 오른쪽
  if (spaceship.x < 0) spaceship.x = 0;
  if (spaceship.x > canvas.width - spaceship.width) spaceship.x = canvas.width - spaceship.width;

  // 총알 업데이트
  bulletList.forEach((bullet, index) => {
    if (bullet.alive) bullet.update();
    else bulletList.splice(index, 1);
  });

  // 적 업데이트
  enemyList.forEach((enemy) => enemy.update());
}

// 렌더링
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y, spaceship.width, spaceship.height);

  // 점수 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 20, 30);

  // 총알 그리기
  bulletList.forEach((bullet) => {
    if (bullet.alive) ctx.drawImage(bulletImage, bullet.x, bullet.y);
  });

  // 적 그리기
  enemyList.forEach((enemy) => {
    ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
  });

  // 게임오버 화면
  if (gameover) {
    ctx.drawImage(gameoverImage, 50, 150, 300, 300);
  }
}

// 게임 루프
function main() {
  if (!gameover) {
    update();
    render();
    requestAnimationFrame(main);
  }
}

// 초기화
function init() {
  resetGameState();
  loadImages();
  setupKeyboardListener();
  createEnemy();
  main();
}

init();
