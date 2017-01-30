const fs = require('fs');
const rl = require('readline');

//creating empty array of objects
let arr = [];
for (let i = 1960; i < 2014; i = i + 1) {
    let obj = {
        year: i,
        maleLifeExpectancy: 0,
        femaleLifeExpectancy: 0
    };
    arr.push(obj);
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
    let countries = ['India', 'China', 'Pakistan', 'Thailand', 'Singapore', 'Philippines',
        'Israel', 'Sri Lanka', 'Indonesia', 'Iraq'
    ];

    for (let y = 1960; y < 2014; y = y + 1) {
        for (let c = 0; c < countries.length; c = c + 1) {
            let p = Number(line[4]) - 1960;
            if (line[4] == y && line[3] === 'SP.DYN.LE00.MA.IN' && line[0] === countries[c]) {
                arr[p].maleLifeExpectancy = arr[p].maleLifeExpectancy + Number(Math.round(line[5]));
            }
            if (line[4] == y && line[3] === 'SP.DYN.LE00.FE.IN' && line[0] === countries[c]) {
                arr[p].femaleLifeExpectancy = arr[p].femaleLifeExpectancy +
                 Number(Math.round(line[5]));
            }
        }
    }
});

//writing generated json to new file
rd.on('close', function() {
    fs.writeFile('../outputdata/male_female_life_expectancy.json', JSON.stringify(arr));
});
