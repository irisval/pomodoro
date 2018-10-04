function countdownTimer() {
	let countdownTimer = {
		timerQueue: [],
		addCountdown: function(time) {
			this.timerQueue.push(time);
		},
		runTimer: function() {

		},
		pauseTimer: function() {

		},
		unpauseTimer: function() {
			
		}
	};

	return countdownTimer;
}

function MyObj(i) {
    var privateCounter = "I am the instantiated object " + i + " .";
    this.counter = function() {
        return privateCounter;
    };
}

var MyObjList = [],
    ObjLitList = [];
for (var i = 0; i < 100; i++) {
    MyObjList.push(new MyObj(i));
    ObjLitList.push({counter: "I am the literal object number " + i + "."});
}


let countdownTimer = function() {
	let timer = {

	};

}