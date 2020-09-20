const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#bada55'; // start w/ this color
ctx.lineJoin = 'round'; // when line joins its rounded
ctx.lineCap = 'round'; // end of the line should be rounded
ctx.lineWidth = 20; // size of the line
//ctx.globalCompositeOperation = 'multiply'; // for blend mode

let isDrawing = false; // draw only when the clicking is happening
let lastX = 0;
let lastY = 0; // points where to start drawing
let hue = 0; // for rainbow like color
let direction = true; // direction & lineWidth of the brush

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they're not moused down
    //console.log(e);

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY); // go to
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY]; // updating the start point

    hue++;
    if (hue > 360) hue = 0;

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction; // flipping the dir

    // if the dir = true ++ , if = false --
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // updating the start point
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
