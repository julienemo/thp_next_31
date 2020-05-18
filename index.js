let existingStatus = JSON.parse(window.localStorage.getItem(APPNAME));

if (existingStatus) {
  let player = existingStatus.player;
  let level = existingStatus.level;
  let board = existingStatus.board;

  var morpion = new Morpion(player, level, board);
} else {
  document.getElementById("levels").innerHTML = `
  <p>Choose a level</p>
  <button class="levelBtn btn" type="button" title="You will start the game">${EASY}</button>
  <button class="levelBtn btn" type="button" title="You will start the game">${MEDIUM}</button>
  <button class="levelBtn btn" type="button" title="AI will start the game">${HARD}</button>
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
  };

  document.querySelectorAll(".levelBtn").forEach((btn) => {
    btn.onclick = (e) => chooseLevel(e);
  });
}

document.getElementById("reset").innerHTML = `
  <button id="resetBtn" type="button" class="btn">Reset</button>
`;
document.getElementById("resetBtn").onclick = () => {
  window.localStorage.removeItem(APPNAME);
  location.reload();
};
