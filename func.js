'use strict'
let form = document.forms.levels;
form.addEventListener('change', checkLevel);
function checkLevel(event) {
	let target = event.target;
	(target.value == 'easy') ? low = true : low = false;
	(target.value == 'middle') ? middle = true : middle = false;
	(target.value == 'hight') ? alert('fff') : hight = false;
}
form.addEventListener('click', closeMobileMenu);

function closeMobileMenu(e) {
	if (e.target.tagName == 'I') closeInfo('.test', 'formRadio', 'close', 'adapt-level', 'test');
	console.log('fdgdf');
}
