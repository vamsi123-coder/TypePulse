# ⚡ TypePulse — Typing Speed Tester

A dual-experience typing speed utility featuring a **premium, responsive web application** and a **colorized command-line terminal interface**. Test your typing speed, accuracy, and detailed performance metrics to improve your skill level.

---

## 🌐 Modern Web App Interface (`index.html`)

TypePulse features a modern browser-based typing app built with vanilla HTML, CSS, and JavaScript. Designed with premium aesthetics, rich transitions, and responsiveness, it includes:

### ✨ Features
*   **Dual Themes**: Sleek Dark Mode (default) and Light Mode toggled via the top-right sun/moon icon. Your preference is persisted automatically using `localStorage` (`typepulse-theme`).
*   **Session Best Tracker**: Displayed prominently at the top-center, tracking your highest **Net WPM** achieved during the browser session.
*   **Live Status Bar**:
    *   `WORDS` - Displays the total word count of the paragraph from the start.
    *   `ACC %` - Tracks character accuracy dynamically as you type.
    *   `SEC` - Real-time active timer showing elapsed seconds.
*   **Real-time Typing Feedback**:
    *   Subtle text caret positioning.
    *   Immediate color coding per character: green for correct inputs, and red for errors.
    *   A smooth top progress bar filling up as you progress through the text.
*   **Mastery Level Banner**: A dedicated section displaying *"Your typing mastery level is [Badge]"* (Beginner/Intermediate/Advanced/Expert) right after completing the test.
*   **Fast Keyboard Shortcuts**: Press the `Escape` key at any point to instantly clear and restart the test on the current paragraph.

---

## 📊 Comprehensive 3×3 Results Grid

At the end of each test, TypePulse displays a detailed 9-card metric dashboard grouped into three analytical rows:

| Row | Card 1 | Card 2 | Card 3 |
| :--- | :--- | :--- | :--- |
| **Row 1: WPM & Time** | **Gross WPM** (Raw speed based on total keys hit, to 1 decimal place) | **Net WPM** (Adjusted speed: Gross WPM × Character Accuracy %, to 1 decimal place) | **Total Time** (Total duration of test in seconds) |
| **Row 2: Character Stats** | **Total Chars** (Total characters typed) | **Correct Chars** (Total exact matching characters) | **Accuracy** (Percentage of correct characters typed) |
| **Row 3: Word Stats** | **Total Words** (True word count of the paragraph) | **Correct Words** (Perfect matching words) | **Accuracy (Word)** (Percentage of correct words) |

### Additional Results Data
*   **Skill Level Badge**: Categorizes your speed:
    *   🟡 **Beginner**: Under 30 WPM
    *   🔵 **Intermediate**: 30 – 59 WPM
    *   🟢 **Advanced**: 60 – 89 WPM
    *   🟣 **Expert**: 90+ WPM
*   **Word-by-word Breakdown**: An expandable section detailing every word. Correct words are highlighted in green, and incorrect words in red with interactive hover tooltips showing precisely what you typed instead.

---

## 🖥 Terminal-based Companion CLI (`main.py`)

A standalone terminal typing speed tester written in Python. It draws from the same pool of 15 paragraphs and includes:
*   An interactive 3-second starting countdown.
*   Support for cross-platform ANSI console coloring (green/red highlights).
*   Post-test results detailing WPM, accuracy, correct/incorrect word counts, and an optional word-by-word output breakdown.
*   Session-best persistence as you practice through multiple paragraphs.

---

## 📁 Project Structure

```
Typing_Speed_Tester/
│
├── index.html        # Main web app layout (HUD, chips, 3x3 results card)
├── style.css         # Custom responsive design system (Glassmorphism, dark/light themes)
├── script.js        # Web app logic (Performance counters, typing events, WPM math)
│
├── main.py           # CLI python entry point (ANSI console loops & countdowns)
├── paragraphs.py     # Shared pool of 15 paragraphs of various topics
└── README.md         # Documentation (this file)
```

---

## 🚀 How to Run

### 1. Web Application (Recommended)
Simply open **`index.html`** in any modern web browser.
No server setup, build scripts, or packages needed!

### 2. Terminal Application
Ensure you have **Python 3.10+** installed:
```bash
# Navigate to the project directory
cd Typing_Speed_Tester

# Run the python tester
python main.py
```

---

## 📐 Formulas & Definitions

### Web Application Formulas
*   **Gross WPM** = `(Total Typed Characters / 5) / (Time in Seconds / 60)`
*   **Net WPM** = `Gross WPM * (Character Accuracy / 100)`
*   **Character Accuracy** = `(Correct Characters / Total Typed Characters) * 100`
*   **Word Accuracy** = `(Correct Words / Total Words) * 100`

### CLI Application Formulas
*   **Gross WPM** = `(Total Typed Words) / (Time in Seconds / 60)`
*   **Net WPM** = `Gross WPM * (Word Accuracy / 100)`
*   **Word Accuracy** = `(Correct Words / Total Words) * 100`
