let interval;
function start() {
    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
}

let currentDate = new Date();
let sec = currentDate.getSeconds(),
	min = currentDate.getMinutes(),
	hour = currentDate.getHours();
		
function getTimeFromServer() {
	jQuery.ajax({
        url: "https://admin.sch1280.ru/date.php",
        cache: false,
        dataType: 'json'
    }).done(function(ret) {
		sec = parseInt(ret.s);
		min = parseInt(ret.min);
		hour = parseInt(ret.h);
    });
}

let scheduleInfo = null;
function getSchedule() {
	jQuery.ajax({
        url: "https://admin.sch1280.ru/rasp.php",
        cache: false,
        dataType: 'json'
    }).done(function(ret) {
		renderScheduleTable(ret);
    });
}

function renderScheduleTable(data) {
	const mytable = document.getElementById("html-data-table");
	data.forEach(lesson => {
		let newRow = document.createElement("tr");
		let cnt = 0;
		Object.values(lesson).forEach((value) => {
			jQuery('.num'+ ++cnt +'.lesson .n').html("222");
			/* let cell = document.createElement("td");
			
			if (cnt%4==1 || cnt%4==2)
				cell.innerText = value[0] + ":" + value[1];
			else
				cell.innerText = value;
			newRow.appendChild(cell); */
		})
		mytable.appendChild(newRow);
		
		//jQuery('.num1.lesson .n').html("222");
		
	});
}


//get schedule from the server and render it
let updateTimeCnt = 0;
let maxTime = 10;
let minTime = 5;
let minutesTillUpdate = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
console.log(minutesTillUpdate);
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
	
    document.getElementById("sec").innerHTML = formatString(sec);
    document.getElementById("min").innerHTML = formatString(min);
    document.getElementById("hour").innerHTML = formatString(hour);
	
	if (updateTimeCnt == minutesTillUpdate) {
		console.log("time has come to update time pun intended"); // get time from server and update it
		getTimeFromServer();
		minutesTillUpdate = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
		console.log(minutesTillUpdate);
		updateTimeCnt = 0;
	}
}

function formatString(num) {
	return (num < 10) ? ("0"+num) : num;
}

jQuery(document).ready(function() {
	getTimeFromServer();
	getSchedule();
	start();
});
