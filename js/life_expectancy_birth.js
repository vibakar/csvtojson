const fs = require('fs');
const rl = require('readline');

var rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

var arr = [];
var countries = ["India", "China", "Pakistan", "Thailand", "Singapore"];
for (c = 0; c < countries.length; c++) {
    var obj = {
        countries: countries[c],
        highest_life_expectancy: 0
    };
    arr.push(obj);
}

rd.on('line', function(data) {
    var line = data.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (y = 1960; y < 2016; y++) {
        for (j = 0; j < countries.length; j++) {

            if (line[0] == countries[j] && line[3] == "SP.DYN.LE00.IN" && line[4] == y) {

                arr[j].highest_life_expectancy += Number(Math.round(line[5]));
            }
        }
    }
});

rd.on('close', function() {
    fs.writeFile('../outputdata/life_expectancy_birth.json', JSON.stringify(arr));
    console.log('Done');
});
