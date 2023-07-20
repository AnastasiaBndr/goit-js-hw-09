import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

const fp = flatpickr("#datetime-picker",options);
const startBtn = document.querySelector("[data-start]");
const myInput = document.querySelector("#datetime-picker");

startBtn.addEventListener("click", onClick);
 
    myInput.addEventListener("input", onInput);

    function onInput(evt){
        const fpDateTime = Date.parse(myInput.value);
        const currentDateTime= new Date().getTime();
         if(currentDateTime>=fpDateTime){
            Notiflix.Report.failure('Date in the past', 'Choose date in future!', 'Ok', {
              width: '360px',
              svgSize: '120px',
              borderRadius: '8px',
            },);
            startBtn.disabled=true;
    }else startBtn.disabled=false;
    
}
   

function onClick(evt){
   
    const fpDateTime = Date.parse(myInput.value);
    startBtn.disabled=true;
    console.log("dksmca");
        const timerId = setInterval(()=>{

            const deltaTime = fpDateTime-new Date().getTime();

            const timeComponents = convertMs(deltaTime);
            const daysStr = addLeadingZero(timeComponents.days);
            const hourStr=addLeadingZero(timeComponents.hours);
            const minsStr=addLeadingZero(timeComponents.minutes);
            const secsStr=addLeadingZero(timeComponents.seconds);
  
            document.querySelector("[data-days]").textContent=daysStr;
            document.querySelector("[data-hours]").textContent=hourStr;
            document.querySelector("[data-minutes]").textContent=minsStr;
            document.querySelector("[data-seconds]").textContent=secsStr;
            
            if(deltaTime===0){
                document.querySelector("body").insertAdjacentHTML("beforeend",` <div>
                <h2>The end! :)</h2>
              </div>`);
              clearInterval(timerId);
            }

        }, 1000);
    }


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value){
    if(value<10){
      return value+"".padStart(2,'0');
    }
  }




