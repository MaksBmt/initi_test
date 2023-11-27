import Life from "./life.js";
const sizeCell = 10;

const field = document.querySelector('.field');
const canvas = document.querySelector('.field__game');
const inputWidth = document.querySelector('#width');
const inputHeight = document.querySelector('#height');
const inputTime = document.querySelector('#time');

let fieldWidth = field.offsetWidth;
let fieldHeight = field.offsetHeight;
inputWidth.value = fieldWidth;
inputHeight.value = fieldHeight;

let timeGeneration = inputTime.value;
inputTime.addEventListener('input', ({ target }) => {
	timeGeneration = target.value;
});


canvas.width = field.offsetWidth;
canvas.height = field.offsetHeight;

const row = Math.round(fieldWidth / sizeCell);
const column = Math.round(fieldHeight / sizeCell);

const game = new Life(canvas, row, column, sizeCell);
game.init();

function clickStartHendler() {
	game.initSrart(timeGeneration);
}

function clickStopHandler() {
	game.stop();
}

function clickRandomHandler() {
	game.getRandomCell(timeGeneration);
}

const btnStart = document.querySelector('#start');
btnStart.addEventListener('click', clickStartHendler);

const btnStop = document.querySelector('#stop');
btnStop.addEventListener('click', clickStopHandler);

const btnRandom = document.querySelector('#random');
btnRandom.addEventListener('click', clickRandomHandler);

const btnSize = document.querySelector('#size');
btnSize.addEventListener('click', () => {
	const width = inputWidth.value;
	const height = inputHeight.value;
	canvas.width = width;
	canvas.height = height;
	const rowValue = Math.round(width / sizeCell);
	const columnValue = Math.round(height / sizeCell);
	const gameCustom = new Life(canvas, rowValue, columnValue, sizeCell);
	gameCustom.init();
	btnRandom.removeEventListener('click', clickRandomHandler);
	btnStart.removeEventListener('click', clickStartHendler);
	btnStop.removeEventListener('click', clickStopHandler);

	btnRandom.addEventListener('click', () => {
		timeGeneration = inputTime.value;
		gameCustom.getRandomCell(timeGeneration);
	});
	btnStart.addEventListener('click', () => {
		timeGeneration = inputTime.value;
		gameCustom.initSrart(timeGeneration);
	});
	btnStop.addEventListener('click', () => {
		gameCustom.stop();
	});
});


