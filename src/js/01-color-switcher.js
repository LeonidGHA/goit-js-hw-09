const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyColorEl = document.querySelector('body');
let intervalChangeColor = null;

startBtnEl.addEventListener('click', onClickBtnChangeColor);
stopBtnEl.addEventListener('click', onClickBtnStopChangeColor);

function onClickBtnChangeColor() {
  startBtnEl.disabled = true;

  intervalChangeColor = setInterval(() => {
    bodyColorEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickBtnStopChangeColor() {
  startBtnEl.disabled = false;
  setTimeout(() => {
    clearInterval(intervalChangeColor);
  }, 0);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
