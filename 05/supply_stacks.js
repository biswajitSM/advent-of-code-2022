var path = require('path');
const fs = require('fs');

var input = fs
	.readFileSync(path.join(__dirname, 'input'), 'utf8')
	.toString()
	// .trim()
    .split('\n');

var stacks = [];
var num_cols = 0;
var num_cols_vals = [];
var move_steps = [];
var index_splitter = [];
for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split('\r').join('')
    if (input[i].length == 0){
        console.log("index splitter: ", i);
        index_splitter.push(i)
    }
}
index_splitter = index_splitter[0];
stacks = input.slice(0, index_splitter-1);
num_cols = input[index_splitter-1].split('');
num_cols_vals = input[index_splitter-1].split(/([0-9]+)/).map((num) => parseInt(num, 10))
num_cols_vals = removeNaN(num_cols_vals)
move_steps = input.slice(index_splitter+1, input.length)

console.log("columns values: ", num_cols_vals)

String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
 }

function removeNaN(arr) {
    return arr.filter(item => !isNaN(item));
  }

function isNumber(value) {
return typeof value === 'number';
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

function createEmptyArray(size) {
return Array.from({length: size}, () => undefined);
}

for (let i=0; i<stacks.length; i++){
    stacks[i] = stacks[i].split('')
    console.log(stacks[i].length)
}
var stack_to_col = []
for (let i=0; i<num_cols_vals.length; i++){
    stack_to_col.push([])
}
var stack_to_col_i = 0
for (let i=0; i<num_cols.length; i++){
    if (!isNaN(parseInt(num_cols[i]))){
        for (let j=0; j<stacks.length; j++){
            stack_to_col[stack_to_col_i].push(stacks[j][i])
            // console.log("a number: ", stacks[j][i])
        }
        stack_to_col[stack_to_col_i] = stack_to_col[stack_to_col_i].filter(item => item) // remove undefined
        stack_to_col[stack_to_col_i] = stack_to_col[stack_to_col_i].filter(l => l.match(/[a-z|0-9]/i)) // keep only letters and number
        stack_to_col_i += 1
    }
}
console.log(stack_to_col)

for (let i = 0; i < move_steps.length; i++) {
    move_steps[i] = move_steps[i].split(/([0-9]+)/).map((num) => parseInt(num, 10))
    move_steps[i] = removeNaN(move_steps[i])
}

var _reverse = true;
function move_crates(stack_to_col, _reverse=true){
    var moved_stack = stack_to_col.slice();
    for (let i = 0; i < move_steps.length; i++) {
        moves = move_steps[i]
        moves[1] -= 1 //converted to indexes
        moves[2] -= 1
        if (!isNaN(moves[0])){
            if (_reverse){
                console.log(moves[1], moved_stack[moves[1]])
                moving_elements = moved_stack[moves[1]].slice(0, moves[0]).reverse()
            } else {
                moving_elements = moved_stack[moves[1]].slice(0, moves[0])
            }
            // console.log(stack_to_col[moves[2]])
            moved_stack[moves[2]] = moving_elements.concat(moved_stack[moves[2]])
            len = moved_stack[moves[1]].length
            if (len-moves[0] > 0){
                moved_stack[moves[1]] = moved_stack[moves[1]].slice(moves[0]-len)
            } else {
                moved_stack[moves[1]] = []
            }    
        }
      }
    var top_crates = []
    for (let i=0; i<moved_stack.length; i++){
        top_crates.push(moved_stack[i][0])
    }
return top_crates.join('')
}

console.log("........")
// console.log(moved_stack)
console.log("last elements of the moved crates in REVERSE order  (part-2): ", move_crates(stack_to_col, false))
console.log("last elements of the moved crates (part-1): ", move_crates(stack_to_col,true))
