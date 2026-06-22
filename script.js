'use strict';

const PARAGRAPHS = [
  "The rapid advancement of artificial intelligence is reshaping the way we live and work. Machines can now recognize speech, translate languages, and even generate creative content with remarkable accuracy. As these systems grow more capable, the line between human and machine intelligence continues to blur, raising profound questions about the future of work and creativity.",
  "Deep within the Amazon rainforest, thousands of undiscovered species still await scientific documentation. The dense canopy filters sunlight into soft, green-tinted beams that illuminate the forest floor. Every square kilometer teems with insects, reptiles, and mammals that have evolved intricate relationships over millions of years. Preserving this biodiversity is one of the greatest ecological challenges of our time.",
  "The universe is estimated to be approximately thirteen point eight billion years old, yet humanity has only been observing the cosmos with telescopes for a few centuries. Light from distant galaxies takes billions of years to reach us, meaning we are essentially looking back in time whenever we gaze at the night sky. The sheer scale of existence is both humbling and inspiring.",
  "The Renaissance was a period of extraordinary cultural and intellectual rebirth that swept through Europe from the fourteenth to the seventeenth century. Artists like Leonardo da Vinci and Michelangelo pushed the boundaries of human expression, while scientists such as Galileo and Copernicus challenged long-held beliefs about the natural world. This era laid the groundwork for modern science, philosophy, and art.",
  "Writing clean code is an art that every programmer strives to master. Meaningful variable names, concise functions, and thoughtful comments transform a tangled mess of logic into something readable and maintainable. Great software is not just about making things work — it is about crafting solutions that other developers can understand, extend, and trust for years to come.",
  "Philosophers have long debated the nature of reality and our ability to perceive it accurately. Plato argued that the physical world is merely a shadow of a higher realm of perfect forms, while Descartes famously reduced certainty to a single statement: I think, therefore I am. These ancient questions remain as compelling today as they were thousands of years ago, guiding inquiry in science, ethics, and the arts.",
  "The marathon is one of the most demanding tests of human endurance, covering a distance of just over forty two kilometers. Elite runners complete the course in slightly over two hours, sustaining a pace that most people cannot maintain for even a few minutes. Training for a marathon requires months of dedicated effort, careful nutrition, and mental resilience that extends far beyond the physical boundaries of the race itself.",
  "Music has accompanied human civilization since its earliest days, evolving from simple rhythmic drumbeats to the complex symphonies of Beethoven and beyond. It transcends language, conveying emotion and meaning in ways that words alone cannot. Whether it is the gentle strum of an acoustic guitar or the thundering bass of an electronic festival, music has the remarkable power to unite people across cultures and generations.",
  "Climate change is one of the defining challenges of the twenty-first century. Rising global temperatures are melting polar ice caps, intensifying storms, and disrupting ecosystems worldwide. Scientists warn that without significant reductions in greenhouse gas emissions, the consequences will be both widespread and irreversible. Transitioning to renewable energy sources and adopting sustainable practices are crucial steps toward a more stable future.",
  "Great literature has the power to transport readers to worlds they have never visited and introduce them to lives they have never lived. A skilled author weaves together plot, character, and language into an experience that resonates long after the final page is turned. From the tragedies of Shakespeare to the modernist experiments of Virginia Woolf, storytelling remains one of humanity's most enduring and powerful art forms.",
  "Supply and demand is the cornerstone of modern economic theory. When the supply of a good decreases while demand remains constant, prices tend to rise; conversely, an oversupply typically drives prices downward. These forces interact constantly in markets around the world, influencing everything from the cost of groceries to the value of currencies traded on international exchanges every single day.",
  "The human brain is capable of extraordinary feats of memory, creativity, and problem-solving, yet it is also susceptible to a wide range of cognitive biases. Confirmation bias leads us to favor information that supports our existing beliefs, while the availability heuristic causes us to overestimate the likelihood of events we can easily recall. Understanding these mental shortcuts is the first step toward more rational and effective decision-making.",
  "Architecture is the silent storyteller of human civilization. Every building reflects the values, technology, and aesthetic sensibilities of the era in which it was constructed. The soaring Gothic cathedrals of medieval Europe expressed both religious devotion and engineering ambition, while the glass-and-steel skyscrapers of the modern city symbolize commerce, innovation, and the relentless drive toward the sky.",
  "Regular physical exercise is one of the most powerful tools available for maintaining long-term health. Studies consistently show that even moderate activity — such as thirty minutes of brisk walking five times a week — can significantly reduce the risk of heart disease, diabetes, and depression. The benefits extend beyond the physical, sharpening focus, improving sleep quality, and boosting overall mood and well-being.",
  "The internet has fundamentally changed the way information is created, shared, and consumed. In the span of a few decades, it has evolved from a small academic network into a global infrastructure that connects billions of people. Social media platforms allow ideas to spread instantly across continents, empowering individuals while also creating new challenges around privacy, misinformation, and digital well-being.",
];

const paragraphTextEl = document.getElementById('paragraphText');
const hiddenInput     = document.getElementById('hiddenInput');
const startHint       = document.getElementById('startHint');
const testCard        = document.getElementById('testCard');
const progressFill    = document.getElementById('progressFill');

const liveWords = document.getElementById('liveWords');
const liveAcc   = document.getElementById('liveAcc');
const liveTime  = document.getElementById('liveTime');

const chipWords = document.getElementById('chipWords');
const chipAcc   = document.getElementById('chipAcc');
const chipTime  = document.getElementById('chipTime');

const resultsPanel     = document.getElementById('resultsPanel');
const resGrossWpm      = document.getElementById('resGrossWpm');
const resWpm           = document.getElementById('resWpm');
const resTime          = document.getElementById('resTime');
const resTotalChars    = document.getElementById('resTotalChars');
const resCorrectChars  = document.getElementById('resCorrectChars');
const resCharAcc       = document.getElementById('resCharAcc');
const resTotalWords    = document.getElementById('resTotalWords');
const resCorrect       = document.getElementById('resCorrect');
const resAcc           = document.getElementById('resAcc');
const skillBadge       = document.getElementById('skillBadge');
const breakdownList    = document.getElementById('breakdownList');

const sbValue   = document.getElementById('sbValue');

const btnNew      = document.getElementById('btnNew');
const btnRestart  = document.getElementById('btnRestart');
const btnTryAgain = document.getElementById('btnTryAgain');
const btnNextText = document.getElementById('btnNextText');

let currentParagraph = '';
let charSpans        = [];
let startTime        = null;
let timerRAF         = null;
let testActive       = false;
let testDone         = false;
let sessionBest      = 0;

function randomParagraph() {
  return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
}

function calcGrossWpm(typedLength, elapsedMs) {
  if (elapsedMs <= 0 || typedLength <= 0) return '0.0';
  const minutes = elapsedMs / 60000;
  return ((typedLength / 5) / minutes).toFixed(1);
}

function calcNetWpm(typedLength, incorrectWords, elapsedMs) {
  if (elapsedMs <= 0 || typedLength <= 0) return '0.0';
  const minutes  = elapsedMs / 60000;
  const gross    = (typedLength / 5) / minutes;
  const net      = Math.max(0, gross - (incorrectWords / minutes));
  return net.toFixed(1);
}

function calcWordAccuracy(original, typed) {
  const origWords  = original.trim().split(/\s+/);
  const typedWords = typed.trim() === '' ? [] : typed.trim().split(/\s+/);
  if (!origWords.length) return { accuracy: 0, correct: 0, incorrect: 0, total: 0, details: [] };

  const total = origWords.length;
  let correct = 0;
  const details = origWords.map((ow, i) => {
    const tw    = typedWords[i] ?? '';
    const match = ow === tw;
    if (match) correct++;
    return { original: ow, typed: tw, match };
  });

  const incorrect = total - correct;
  const accuracy  = Math.round((correct / total) * 100);
  return { accuracy, correct, incorrect, total, details };
}

function classifySpeed(wpm) {
  if (wpm < 30)  return { label: 'Beginner',     cls: 'beginner' };
  if (wpm < 60)  return { label: 'Intermediate', cls: 'intermediate' };
  if (wpm < 90)  return { label: 'Advanced',     cls: 'advanced' };
  return              { label: 'Expert',        cls: 'expert' };
}

function buildCharSpans(text) {
  paragraphTextEl.innerHTML = '';
  charSpans = [];

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = text[i];
    if (text[i] === ' ') span.dataset.space = 'true';
    charSpans.push(span);
    paragraphTextEl.appendChild(span);
  }

  // Cursor on first char
  if (charSpans.length) charSpans[0].classList.add('cursor');
}

function renderTyped(typed) {
  const len = currentParagraph.length;

  for (let i = 0; i < len; i++) {
    const span = charSpans[i];
    span.classList.remove('correct', 'error', 'cursor');

    if (i < typed.length) {
      span.classList.add(typed[i] === currentParagraph[i] ? 'correct' : 'error');
    }
  }

  const cursorIdx = Math.min(typed.length, len - 1);
  if (typed.length < len) {
    charSpans[cursorIdx].classList.add('cursor');
  }

  const pct = Math.min((typed.length / len) * 100, 100);
  progressFill.style.width = pct + '%';

  // Live accuracy
  if (typed.length > 0) {
    let correctChars = 0;
    for (let i = 0; i < typed.length && i < len; i++) {
      if (typed[i] === currentParagraph[i]) correctChars++;
    }
    const acc = Math.round((correctChars / typed.length) * 100);
    liveAcc.textContent = acc;
    chipAcc.style.borderColor =
      acc >= 90 ? 'var(--correct)' : acc >= 70 ? 'var(--gold)' : 'var(--error)';
  } else {
    liveAcc.textContent = '100';
    chipAcc.style.borderColor = '';
  }
}

function startTimer() {
  startTime = performance.now();

  function tick() {
    if (!testActive) return;
    const elapsed = performance.now() - startTime;
    liveTime.textContent = (elapsed / 1000).toFixed(1);
    timerRAF = requestAnimationFrame(tick);
  }

  timerRAF = requestAnimationFrame(tick);
}

function stopTimer() {
  cancelAnimationFrame(timerRAF);
  timerRAF = null;
}

function loadParagraph(text) {
  currentParagraph = text;

  stopTimer();
  hiddenInput.value = '';
  testActive = false;
  testDone   = false;
  startTime  = null;

  const wordCount = text.trim().split(/\s+/).length;
  liveWords.textContent = wordCount;
  liveAcc.textContent  = '100';
  liveTime.textContent = '0.0';
  progressFill.style.width = '0%';
  chipAcc.style.borderColor = '';
  chipWords.classList.add('active');
  chipAcc.classList.remove('active');
  chipTime.classList.remove('active');

  resultsPanel.hidden = true;
  startHint.classList.remove('hidden');
  testCard.classList.remove('focused');

  buildCharSpans(text);
}

function finishTest() {
  testActive = false;
  testDone   = true;
  stopTimer();

  const elapsed  = performance.now() - startTime;
  const typed    = hiddenInput.value;
  const { accuracy, correct, incorrect, details } = calcWordAccuracy(currentParagraph, typed);

  const grossWpm = calcGrossWpm(typed.length, elapsed);
  const netWpm   = calcNetWpm(typed.length, incorrect, elapsed);
  const speed    = classifySpeed(parseFloat(netWpm));

  // Character-level stats
  const totalChars   = typed.length;
  let correctChars   = 0;
  for (let i = 0; i < typed.length && i < currentParagraph.length; i++) {
    if (typed[i] === currentParagraph[i]) correctChars++;
  }
  const charAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  if (parseFloat(netWpm) > sessionBest) {
    sessionBest = parseFloat(netWpm);
    sbValue.textContent = netWpm;
  }

  // Row 1
  resGrossWpm.textContent = grossWpm;
  resWpm.textContent      = netWpm;
  resTime.textContent     = (elapsed / 1000).toFixed(2);

  // Row 2
  resTotalChars.textContent   = totalChars;
  resCorrectChars.textContent = correctChars;
  resCharAcc.textContent      = charAccuracy + '%';

  // Row 3
  resTotalWords.textContent = correct + incorrect;
  resCorrect.textContent    = correct;
  resAcc.textContent        = accuracy + '%';

  skillBadge.textContent   = speed.label;
  skillBadge.className     = 'skill-badge ' + speed.cls;

  breakdownList.innerHTML = '';
  details.forEach(({ original, typed: tw, match }) => {
    const chip = document.createElement('span');
    chip.className = 'word-chip ' + (match ? 'ok' : 'bad');
    chip.textContent = original;
    if (!match) chip.dataset.typed = tw || '(missing)';
    breakdownList.appendChild(chip);
  });

  resultsPanel.hidden = false;
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

hiddenInput.addEventListener('input', () => {
  if (testDone) return;

  const typed = hiddenInput.value;

  // First keypress starts the test
  if (!testActive && typed.length > 0) {
    testActive = true;
    startHint.classList.add('hidden');
    chipAcc.classList.add('active');
    chipTime.classList.add('active');
    startTimer();
  }

  renderTyped(typed);

  if (typed.length >= currentParagraph.length) {
    setTimeout(finishTest, 80);
  }
});

function focusInput() {
  hiddenInput.focus({ preventScroll: true });
  testCard.classList.add('focused');
}

testCard.addEventListener('click', focusInput);

hiddenInput.addEventListener('blur', () => {
  if (!testDone) testCard.classList.remove('focused');
});

hiddenInput.addEventListener('focus', () => {
  testCard.classList.add('focused');
});

hiddenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') e.preventDefault();
});

btnRestart.addEventListener('click', () => {
  loadParagraph(currentParagraph);
  focusInput();
});

btnNew.addEventListener('click', () => {
  let p;
  do { p = randomParagraph(); } while (p === currentParagraph && PARAGRAPHS.length > 1);
  loadParagraph(p);
  focusInput();
});

btnTryAgain.addEventListener('click', () => {
  loadParagraph(currentParagraph);
  focusInput();
});

btnNextText.addEventListener('click', () => {
  let p;
  do { p = randomParagraph(); } while (p === currentParagraph && PARAGRAPHS.length > 1);
  loadParagraph(p);
  focusInput();
});

// Escape key to restart
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    loadParagraph(currentParagraph);
    focusInput();
  }
});

// Theme handling
const themeToggle = document.getElementById('themeToggle');
const htmlEl      = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('typepulse-theme', theme);
}

const savedTheme = localStorage.getItem('typepulse-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

loadParagraph(randomParagraph());

window.addEventListener('load', () => {
  setTimeout(focusInput, 100);
});
