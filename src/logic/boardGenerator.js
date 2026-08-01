import { getLevelConfig } from "../config/level";

export function complement(value) {
  return value === 5 ? 5 : 10 - value;
}

// A tiny seeded generator makes a level reproducible for debugging and tuning.
function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shuffle(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeCell(value) {
  return { value, removed: false };
}

// Three rows / 27 cells: 13 balanced pairs plus one deliberate straggler.
// On Level 1 every pair is adjacent, so clearing the board leaves one number
// and makes a single Add Row the natural, teachable finish.
export function generateBoard(level = 1) {
  const config = getLevelConfig(level);
  const random = createRandom(level * 7919 + 17);
  const pairs = Array.from({ length: 13 }, () => {
    const first = Math.floor(random() * 9) + 1;
    return [first, complement(first)];
  });
  const directPairs = Math.round(pairs.length * config.directMatchRatio);
  const values = [];

  // Direct pairs create a dependable opening. The rest are shuffled decoys.
  pairs.slice(0, directPairs).forEach((pair) => values.push(...pair));
  values.push(...shuffle(pairs.slice(directPairs).flat(), random));
  values.push(Math.floor(random() * 9) + 1);

  return Array.from({ length: 3 }, (_, row) =>
    values.slice(row * 9, row * 9 + 9).map(makeCell)
  );
}
