const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function toggleButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

function displayProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

function handleRangeChange(e) {
  video[e.target.name] = e.target.value;
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);

video.addEventListener("timeupdate", displayProgress);

let isScrubbing = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => isScrubbing = true);
progress.addEventListener("mousemove", (e) => isScrubbing && scrub(e));
progress.addEventListener("mouseup", () => isScrubbing = false);

let isChanging = false;
ranges.forEach(range => range.addEventListener("click", handleRangeChange));
ranges.forEach(range => range.addEventListener("mousedown", () => isChanging = true));
ranges.forEach(range => range.addEventListener("mousemove", (e) => isChanging && handleRangeChange(e)));
ranges.forEach(range => range.addEventListener("mouseup", () => isChanging = false));

skipButtons.forEach(button => button.addEventListener("click", skip));
