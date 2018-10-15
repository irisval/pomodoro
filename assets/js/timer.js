(function(x) {

	// timer object
	let Timer = function(sched) {
		this.pomodoroNum = sched.length;
		this.schedule = sched;
		this.curr = 0;
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
		this.skipped = true;
	},


	Timer.prototype.pause = function() {
		this.paused = !this.paused;
	},

	Timer.prototype.switchBlock = function() {
		this.table.rows[this.curr + 1].className += "currentBlock";
		this.table.rows[this.curr + 1].cells[2].innerHTML = new Date().toLocaleTimeString();
		document.getElementById("tracking").innerHTML = this.schedule[this.curr].ttype + ", " + (this.curr + 1) + "/" + this.pomodoroNum;
	},


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
			else if (!this.paused) {

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
				document.querySelector('#time').textContent = min + ":" + sec;
				
				if (dur  == 0) {
					this.table.rows[this.curr + 1].cells[3].innerHTML = new Date().toLocaleTimeString();
					this.table.rows[this.curr + 1].classList.remove("currentBlock");
					this.curr++;
					this.endingBlock = true;

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
		this.initialMinuteAmt = timeAmt / 60; 
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

		// let defaultCycle = [];
		// defaultCycle.push(new TimeBlock("pomodoro", "00:04"));
		// defaultCycle.push(new TimeBlock("short-break", "00:02"));
		// defaultCycle.push(new TimeBlock("pomodoro", "00:04"));
		// defaultCycle.push(new TimeBlock("short-break", "00:02"));
		
		let cycle = [];
		let t;

		// document.getElementById("makeSchedule").addEventListener("click", function() {
		// 	this.setAttribute("style", "display: none;")
		// 	document.getElementById("makeSchedule").setAttribute("style", "display: none;");

		// });

		//function conver

		document.getElementById("save").addEventListener("click", function() {
				console.log("CAN YOU SEE THIS");
			document.getElementById("makeSchedule").setAttribute("style", "display: none;")
			document.getElementById("playButton").setAttribute("style", "display: block;")
			document.getElementById("pause").setAttribute("style", "display: block;")
			document.getElementById("skip").setAttribute("style", "display: block;")


			let workLength = document.getElementById("setting-work-length").value;
			console.log("1: " + workLength);
			let sBreakLength = document.getElementById("setting-sbreak-length").value;
			console.log("2: " + sBreakLength);
			let lBreakLength = document.getElementById("setting-lbreak-length").value;
			console.log("3: " + lBreakLength);
			let roundLength = document.getElementById("setting-round-length").value;
			console.log("4: " + roundLength);
			let numRounds = document.getElementById("setting-num-rounds").value;
			console.log("5: " + numRounds);

			for (let i = 0; i < numRounds.length; i++) {
				for (let j = 0; j < roundLength; j++) {
					cycle.push(new TimeBlock("pomodoro", workLength));
					cycle.push(new TimeBlock("short-break", sBreakLength));
				}
				cycle.push(new TimeBlock("long-break", lBreakLength));
			}
			loadTable(cycle);
			
			
		});

		// document.getElementById("makeSchedule").addEventListener("click", function() {

		// })


		function loadTable(schedule) {
			let table = document.querySelector("#timer-schedule");
			let tb;
			for (let i = 0; i < schedule.length; i++) {	
				schedule[i].displayRow(table);
			}
		}


		document.getElementById("playButton").addEventListener("click", function() {
			t = new Timer(cycle)
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


	
x(function() {
	loadDefault();
})

})(jQuery);
