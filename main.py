import time
import os
import sys
from paragraphs import get_random_paragraph, get_paragraph_count

RESET   = "\033[0m"
BOLD    = "\033[1m"
DIM     = "\033[2m"
GREEN   = "\033[92m"
RED     = "\033[91m"
YELLOW  = "\033[93m"
CYAN    = "\033[96m"
MAGENTA = "\033[95m"
BLUE    = "\033[94m"
WHITE   = "\033[97m"

if sys.platform == "win32":
    import ctypes
    try:
        kernel32 = ctypes.windll.kernel32
        kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
    except Exception:
        pass

def clear_screen() -> None:
    os.system("cls" if sys.platform == "win32" else "clear")

def divider(char: str = "─", width: int = 70, color: str = DIM) -> None:
    print(f"{color}{char * width}{RESET}")

def banner() -> None:
    clear_screen()
    divider("═", color=CYAN)
    title = "⌨  TYPING SPEED TESTER"
    padding = (70 - len(title)) // 2
    print(f"{CYAN}{BOLD}{' ' * padding}{title}{RESET}")
    divider("═", color=CYAN)
    print()

def tokenize(text: str) -> list[str]:
    return text.split()

def calculate_wpm(word_count: int, elapsed_seconds: float) -> float:
    if elapsed_seconds <= 0:
        return 0.0
    elapsed_minutes = elapsed_seconds / 60.0
    return round(word_count / elapsed_minutes, 2)

def calculate_accuracy(original_words: list[str], typed_words: list[str]) -> float:
    if not original_words:
        return 0.0
    comparison_length = max(len(original_words), len(typed_words))
    if comparison_length == 0:
        return 0.0
    matches = sum(
        1
        for i in range(min(len(original_words), len(typed_words)))
        if original_words[i] == typed_words[i]
    )
    return round((matches / len(original_words)) * 100, 2)

def compare_words(
    original_words: list[str], typed_words: list[str]
) -> tuple[int, int, list[tuple[str, str, bool]]]:
    correct_count   = 0
    incorrect_count = 0
    details: list[tuple[str, str, bool]] = []
    max_len = max(len(original_words), len(typed_words))

    for i in range(max_len):
        orig = original_words[i] if i < len(original_words) else "[missing]"
        typd = typed_words[i]    if i < len(typed_words)    else "[missing]"
        match = orig == typd
        details.append((orig, typd, match))
        if match:
            correct_count += 1
        else:
            incorrect_count += 1

    return correct_count, incorrect_count, details

def classify_speed(wpm: float) -> tuple[str, str]:
    if wpm < 30:
        return "Beginner", YELLOW
    elif wpm < 60:
        return "Intermediate", CYAN
    elif wpm < 90:
        return "Advanced", GREEN
    else:
        return "Expert", MAGENTA

def display_paragraph(paragraph: str) -> None:
    divider(color=BLUE)
    print(f"{BOLD}{WHITE}  📄  TYPE THE FOLLOWING PARAGRAPH:{RESET}")
    divider(color=BLUE)
    print()
    
    # Wrap text at 68 chars
    words = paragraph.split()
    line, lines = "", []
    for word in words:
        if len(line) + len(word) + 1 > 68:
            lines.append(line)
            line = word
        else:
            line = word if not line else line + " " + word
    if line:
        lines.append(line)

    for ln in lines:
        print(f"  {BOLD}{WHITE}{ln}{RESET}")
    print()
    divider(color=BLUE)

def display_results(
    wpm: float,
    accuracy: float,
    correct_count: int,
    incorrect_count: int,
    elapsed: float,
    total_words: int,
    session_best: float,
) -> None:
    label, label_color = classify_speed(wpm)

    print()
    divider("═", color=CYAN)
    print(f"{CYAN}{BOLD}{'  📊  RESULTS':^70}{RESET}")
    divider("═", color=CYAN)
    print()

    def row(icon: str, name: str, value: str, color: str = WHITE) -> None:
        print(f"  {icon}  {DIM}{name:<22}{RESET}{color}{BOLD}{value}{RESET}")

    row("⏱ ", "Time Taken",      f"{elapsed:.2f} seconds")
    row("📝", "Words in Text",   f"{total_words}")
    row("⚡", "Speed (WPM)",     f"{wpm:.2f} WPM",    CYAN)
    row("🎯", "Accuracy",        f"{accuracy:.2f}%",
        GREEN if accuracy >= 90 else YELLOW if accuracy >= 70 else RED)
    row("✅", "Correct Words",   f"{correct_count}",  GREEN)
    row("❌", "Incorrect Words", f"{incorrect_count}", RED if incorrect_count else GREEN)

    print()
    divider(color=DIM)

    print(f"\n  🏅  Skill Level:  {label_color}{BOLD}{label}{RESET}")

    if wpm >= session_best:
        print(f"  🏆  {GREEN}{BOLD}New session best! ({wpm:.2f} WPM){RESET}")
    else:
        print(f"  🏆  Session Best: {YELLOW}{BOLD}{session_best:.2f} WPM{RESET}")

    print()
    divider("═", color=CYAN)

def display_word_breakdown(
    details: list[tuple[str, str, bool]], show_limit: int = 15
) -> None:
    print(f"\n  {DIM}Word-by-word breakdown (first {show_limit} words):{RESET}\n")
    for i, (orig, typd, match) in enumerate(details[:show_limit]):
        if match:
            print(f"  {GREEN}✔{RESET}  {GREEN}{orig}{RESET}")
        else:
            print(f"  {RED}✘{RESET}  {RED}{orig}{RESET}  {DIM}(you typed: {typd}){RESET}")
    if len(details) > show_limit:
        print(f"\n  {DIM}… and {len(details) - show_limit} more word(s).{RESET}")
    print()

def run_test(session_best: float) -> float:
    paragraph = get_random_paragraph()
    original_words = tokenize(paragraph)

    display_paragraph(paragraph)

    print(f"\n  {DIM}Press {RESET}{BOLD}Enter{RESET}{DIM} when ready, then start typing…{RESET}")
    input()

    # Countdown
    for i in (3, 2, 1):
        print(f"\r  {YELLOW}{BOLD}Starting in {i}…{RESET}   ", end="", flush=True)
        time.sleep(1)
    print(f"\r  {GREEN}{BOLD}GO! Type now and press Enter when done.{RESET}       ")
    print()

    start_time = time.perf_counter()
    try:
        user_input = input("  > ")
    except (KeyboardInterrupt, EOFError):
        raise

    end_time = time.perf_counter()
    elapsed  = end_time - start_time

    if not user_input.strip():
        print(f"\n  {YELLOW}⚠  No input detected.{RESET}\n")
        return session_best

    typed_words = tokenize(user_input)
    raw_wpm     = calculate_wpm(len(typed_words), elapsed)
    accuracy    = calculate_accuracy(original_words, typed_words)
    wpm         = round(raw_wpm * (accuracy / 100.0), 2)
    correct_count, incorrect_count, details = compare_words(original_words, typed_words)

    if wpm > session_best:
        session_best = wpm

    display_results(
        wpm, accuracy, correct_count, incorrect_count,
        elapsed, len(original_words), session_best
    )

    print(f"  {DIM}Show word-by-word breakdown? (y/N): {RESET}", end="")
    choice = input().strip().lower()
    if choice == "y":
        display_word_breakdown(details)

    return session_best

def main() -> None:
    banner()
    para_count = get_paragraph_count()
    print(f"  {DIM}Welcome! This tester draws from a pool of {RESET}{BOLD}{para_count}{RESET}{DIM} paragraphs.{RESET}\n")

    session_best = 0.0
    test_number  = 0

    while True:
        test_number += 1
        print(f"\n  {CYAN}{BOLD}── Test #{test_number} ──{RESET}\n")

        try:
            session_best = run_test(session_best)
        except (KeyboardInterrupt, EOFError):
            print(f"\n\n  {DIM}Interrupted.{RESET}")
            break

        print(f"  {DIM}Press {RESET}{BOLD}Enter{RESET}{DIM} to take another test or type {RESET}{BOLD}q{RESET}{DIM} to quit: {RESET}", end="")
        try:
            again = input().strip().lower()
        except (KeyboardInterrupt, EOFError):
            again = "q"

        if again == "q":
            break

        banner()

    print()
    divider("═", color=MAGENTA)
    print(f"{MAGENTA}{BOLD}{'  🎉  SESSION SUMMARY':^70}{RESET}")
    divider("═", color=MAGENTA)
    print()
    print(f"  Tests completed   : {BOLD}{test_number}{RESET}")
    if session_best > 0:
        label, label_color = classify_speed(session_best)
        print(f"  Best WPM this run : {CYAN}{BOLD}{session_best:.2f} WPM{RESET}")
        print(f"  Final skill level : {label_color}{BOLD}{label}{RESET}")
    else:
        print(f"  {DIM}No completed tests recorded.{RESET}")
    print()
    divider("═", color=MAGENTA)
    print(f"\n  {DIM}Thanks for practicing! 🚀{RESET}\n")

if __name__ == "__main__":
    main()
