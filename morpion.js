class Morpion {
  constructor(player, level, board) {
    this.player = player;
    this.level = level;
    this.ia = player === "J1" ? "J2" : "J1";
    this.map = [];
    this.lastStep = {
      J1: [],
      J2: [],
    };
    this.finish = false;
    this.existingBoard = board;

    // initial board and fill whatever exists already
    for (let i = 0; i < 3; i++) {
      this.map[i] = [];
      for (let j = 0; j < 3; j++) {
        if (this.existingBoard && this.existingBoard[i][j] !== EMPTY) {
          this.map[i][j] = this.existingBoard[i][j];
          this.occupyGraphically(i, j, this.map[i][j]);
        } else {
          this.map[i][j] = EMPTY;
        }
        document.getElementById(this.getZone(i, j)).onclick = () =>
          this.playerTurn(i, j);
      }
    }

    // attribute first step right
    if (this.level === HARD && this.existingBoard) {
      this.playerTurn();
    } else if (this.ia === "J1") this.iaTurn();
  }

  remember = (board) => {
    window.localStorage.setItem(
      APPNAME,
      JSON.stringify({
        player: this.player,
        level: this.level,
        board: board,
      })
    );
  };

  showUndoRedo = () => {
    let undo_redo_zone = document.getElementById("undo_redo");
    if (undo_redo_zone.innerHTML === "") {
      undo_redo_zone.innerHTML = `
          <button type="button" id="undoBtn" title="Undo your and rival's last move" class="btn">Undo</button>
          <button type="button" id="redoBtn" title="Redo your last move, rival may of may no remain previous choice" class="btn">Redo</button>
        `;
      document.getElementById("undoBtn").addEventListener("click", () => {
        this.undo(this.lastStep.J1);
        this.undo(this.lastStep.J2);
        let currentBoard = [];
        for (let i = 0; i < 3; i++) {
          currentBoard[i] = [];
          for (let j = 0; j < 3; j++) {
            currentBoard[i][j] = this.map[i][j];
          }
        }
        this.remember(currentBoard);
      });

      document.getElementById("redoBtn").addEventListener("click", () => {
        this.redo();
      });
    }
  };

  occupyGraphically = (x, y, player) => {
    const image = player == this.player ? "croix" : "rond";
    const zone = this.getZone(x, y);
    document.getElementById(
      zone
    ).style.backgroundImage = `url(image-morpion/${image}.png)`;
    document.getElementById(zone).className += " filled";
  };

  undo = (array) => {
    let x = array[0];
    let y = array[1];
    this.map[x][y] = EMPTY;
    const zone = this.getZone(x, y);
    document.getElementById(zone).style.backgroundImage = `none`;
    document.getElementById(zone).classList.remove("filled");
  };

  redo = () => {
    let x = this.lastStep[this.player][0];
    let y = this.lastStep[this.player][1];
    this.fillGrid(x, y, this.player);
    this.iaTurn();
  };

  getZone = (x, y) => {
    if (y == 0) return "A" + (x + 1);
    else if (y == 1) return "B" + (x + 1);
    else return "C" + (x + 1);
  };

  checkDraw = () => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.map[x][y] === EMPTY) return false;
      }
    }
    return true;
  };

  fillGrid = (x, y, player) => {
    if (this.map[x][y] != EMPTY) return false;
    this.map[x][y] = player;
    this.lastStep[player] = [x, y];

    this.occupyGraphically(x, y, player);

    let currentBoard = [];
    for (let i = 0; i < 3; i++) {
      currentBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        currentBoard[i][j] = this.map[i][j];
      }
    }

    this.remember(currentBoard);
    this.checking(player);

    if (player === this.player && !this.finish) {
      this.showUndoRedo();
    } else if (this.finish) {
      document.getElementById("undo_redo").innerHTML = "";
    }
    return true;
  };

  checking = (player) => {
    const one = this.map[0][0];
    const two = this.map[0][1];
    const three = this.map[0][2];
    const four = this.map[1][0];
    const five = this.map[1][1];
    const six = this.map[1][2];
    const seven = this.map[2][0];
    const eight = this.map[2][1];
    const nine = this.map[2][2];
    if (
      (one === two && one === three && one != EMPTY) ||
      (four === five && four === six && four != EMPTY) ||
      (seven === eight && seven === nine && seven != EMPTY) ||
      (one === five && one === nine && one != EMPTY) ||
      (three === five && three === seven && three != EMPTY) ||
      (one === four && one === seven && one != EMPTY) ||
      (two === five && two === eight && two != EMPTY) ||
      (three === six && three === nine && three != EMPTY)
    ) {
      this.finish = true;
      if (player == this.ia) {
        document.getElementById("win").textContent = "L'IA a gagné !";
      } else if (player == this.player) {
        document.getElementById("win").textContent = "Tu as battu l'IA !";
      }
    } else if (this.checkDraw()) {
      document.getElementById("win").textContent = "Vous êtes à égalité";
    }
    return this.finish;
  };

  winningLine(a, b, c) {
    return a == b && b == c && a != EMPTY;
  }

  checkWinner() {
    let winner = null;
    for (let i = 0; i < 3; i++) {
      if (this.winningLine(this.map[i][0], this.map[i][1], this.map[i][2])) {
        winner = this.map[i][0];
      }
      if (this.winningLine(this.map[0][i], this.map[1][i], this.map[2][i])) {
        winner = this.map[0][i];
      }
    }
    if (this.winningLine(this.map[0][0], this.map[1][1], this.map[2][2])) {
      winner = this.map[0][0];
    }
    if (this.winningLine(this.map[2][0], this.map[1][1], this.map[0][2])) {
      winner = this.map[2][0];
    }
    if (winner == null && this.turn == 9) {
      return "draw";
    } else {
      return winner;
    }
  }

  checkTwo = (a, b, c) => {
    let case1 =
      this.map[a[0]][a[1]] === this.map[b[0]][b[1]] &&
      this.map[b[0]][b[1]] === this.player &&
      this.map[c[0]][c[1]] === EMPTY;
    let case2 =
      this.map[b[0]][b[1]] === this.map[c[0]][c[1]] &&
      this.map[c[0]][c[1]] === this.player &&
      this.map[a[0]][a[1]] === EMPTY;
    if (case1) {
      return c;
    }
    if (case2) {
      return a;
    } else {
      return null;
    }
  };

  playerTurn = (x, y) => {
    if (this.finish) return;
    if (!this.fillGrid(x, y, this.player))
      return alert("This case is already occupied");
    else if (!this.finish) {
      this.iaTurn();
    }
  };

  minimax = (board, depth, isMaximizing) => {
    let result = this.checkWinner();
    if (result == this.ia) return 10 - depth;
    else if (result == this.player) return depth - 10;
    else if (result != null) return depth;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == EMPTY) {
            board[i][j] = this.ia;
            this.turn++;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = EMPTY;
            this.turn--;
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == EMPTY) {
            board[i][j] = this.player;
            this.turn++;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = EMPTY;
            this.turn--;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  };

  iaTurn = () => {
    let move;
    let emptyCases = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] == EMPTY) {
          emptyCases.push({ x: i, y: j });
        }
      }
    }

    const randomlyPlay = () => {
      let randomPosition = generateRandomZeroUpTo(emptyCases.length);
      let randomMove = emptyCases[randomPosition];
      return (move = {
        i: randomMove.x,
        j: randomMove.y,
      });
    };

    if (this.level === "Easy") {
      move = randomlyPlay();
    }

    if (this.level === "Hard") {
      // AI will use minmax strategy
      let depth = 0;
      let bestScore = -Infinity;
      emptyCases.forEach((emptyCase) => {
        this.map[emptyCase.x][emptyCase.y] = this.ia;
        this.turn++;
        let score = this.minimax(this.map, depth + 1, false);
        this.map[emptyCase.x][emptyCase.y] = EMPTY;
        this.turn--;
        if (score > bestScore) {
          bestScore = score;
          move = { i: emptyCase.x, j: emptyCase.y };
        }
      });
    }

    if (this.level === "Medium") {
      let possibleCuttingMoves = [];
      for (let i = 0; i < 3; i++) {
        if (this.checkTwo([i, 0], [i, 1], [i, 2])) {
          possibleCuttingMoves.push(this.checkTwo([i, 0], [i, 1], [i, 2]));
        }
        if (this.checkTwo([0, i], [1, i], [2, i])) {
          possibleCuttingMoves.push(this.checkTwo([0, i], [1, i], [2, i]));
        }
      }
      if (this.checkTwo([0, 0], [1, 1], [2, 2])) {
        possibleCuttingMoves.push(this.checkTwo([0, 0], [1, 1], [2, 2]));
      }
      if (this.checkTwo([2, 0], [1, 1], [0, 2])) {
        possibleCuttingMoves.push(this.checkTwo([2, 0], [1, 1], [0, 2]));
      }
      if (possibleCuttingMoves.length > 0) {
        let randomPosition = generateRandomZeroUpTo(
          possibleCuttingMoves.length
        );
        let randomMove = possibleCuttingMoves[randomPosition];
        move = {
          i: randomMove[0],
          j: randomMove[1],
        };
      } else {
        move = randomlyPlay();
      }
    }
    this.fillGrid(move.i, move.j, this.ia);
  };
}
