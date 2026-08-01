export function getStragglers(board) {
  let result = [];

  board.forEach((row) => {
    let active = row.filter((c) => !c.removed);
    if (active.length === 1) {
      result.push(active[0].value);
    }
  });

  return result;
}