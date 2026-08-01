import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Cell from "../components/Cell";
import { getLevelConfig } from "../config/level";
import { generateSmartRow } from "../logic/addRowEngine";
import { generateBoard } from "../logic/boardGenerator";
import { hasValidMoves } from "../logic/deadlockDetector";
import { canConnect, isMatch } from "../logic/matchEngine";

export default function GameScreen() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addCount, setAddCount] = useState(0);
  const [deadlockCount, setDeadlockCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [won, setWon] = useState(false);
  const config = getLevelConfig(level);

  useEffect(() => {
    setBoard(generateBoard(level));
    setAddCount(0);
    setDeadlockCount(0);
    setSelected(null);
    setWon(false);
  }, [level]);

  function handleClick(r, c) {
    if (won) return;
    const cell = board[r][c];
    if (cell.removed) return;
    if (!selected) return setSelected({ r, c });
    if (selected.r === r && selected.c === c) return setSelected(null);

    const first = board[selected.r][selected.c];
    if (canConnect(board, selected, { r, c }) && isMatch(first.value, cell.value)) {
      const newBoard = board.map((row) => row.map((item) => ({ ...item })));
      newBoard[r][c].removed = true;
      newBoard[selected.r][selected.c].removed = true;
      setBoard(newBoard);

      if (newBoard.flat().every((item) => item.removed)) setWon(true);
    }
    setSelected(null);
  }

  function handleAddRow() {
    if (won) return;
    if (addCount >= config.maxAdds) {
      Alert.alert("All six Add Row assists have been used.");
      return;
    }

    const deadlocked = !hasValidMoves(board);
    const nextDeadlockCount = deadlocked ? deadlockCount + 1 : 0;
    const newRow = generateSmartRow(board, nextDeadlockCount, level, addCount);
    setBoard((current) => [...current, newRow]);
    setAddCount((current) => current + 1);
    setDeadlockCount(nextDeadlockCount);
    setSelected(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>NUMBER MATCH</Text>
          <Text style={styles.title}>Level {level}</Text>
          <Text style={styles.subtitle}>
            {config.isRelief ? "A lighter round. Enjoy the reset." : config.label}
          </Text>
        </View>
        <View style={[styles.badge, config.isRelief && styles.reliefBadge]}>
          <Text style={[styles.badgeText, config.isRelief && styles.reliefBadgeText]}>
            {config.isRelief ? "RELIEF" : `${config.idealAdds[0]}-${config.idealAdds[1]} ADDS`}
          </Text>
        </View>
      </View>

      <View style={styles.ruleCard}>
        <Text style={styles.ruleTitle}>Match same numbers or make 10</Text>
        <Text style={styles.ruleText}>Connect them in a clear line: horizontal, vertical, diagonal, or across line ends.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.board}>
        {board.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => (
              <Cell
                key={c}
                value={cell.value}
                removed={cell.removed}
                selected={selected && selected.r === r && selected.c === c}
                onPress={() => handleClick(r, c)}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.addButton} onPress={handleAddRow}>
          <Text style={styles.addButtonText}>+ Add Row</Text>
        </Pressable>
        <Text style={styles.counter}>Add Rows {addCount} / {config.maxAdds}</Text>
      </View>

      {won && (
        <View style={styles.winOverlay}>
          <View style={styles.winCard}>
            <Text style={styles.confetti}>* * *</Text>
            <Text style={styles.winTitle}>YOU WON!</Text>
            <Text style={styles.winText}>
              Level {level} cleared using {addCount} Add Row{addCount === 1 ? "" : "s"}.
            </Text>
            <Pressable style={styles.nextButton} onPress={() => setLevel((current) => current + 1)}>
              <Text style={styles.nextButtonText}>Next Level</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5F9", paddingTop: 56, paddingHorizontal: 18 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { color: "#64748B", fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  title: { fontSize: 30, fontWeight: "800", color: "#0F172A", marginTop: 2 },
  subtitle: { color: "#64748B", marginTop: 3, fontSize: 13 },
  badge: { backgroundColor: "#E0E7FF", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
  badgeText: { color: "#4338CA", fontSize: 10, fontWeight: "800" },
  reliefBadge: { backgroundColor: "#DCFCE7" },
  reliefBadgeText: { color: "#15803D" },
  ruleCard: { backgroundColor: "#FFFFFF", padding: 14, borderRadius: 14, marginTop: 20, borderWidth: 1, borderColor: "#E2E8F0" },
  ruleTitle: { color: "#1E293B", fontWeight: "700", fontSize: 14 },
  ruleText: { color: "#64748B", marginTop: 3, fontSize: 12 },
  board: { paddingVertical: 20, alignItems: "center", flexGrow: 1 },
  row: { flexDirection: "row" },
  footer: { alignItems: "center", paddingBottom: 22 },
  addButton: { width: "100%", backgroundColor: "#2563EB", borderRadius: 14, alignItems: "center", paddingVertical: 15 },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  counter: { color: "#64748B", marginTop: 10, fontSize: 12, fontWeight: "600" },
  winOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(15, 23, 42, 0.58)", justifyContent: "center", alignItems: "center", padding: 24 },
  winCard: { width: "100%", maxWidth: 340, backgroundColor: "#FFFFFF", borderRadius: 24, alignItems: "center", padding: 30 },
  confetti: { color: "#F59E0B", fontSize: 27, letterSpacing: 6 },
  winTitle: { color: "#0F172A", fontSize: 30, fontWeight: "900", marginTop: 10 },
  winText: { color: "#64748B", textAlign: "center", marginTop: 8, lineHeight: 20 },
  nextButton: { backgroundColor: "#16A34A", paddingHorizontal: 24, paddingVertical: 14, borderRadius: 13, marginTop: 24 },
  nextButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },
});
