# Deterministic Number Match design

## What changed

The game no longer uses `Math.random()`. A level number is converted into a stable seed, so a level is reproducible on every device. This makes a failed puzzle reportable and makes balancing possible.

Every starting board is exactly three rows by nine columns. It contains thirteen complementary pairs and one intentional straggler. The first Add Row can complete the balance: it includes a complement for an active number in the bottom row and four additional complementary pairs.

## Sawtooth progression

The profile repeats in five-level waves. Levels 1–5 reduce the ratio of immediately visible matches from 70% to 42%. Level 6 returns to the Level 3 profile, then Levels 7–10 climb again with slightly tougher direct-match ratios. The same relief pattern repeats at Levels 11, 16, and so on.

| Level | Target play time | Profile | Ideal Add Row use |
| --- | --- | --- | --- |
| 1 | 45 s | Easy, 70% opening matches | 1 |
| 3 | 90 s | Normal | 2–3 |
| 5 | 150 s | Peak | 2–3 |
| 6 | 90 s | Relief, comparable to Level 3 | 2–4 |

Target times are telemetry goals, not timers.

## Add Row recovery

When the player is out of legal moves, an added row is constructed, never randomly picked:

1. It puts a complement underneath the first active cell in the bottom row, creating a vertical recovery move.
2. It contains a guaranteed adjacent horizontal pair.
3. After two consecutive deadlocks, that pair is `5, 5`, making an immediate same-number rescue independent of the player’s earlier legal choices.
4. Remaining cells are deterministic complementary pairs.

This keeps the board from becoming permanently dead while still allowing controlled decoys and a six-press cap.

## Probability target

The 95% completion target must be validated with play telemetry; it cannot be truthfully guaranteed by a static algorithm for every possible sequence of legal moves. Record level, seed, move count, Add Row count, deadlock count, completion time, and abandon state. Simulate legal-move policies and run a real-player test cohort, then adjust `directMatchRatio`, ideal Add Row ranges, and rescue timing until the 95th-percentile goal is met.
