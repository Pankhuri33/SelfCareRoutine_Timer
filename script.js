// Self-Care Routine Steps
const routine = [
  { step: "Cleanse 🧼", time: 120 },
  { step: "Tone 🌸", time: 60 },
  { step: "Moisturize 💧", time: 90 },
  { step: "Journal 💧", time: 120 }
];

let currentStep = 0;
let timeLeft = routine[currentStep].time;
let timerInterval = null;
let isRunning = false;

// DOM Elements
const stepName = document.getElementById('step-name');
const timerDisplay = document.getElementById('timer');
const stepCounter = document.getElementById('step-counter');

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');

// Format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update timer and UI
function updateDisplay() {
  stepName.textContent = `Step: ${routine[currentStep].step}`;
  timerDisplay.textContent = formatTime(timeLeft);
  stepCounter.textContent = `Step ${currentStep + 1} of ${routine.length}`;
}

// Start timer
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      alert("Step Complete! ✨");
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Reset timer
function resetTimer() {
  pauseTimer();
  timeLeft = routine[currentStep].time;
  updateDisplay();
}

// Move to next step
function nextStep() {
  pauseTimer();
  if (currentStep < routine.length - 1) {
    currentStep++;
    timeLeft = routine[currentStep].time;
    updateDisplay();
  } else {
    alert("Routine Complete! 🌷");
    currentStep = 0;
    timeLeft = routine[currentStep].time;
    updateDisplay();
  }
}

// Button Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
nextBtn.addEventListener('click', nextStep);

// Initialize
updateDisplay();
