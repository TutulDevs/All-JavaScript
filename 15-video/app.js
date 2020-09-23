// WES' Code
// Mine is under this

// 1. Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// 2. Build the functions

// Play & Pause
const togglePlay = () => (video.paused ? video.play() : video.pause());

// It's better to have a seperate fn for this
function updateBtn() {
    const icon = this.paused ? '▶' : '❚ ❚';
    toggle.textContent = icon;
}

// Skipping
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update the range slider
video.volume = 0.5; // initial volume
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Update the Progress Bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Scrub === the interactivity of the progBar
function scrub(e) {
    // offX = where it's clicked | ofW = prog Width
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Full Screen
function reqFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome, Safari & Opera
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen(); // IE Edge
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// 3. Hook up the event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach((el) => el.addEventListener('change', handleRangeUpdate));

// Scrub
let mousedown = false; // flag variable

progress.addEventListener('click', scrub);

// IF mousedown = true run scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

fullscreen.addEventListener('click', reqFullScreen);

// My Code before watching the tutorial
/*

const video = document.querySelector('.player__video');
const playBtn = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const prog = document.querySelector('.progress__filled');

// Play or Pause
const playPause = () => {
    video.paused ? video.play() : video.pause();
    video.paused
        ? (playBtn.innerHTML = '▶')
        : (playBtn.innerHTML = `&#10074;&#10074;`);
};
playBtn.addEventListener('click', playPause);

// Skipping
const vidSkip = (e) => (video.currentTime += parseFloat(e.target.dataset.skip));
[backward, forward].forEach((el) => el.addEventListener('click', vidSkip));

// Volume
video.volume = 0.5; // initial volume
volume.addEventListener('change', (e) => (video.volume = e.target.value));

// playbackRate
playbackRate.addEventListener(
    'change',
    (e) => (video.playbackRate = e.target.value)
);

// Progress of Time
function pro() {
    // 100 / 500 = 0.2 | 0.2 * 9 = 1.8 s
    let percentage = Math.floor((100 / video.duration) * video.currentTime);

    prog.style.flexBasis = `${percentage}%`;
}
video.addEventListener('timeupdate', pro);


*/
