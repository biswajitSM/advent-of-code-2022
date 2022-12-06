var path = require('path');
const fs = require('fs');

function readfile(input){
   return fs.readFileSync(path.join(__dirname, input), 'utf8')
            .toString()
            .trim()
            .split('\n').join('');
}

function startOfPocketMarker(inputFile = 'input', num_char = 4){
   const input = readfile(inputFile)
   var existing_char = [input[0]];
   let n=0;
   let continue_loop = true;
   while (continue_loop){
      n++;
      if (existing_char.includes(input[n])){
         var idx = existing_char.indexOf(input[n])
         // console.log(existing_char)
         existing_char = existing_char.slice(idx+1, existing_char.length)
         existing_char = existing_char.concat(input[n]);
   
      } else {
         existing_char = existing_char.concat(input[n]);
         if (existing_char.length==num_char){
            // console.log("first marker after character:%d", n+1);
            // console.log("first marker character:%s", input[n]);
            continue_loop = false;
         }
      }
   }
   existing_char = existing_char.slice(0, 4)
   return n+1
}

console.log("(demo)starting marker for 4-character pocket is: %d", startOfPocketMarker('demo_input', 4))
console.log("starting marker for 4-character pocket is: %d", startOfPocketMarker('input', 4))
console.log("starting marker for 4-character pocket is: %d", startOfPocketMarker('input', 14))