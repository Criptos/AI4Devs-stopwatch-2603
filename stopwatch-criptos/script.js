/**
 * SISTEMA DE GESTIÓN DE TIEMPO - LÓGICA DE NEGOCIO
 */

const app = document.getElementById('app');

let timerInterval = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let currentMode = null; // 'stopwatch' o 'countdown'
let inputDigits = "0000000000"; // hhmmssuuuu

// --- NAVEGACIÓN (SPA) ---

function renderHome() {
    stopTimer();
    app.innerHTML = `
        <h1>Time System</h1>
        <div class="controls">
            <button class="btn btn-mode" onclick="initModule('stopwatch')">Stopwatch</button>
            <button class="btn btn-mode" onclick="initModule('countdown')">Countdown</button>
        </div>
    `;
}

function initModule(mode) {
    currentMode = mode;
    elapsedTime = 0;
    isRunning = false;
    inputDigits = "0000000000";
    
    if (mode === 'stopwatch') {
        renderStopwatch();
    } else {
        renderCountdownInput();
    }
}

// --- MÓDULO STOPWATCH ---

function renderStopwatch() {
    app.innerHTML = `
        <button class="btn btn-mode" onclick="renderHome()">← Regresar</button>
        <div class="display-container">
            <div class="main-time" id="main-display">00:00:00</div>
            <div class="ms-time" id="ms-display">0000</div>
        </div>
        <div class="controls">
            <button id="start-btn" class="btn btn-start" onclick="toggleStopwatch()">Start</button>
            <button class="btn btn-clear" onclick="resetStopwatch()">Clear</button>
        </div>
    `;
}

function toggleStopwatch() {
    const btn = document.getElementById('start-btn');
    if (!isRunning) {
        startTime = performance.now() - elapsedTime;
        timerInterval = requestAnimationFrame(updateStopwatch);
        isRunning = true;
        btn.textContent = "Pause";
    } else {
        cancelAnimationFrame(timerInterval);
        isRunning = false;
        btn.textContent = "Continue";
    }
}

function updateStopwatch() {
    elapsedTime = performance.now() - startTime;
    displayTime(elapsedTime);
    timerInterval = requestAnimationFrame(updateStopwatch);
}

function resetStopwatch() {
    stopTimer();
    elapsedTime = 0;
    displayTime(0);
    const btn = document.getElementById('start-btn');
    if (btn) btn.textContent = "Start";
}

// --- MÓDULO COUNTDOWN ---

function renderCountdownInput() {
    app.innerHTML = `
        <button class="btn btn-mode" onclick="renderHome()">← Regresar</button>
        <div class="display-container">
            <div class="main-time" id="main-display">00:00:00</div>
            <div class="ms-time" id="ms-display">0000</div>
        </div>
        <div class="keypad">
            ${[1,2,3,4,5,6,7,8,9,0].map(n => `<button class="btn btn-num" onclick="pressKey('${n}')">${n}</button>`).join('')}
            <button class="btn btn-start" style="grid-column: span 2" onclick="setCountdown()">SET</button>
        </div>
    `;
    updateInputDisplay();
}

function pressKey(num) {
    // Entrada de derecha a izquierda
    inputDigits = (inputDigits + num).slice(-10);
    updateInputDisplay();
}

function updateInputDisplay() {
    const h = inputDigits.slice(0,2);
    const m = inputDigits.slice(2,4);
    const s = inputDigits.slice(4,6);
    const u = inputDigits.slice(6);
    document.getElementById('main-display').textContent = `${h}:${m}:${s}`;
    document.getElementById('ms-display').textContent = u;
}

function setCountdown() {
    // Normalización: Convertir entrada a ms totales
    const h = parseInt(inputDigits.slice(0,2)) * 3600000;
    const m = parseInt(inputDigits.slice(2,4)) * 60000;
    const s = parseInt(inputDigits.slice(4,6)) * 1000;
    const u = parseInt(inputDigits.slice(6)) / 10; // Micro a mili aprox para JS
    
    elapsedTime = h + m + s + u;
    renderCountdownActive();
}

function renderCountdownActive() {
    app.innerHTML = `
        <button class="btn btn-mode" onclick="renderCountdownInput()">← Regresar</button>
        <div class="display-container">
            <div class="main-time" id="main-display">00:00:00:00</div>
            <div class="ms-time" id="ms-display">0000</div>
        </div>
        <div class="controls">
            <button id="start-btn" class="btn btn-start" onclick="toggleCountdown()">Start</button>
            <button class="btn btn-clear" onclick="renderCountdownInput()">Clear</button>
        </div>
    `;
    displayTime(elapsedTime, true);
}

function toggleCountdown() {
    const btn = document.getElementById('start-btn');
    if (!isRunning) {
        startTime = performance.now();
        const initialDuration = elapsedTime;
        
        const runCountdown = () => {
            const now = performance.now();
            const diff = now - startTime;
            let remaining = initialDuration - diff;

            if (remaining <= 0) {
                remaining = 0;
                displayTime(0, true);
                stopTimer();
                btn.textContent = "Start";
                alert("Time is up!");
                return;
            }

            elapsedTime = remaining;
            displayTime(remaining, true);
            timerInterval = requestAnimationFrame(runCountdown);
        };

        timerInterval = requestAnimationFrame(runCountdown);
        isRunning = true;
        btn.textContent = "Pause";
    } else {
        stopTimer();
        isRunning = false;
        btn.textContent = "Continue";
    }
}

// --- UTILIDADES ---

function stopTimer() {
    cancelAnimationFrame(timerInterval);
    isRunning = false;
}

function displayTime(ms, showDays = false) {
    let totalSeconds = Math.floor(ms / 1000);
    const u = Math.floor((ms % 1000) * 10).toString().padStart(4, '0');
    
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    const m = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0');
    let h = Math.floor(totalSeconds / 3600);
    
    let displayStr = "";
    if (showDays) {
        const d = Math.floor(h / 24).toString().padStart(2, '0');
        h = (h % 24).toString().padStart(2, '0');
        displayStr = `${d}:${h}:${m}:${s}`;
    } else {
        displayStr = `${h.toString().padStart(2, '0')}:${m}:${s}`;
    }

    document.getElementById('main-display').textContent = displayStr;
    document.getElementById('ms-display').textContent = u;
}

// Inicializar la App
renderHome();
