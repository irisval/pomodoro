(function(x) {
	// timer object
	// function Timer(schedule) {
	// 	this.schedule = schedule;
	// 	this.curr = 0;
	// 	this.second = 0;

	// 	this.loadTable = function() {
	// 		let startMin = ("0" + this.schedule[0].getMinutes()).slice(-2);
	// 		let startSec = ("0" + this.schedule[0].getSeconds()).slice(-2);
	// 		document.querySelector('#time').textContent = startMin + ":" + startSec;

	// 		const table = document.querySelector("#timer-schedule");
	// 		let tb;
	// 		for (let i = 0; i < this.schedule.length; i++) {	
	// 			this.schedule[i].displayRow(table);
	// 				// this.schedule.push(tb);
	// 		}
	// 	};

	// 	this.start = async function() {
	// 		for (let i of this.schedule) {
	// 			await i.runTimer();
	// 		}
	// 	};
	// 	this.runTimer = function() {
	// 		console.log(this.second);
	// 		t = setInterval(function() {
	// 			this.second += 1;
	// 			console.log(this.second);
	// 		}, 1000);
	// 	}
	// }
	// BAH
	// function makeTimer(schedule) {
	// 	let timer = {
	// 		schedule: schedule,
	// 		curr: 0,
	// 		second: 0,
	// 		loadTable: function() {
	// 			let startMin = ("0" + this.schedule[0].getMinutes()).slice(-2);
	// 			let startSec = ("0" + this.schedule[0].getSeconds()).slice(-2);
	// 			document.querySelector('#time').textContent = startMin + ":" + startSec;

	// 			const table = document.querySelector("#timer-schedule");
	// 			let tb;
	// 			for (let i = 0; i < this.schedule.length; i++) {	
	// 				this.schedule[i].displayRow(table);
	// 					// this.schedule.push(tb);
	// 			}
	// 		},
	// 		start: async function() {
	// 			for (let i of this.schedule) {
	// 				await i.runTimer();
	// 			}
	// 		},
	// 		runTimer: function() {
	// 			console.log(this.second);
	// 			t = setInterval(function() {
	// 				console.log(this.second);
	// 			}, 1000);
	// 		}
	// 	}
	// 	return timer;
	// }
	// BAH
	let Timer = function(sched) {
		this.schedule = sched;
		this.curr = 0;
		this.second = 0;
		this.id = this.init();
	}

	Timer.prototype.init = function() {
		this.loadTable();
		id = setInterval(this.runTimer.bind(this), 1000);
		return id;
	}
	Timer.prototype.loadTable = function() {
		// let startMin = ("0" + this.schedule[0].getMinutes()).slice(-2);
		// 	let startSec = ("0" + this.schedule[0].getSeconds()).slice(-2);
		let startMin = this.schedule[0].initialMinuteAmt;
		let startSec = this.schedule[0].initialSecondAmt;

			document.querySelector('#time').textContent = startMin + ":" + startSec;

			const table = document.querySelector("#timer-schedule");
			let tb;
			for (let i = 0; i < this.schedule.length; i++) {	
				this.schedule[i].displayRow(table);
					// this.schedule.push(tb);
			}
	},
	Timer.prototype.start = async function() {
		for (let i of this.schedule) {
			await i.runTimer();
		}
	},
	Timer.prototype.runTimer = function() {
		let tb = this.schedule[this.curr];
		let dur = tb.duration;
		let min = parseInt(dur / 60);
		let sec = parseInt(dur % 60);
		min = ("0" + min).slice(-2);
		sec = ("0" + sec).slice(-2);
		document.querySelector('#time').textContent = min + ":" + sec;
		tb.updateDuration("-", 1);

		if (tb.duration < 0) {
			this.curr++;
		}

		this.second++;

	},
	Timer.prototype.runPomodoros = function() {

	}


	// timeblock object
	let TimeBlock = function(i, ttype, timeAmt) {
		this.i = i;
		this.ttype = ttype;
		this.timeAmt = timeAmt;
		this.initialMinuteAmt = parseInt(this.timeAmt.split(":")[0]);
		this.initialSecondAmt = parseInt(this.timeAmt.split(":")[1]);
		this.duration = (this.initialMinuteAmt * 60) + this.initialSecondAmt;
		this.startTime =  "--:--";
		this.endTime =  "--:--";
		this.completed = false;
	}
	
	TimeBlock.prototype.complete = function() {
		return !this.endTime == "--:--";
	},
	TimeBlock.prototype.updateDuration = function(op, amt) {
		this.duration = eval(this.duration + op + amt);
		console.log(this.duration);
	},
	TimeBlock.prototype.print = function() {
		return this.i + " " + this.timeAmt + " " + this.ttype;
	},
	// TimeBlock.prototype.runTimer = function() {
	// 	this.started = true;
	// 		//document.querySelector('#time').textContent = this.getMinutes() + ":" + this.getSeconds();
	// 		console.log("DONT IGNORE THIS LINE " + this.print())
	// 		let duration = this.duration;
	// 		//let duration = (this.getMinutes() * 60) + this.getSeconds();
	// 		let min, sec;
	// //#b74e91
	// 	return new Promise(function(resolve, reject) {
	// 		let timer = setInterval(function(){
	// 			min = parseInt(duration / 60);
	// 			sec = parseInt(duration % 60);

	// 			min = ("0" + min).slice(-2);
	// 			sec = ("0" + sec).slice(-2);

	// 			document.querySelector('#time').textContent = min + ":" + sec;
				
			
	// 			if (--duration < 0) {
	// 				this.completed = true;
	// 				clearInterval(timer);
	// 				resolve("done");

	// 			}
	// 		}, 1000);
	// 	})
		
	// },


	TimeBlock.prototype.displayRow = function() {
		let table = document.querySelector("#timer-schedule");

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

		let defaultCycle = [];
		defaultCycle.push(new TimeBlock(0, "pomodoro", "00:04"));
		defaultCycle.push(new TimeBlock(1, "short-break", "00:02"));
		defaultCycle.push(new TimeBlock(2, "pomodoro", "00:04"));
		defaultCycle.push(new TimeBlock(3, "short-break", "00:02"));
		defaultCycle.push(new TimeBlock(4, "pomodoro", "00:04"));
		defaultCycle.push(new TimeBlock(5, "short-break", "00:02"));
		defaultCycle.push(new TimeBlock(6, "pomodoro", "00:04"));
		defaultCycle.push(new TimeBlock(7, "short-break", "00:02"));

		t = new Timer(defaultCycle)
		t.runTimer();



		document.getElementById("play").addEventListener("click", function() {
			//t.start();
		});	
	}


	
x(function() {
	loadDefault();
})

})(jQuery);



// =-------=

// let timeBlock = createTimeBlock: function(type, duration) {
// 			let timeBlock = {
// 				type: type,
// 				duration: duration,
// 				startTime: "--:--",
// 				endTime: "--:--",
// 				complete: false,
// 				getMinutes: function() {
// 					return parseInt(duration.split(":")[0]);
// 				},
// 				getSeconds: function() {
// 					return parseInt(duration.split(":")[1]);
// 				},
// 				complete: function() {
// 					return !this.endTime == "--:--";
// 				},
// 				displayRow: function(table) {
// 					let row = document.createElement("tr");
// 					let tbody = document.createElement("tbody");

// 					let tdType = document.createElement("td");
// 					let textType = document.createTextNode(this.type);
// 					tdType.appendChild(textType)
// 					row.appendChild(tdType)

// 					let tdDuration = document.createElement("td");
// 					let textDuration = document.createTextNode(this.duration);
// 					tdDuration.appendChild(textDuration)
// 					row.appendChild(tdDuration)

// 					let tdStartT = document.createElement("td");
// 					let textStartT = document.createTextNode(this.startTime);
// 					tdStartT.appendChild(textStartT)
// 					row.appendChild(tdStartT)

// 					let tdEndT = document.createElement("td");
// 					let textEndT = document.createTextNode(this.endTime);
// 					tdEndT.appendChild(textEndT)
// 					row.appendChild(tdEndT)

// 					tbody.appendChild(row);
// 					table.appendChild(tbody);
// 				}
// 			}
// 			return timeBlock;
// 		},





// (function(x) {
// 	timerObj = {
// 		schedule: [],
// 		count: 1,
		
// 		nextCycle: function() {
// 			let t;
// 			t = this.count - 1;
// 			if (t < this.schedule.length) {
// 				console.log(t);
// 				timer.start({countdown: true, startValues: { seconds: this.schedule[t].getSeconds()}});
// 				$('#countdownExample .values').html(timer.getTimeValues().toString());

// 				timer.addEventListener('secondsUpdated', function (e) {
// 				    $('#countdownExample .values').html(timer.getTimeValues().toString());
// 				});

// 				timer.addEventListener('targetAchieved', function (e) {
// 					console.log("ended." + t);
// 				});
// 			}

// 		},
// 		updateTb: function() {
// 			const table = document.querySelector("#timer-schedule");
// 			let r = table.getElementsByTagName("tr")[this.count+1];
// 			r.style.backgroundColor = "#FA8072";
		
// 			return r;
// 		},	
// 		createTimeBlock: function(type, duration) {
// 			let timeBlock = {
// 				type: type,
// 				duration: duration,
// 				startTime: "--:--",
// 				endTime: "--:--",
// 				complete: false,
// 				getMinutes: function() {
// 					return parseInt(duration.split(":")[0]);
// 				},
// 				getSeconds: function() {
// 					return parseInt(duration.split(":")[1]);
// 				},
// 				complete: function() {
// 					return !this.endTime == "--:--";
// 				},
// 				displayRow: function(table) {
// 					let row = document.createElement("tr");
// 					let tbody = document.createElement("tbody");

// 					let tdType = document.createElement("td");
// 					let textType = document.createTextNode(this.type);
// 					tdType.appendChild(textType)
// 					row.appendChild(tdType)

// 					let tdDuration = document.createElement("td");
// 					let textDuration = document.createTextNode(this.duration);
// 					tdDuration.appendChild(textDuration)
// 					row.appendChild(tdDuration)

// 					let tdStartT = document.createElement("td");
// 					let textStartT = document.createTextNode(this.startTime);
// 					tdStartT.appendChild(textStartT)
// 					row.appendChild(tdStartT)

// 					let tdEndT = document.createElement("td");
// 					let textEndT = document.createTextNode(this.endTime);
// 					tdEndT.appendChild(textEndT)
// 					row.appendChild(tdEndT)

// 					tbody.appendChild(row);
// 					table.appendChild(tbody);
// 				}
// 			}
// 			return timeBlock;
// 		},
// 		loadDefault: function() {
// 			const table = document.querySelector("#timer-schedule");
// 			let tb;
// 			for (let i = 0; i < 6; i++) {
// 				if (i % 2 == 0) {
// 					tb = this.createTimeBlock("Single cap", "00:04");
// 					this.schedule.push(tb);
// 					tb.displayRow(table);
// 				} else {
// 					tb = this.createTimeBlock("Short Break", "0:05");
// 					this.schedule.push(tb);
// 					tb.displayRow(table);
// 				}
// 			}
// 			tb = this.createTimeBlock("Single cap", "00:00");
// 			this.schedule.push(tb);
// 			tb.displayRow(table);
// 			tb = this.createTimeBlock("Long Break", "14:00");
// 			this.schedule.push(tb);
// 			tb.displayRow(table);
// 			let r = table.getElementsByTagName("tr")[1];
// 			r.style.backgroundColor = "#FA8072";
// 		}
// 	};

// 	function getCurrentTime() {
// 		const d = new Date();
// 		let hours = d.getHours() > 12 ? date.getHours() - 12 : d.getHours();
// 		hours = hours < 10 ? "0" + hours : hours;
// 		let midday = d.getHours() < 12 ? "AM" : "PM";
// 		let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		
// 		return hours + ":" + minutes + " " + midday;
// 	}

// 	function runTimer(s) {
// 		let t = new ti();
// 		t.start({countdown: true, startValues: { seconds: s}});
// 		$('#countdownExample .values').html(t.getTimeValues().toString());

// 		t.addEventListener('secondsUpdated', function (e) {
// 		    $('#countdownExample .values').html(t.getTimeValues().toString());
// 		});

// 		t.addEventListener('targetAchieved', function (e) {
// 			console.log("ended.");
// 			this.schedule[this.count-1].complete = true;
// 			this.count++;
// 		});
// 	}

// 	x(function() {
	

// 		timerObj.loadDefault();
// 		timerObj.schedule.forEach(function(e, i) {
// 			if 
// 			runTimer(2);
// 		});
		
// 		// timerObj.nextCycle();
// 		// timerObj.count = timerObj.count+1;
// 		// timerObj.nextCycle();
// 		// timerObj.count = timerObj.count+1;
// 	})
// })(jQuery);