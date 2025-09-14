const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const audioPlayer = document.getElementById("audioPlayer");
const songTitleEl = document.querySelector(".song-title");

const faces = [
  { label: "Happy", img: "images/dice-5.png", audio: "music/happy.mp3" },
  { label: "Sad", img: "images/dice-6.png", audio: "music/sad.mp3" },
  { label: "Angry", img: "images/dice-2.png", audio: "music/angry.mp3" },
  { label: "Calm", img: "images/dice-3.png", audio: "music/calm.mp3" },
  { label: "Excited", img: "images/dice-4.png", audio: "music/excited.mp3" },
  { label: "Shock", img: "images/dice-1.png", audio: "music/shock.mp3" },
];
audioPlayer.controls = true;

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

function playEmotion(index) {
  const f = faces[index];
  if (!f) return;

  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  audioPlayer.src = f.audio;
  songTitleEl.textContent = `${f.label} - Now playing: ${f.audio
    .split("/")
    .pop()}`;

  audioPlayer.play().catch(() => {
    songTitleEl.textContent += "(Press Play to start)";
  });
}

rollBtn.addEventListener("click", rollDice);
