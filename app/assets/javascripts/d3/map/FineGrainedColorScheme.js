function customFloor(value, floor) {
	value = value < floor ? floor : value;
	return value;
}

function funkyFunc(ratio) {
	var redFloor = 49;
	var greenFloor = 48;
	var blueFloor = 39;
	redNum = customFloor(Math.floor((125*Math.pow((ratio-1.2),2) - 256)*-1-1), redFloor);
	greenNum = customFloor(Math.floor((250*Math.pow((ratio-1.45),2) - 256)*-1-1), greenFloor);
	blueNum = customFloor(Math.floor((188*Math.pow((ratio-1.75),2) - 248)*-1-1), blueFloor);
	return "rgb(" + redNum + ", " + greenNum + ", " + blueNum + ")";
}

console.log("color1", funkyFunc(0.5));
console.log("color2", funkyFunc(0.75));
console.log("color3", funkyFunc(1));
console.log("color4", funkyFunc(1.25));
console.log("color5", funkyFunc(1.5));
console.log("color6", funkyFunc(1.75));
console.log("color7", funkyFunc(2));
console.log("color8", funkyFunc(2.25));
console.log("color9+", funkyFunc(2.5));
console.log("colorA3", funkyFunc(3));
console.log("colorA3.5", funkyFunc(3.5));
console.log("colorA4", funkyFunc(4));

var fineGrainedColorScheme = function(arrayOfStateInfo) {
	var obj = {};
	obj["defaultFill"] = '#AAA';
	_.each(arrayOfStateInfo, function(val, key) {	
		var stateLetters = key;
		var ratio = appToDisappRatio(val);
		obj["color" + stateLetters] = funkyFunc(ratio);
	});
	return obj;
}

// var SampleConstructor = function(stuff) {
// 	var ab = stuff.abbrev
// 	// this.stuff = stuff;
// 	var callLetters = "color" + ab
// 	this["color" + ab] = stuff.abbrev;
// }

// var samp = new SampleConstructor({greeting: 'hi', abbrev: "KY"});
// console.log(samp)