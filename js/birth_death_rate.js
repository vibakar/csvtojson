const fs = require('fs');
const rl = require('readline');

//creating empty array of objects

let arr = [];
for (let i = 1960; i < 2016; i = i + 1) {
    let o = {
        year: i,
        birthRate: 0,
        deathRate: 0
    };
    arr.push(o);
}

//setting the input file path

let rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

//reading each line from csv file

rd.on('line', function(data) {
//splitting each line to get each column value
    let line = data.trim().split(/,(?=(?:(?:[^']*'){2})*[^']*$)/);
    for (let y = 1960; y < 2014; y = y + 1) {
        let p = line[4] - 1960;
        if (line[0] === 'India' && line[3] === 'SP.DYN.CBRT.IN' && line[4] == y) {
            arr[p].birthRate = arr[p].birthRate + Number(Math.round(line[5]));
        }
        if (line[0] === 'India' && line[3] === 'SP.DYN.CDRT.IN' && line[4] == y) {
            arr[p].deathRate = arr[p].deathRate + Number(Math.round(line[5]));
        }
    }
});

//writing generated json to new file

rd.on('close', function() {
    fs.writeFile('../outputdata/birth_death_rate.json', JSON.stringify(arr));
});
