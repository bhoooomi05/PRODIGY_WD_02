let startStopButton = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let timeDisplay = document.getElementById('timeDisplay');
let lapList = document.getElementById('lapList');

let timer;
let isRunning = false;
let elapsedTime = 0;  // Time in milliseconds
let lapTimes = [];

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 2)}`;
}

function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

function startStopwatch() {
    const startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 10); // Updates every 10ms for milliseconds precision

    startStopButton.textContent = 'Stop';
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function stopStopwatch() {
    clearInterval(timer);
    startStopButton.textContent = 'Resume';
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    lapTimes = [];
    timeDisplay.textContent = '00:00:00.00';
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    lapTimes.push(elapsedTime);
    const lapTimeFormatted = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTimeFormatted}`;
    lapList.appendChild(lapItem);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
