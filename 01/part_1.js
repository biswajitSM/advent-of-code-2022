var path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((num) => parseInt(num, 10));

Array.prototype.max = function(){
	return Math.max.apply(null, this);
}

var listofElvesMaxCalories = []
var tempArr = []
for (let i=0; i<=input.length; i++){
	if(isNaN(input[i])){
		listofElvesMaxCalories.push(tempArr.reduce((a,b) => a+b, 0))
		var tempArr = []
	} else {
		tempArr.push(input[i])
	}
}
var max_calorie = listofElvesMaxCalories.max()
var index = listofElvesMaxCalories.indexOf(max_calorie);
console.log("Elves-%d has maximum calories of %d", index, max_calorie)