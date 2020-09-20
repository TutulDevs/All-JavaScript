const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// set the width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'yellowgreen'; // starting color
ctx.lineJoin = 'round';
ctx.lineCap = 'round'; // rounded line-end shape
ctx.lineWidth = 25; // size of the brush

// Variables that'll work later
let isDrawing = false;
let [lastX, lastY] = [0, 0]; // starting points
let hue = 0; // for colors
let direction = true; // dir for the lineWidth

function draw(e) {
    // stop the fn if mouse isn't down | otherwise it'll paint on mousemove
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY); // go to
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY]; // start point are the same

    // add some color variation
    ctx.strokeStyle = `hsl(${hue}, 90%, 50%)`;
    hue++;
    if (hue >= 360) hue = 0;

    // flip the dir & lineWidth on condition
    if (ctx.lineWidth > 50 || ctx.lineWidth < 10) direction = !direction;

    direction == true ? ctx.lineWidth++ : ctx.lineWidth--;
}

// Events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseover', () => (isDrawing = false));

/*
// Couldn't figure out solution for mobile devices 😞
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', () => (isDrawing = false));
*/
