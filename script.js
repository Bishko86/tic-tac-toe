'use strict'
let opponent;
let game = false;
let counts = {
	'amount-games': 0,
	'count-x': 0,
	'count-o': 0
}
let low = false;
let middle = true;
let hight = false;
let player = {
	first: '<i class="fa fa-times" aria-hidden="true"></i> ',
	second: '<i class="fa fa-circle-o" aria-hidden="true"></i>',
	countFirst: 'count-x',
	countSecond: 'count-o',
}
let audio = new Audio();
let soundOffOn = false;
const closeBtnWindow = '<div class="btn-close"><i class="fa fa-times close-fa" aria-hidden="true"></i></div>';

function sound(record, trec, mute) {
	record.src = trec;
	record.autoplay = true;
	record.muted = mute;
}
function amountGames(scoreboard, winPlayer, selector) {
	let quantityGames = ++scoreboard[selector];
	document.querySelector('.' + selector).innerHTML = quantityGames;
	if (winPlayer == 'equally') return;
	let count = ++scoreboard[winPlayer];
	document.querySelector('.' + winPlayer).innerHTML = count;
}

let progress = 0;
const checkField = {
	a: {
		'0a': 0,
		'0b': 1,
		'0c': 2
	},
	b: {
		'1a': 0,
		'1b': 1,
		'1c': 2
	},
	c: {
		'2a': 0,
		'2b': 1,
		'2c': 2
	},
	d: {
		0: 0,
		1: 0,
		2: 0
	},
	e: {
		0: 1,
		1: 1,
		2: 1
	},
	f: {
		0: 2,
		1: 2,
		2: 2
	},
	g: {
		0: 0,
		1: 1,
		2: 2
	},
	h: {
		0: 2,
		1: 1,
		2: 0
	}
}
const soundOff = document.querySelector('.fa-volume-up');
soundOff.addEventListener('click', onOffSound)

const cours = document.querySelector('.tools');
cours.addEventListener('click', playerHand);

const table = document.querySelector('table');
table.addEventListener('click', handler);

document.addEventListener('game-over', function (event) {
	let winField = event.detail.field;
	let playerWinner = event.detail.winner;
	amountGames(counts, playerWinner, 'amount-games');

	if (!winField) {
		let equally = document.querySelectorAll('td');
		for (let elem of equally) {
			elem.classList.add('equally')
		}
	}

	if (winField) {
		for (let key in winField) {
			table.rows[parseInt(key)].cells[winField[key]].classList.add('win');
		}
		for (let elem of document.querySelectorAll('#busy')) {
			if (elem.classList.contains('win')) continue;
			elem.classList.add('equally');
		}
		rotate();
	}
});
function rotate() {
	let elems = document.querySelectorAll('.win');
	elems.forEach(elem => elem.firstChild.classList.add('animation'));
}

function onOffSound(event) {
	let target = event.target;
	if (target.tagName == 'I' &&
		target.classList.contains('fa-volume-up')) {
		target.classList.remove('fa-volume-up');
		target.classList.add('fa-volume-off');
		soundOffOn = true;
	}
	else {
		target.classList.remove('fa-volume-off');
		target.classList.add('fa-volume-up')
		soundOffOn = false;
	}

}

function styleColorText(titleText, selector) {
	const text = titleText.split('');
	const colors = ['green', 'yellow', 'red', 'brown', 'white', 'blue', 'pink'];
	for (let i = 0; i <= text.length - 1; i++) {
		let el = `<span class="title" style ="color:${colors[(text.length) % (i + 1)]};">${text[i]}</span>`;
		selector.innerHTML += el;
	}
}
styleColorText('Tic tac Toe', document.querySelector('h1'));

function handler(event) {
	const target = event.target;
	if (target.tagName != 'TD') return;
	if (freeIcon().length == 0 || progress == 3) {
		newGame();
	}
	else {
		if (target.tagName == 'I') return;
		if (progress == 0) {
			opponent = target;
			assignX(target, progress);
		}
	}
}

function playerHand(event) {
	let target = event.target;
	if (game == true || progress == 3) return;
	if (target.tagName == 'DIV' &&
		target.classList.contains('O')) {
		document.querySelector('.X').classList.remove('select');
		target.classList.add('select');
		progress = 1;
		game = true;
		player.first = '<i class="fa fa-circle-o" aria-hidden="true"></i>';
		player.countFirst = 'count-o';
		player.second = '<i class="fa fa-times" aria-hidden="true"></i> ';
		player.countSecond = 'count-x';
		levels(low, middle, hight);
	}
}

function checkLines(field) {
	let row;
	let cell;
	opponent = {};

	label: for (let keys of Object.values(field)) {
		let XfullField = 0;
		let OfullField = 0;

		for (let key in keys) {
			row = parseInt(key);
			cell = keys[key];

			if (table.rows[row].cells[cell].innerHTML == player.first) {
				opponent[row] = cell;
				XfullField++;
				if (XfullField == 3) {
					game = false;
					progress = 3;
					gameOver(keys, player.countFirst, 'https://pic.pikbest.com/00/62/92/40J888piCITh.mp3')
					break label;
				}
			}
			if (table.rows[row].cells[cell].innerHTML == player.second) {
				OfullField++;
				if (OfullField == 3) {
					game = false;
					progress = 3;
					gameOver(keys, player.countSecond, 'https://pic.pikbest.com/00/62/92/40J888piCITh.mp3')
					break label;
				}
			}
		}
	}
	if (freeIcon().length == 0 && progress < 3) {
		gameOver(false, 'equally', 'sound/e0bdf44775a0d80.mp3')
	}
}


let collect = Array.from(document.querySelectorAll('td'));
let opIndex;
function assignX(elem, value) {
	opIndex = collect.indexOf(opponent);
	if (elem.id == 'busy') return;
	if (value == 0) {
		progress = 1;
		game = true;
		elem.setAttribute('id', 'busy');
		elem.innerHTML = player.first;
		checkLines(checkField);
		levels(low, middle, hight);
	}
}

function assignO(elem, value) {
	if (value == 1) {
		new Promise(function (resolve, reject) {
			setTimeout(() => {
				game = true;
				elem.setAttribute('id', 'busy');
				elem.innerHTML = player.second;
				progress = 0;
				resolve();
			}, 800);

		}).then(result => checkLines(checkField));
	}
}




function freeIcon() {
	let allTd = document.querySelectorAll('td');
	let freeIcons = [];
	for (let elem of allTd) {
		if (elem.innerHTML) continue;
		freeIcons.push(elem);
	}
	return freeIcons;
}
function gameOver(line, player, music) {
	setTimeout(function () {
		table.dispatchEvent(new CustomEvent('game-over', {
			bubbles: true,
			detail: {
				field: line,
				winner: player
			}
		}));
	}, 4);
	setTimeout(function () {
		sound(audio, music, soundOffOn);
	}, 500);
}

function android() {
	let freeIcons = freeIcon();
	if (freeIcons.length == 0) return;
	let index = getRandom(0, freeIcons.length);
	assignO(freeIcons[index], progress);
}

function getRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function analysis() {
	if (game) {
		let fieldsList = ['h1', 'h2', 'h3', 'v1', 'v2', 'v3', 'd1', 'd2'];
		let value = true;
		let lines = {
			h1: [],
			h2: [],
			h3: [],
			v1: [],
			v2: [],
			v3: [],
			d1: [],
			d2: [],
		}
		let prop = [lines.h1, lines.h2, lines.h3, lines.v1, lines.v2, lines.v3, lines.d1, lines.d2];

		label: for (let i = 0; i < 8; i++) {
			let field = document.querySelectorAll('.' + fieldsList[i]);
			for (let elem of field) {
				if (elem.innerHTML == player.first) {
					prop[i].push(elem);
				}
			}
			if (prop[i].length == 2) {
				let state = attack();
				if (!state) {
					value = false;
					break label;
				}
				if (state == true) {
					for (let key of field) {
						if (!key.innerHTML) {
							value = false;
							assignO(key, progress);
							break label;
						}
					}
				}
			}
		}
		if (value) {
			android();
		}
	}
}


function attack() {
	let value = true;
	let fieldsList = ['h1', 'h2', 'h3', 'v1', 'v2', 'v3', 'd1', 'd2'];
	let lines = {
		h1: [],
		h2: [],
		h3: [],
		v1: [],
		v2: [],
		v3: [],
		d1: [],
		d2: [],
	}
	let prop = [lines.h1, lines.h2, lines.h3, lines.v1, lines.v2, lines.v3, lines.d1, lines.d2];
	label: for (let i = 0; i < 8; i++) {
		let field = document.querySelectorAll('.' + fieldsList[i]);
		for (let elem of field) {
			if (elem.innerHTML == player.second) {
				prop[i].push(elem);
			}
		}
		if (prop[i].length == 2) {
			for (let key of field) {
				if (!key.innerHTML) {
					value = false;
					assignO(key, progress);
					break label;
				}
			}
		}
	}
	return value;
}




function newGame() {

	player.first = '<i class="fa fa-times" aria-hidden="true"></i> ';
	player.second = '<i class="fa fa-circle-o" aria-hidden="true"></i>';
	player.countFirst = 'count-x';
	player.countSecond = 'count-o';
	progress = 0;
	opponent = {};
	document.querySelector('.X').classList.add('select');
	document.querySelector('.O').classList.remove('select');
	let allTd = document.querySelectorAll('td');
	allTd.forEach(elem => elem.innerHTML = '');
	for (let key of allTd) {
		if (key.classList.contains('win')) key.classList.remove('win');
		if (key.classList.contains('equally')) key.classList.remove('equally');
		if (key.id) key.removeAttribute('id');
	}
}
function levels(easy, normal, imposible) {
	if (easy) android();
	if (normal) analysis();
	if (imposible) hardLevel(opIndex, collect);
}

const info = document.querySelector('.info-block');
info.onclick = showInfoBlock;

function showInfoBlock(e) {
	const infoBlock = document.querySelector('.inform');
	let target = e.target;
	if (target.tagName == 'DIV' && target.id == 'rules') {
		if (infoBlock.classList.contains('show-block')) {
			closeAnimInfo(infoBlock);
			return
		}
		showInfo('.inform', infoText.rules, 'Rules', 'show-block', closeBtnWindow);
		return;
	}
	if (target.tagName == 'DIV' && target.id == 'history') {
		if (infoBlock.classList.contains('show-block')) {
			closeAnimInfo(infoBlock);
			return
		}
		showInfo('.inform', infoText.history, 'History', 'show-block', closeBtnWindow);
		return;
	}
	if (target.tagName == 'DIV' && target.id == 'app') {
		if (infoBlock.classList.contains('show-block')) {
			closeAnimInfo(infoBlock);
			return
		}
		showInfo('.inform', infoText.app, 'Application', 'show-block', closeBtnWindow);
		return;
	}
}
const informBlock = document.querySelector('.inform');
informBlock.addEventListener('click', closeInformBlock);
function closeInformBlock(e) {
	let target = e.target;
	if (target.tagName == 'I' && target.parentNode.classList.contains('btn-close')) {
		const infoBlock = document.querySelector('.inform');
		closeAnimInfo(infoBlock);
	}
}
function closeAnimInfo(elem) {
	elem.classList.remove('show-block');
	elem.classList.add('close-block');
	setTimeout(() => {
		elem.classList.remove('close-block');
		elem.style.display = 'none';
	}, 500);
}