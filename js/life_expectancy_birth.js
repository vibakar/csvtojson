const fs = require('fs');
const rl = require('readline');

//setting the input file path

let rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

let arr = [];
let countries = ['India', 'China', 'Pakistan', 'Thailand', 'Singapore'];
for (let c = 0; c < countries.length; c = c + 1) {
    let obj = {
        countries: countries[c],
        highestLifeExpectancy: 0
    };
    arr.push(obj);
}

//reading each line from csv file

rd.on('line', function(data) {
//splitting each line to get each column value
    let line = data.trim().split(/,(?=(?:(?:[^']*'){2})*[^']*$)/);
    for (let y = 1960; y < 2016; y = y + 1) {
        for (let j = 0; j < countries.length; j = j + 1) {
            if (line[0] === countries[j] && line[3] === 'SP.DYN.LE00.IN' && line[4] == y) {
                arr[j].highestLifeExpectancy = arr[j].highestLifeExpectancy +
                 Number(Math.round(line[5]));
            }
        }
    }
});

//writing generated json to new file

rd.on('close', function() {
    fs.writeFile('../outputdata/life_expectancy_birth.json', JSON.stringify(arr));
});
