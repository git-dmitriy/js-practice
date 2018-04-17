const FIELD_SIZE_X = 30; // Количество строк
const FIELD_SIZE_Y = 40; // Количество ячеек
const snake = [];

let snakeSpeed = 300; // скорость
let gameIsRunning = false; // запущена ли игра
let snakeDirection = 'up'; // направление движения
let moveIntervalId; // интервал движения
let score;
let totalScore = 0;

// Инициализация игры
function initialize() {
  prepareGameField();
  score = document.getElementById('totalScore');
  document.getElementById('snake-start').addEventListener('click', startGame);
  document.getElementById('snake-renew').addEventListener('click', refreshGame);

  window.addEventListener('keydown', changeSnakeDirection);
}
// Генерирует карту
function prepareGameField() {
  const game_table = document.createElement('table');

  game_table.classList.add('game-table');

  for (let i = 0; i < FIELD_SIZE_X; i++) {
    let row = document.createElement('tr');

    row.classList.add('game-table-row');

    for (let j = 0; j < FIELD_SIZE_Y; j++) {
      let cell = document.createElement('td');

      cell.classList.add('game-table-cell');
      
      cell.dataset.row = i;
      cell.dataset.cell = j;

      row.appendChild(cell);
    }
    game_table.appendChild(row);
  }
  document.getElementById('snake-field').appendChild(game_table);
}
// Передвигает змейку на один шаг
function move() {
  let new_unit;
  let snake_head = snake[snake.length - 1];

  let row = parseInt(snake_head.dataset.row, 10);
  let cell = parseInt(snake_head.dataset.cell, 10);

  if (snakeDirection === 'up') {
    new_unit = getGameCell(row - 1, cell);
  } else if (snakeDirection === 'down') {
    new_unit = getGameCell(row + 1, cell);
  } else if (snakeDirection === 'left') {
    new_unit = getGameCell(row, cell - 1);
  } else if (snakeDirection === 'right') {
    new_unit = getGameCell(row, cell + 1);
  }


  if (new_unit !== null && !new_unit.classList.contains('snake-unit')) {
    new_unit.classList.add('snake-unit');
    snake.push(new_unit);

    if (!new_unit.classList.contains('food-unit')) {
      let removed = snake.splice(0, 1)[0];
      removed.classList.remove('snake-unit');
    } else {
      new_unit.classList.remove('food-unit');
      setTimeout(createFood, 1000);
      totalScore += 25;
      score.innerHTML = totalScore;
      speedupSnake();
    }
  } else {
    finishGame();
  }
}
// Конец игры
function finishGame() {
  gameIsRunning = false;
  clearInterval(moveIntervalId);
  let message = 'Игра окончена!\nВаш счет: ' + totalScore;
  alert(message);
}
// Ускоряем змейку
function speedupSnake() {
  if (snakeSpeed != 30) {
    snakeSpeed -= 30;
  }

  clearInterval(moveIntervalId);
  moveIntervalId = setInterval(move, snakeSpeed);
}
// Запускаем игру
function startGame() {
  gameIsRunning = true;
  respawn();
  moveIntervalId = setInterval(move, snakeSpeed);
  setTimeout(createFood, 3000);
}

// Создаём еду
function createFood() {
  let foodCreated = false;
  while (!foodCreated) {
  let food_x = Math.floor(Math.random() * FIELD_SIZE_X);
  let food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

  let cell = getGameCell(food_x, food_y);

    if (!cell.classList.contains('snake-unit')) {
      cell.classList.add('food-unit');
      foodCreated = true;
    }
  }
}
// Находим ячейку по координатам
function getGameCell(x, y) {
  return document.querySelector(`.game-table-cell[data-row = "${x}"][data-cell = "${y}"]`);
}
// Располагаем змейку на поле
function respawn() {
  let start_coord_x = Math.floor(FIELD_SIZE_X / 2);
  let start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
  // координаты
  let snake_head = getGameCell(start_coord_x, start_coord_y);
  let snake_tail = getGameCell(start_coord_x - 1, start_coord_y);
  snake_head.classList.add('snake-unit');
  snake_tail.classList.add('snake-unit');
  snake.push(snake_head, snake_tail);
}
// Перезагрузка игры
function refreshGame() {
  window.location.reload();
}
// Изменяем направление движения змейки
function changeSnakeDirection(event) {
  switch (event.keyCode) {
    case 37: // влево
      if (snakeDirection !== 'right') {
        snakeDirection = 'left';
      }
      break;
    case 38:
      if (snakeDirection !== 'down') {
        snakeDirection = 'up';
      }
      break;
    case 39:
      if (snakeDirection !== 'left') {
        snakeDirection = 'right';
      }
      break;
    case 40:
      if (snakeDirection !== 'up') {
        snakeDirection = 'down';
      }
      break;
  }
  console.log(snakeDirection);
}
// Инициализируем игру по готовности документа
window.onload = initialize;
