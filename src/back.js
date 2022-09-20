let interval;
function start() {
    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
}

//let currentDate = new Date(); //get from the server
 interval2 = setInterval(unboxJSON, 20000);

let currentDate = new Date();
//unboxJSON();



let 	sec = currentDate.getSeconds(),
		min = currentDate.getMinutes(),
		hour = currentDate.getHours();
		
let secOut = 0, minOut = 0, hourOut = 0;

function unboxJSON() {
	jQuery.ajax({
        url: 'https://admin.sch1280.ru/date.php',
        cache: false,
        dataType: 'json'
    }).done(function(ret) {
		//currentDate = new Date(ret.y, ret.m, ret.d, ret.h, ret.i, ret.s);
		sec = ret.s;
		min = ret.min;
		hour = ret.h;
		alert(min);
    });
}


//get schedule from the server and render it
let updateTimeCnt = 0;
let maxTime = 10;
let minTime = 5;
let minutesTillUpdate = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
function timer() {
    ++sec;

    if (sec == 60) {
        ++min;
		++updateTimeCnt;
        sec = 0;
    }

    if (min == 60) {
        ++hour;
        min = 0;
    }
	
    secOut = checkTime(sec);
    minOut = checkTime(min);
    hourOut = checkTime(hour);

    document.getElementById("sec").innerHTML = sec;
    document.getElementById("min").innerHTML = min;
    document.getElementById("hour").innerHTML = hour;
	
	if (updateTimeCnt == minutesTillUpdate) {
		console.log("time has come to update time pun intended"); // get time from server and update it
		//update
		updateTimeCnt = 0;
	}
}



function checkTime(i) {
    return (i<10 ? "0"+i : i);
}

jQuery(document).ready(function() {
	unboxJSON();
	start();
});
