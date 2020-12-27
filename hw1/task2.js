'use strict';

function reversed(number) {
  number == String(number).split('').reverse().join('')
    ? console.log(`${number} - true`)
    : console.log(`${number} - false`);
}

reversed(121);
reversed(-121);
reversed(10);
reversed(-101);
