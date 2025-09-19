const dice = document.getElementById("dice");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");
const rollBtn = document.getElementById("rollBtn");
const audioPlayer = document.getElementById("audioPlayer");
const songTitleEl = document.querySelector(".song-title");
const volumeSlider = document.getElementById("volumeSlider");

const faces = [
  {
    label: "Happy",
    img: "images/dice-5.png",
    audio: "music/happy.mp3",
    title: "Happy Vibe",
  },
  {
    label: "Sad",
    img: "images/dice-6.png",
    audio: "music/sad.mp3",
    title: "Sad Piano",
  },
  {
    label: "Angry",
    img: "images/dice-2.png",
    audio: "music/angry.mp3",
    title: "Evil Clown's Anthem",
  },
  {
    label: "Calm",
    img: "images/dice-3.png",
    audio: "music/calm.mp3",
    title: "Lofi Relax",
  },
  {
    label: "Excited",
    img: "images/dice-4.png",
    audio: "music/excited.mp3",
    title: "Big Day Out",
  },
  {
    label: "Frustrated",
    img: "images/dice-1.png",
    audio: "music/frustrated.mp3",
    title: "Hard Times",
  },
];

let introModal = document.getElementById("introDialog");
document.getElementById("introDialog").showModal();
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

function rollDice() {
  let counter = 0;
  dice.classList.add("rolling");
  const rollInterval = setInterval(() => {
    const idx = Math.floor(Math.random() * faces.length);
    dice.src = faces[idx].img;
    counter++;
    if (counter > 10) {
      clearInterval(rollInterval);
      const finalIndex = Math.floor(Math.random() * faces.length);
      dice.src = faces[finalIndex].img;
      dice.classList.remove("rolling");
      playEmotion(finalIndex);
    }
  }, 100);
}

const playPauseButton = document.querySelector("#playPauseBtn");
console.log(playPauseButton);

playPauseButton.addEventListener("click", togglePlayback);

const playPauseImg = document.querySelector("#playPauseIcon");
console.log(playPauseImg);

function togglePlayback() {
  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play();
    playPauseImg.src = "icon/pause.png";
  } else {
    audioPlayer.pause();
    playPauseImg.src = "icon/play.png";
  }
}

const muteUnmuteButton = document.querySelector("#muteBtn");
console.log(muteUnmuteButton);

muteUnmuteButton.addEventListener("click", toggleAudio);

const muteUnmuteImg = document.querySelector("#muteIcon");
console.log(muteUnmuteImg);

function toggleAudio() {
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    muteUnmuteImg.src = "icon/mute.png";
  } else {
    audioPlayer.muted = true;
    muteUnmuteImg.src = "icon/unmute.png";
  }
}

function playEmotion(index) {
  const f = faces[index];
  if (!f) return;

  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  audioPlayer.src = f.audio;

  const panel = document.querySelector(".panel");
  panel.classList.add("show");

  songTitleEl.textContent = `${f.label} — Now playing: ${f.title}`;

  audioPlayer.play().catch(() => {
    songTitleEl.textContent += "(Press Play to start)";
  });
}

rollBtn.addEventListener("click", rollDice);

// volume slider
audioPlayer.volume = volumeSlider.value / 100;
volumeSlider.addEventListener("input", function () {
  audioPlayer.volume = this.value / 100;
});
