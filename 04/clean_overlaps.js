var path = require('path');
const fs = require('fs');

var input = fs
    .readFileSync(path.join(__dirname, 'input'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

Array.prototype.containsAll = function(array2){
    return this.every(element => {
        return array2.includes(element);
    })
}



var num_pairs_includes_all = 0
var num_pairs_any_overlap = 0

for (let i = 0; i < input.length; i++) {
    var section = input[i].split(',');
    var elv_1 = section[0].split('-').map(Number);
    var elv_2 = section[1].split('-').map(Number);
    var elv_1_list = range(elv_1[0], elv_1[1]);
    var elv_2_list = range(elv_2[0], elv_2[1]);
    var elv1_in_elv2 = elv_1_list.containsAll(elv_2_list);
    var elv2_in_elv1 = elv_2_list.containsAll(elv_1_list);
    if (elv1_in_elv2 || elv2_in_elv1){
        num_pairs_includes_all += 1;
    }
    var overlapping_sections = elv_1_list.filter(value => elv_2_list.includes(value));
    if (overlapping_sections.length > 0){
        num_pairs_any_overlap += 1;
    }

}

console.log("%d assignment pairs where one fully contains the other \n", num_pairs_includes_all);
console.log("%d assignment pairs with atleast one overlap \n", num_pairs_any_overlap);