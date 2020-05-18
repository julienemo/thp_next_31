document.getElementById("levels").innerHTML = `
  <p>Choose a level</p>
  <button type="button" title="You will start the game" class="btn">${EASY}</button>
  <button type="button" title="You will start the game" class="btn">${MEDIUM}</button>
  <button type="button" title="AI will start the game" class="btn">${HARD}</button>
`;

const chooseLevel = (e) => {
  const level = e.target.innerText;
  if (level === EASY) {
    var morpion = new Morpion("J1", EASY);
  }
  if (level === MEDIUM) {
    var morpion = new Morpion("J1", MEDIUM);
  }
  if (level === HARD) {
    var morpion = new Morpion("J2", HARD);
  }
  document.getElementById("levels").innerHTML = "";
  document.getElementById("reset").innerHTML = `
  <button type="button" class="btn" onclick="location.reload();">
    Reset
  </button>
`;
};

document.querySelectorAll(".btn").forEach((btn) => {
  btn.onclick = (e) => chooseLevel(e);
});
