import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const calendarEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const dateNow = Date.now();
let dateOfCalendar = null;
startBtnEl.disabled = true;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateOfCalendar = selectedDates[0] - dateNow;
    if (dateOfCalendar <= 0) {
      Report.failure(
        'Think again',
        'Please choose a date in the future',
        'Okay'
      );
    }
    startBtnEl.disabled = false;
    return (dateOfCalendar = selectedDates[0]);
  },
};

flatpickr(calendarEl, options);

startBtnEl.addEventListener('click', onClickBtnStartTimer);

function onClickBtnStartTimer() {
  timer.start(dateOfCalendar);
}

const timer = {
  intervalId: null,

  start(timerDeadline) {
    this.intervalId = setInterval(() => {
      const dateTimerNow = Date.now();
      const difference = timerDeadline - dateTimerNow;
      if (difference <= 0) {
        stop();
      }
      const { days, hours, minutes, seconds } = this.convertMs(difference);
      daysEl.textContent = this.pad(days);
      hoursEl.textContent = this.pad(hours);
      minutesEl.textContent = this.pad(minutes);
      secondsEl.textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
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
  },

  pad(Value) {
    return String(Value).padStart(2, 0);
  },
};
