# ⌨ Typing Speed Tester

A **terminal-based Typing Speed Tester** written in Python. Test how fast and accurately you can type, track your personal best within a session, and find out whether you are a Beginner, Intermediate, Advanced, or Expert typist — all without leaving the command line.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Random Paragraph Pool** | 15 curated paragraphs across topics (tech, nature, history, music, etc.) |
| **WPM Calculation** | Industry-standard words-per-minute formula |
| **Accuracy Measurement** | Percentage of correctly typed words |
| **Word-Level Feedback** | See exactly which words you got right or wrong |
| **Session Best Tracking** | Highlights a new record every time you beat your best |
| **Skill Classification** | Beginner / Intermediate / Advanced / Expert based on WPM |
| **Multi-Test Sessions** | Take unlimited tests without restarting the program |
| **Graceful Edge Handling** | Empty or whitespace-only input is handled cleanly |
| **Colourful ANSI Output** | Green / red / cyan highlights for an engaging terminal UI |
| **Windows Compatible** | Enables ANSI virtual terminal processing automatically |

---

## 📁 Project Structure

```
Typing_Speed_Tester/
│
├── main.py          # Entry point — session loop, timing, display, logic
├── paragraphs.py    # Paragraph pool and helper functions
└── README.md        # This file
```

---

## 🖥 Requirements

- **Python 3.10+** (uses `list[str]` and `tuple[...]` type hints)
- No third-party packages required — uses only the standard library

---

## 🚀 Installation & Usage

### 1 — Clone or download the project

```bash
# Clone
git clone https://github.com/your-username/Typing_Speed_Tester.git
cd Typing_Speed_Tester

# — or — download the ZIP and extract it, then open a terminal in the folder
```

### 2 — Run the program

```bash
python main.py
```

That's it. No virtual environment or `pip install` needed.

---

## 🎮 How to Play

1. The program displays a randomly chosen paragraph.
2. Press **Enter** when you are ready — a 3-second countdown begins.
3. Type the paragraph as fast and accurately as you can, then press **Enter**.
4. View your results: WPM, accuracy, correct/incorrect words, and skill level.
5. Optionally view a word-by-word breakdown.
6. Press **Enter** to take another test or type **q** to quit.

---

## 📊 Sample Output

```
══════════════════════════════════════════════════════════════════════
                        ⌨  TYPING SPEED TESTER
══════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────────────────────
  📄  TYPE THE FOLLOWING PARAGRAPH:
──────────────────────────────────────────────────────────────────────

  Writing clean code is an art that every programmer strives to
  master. Meaningful variable names, concise functions, and
  thoughtful comments transform a tangled mess of logic into
  something readable and maintainable. Great software is not just
  about making things work — it is about crafting solutions that
  other developers can understand, extend, and trust for years
  to come.

──────────────────────────────────────────────────────────────────────

  Press Enter when ready, then start typing…

  Starting in 3…   Starting in 2…   Starting in 1…
  GO! Type now and press Enter when done.

  > Writing clean code is an art that every programmer strives to master ...

══════════════════════════════════════════════════════════════════════
                           📊  RESULTS
══════════════════════════════════════════════════════════════════════

  ⏱   Time Taken            42.31 seconds
  📝  Words in Text         68
  ⚡  Speed (WPM)           56.42 WPM
  🎯  Accuracy              95.59%
  ✅  Correct Words         65
  ❌  Incorrect Words       3

──────────────────────────────────────────────────────────────────────

  🏅  Skill Level:  Intermediate
  🏆  New session best! (56.42 WPM)

══════════════════════════════════════════════════════════════════════
```

---

## 🏅 Skill Classification

| WPM Range | Level |
|---|---|
| < 30 WPM | 🟡 Beginner |
| 30 – 59 WPM | 🔵 Intermediate |
| 60 – 89 WPM | 🟢 Advanced |
| 90+ WPM | 🟣 Expert |

---

## 🔧 Customisation

### Add Your Own Paragraphs

Open `paragraphs.py` and append a new string to the `PARAGRAPHS` list:

```python
PARAGRAPHS = [
    # … existing entries …

    # 16 – Your topic
    (
        "Your custom paragraph goes here. Keep it to 50-80 words "
        "for the best test experience."
    ),
]
```

### Change Skill Thresholds

Edit the `classify_speed()` function in `main.py`:

```python
def classify_speed(wpm: float) -> tuple[str, str]:
    if wpm < 40:          # ← adjust thresholds here
        return "Beginner", YELLOW
    elif wpm < 70:
        return "Intermediate", CYAN
    ...
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please follow [PEP 8](https://peps.python.org/pep-0008/) style guidelines and include docstrings for any new functions.

---

## 📜 License

This project is released under the [MIT License](LICENSE). Feel free to use, modify, and distribute it.

---

## 🙏 Acknowledgements

Inspired by popular online typing tests such as [Monkeytype](https://monkeytype.com) and [10FastFingers](https://10fastfingers.com), reimagined for the terminal.
