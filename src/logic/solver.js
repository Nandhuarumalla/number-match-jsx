import { canConnect, isMatch } from "./matchEngine";

function clone(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function getMoves(board) {
  const activeCells = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell && !cell.removed) activeCells.push({ r, c, value: cell.value });
    });
  });

  const moves = [];
  for (let firstIndex = 0; firstIndex < activeCells.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < activeCells.length; secondIndex += 1) {
      const first = activeCells[firstIndex];
      const second = activeCells[secondIndex];
      if (isMatch(first.value, second.value) && canConnect(board, first, second)) {
        moves.push([first, second]);
      }
    }
  }
  return moves;
}

function isComplete(board) {
  return board.flat().every((cell) => cell.removed);
}

export function isSolvable(board, depth = 0) {
  if (depth > 50) return false;
  if (isComplete(board)) return true;

  const moves = getMoves(board);
  for (const [first, second] of moves) {
    const newBoard = clone(board);
    newBoard[first.r][first.c].removed = true;
    newBoard[second.r][second.c].removed = true;
    if (isSolvable(newBoard, depth + 1)) return true;
  }

  return false;
}
