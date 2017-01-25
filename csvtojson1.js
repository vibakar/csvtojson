const fs = require('fs');
const rl = require('readline');

let arr = [];
for (var i = 1960; i < 2014; i++) {
    var obj = {
        year: i,
        male: 0,
        female: 0
    };
    arr.push(obj);
}

var rd = rl.createInterface({
    input: fs.createReadStream('csv/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(data) {

    var line = data.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var countries = ["India", "China", "Pakistan", "Thailand", "Singapore", "Philippines", "Israel", "Sri Lanka", "Indonesia", "Iraq"];

    for (var y = 1960; y < 2014; y++) {
        for (var c = 0; c < countries.length; c++) {
          var p = Number(line[4]) - 1960;
            if (line[4] == y && line[3] == "SP.DYN.LE00.MA.IN" && line[0] == countries[c]) {
                arr[p].male += Number(Math.round(line[5]));
            }

            if (line[4] == y && line[3] == "SP.DYN.LE00.FE.IN" && line[0] == countries[c]) {
                arr[p].female += Number(Math.round(line[5]));
            }
        }

    }
});

rd.on('close', function() {
    fs.writeFile('json/conversion1.json', JSON.stringify(arr));
    console.log('Done');
});
