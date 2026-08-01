import { canConnect, isMatch } from "./matchEngine";

export function hasValidMoves(board) {
  const activeCells = [];

  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell && !cell.removed) activeCells.push({ r, c, value: cell.value });
    });
  });

  for (let firstIndex = 0; firstIndex < activeCells.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < activeCells.length; secondIndex += 1) {
      const first = activeCells[firstIndex];
      const second = activeCells[secondIndex];
      if (isMatch(first.value, second.value) && canConnect(board, first, second)) return true;
    }
  }

  return false;
}
