import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  flatpickrEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let isActive = false;

refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true, // Enables time picker
  time_24hr: true, // Displays time picker in 24 hour mode without AM/PM selection when enabled.
  defaultDate: new Date(), // Sets the initial selected date(s).
  minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
  onClose(selectedDates) {
    let currentDate = options.defaultDate;
    selectedDate = selectedDates[0];

    if (selectedDate <= currentDate) {
      Notiflix.Report.warning('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr(refs.flatpickrEl, options);

refs.startBtn.addEventListener('click', onCountDown);

function onCountDown() {
  if (isActive) {
    return;
  }
  console.log('click START');
  const timerId = setInterval(() => {
    isActive = true;
    let deltaTime = selectedDate - Date.now();

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimer({ days, hours, minutes, seconds });

    if (deltaTime === 0 || deltaTime < 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time§
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
