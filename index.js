const EASY = "Easy";
const MEDIUM = "Medium";
const HARD = "Hard";

document.getElementById("levels").innerHTML = `
  <p>Choose a level</p>
  <button type="button" title="You will start the game" class="bouton">${EASY}</button>
  <button type="button" title="You will start the game" class="bouton">${MEDIUM}</button>
  <button type="button" title="AI will start the game" class="bouton">${HARD}</button>
`;

const chooseLevel = (e) => {
  const level = e.target.innerText;
  console.log(e.target.innerText);
  if (level === EASY) {
    console.log("easy");
    var morpion = new Morpion("J1", "Easy");
  }
  if (level === MEDIUM) {
    console.log("medium");
    var morpion = new Morpion("J1", "Medium");
  }
  if (level === HARD) {
    console.log("medium");
    var morpion = new Morpion("J2", "Hard");
  }
  document.getElementById("levels").innerHTML = "";
  document.getElementById("rejouer").innerHTML = `
  <button type="button" class="bouton" onclick="location.reload();">
    Reset
  </button>
`;
};

document.querySelectorAll(".bouton").forEach((btn) => {
  btn.onclick = (e) => chooseLevel(e);
});
