const fs = require('fs');
const rl = require('readline');


let arr=[];
for(var i=1960;i<2016;i++){
  var o={year:i, birth_rate:0, death_rate:0};
  arr.push(o);
}

var rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

var carr=[];
rd.on('line', function(data) {

    var line = data.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (y = 1960; y < 2016; y++) {
        var p=line[4]-1960;
        if (line[0] == "India" && line[3] == "SP.DYN.CBRT.IN" && line[4] == y) {
            arr[p].birth_rate += Number(Math.round(line[5]));
        }
        if (line[0] == "India" && line[3] == "SP.DYN.CDRT.IN" && line[4] == y) {
            arr[p].death_rate += Number(Math.round(line[5]));
        }
    }

});

rd.on('close', function() {
    fs.writeFile('../outputdata/birth_death_rate.json', JSON.stringify(arr));
    console.log('Done');
});
