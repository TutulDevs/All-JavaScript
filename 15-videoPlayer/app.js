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
