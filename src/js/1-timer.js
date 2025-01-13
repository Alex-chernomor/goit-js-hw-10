import flatpickr from "flatpickr";
import iziToast from "izitoast";

const chooseDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const setAttrib = name => name.setAttribute('disabled', '');
const removeAttrib = name => name.removeAttribute('disabled');
const pad = value => String(value).padStart(2,'0');


setAttrib(startButton);

let userSelectedDate = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose() {
      userSelectedDate = chooseDate.value
      if (differens()<=0) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
      } else {
       removeAttrib(startButton);
    }
      return 
    },
  };

flatpickr(chooseDate, options);

const differens = () => {
  return new Date(userSelectedDate) - Date.now()
} 

const start = () =>{  
    setAttrib(chooseDate);
    setAttrib(startButton);

  intervalId = setInterval(()=>{
    if(differens() <= 0 ){
      stop();
      removeAttrib(chooseDate);
      return
    }

    userSelectedDate = new Date(chooseDate.value);
    days.textContent = pad(convertMs(differens()).days);
    hours.textContent = pad(convertMs(differens()).hours);
    minutes.textContent = pad(convertMs(differens()).minutes);
    seconds.textContent = pad(convertMs(differens()).seconds);
  },1000);
  
};

function convertMs(ms) {
  const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
  };
  
const stop = () =>{
  clearInterval(intervalId);
};

startButton.addEventListener('click', start);


// console.log("hello");
