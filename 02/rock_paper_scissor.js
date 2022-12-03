
var path = require('path');
const fs = require('fs');

var input = fs
	.readFileSync(path.join(__dirname, 'input'), 'utf8')
	.toString()
	.trim()
    .replaceAll("A", "rock")
    .replaceAll("B", "paper")
    .replaceAll("C", "scissor")
    .replaceAll("X", "rock")
    .replaceAll("Y", "paper")
    .replaceAll("Z", "scissor")
	.split('\n');

var input_as = input

var score = 0
for (let i=0; i<input.length; i++){
    var temp_str = input[i].split(' ');
    if (temp_str[1]=='rock'){
        score += 1;
    } else if (temp_str[1]=='paper'){
        score += 2;
    } else if (temp_str[1]=='scissor'){
        score += 3
    }
    var draw = temp_str[0]==temp_str[1]
    var win_1 = temp_str[1]=='rock' & temp_str[0]=='scissor'
    var win_2 = temp_str[1]=='scissor' & temp_str[0]=='paper'
    var win_3 = temp_str[1]=='paper' & temp_str[0]=='rock'
    if (draw){
        score += 3;
    } else if (win_1 || win_2 || win_3){
        score += 6;
    }

}

console.log("My total score is %d", score)
