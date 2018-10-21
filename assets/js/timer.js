var ProgressBar = require('progressbar.js');

let bar;
function loadProgress() {	
	bar = new ProgressBar.SemiCircle(progressContainer, {
		strokeWidth: 6,
		duration: 1400,
		color: '#5a5a5a',
		trailColor: 'rgba(102,153,204,0.18)',
		trailWidth: 2.3,
		svgStyle: null,
		text: {
			value: "00:00:00",
			alignToBottom: true
		},
		from: {color: '#FFEA82'},
		to: {color: '#ED6A5A'},
		step: function(state, bar) {
		    bar.path.setAttribute('stroke', state.color);
		    if (bar.value() != 0) {
		    	bar.text.style.color = state.color;
		    }
		}
		

	});

	bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
	bar.text.style.fontSize = '2rem';
	bar.text.style.color = bar.color;
}


let Timer = function(sched, roundLength, numRounds) {
	this.pomodoroNum = sched.length;
	this.numRounds = numRounds;
	this.roundLength = (roundLength * 2) + 1
	this.goal = roundLength * numRounds;
	this.schedule = sched;
	this.curr = 0;
	this.currWorkSession = 0;
	this.currRound = 0;
	this.second = 0;
	this.paused = false;
	this.skipped = false;
	this.endingBlock = false;
	this.id = 0;
	this.table = document.querySelector("#timer-schedule");
}

Timer.prototype.init = function() {
	this.switchBlock();
	this.id = setInterval(this.run.bind(this), 1000);
},

Timer.prototype.skip = function() {
	bar.destroy();
	loadProgress();
	this.skipped = true;
},


Timer.prototype.pause = function() {

	if (this.paused) {
  		bar._progressPath._tweenable.resume();
	} else {
		bar._progressPath._tweenable.pause();
	}
	this.paused = !this.paused;

},

Timer.prototype.switchBlock = function() {
	let dur = (this.schedule[this.curr].initialMinuteAmt * 60000) + (this.schedule[this.curr].initialSecondAmt * 1000);
	bar.animate(1.0, { duration: dur});
	this.updateCounts();
	this.updateText();
},

Timer.prototype.updateText = function() {
	this.table.rows[this.curr + 1].className += "currentBlock";
	this.table.rows[this.curr + 1].cells[2].innerHTML = new Date().toLocaleTimeString();
		// document.getElementById("tracking").innerHTML = this.schedule[this.curr].ttype + ", " + (this.curr + 1) + "/" + this.pomodoroNum;

	document.getElementById("type").innerHTML = "Type: " + this.schedule[this.curr].ttype;
	document.getElementById("round").innerHTML = "Round: " + (this.currRound) + "/" + this.numRounds; 
	document.getElementById("goal").innerHTML = "Goal: " + (this.currWorkSession) + "/" + this.goal;
}

Timer.prototype.updateCounts = function() {
	
	if (this.curr % this.roundLength == 0) {
		this.currRound++;
	}
	console.log(this.schedule[this.curr].ttype);
	if (this.schedule[this.curr].ttype === "Pomodoro") {
		this.currWorkSession++;
		console.log(this.currWorkSession);
	}
}

Timer.prototype.run = function() {
	
	if (this.curr == this.pomodoroNum) {
		clearInterval(this.id);
	} else {
		if (this.skipped) {
			this.table.rows[this.curr + 1].cells[3].innerHTML = "SKIPPED"
			this.table.rows[this.curr + 1].classList.remove("currentBlock");
			this.curr++;
			this.skipped = false;
			this.switchBlock();
		}
		if (!this.paused) {

			if (this.endingBlock) {
				this.switchBlock();
				this.endingBlock = false;
			}

			let tb = this.schedule[this.curr];
			let dur = tb.duration;
			
			let min = parseInt(dur / 60);
			let sec = parseInt(dur % 60);
			min = ("0" + min).slice(-2);
			sec = ("0" + sec).slice(-2);
			// document.querySelector('#time').textContent = min + ":" + sec;
			
			let remaining = min + ":" + sec;
			bar.setText(remaining);

			if (dur  == 0) {
				this.table.rows[this.curr + 1].cells[3].innerHTML = new Date().toLocaleTimeString();
				this.table.rows[this.curr + 1].classList.remove("currentBlock");
				this.curr++;
				this.endingBlock = true;
				bar.destroy();
				loadProgress();

				// this.switchBlock();
				
			}
			
			
			tb.updateDuration("-", 1);
		}
		
	}	
}



// timeblock object
let TimeBlock = function(ttype, timeAmt) {
	this.ttype = ttype;
	this.timeAmt = timeAmt;
	this.initialMinuteAmt = Math.floor(timeAmt / 60); 
	this.initialSecondAmt = timeAmt % 60;
	this.duration = timeAmt;
	// this.initialMinuteAmt = parseInt(this.timeAmt.split(":")[0]);
	// this.initialSecondAmt = parseInt(this.timeAmt.split(":")[1]);
	// this.duration = (this.initialMinuteAmt * 60) + this.initialSecondAmt;
	this.startTime =  "--:--";
	this.endTime =  "--:--";
	this.completed = false;
}


TimeBlock.prototype.complete = function() {
	return !this.endTime == "--:--";
},
TimeBlock.prototype.updateDuration = function(op, amt) {
	this.duration = eval(this.duration + op + amt);
	// console.log(this.duration);
},
// TimeBlock.prototype.print = function() {
// 	return this.i + " " + this.timeAmt + " " + this.ttype;
// }

TimeBlock.prototype.displayRow = function(table) {

	let row = document.createElement("tr");
	let tbody = document.createElement("tbody");

	let tdType = document.createElement("td");
	let textType = document.createTextNode(this.ttype);
	tdType.appendChild(textType)
	row.appendChild(tdType)

	let tdDuration = document.createElement("td");
	let textDuration = document.createTextNode(this.duration);
	tdDuration.appendChild(textDuration)
	row.appendChild(tdDuration)

	let tdStartT = document.createElement("td");
	let textStartT = document.createTextNode(this.startTime);
	tdStartT.appendChild(textStartT)
	row.appendChild(tdStartT)

	let tdEndT = document.createElement("td");
	let textEndT = document.createTextNode(this.endTime);
	tdEndT.appendChild(textEndT)
	row.appendChild(tdEndT)

	tbody.appendChild(row);
	table.appendChild(tbody);
}

// load

function loadDefault() {
	let cycle = [];
	let roundLength;
	let numRounds;
	let t;

	document.getElementById("save").addEventListener("click", function() {
		document.getElementById("goto-link").setAttribute("style", "display: none;")
		document.getElementById("playButton").setAttribute("style", "display: block;")
		document.getElementById("pause").setAttribute("style", "display: block;")
		document.getElementById("skip").setAttribute("style", "display: block;")


		let workLength = document.getElementById("setting-work-length").value;
		let sBreakLength = document.getElementById("setting-sbreak-length").value;
		let lBreakLength = document.getElementById("setting-lbreak-length").value;
		roundLength = document.getElementById("setting-round-length").value;
		numRounds = document.getElementById("setting-num-rounds").value;

		for (let i = 0; i < numRounds; i++) {
			for (let j = 0; j < roundLength; j++) {
				cycle.push(new TimeBlock("Pomodoro", workLength));
				cycle.push(new TimeBlock("Short Break", sBreakLength));
			}
			cycle.push(new TimeBlock("Long Break", lBreakLength));
		}
		loadTable(cycle, (roundLength * 2) + 1);

		document.getElementById("type").innerHTML = "Type: --" 
		document.getElementById("round").innerHTML = "Round: 0 /" + numRounds; 
		document.getElementById("goal").innerHTML = "Goal: 0 /" + (roundLength * numRounds);

		
		
	});


	function loadTable(schedule) {
		let table = document.querySelector("#timer-schedule");

		for (let i = 0; i < schedule.length; i++) {	
			schedule[i].displayRow(table);
		}
	}


	document.getElementById("playButton").addEventListener("click", function() {
		t = new Timer(cycle, roundLength, numRounds)
		t.init();
	});

	document.getElementById("skip").addEventListener("click", function() {
		t.skip();
	});	

	document.getElementById("pause").addEventListener("click", function() {
		t.pause();
		document.getElementById("pause").classList.toggle("paused");
		if (document.getElementById("pause").classList.contains("paused")) {
			document.getElementById("pause").innerHTML = "Unpause";
		} else {
			document.getElementById("pause").innerHTML = "Pause";
		}
	});	

	
}


document.addEventListener('DOMContentLoaded', function(){
    let sections = document.querySelectorAll(".sec-link");
    loadProgress();
	
	
    for (let i = 0; i < sections.length; i++) {
        sections[i].addEventListener("click", function(){

            if (this.getAttribute("data-active") != 1) {

                let curr = document.querySelector("a[data-active='1']");
                curr.setAttribute("data-active", 0);
                currId = curr.getAttribute("href").substring(1);
                document.getElementById(currId).classList.add("hide");

                this.setAttribute("data-active", 1);
                let secId = this.getAttribute("href").substring(1);
                document.getElementById(secId).classList.remove("hide");
               
            } 
             

            
        });
            }

        loadDefault();
    
}, false);
