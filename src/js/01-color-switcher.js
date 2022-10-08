const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let isActive = false;
let timerId = null;

startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  if (isActive) {
    return;
  }
  timerId = setInterval(() => {
    console.log(`current color: ${getRandomHexColor()}`);
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  isActive = true;
  console.log('Поехали!');
}

function onClickStopBtn() {
  if (!isActive) {
    return;
  }
  console.log('Стоп!');
  clearInterval(timerId);
  isActive = false;
}
