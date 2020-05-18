### Project: Tic Tac Toc 

Julie Kwok 2020518

The code base is [here](https://github.com/mtbrault/thp-refacto-morpion), which is a functional minimax Tic-Tac-Toe. Three new features have been added to the code base.

* * *
##### Level choice

- Easy, where the AI just goes randomly filling an empty spot
- Medium, where the AI first verifies whether the plays has already two consecutive cells filled, and tries to cut the final spot. Otherwise it just goes randomly
- Hard, as in the original way in the code base
  
Changes:
- added a "level" constructing argument. AI turn does different things according to this propriety
- abstracted a "play randomly" function, used in both easy and medium level

* * *
##### Undo-redo

When human player has made at least one move and after the correspondant AI move, humain player can "undo". This removes the last move of both player. The "redo" will repeat the removed last step for humain player, AI may play differently than the removed last step

Changes:
- added `this.lastSteps`, updated whenever anyone makes a move
- abstracted the grill filling functions (both in terms of content and graphic)
- added undo btn according to condition. On click, the saved last steps gets reset in terms of content and graphic
- added redo btn according to condition. On click, repeats the last step of human player and triggers AI turn

* * *
##### Game status memory

Whenever anyone makes a move, the current game board is stocked in localStorage. When page is loaded, app first looks for existing game and restores it. Otherwise provides level choice for new game.

Changes:
- added a function to remember current board
- added a step to look for existing game for whole app
- added a step to restore existing game in morpion class constructor





