const EASY = "Easy";
const MEDIUM = "Medium";
const HARD = "Hard";

document.getElementById("levels").innerHTML = `
  <p>Choose a level</p>
  <button type="button" class="bouton">${EASY}</button>
  <button type="button" class="bouton">${MEDIUM}</button>
  <button type="button" class="bouton">${HARD}</button>
`;

const chooseLevel = (e) => {
  const level = e.target.innerText;
  console.log(e.target.innerText);
  if (level === EASY) {
    console.log("easy");
    var morpion = new Morpion("J1", "easy");
  }
  if (level === MEDIUM) {
    console.log("medium");
    var morpion = new Morpion("J1", "medium");
  }
  if (level === HARD) {
    console.log("medium");
    var morpion = new Morpion("J2", "hard");
  }
  document.getElementById("levels").innerHTML = "";
  document.getElementById("rejouer").innerHTML = `
  <button type="button" class="bouton" onclick="location.reload();">
    Rejouer
  </button>
`;
};

document.querySelectorAll(".bouton").forEach((btn) => {
  btn.onclick = (e) => chooseLevel(e);
});
