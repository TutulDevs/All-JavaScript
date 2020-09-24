const pressed = [];
const konCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

function konami(e) {
    pressed.push(e.key);
    pressed.splice(0, pressed.length - konCode.length);

    const [word, konWord] = [pressed.join(''), konCode.join('')];

    if (word === konWord) cornify_add();
}

window.addEventListener('keyup', konami);
