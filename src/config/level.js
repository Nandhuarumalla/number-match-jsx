// The curve repeats every five levels: four rising levels, then a relief level.
// Times are player-experience targets used for tuning/telemetry, never a timer.
const BASE_PROFILES = [
  // Level 1 deliberately exposes every starting pair. The one remaining
  // number is resolved by the first Add Row, teaching the core loop.
  { targetSeconds: 45, directMatchRatio: 1, idealAdds: [1, 1], label: "Learn the flow" },
  { targetSeconds: 65, directMatchRatio: 0.76, idealAdds: [1, 2], label: "Warming up" },
  { targetSeconds: 90, directMatchRatio: 0.58, idealAdds: [2, 3], label: "Normal" },
  { targetSeconds: 120, directMatchRatio: 0.42, idealAdds: [2, 3], label: "Tricky" },
  { targetSeconds: 150, directMatchRatio: 0.28, idealAdds: [3, 4], label: "Challenge" },
];

export function getLevelConfig(level = 1) {
  const safeLevel = Math.max(1, level);
  const cycle = Math.floor((safeLevel - 1) / 5);
  const position = (safeLevel - 1) % 5;
  const relief = position === 0 && safeLevel > 1;
  const profile = relief ? BASE_PROFILES[2] : BASE_PROFILES[position];
  const ramp = cycle * 30;

  return {
    ...profile,
    level: safeLevel,
    targetSeconds: relief ? 90 + cycle * 30 : profile.targetSeconds + ramp,
    // Relief levels intentionally return to a visibly friendlier Level 2 profile.
    directMatchRatio: relief ? 0.76 : Math.max(0.22, profile.directMatchRatio - cycle * 0.02),
    rescueAfterDeadlocks: 2,
    maxAdds: 6,
    isRelief: relief,
  };
}
