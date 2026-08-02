# number-match-jsx
# 🎮 Number Match Puzzle Game

A smart Number Match puzzle game built using **React (JSX)** and a custom **deterministic logic engine**.

Unlike traditional number match games that rely on randomness, this project ensures:
- ✅ Every level is solvable
- ✅ No unfair gameplay
- ✅ Balanced and engaging difficulty

---

## 🚀 Features

- 🧠 Deterministic board generation (no randomness)
- 🎯 Sawtooth difficulty system (dynamic challenge)
- 🚫 Deadlock detection & recovery
- ➕ Smart "Add Row" system
- ⚡ Smooth and responsive UI
- 🎮 Modular game logic architecture

---

## 📱 Live Demo (Android App)

👉 Download & install the app:

https://expo.dev/accounts/nandiniarumallas-team/projects/number-match-jsx/builds/719cb633-9016-4f12-af92-f6d685a2d6a4

> 📌 Open the link → Download APK → Install on your Android device  
> ⚠️ Enable **"Install from Unknown Sources"** if needed  

---

## ▶️ How to Play

1. Match numbers that are:
   - Same (e.g., 4 & 4)
   - OR sum to 10 (e.g., 3 & 7)
2. Remove pairs strategically
3. Use **Add Row** when stuck
4. Clear the board to win

---

## 🧠 What Makes This Unique?

Unlike typical number match games:

- ❌ Random board generation  
- ❌ Unfair difficulty spikes  

This game provides:

- ✅ Fully deterministic logic  
- ✅ Always solvable boards  
- ✅ Smart recovery system  
- ✅ Balanced difficulty curve  

---

## 🧩 Core Logic Modules

- **boardGenerator.js** → Generates solvable boards  
- **solver.js** → Validates board solvability  
- **deadlockDetector.js** → Detects no-move states  
- **addRowEngine.js** → Smart recovery system  
- **matchEngine.js** → Handles matching logic  
- **boardAnalyzer.js** → Analyzes board state  

---

## 🧠 Algorithm Highlights

- Deterministic board generation ensures fairness  
- Solver-based validation guarantees solvability  
- Deadlock detection prevents impossible states  
- Smart Add Row ensures recovery  
- Sawtooth difficulty keeps gameplay engaging  

---

## 📂 Project Structure
```
number-match-jsx/
│
├── src/
│   ├── components/
│   │   └── Cell.js
│   │
│   ├── config/
│   │   └── level.js
│   │
│   ├── logic/
│   │   ├── addRowEngine.js
│   │   ├── boardAnalyzer.js
│   │   ├── boardGenerator.js
│   │   ├── deadlockDetector.js
│   │   ├── matchEngine.js
│   │   └── solver.js
│   │
│   ├── screens/
│   │   └── GameScreen.js
│
├── App.js
├── index.js
├── app.json
├── eas.json
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Nandhuarumalla/number-match-jsx.git
cd number-match-jsx
2. Install dependencies
npm install
3. Run the project
npm start

**🌟 Future Improvements**
🔊 Sound effects & animations
📱 Play Store deployment
🏆 Leaderboard system
☁️ Backend integration

👩‍💻 Author
Nandini Arumalla
https://github.com/Nandhuarumalla
