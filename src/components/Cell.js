import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function Cell({ value, removed, onPress, selected }) {
  if (removed) {
    return <Text style={styles.empty}></Text>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Number ${value}${selected ? ", selected" : ""}`}
      style={({ pressed }) => [styles.cell, selected && styles.selected, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 36,
    height: 42,
    margin: 2,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selected: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  empty: {
    width: 36,
    height: 42,
    margin: 2,
  },
});
