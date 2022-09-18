let interval;
function start() {
    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
}

let currentDate = new Date();
let sec = Number(currentDate.getSeconds()),
    min = Number(currentDate.getMinutes()),
    hour = Number(currentDate.getHours());
let secOut = 0, minOut = 0, hourOut = 0;
function timer() {
    ++sec;

    if (sec == 60) {
        ++min;
        sec = 0;
    }

    if (min == 60) {
        ++hour;
        min = 0;
    }

    secOut = checkTime(sec);
    minOut = checkTime(min);
    hourOut = checkTime(hour);

    document.getElementById("sec").innerHTML = secOut;
    document.getElementById("min").innerHTML = minOut;
    document.getElementById("hour").innerHTML = hourOut;
}

function checkTime(i) {
    return (i<10 ? "0"+i : i);
}

start();
