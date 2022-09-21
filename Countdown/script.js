const secondsEl = document.getElementById('seconds');
const minsEl = document.getElementById('mins');
const hoursEl = document.getElementById('hours');
const daysEl = document.getElementById('days');

const newYears = '1 Jan 2023';

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const total = (newYearsDate - currentDate) / 1000;
    const seconds = Math.floor(total % 60);
    const mins = Math.floor(total / 60) % 60;
    const hours = Math.floor(total / 3600) % 24;
    const days = Math.floor(total / 3600 / 24);

    secondsEl.innerHTML = format_time(seconds);
    minsEl.innerHTML = format_time(mins);
    hoursEl.innerHTML = format_time(hours);
    daysEl.innerHTML = days;
    
    console.log(seconds, mins, hours, days);
}

function format_time(time) {
    return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);