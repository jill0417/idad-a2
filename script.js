const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");

function rollDice() {
  let counter = 0;
  const rollInterval = setInterval(() => {
    const face = Math.floor(Math.random() * 6) + 1;
    dice.classList.add("rolling");
    dice.src = `dice-${1}.png`;
    dice.src = `dice-${2}.png`;
    dice.src = `dice-${3}.png`;
    dice.src = `dice-${4}.png`;
    dice.src = `dice-${5}.png`;
    dice.src = `dice-${6}.png`;
    counter++;
    if (counter > 10) {
      clearInterval(rollInterval);
    }
  }, 100);
}

dice.classList.remove("rolling");
rollBtn.addEventListener("click", rollDice);
