export function isMatch(a, b) {
  return a === b || a + b === 10;
}

function isOpen(board, r, c) {
  return !board[r]?.[c] || board[r][c].removed;
}

// Sumlink connections follow a straight horizontal, vertical, or diagonal
// line. Removed tiles do not block that line, while an active tile does.
function hasClearLine(board, first, second) {
  const rowDistance = second.r - first.r;
  const columnDistance = second.c - first.c;
  const rowStep = Math.sign(rowDistance);
  const columnStep = Math.sign(columnDistance);
  const steps = Math.max(Math.abs(rowDistance), Math.abs(columnDistance));

  for (let step = 1; step < steps; step += 1) {
    if (!isOpen(board, first.r + rowStep * step, first.c + columnStep * step)) return false;
  }
  return true;
}

export function canConnect(board, first, second) {
  if (first.r === second.r && first.c === second.c) return false;

  const rowDistance = Math.abs(first.r - second.r);
  const columnDistance = Math.abs(first.c - second.c);
  const isStraightLine =
    first.r === second.r || first.c === second.c || rowDistance === columnDistance;

  if (isStraightLine) return hasClearLine(board, first, second);

  // The end of one 9-cell line connects to the start of the next line.
  return rowDistance === 1 &&
    ((first.c === 8 && second.c === 0) || (first.c === 0 && second.c === 8));
}
