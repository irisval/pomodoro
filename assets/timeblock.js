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
timeBlock.prototype.print = function() {
	return this.i + " " + this.duration + " " + this.ttype;
},
timeBlock.prototype.runTimer = function() {
	this.started = true;
		//document.querySelector('#time').textContent = this.getMinutes() + ":" + this.getSeconds();
		console.log("DONT IGNORE THIS LINE " + this.print())
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
