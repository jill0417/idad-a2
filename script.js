const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const audioPlayer = document.getElementById("audioPlayer");
const songTitleEl = docement.querySelector(".song-title");

function rollDice() {
  let counter = 0;
  const rollInterval = setInterval(() => {
    const face = Math.floor(Math.random() * 6) + 1;
    dice.classList.add("rolling");
    dice.src = `images/dice-${face}.png`;
    counter++;
    if (counter > 10) {
      clearInterval(rollInterval);
      const finalFace = Math.floor(Math.random() * 6) + 1;
      dice.src = `images/dice-${finalFace}.png`;
    }
  }, 100);
}

dice.classList.remove("rolling");
rollBtn.addEventListener("click", rollDice);
