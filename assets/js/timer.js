(function(x) {
	function loadDefault() {

		let x = [];
		x.push(new timeBlock("Single Pomodoro", "00:03"));
		x.push(new timeBlock("Single Pomodoro", "00:02"));
		x.push(new timeBlock("Single Pomodoro", "00:01"));
		x.push(new timeBlock("Single Pomodoro", "00:01"));
		x.push(new timeBlock("Single Pomodoro", "00:01"));
		x.push(new timeBlock("Single Pomodoro", "00:01"));

		let f = new timeBlock("Single Pomodoro", "00:03");

		let d = new timeBlock("Single Pomodoro", "00:04");

		async function gross() {
			for (let i of x) {
				await i.runTimer();
			
			}
		}

		gross();

		const table = document.querySelector("#timer-schedule");
		let tb;
		for (let i = 0; i < 6; i++) {
			if (i % 2 == 0) {
				tb = new timeBlock("Single Pomodoro", "00:04")
				// this.schedule.push(tb);
				tb.displayRow(table);
			} else {
				tb = new timeBlock("Short Break", "0:05");
				// this.schedule.push(tb);
				tb.displayRow(table);
			}
		}
		tb = new timeBlock("Single Pomodoro", "00:00");
		// this.schedule.push(tb);
		tb.displayRow(table);
		tb = new timeBlock("Long Break", "14:00");
		// this.schedule.push(tb);
		tb.displayRow(table);
		let r = table.getElementsByTagName("tr")[1];
		// r.style.backgroundColor = "#FA8072";
	}


	let timeBlock = function(i, ttype, duration) {
		this.i = i;
		this.ttype = ttype;
		this.duration = duration;
		this.startTime =  "--:--";
		this.endTime =  "--:--";
		this.completed = false;
	}
	timeBlock.prototype.getMinutes = function() {
		return parseInt(this.duration.split(":")[0]);
	},
	timeBlock.prototype.getSeconds = function() {
		return parseInt(this.duration.split(":")[1]);
	},
	timeBlock.prototype.complete = function() {
		return !this.endTime == "--:--";
	},

	timeBlock.prototype.runTimer = function() {
		this.started = true;
			//document.querySelector('#time').textContent = this.getMinutes() + ":" + this.getSeconds();
			let duration = (this.getMinutes() * 60) + this.getSeconds();
			let min, sec;
//#b74e91
		return new Promise(function(resolve, reject) {
			let timer = setInterval(function(){
				min = parseInt(duration / 60);
				sec = parseInt(duration % 60);

				min = ("0" + min).slice(-2);
				sec = ("0" + sec).slice(-2);

				document.querySelector('#time').textContent = min + ":" + sec;
				
			
				if (--duration < 0) {
					this.completed = true;
					clearInterval(timer);
					resolve("done");

				}
			}, 1000);
		})
		
	},


	timeBlock.prototype.displayRow = function() {
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
// 					tb = this.createTimeBlock("Single Pomodoro", "00:04");
// 					this.schedule.push(tb);
// 					tb.displayRow(table);
// 				} else {
// 					tb = this.createTimeBlock("Short Break", "0:05");
// 					this.schedule.push(tb);
// 					tb.displayRow(table);
// 				}
// 			}
// 			tb = this.createTimeBlock("Single Pomodoro", "00:00");
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