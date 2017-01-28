let check = function(year) {
    const fs = require('fs');
    const rl = require('readline');
    const logger = require('log4js').getLogger();
    if (!year) {
        throw Error('Not a number');
    }
    if (typeof year !== 'number') {
        throw Error('Not a number');
    }


    let arr = [];
    for (let i = 1960; i < 2014; i = i + 1) {
        let obj = {
            year: i,
            male: 0,
            female: 0
        };
        arr.push(obj);
    }

    let rd = rl.createInterface({
        input: fs.createReadStream('csv/Indicators.csv'),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', function(data) {
        let line = data.trim().split(/,(?=(?:(?:[^']*'){2})*[^']*$)/);
        let countries = ['India', 'China', 'Pakistan', 'Thailand', 'Singapore',
            'Philippines', 'Israel', 'Sri Lanka', 'Indonesia', 'Iraq'
        ];

        for (let y = '1960'; y < '2014'; y = y + 1) {
            for (let c = 0; c < countries.length; c = c + 1) {
                let p = Number(line[4]) - 1960;
                if (line[4] === y && line[3] === 'SP.DYN.LE00.MA.IN' && line[0] === countries[c]) {
                    arr[p].male = arr[p].male + Number(Math.round(line[5]));
                }
                if (line[4] === y && line[3] === 'SP.DYN.LE00.FE.IN' && line[0] ===
                    countries[c]) {
                    arr[p].female = arr[p].female + Number(Math.round(line[5]));
                }
            }
        }
    });

    rd.on('close', function() {
        fs.writeFile('json/conversion1.json', JSON.stringify(arr));
        logger.debug('Done');
    });

    return 'JSON written successfully';
};
module.exports = check;
