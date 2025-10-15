const dice = document.getElementById("dice");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");
const rollBtn = document.getElementById("rollBtn");
const audioPlayer = document.getElementById("audioPlayer");
const songTitleEl = document.querySelector(".song-title");
const volumeSlider = document.getElementById("volumeSlider");
const diceRollSound = document.getElementById("diceRollSound");

const faces = [
  {
    label: "Happy",
    img: "images/dice-5.png",
    audio: "music/happy.mp3",
    title: "Happy Vibe",
    bgColor: "linear-gradient(135deg, #e998b8ff 0%, #f5dbf3ff)",
  },
  {
    label: "Sad",
    img: "images/dice-6.png",
    audio: "music/sad.mp3",
    title: "Sad Piano",
    bgColor: "linear-gradient(135deg, #90c3e8ff 0%, #d8ecf7ff)",
  },
  {
    label: "Angry",
    img: "images/dice-2.png",
    audio: "music/angry.mp3",
    title: "Evil Clown's Anthem",
    bgColor: "linear-gradient(135deg, #c73d2aff 0%, #35150dff)",
  },
  {
    label: "Calm",
    img: "images/dice-3.png",
    audio: "music/calm.mp3",
    title: "Lofi Relax",
    bgColor: "linear-gradient(135deg, #e58c33ff 0%, #e8cdaaff)",
  },
  {
    label: "Excited",
    img: "images/dice-4.png",
    audio: "music/excited.mp3",
    title: "Big Day Out",
    bgColor: "linear-gradient(135deg, #f1cc53ff 0%, #faedb7ff)",
  },
  {
    label: "Frustrated",
    img: "images/dice-1.png",
    audio: "music/frustrated.mp3",
    title: "Hard Times",
    bgColor: "linear-gradient(135deg, #53c147ff 0%, #113510ff)",
  },
];

let introModal = document.getElementById("introDialog");
document.getElementById("introDialog").showModal();
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

// cycles for non-repetitive rolls
let cycles = [];
const totalCycles = 2;
let cyclePointer = 0;

function shuffleFaces() {
  let indicses = [...Array(faces.length).keys()];
  for (let i = indicses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indicses[i], indicses[j]] = [indicses[j], indicses[i]];
  }
  return indicses;
}

function prepareCycles() {
  cycles = [];
  for (let i = 0; i < totalCycles; i++) {
    cycles = cycles.concat(shuffleFaces());
  }
  cyclePointer = 0;
}

prepareCycles();

function rollDice() {
  let counter = 0;
  dice.classList.add("rolling");
  diceRollSound.currentTime = 0;
  diceRollSound.play();
  const rollInterval = setInterval(() => {
    const idx = Math.floor(Math.random() * faces.length);
    dice.src = faces[idx].img;
    counter++;
    if (counter > 10) {
      clearInterval(rollInterval);
      diceRollSound.pause();
      diceRollSound.currentTime = 0;
      let finalIndex;
      if (cyclePointer < cycles.length) {
        finalIndex = cycles[cyclePointer];
        cyclePointer++;
      } else {
        finalIndex = Math.floor(Math.random() * faces.length);
      }
      dice.src = faces[finalIndex].img;
      dice.classList.remove("rolling");
      playEmotion(finalIndex);
    }
  }, 120);
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

  document.body.style.background = f.bgColor;

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
