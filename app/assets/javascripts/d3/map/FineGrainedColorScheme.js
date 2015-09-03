var levels = [0.5,0.75,1,1.25,1.5,1.75,2,2.25, 2.5];
var COLORSFORLEGEND = levels.map(function(level){
	return colorModelFunc(level);
});
COLORSFORLEGEND.push("#AAA");

function customFloor(value, floor) {
	value = value < floor ? floor : value;
	return value;
}

function colorModelFunc(ratio) {
	if (ratio > 2.5) {return "rgb(49,54,149)";}

	var redFloor = 49;
	var greenFloor = 48;
	var blueFloor = 39;
	redNum = customFloor(Math.floor(193.4 + -92.4*Math.pow(ratio,1) + 422.6*Math.pow(ratio,2) + -335.2*Math.pow(ratio,3) + 68.69*Math.pow(ratio,4)), redFloor);
	greenNum = customFloor(Math.floor(53.7 + -347*Math.pow(ratio,1) + 913.5*Math.pow(ratio,2) + -535*Math.pow(ratio,3) + 90.1*Math.pow(ratio,4)), greenFloor);
	blueNum = customFloor(Math.floor(863.3 -3815.3*Math.pow(ratio,1) + 6280*Math.pow(ratio,2) + -4599.3*Math.pow(ratio,3) + 1597.6*Math.pow(ratio,4) + -214.6*Math.pow(ratio,5)), blueFloor);
	return "rgb(" + redNum + ", " + greenNum + ", " + blueNum + ")";
}

var fineGrainedColorScheme = function(arrayOfStateInfo) {
	var obj = {};
	obj["defaultFill"] = '#AAA';
	_.each(arrayOfStateInfo, function(val, key) {	
		var stateLetters = key;
		var ratio = appToDisappRatio(val);
		obj["color" + stateLetters] = colorModelFunc(ratio);
	});
	return obj;
}