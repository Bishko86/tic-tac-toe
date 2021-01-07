"use strict"
window.onload = function () {
    const w = document.querySelector('body')
    const screenHeight = w.offsetHeight;
    const footer = document.querySelector('footer');
    footer.style.height = screenHeight + 'px';
}

const scrollDown = document.querySelector('.fa-angle-double-down');
scrollDown.onclick = () => {
    scrollToFooter()
}

function scrollToFooter() {
    const clientYHeight = document.documentElement.clientHeight;
    let point = 2;
    let scroll = () => {
        window.scrollBy(0, 25);
        point += 25;
        if (point > clientYHeight) {
            clearInterval(durScroll);
        }
    }
    let durScroll = setInterval(scroll, 15);
}

const scrollUp = document.querySelector('.fa-angle-double-up');
scrollUp.onclick = () => {
    scrollToPage();
}

function scrollToPage() {
    const clientYHeight = document.documentElement.clientHeight;
    let point = 0;
    let scroll = () => {
        window.scrollBy(0, -25);
        point += 25;
        if (point >= clientYHeight) {
            clearInterval(durScroll);
        }
    }
    let durScroll = setInterval(scroll, 15);
}


// play on full screen

const header = document.querySelector('header');
const aside = document.querySelector('aside');
const article = document.querySelector('article');
const footer = document.querySelector('footer');
const main = document.querySelector('main');
const pdnBlock = document.querySelector('.column');
const arrowDown = document.querySelector('.to-footer');
const fullScreen = document.querySelector('.full-screen');
const collapse = document.querySelector('.coll');
fullScreen.onclick = () => {
    header.style.display = 'none';
    aside.style.display = 'none';
    article.style.display = 'none';
    footer.style.display = 'none';
    arrowDown.style.display = 'none';
    fullScreen.style.display = 'none'
    collapse.style.display = 'block'
    main.style.minHeight = '100%';
    pdnBlock.style.margin = '5px 0 50px 0';
}
collapse.onclick = () => {
    fullScreen.style.display = 'block';
    collapse.style.display = 'none';
    header.style.display = 'block';
    aside.style.display = 'block';
    article.style.display = 'block';
    footer.style.display = 'block';
    arrowDown.style.display = 'block';
    main.style.minHeight = '81%';
    pdnBlock.style.margin = '0';
}
// floating windows
const menu = document.querySelector('.fa-bars');
menu.onclick = () => {
    showMenu();
}
function showMenu() {
    if (document.querySelector('.menu')) {
        if (document.querySelector('.test')) closeInfo('.test', 'formRadio', 'close', 'adapt-level', 'test');
        if (document.querySelector('.tasc')) closeInfo('.tasc', 'htmlBlock', 'close', 'adapt-level', 'tasc');
        if (document.querySelector('.information').classList.contains('init-info-style')) closeWindow();
        removeElem(document.querySelector('.menu'), 'close');
        return;
    }

    const closeMenu = '<p id="up"><i class="fa fa-angle-double-up" aria-hidden="true"></i></p>';
    let sound = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
    if (soundOffOn) {
        sound = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
    }
    const header = document.querySelector('.parent');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    p.innerHTML = 'Levels';
    p2.innerHTML = 'Info';
    p.classList.add('font');
    p2.classList.add('font');
    div2.classList.add('phone-sound');
    div.insertAdjacentHTML('beforeEnd', closeMenu);
    div2.insertAdjacentHTML('beforeend', sound);
    div.classList.add('menu');
    div.prepend(p, p2, div2);
    header.prepend(div);
    div.onclick = clickMenuClose;
}

function removeElem(elem, style) {
    elem.classList.add(style);
    setTimeout(() => { elem.remove() }, 600);
}
function clickMenuClose(e) {
    let target = e.target;
    if (target.tagName == 'I' && target.classList.contains('fa-angle-double-up')) {
        removeElem(target.parentNode.parentNode, 'close')
    }
    if (target.tagName == 'I' && target.parentNode.classList.contains('phone-sound')) {
        onOffSound(e);
    }
    if (target.tagName == 'P' &&
        target.innerText == 'Levels') {
        if (document.querySelector('.levels')) {
            const formRadio = window.formRadio = document.querySelector('.levels');
            document.querySelector('.levels').remove();
        }
        const header = document.querySelector('.parent');
        formRadio.classList.add('adapt-level', 'test');
        header.prepend(formRadio);
        changeStyleClass();
    }
    if (target.tagName == 'P' && target.innerText == 'Info') {
        showBlock('.prt-blc', '.parent', 'adapt-level', 'tasc');
    }
}

function changeStyleClass() {
    const titleBlock = document.querySelector('.option');
    const inputRadio = document.querySelector('.options');
    const closeMenu = '<p id="up"><i class="fa fa-angle-double-up" aria-hidden="true"></i></p>';
    inputRadio.insertAdjacentHTML('beforeEnd', closeMenu);
    if (titleBlock) titleBlock.remove();
}
function insertText(elem, text) {
    elem.innerText = text;
}
function showBlock(selector, parent, ...cssClass) {
    if (document.querySelector(selector)) {
        const clone = document.querySelector(selector);
        let title = document.querySelector('.info-title');
        title.remove();
        const htmlBlock = window.htmlBlock = clone;
        clone.remove();
    }
    insertText(htmlBlock.querySelector('#rules'), 'Rules');
    insertText(htmlBlock.querySelector('#history'), 'History');
    insertText(htmlBlock.querySelector('#app'), 'Application');
    const closeMenu = '<p id="up"><i class="fa fa-angle-double-up" aria-hidden="true"></i></p>',
        parentBlock = document.querySelector(parent);
    htmlBlock.classList.add(...cssClass);
    htmlBlock.insertAdjacentHTML('beforeEnd', closeMenu);
    parentBlock.prepend(htmlBlock);
    htmlBlock.addEventListener('click', infoHandler);

}
//data for info block
const infoText = {
    rules: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui repudiandae soluta totam delectus impedit omnis perferendis expedita est ut tempora obcaecati accusamus earum aliquam, corrupti illo, at dignissimos esse corporis!',
    history: 'A ging dolor sit amet consectetur adipisicing elit. Sit maxime magnam deleniti incidunt quasi libero minus, dicta omnis quibusdam vero praesentium dolores totam eos quisquam, voluptates exercitationem mollitia nemo ullam odio et quas doloribus saepe. Fugiat consequuntur dolor nisi blanditiis possimus corrupti, hic incidunt enim suscipit, sit tempore natus iure!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui repudiandae soluta totam delectus impedit omnis perferendis expedita est ut tempora obcaecati accusamus earum aliquam, corrupti illo, at dignissimos esse corporis! dolor sit amet consectetur adipisicing elit. Sit maxime magnam deleniti incidunt quasi libero minus, dicta omnis quibusdam vero praesentium dolores totam eos quisquam, voluptates exercitationem mollitia nemo ullam odio et quas doloribus saepe. Fugiat consequuntur dolor nisi blanditiis possimus corrupti, hic incidunt enim suscipit, sit tempore natus iure!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui repudiandae soluta totam delectus impedit omnis perferendis expedita est ut tempora obcaecati accusamus earum aliquam, corrupti illo, at dignissimos esse corporis!',
    app: 'To deleniti incidunt quasi libero minus, dicta omnis quibusdam vero praesentium dolores totam eos quisquam, voluptates exercitationem mollitia nemo ullam odio et quas doloribus saepe. Fugiat consequuntu',
    close: (e) => {

        if (e.target.tagName == 'I') {
            closeWindow();
        }
    }


}//clears the information block from style classes
function closeWindow() {
    const infoBlock = document.querySelector('.information');
    infoBlock.classList.add('close-info');
    setTimeout(() => {
        infoBlock.classList.remove('init-info-style');
        infoBlock.classList.remove('close-info');
        infoBlock.innerHTML = '';
        infoBlock.style.display = 'none';
    }, 500);
}
//info mobile block: handler for closing and showing info block
function infoHandler(e) {
    const target = e.target;
    if (target.tagName == 'I' && target.parentNode.tagName == 'P') {
        closeInfo('.tasc', 'htmlBlock', 'close', 'adapt-level', 'tasc');
        return;
    }
    if (target.classList.contains('info-add') && target.innerText == 'Rules') {
        showInfo('.information', infoText.rules, 'Rules', 'init-info-style', closeMenuBtn);
        return;
    }
    if (target.tagName == 'DIV' && target.innerText == 'History') {
        showInfo('.information', infoText.history, 'History', 'init-info-style', closeMenuBtn);
        return;
    }
    if (target.tagName == 'DIV' && target.innerText == 'Application') {
        showInfo('.information', infoText.app, 'Application', 'init-info-style', closeMenuBtn);
        return;
    }
}
//close information block
function closeInfo(selector, global, style1, style2, style3) {
    const closeElem = document.querySelector(selector);
    closeElem.classList.add(style1)
    setTimeout(() => {
        document.querySelector('#up').remove();
        window[global].classList.remove(style1, style2, style3)
        closeElem.remove();
    }, 600);
}
//button for close window
const closeMenuBtn = '<p id="up"><i class="fa fa-angle-double-up" aria-hidden="true"></i></p>';
//function for showing info block;
function showInfo(selector, info, key, style, closeButton) {
    const infoBlock = document.querySelector(selector),
        title = document.createElement('h2');
    title.innerHTML = key;
    infoBlock.classList.add(style);
    infoBlock.style.display = 'block'
    infoBlock.innerText = info;
    infoBlock.prepend(title);
    infoBlock.insertAdjacentHTML('afterBegin', closeButton);
    infoBlock.onclick = infoText.close;
}
