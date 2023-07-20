const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

const bodyEl = document.querySelector("body");

stopBtn.disabled=true;
startBtn.addEventListener("click", onClick);
stopBtn.addEventListener("click", stopClick);

let timerId=null;

function onClick(evt){
    const button = evt.currentTarget;
    button.disabled=true;
    stopBtn.disabled=false;

    timerId=setInterval(()=>{bodyEl.style.backgroundColor=getRandomHexColor()}, 1000);
}

function stopClick(evt){
    const button = evt.currentTarget;
    button.disabled = true;
    startBtn.disabled=false;

    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }