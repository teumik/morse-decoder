const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function code(expr) {
    let arr = expr.split('');
    let result = [];

    arr.forEach(el => {
        let bin = []

        for (let item in MORSE_TABLE) {
            if (el === MORSE_TABLE[item]) {
                (item.split('')).forEach(i => {
                    i === '.' ? bin.push(10) : bin.push(11);
                    return;
                })
                break;
            } else if (el === ' ') {
                bin.push('**********');
                break;
            }
        }

        result.push(bin.join('').padStart(10, '0'));
    });

    return result.join('');
}

function decode(expr) {
    const length = expr.length;
    const n = 10;
    const seg = length / n;
    let arr = [];
    let morse = '';
    let filter = []

    let obj = {
        // '.': 10,
        // '-': 11,

        10: '.',
        11: '-',
    }

    for (let i = 0; i < seg; i++) {
        arr.push(expr.slice(i * n, (i + 1) * n));
    }

    arr.forEach(el => {
        let temp = [];

        for (let i = 0; i < el.length / 2; i++) {
            let a = el.slice(i * 2, (i + 1) * 2);

            temp.push(obj[a])

            // for (let key in obj) {
            //     if (a === obj[key].toString()) {
            //         temp.push(key.toString());
            //         break;
            //     }
            // }
        }
        filter.push(temp.filter(item => item !== '00').join(''));
    })

    filter.forEach(el => {
        if (el === '') {
            morse += ' ';
        } else {
            morse += MORSE_TABLE[el];
        }

        // for (let key in MORSE_TABLE) {
        //     if (el === key) {
        //         morse += MORSE_TABLE[key];
        //         break;
        //     } else if (el === '') {
        //         morse += ' ';
        //         break;
        //     }
        // }
    })

    return morse;
}

module.exports = {
    decode
}