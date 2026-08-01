import { getLevelConfig } from "../config/level";
import { complement } from "./boardGenerator";

function makeCell(value) {
  return { value, removed: false };
}

function seedValue(level, addCount) {
  return ((level * 37 + addCount * 17) % 9) + 1;
}

function bottomRowTargets(board) {
  const row = board[board.length - 1] || [];
  return row
    .map((cell, index) => (cell && !cell.removed ? { cell, index } : null))
    .filter(Boolean);
}

function firstAdjacentEmptySlots(values) {
  for (let index = 0; index < values.length - 1; index += 1) {
    if (values[index] === null && values[index + 1] === null) return [index, index + 1];
  }
  return null;
}

// Every generated row contains an immediate horizontal pair. When possible it
// also places a complement directly below an active cell in the bottom row.
// This makes the recovery aid deterministic and visible to the player.
export function generateSmartRow(board, deadlockCount, level, addCount = 0) {
  const config = getLevelConfig(level);
  const targets = bottomRowTargets(board);
  const values = Array(9).fill(null);
  const rescue = deadlockCount >= config.rescueAfterDeadlocks;

  if (targets.length > 0) {
    // Prioritize the bottom-most active cell: clearing it prevents long tails.
    const target = targets[0];
    values[target.index] = complement(target.cell.value);
  }

  // Two consecutive deadlocks force an instant horizontal match, regardless of
  // which legal matches the player chose earlier.
  const matchValue = rescue ? 5 : seedValue(level, addCount);
  const matchComplement = complement(matchValue);
  const matchSlots = firstAdjacentEmptySlots(values);
  // A target can never occupy every slot, so this pair always fits.
  values[matchSlots[0]] = matchValue;
  values[matchSlots[1]] = matchComplement;

  let openSlots = values
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);

  openSlots = values
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);
  for (let i = 0; i < openSlots.length; i += 2) {
    const value = seedValue(level + i + 1, addCount + i);
    values[openSlots[i]] = value;
    if (openSlots[i + 1] !== undefined) values[openSlots[i + 1]] = complement(value);
  }

  return values.map(makeCell);
}
