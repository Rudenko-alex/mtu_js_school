'use strict';

function main(variable) {
  function matchValue(value) {
    switch (value) {
      case 'I':
        return 1;
      case 'V':
        return 5;
      case 'X':
        return 10;
      case 'L':
        return 50;
      case 'C':
        return 100;
      case 'D':
        return 500;
      case 'M':
        return 1000;
    }
  }

  function func(z, index) {
    /* Проверяем есть ли меньший разряд перед крупным для вычитания*/
    if (index == 0) {
      return z;
    }
    if (z > newArr[index - 1]) {
      for (let j = index; j >= 0; j--) {
        if (z > newArr[j - 1]) {
          z = z - newArr[j - 1] - newArr[j - 1];
        } else {
          return z;
        }
      }
    } else {
      return z;
    }
  }
  /*- Переводим в массив чисел-*/
  let newArr = [];
  variable.split('').map((item) => {
    newArr.push(matchValue(item));
  });

  /*- вычисляем-*/
  let sum = 0;
  newArr.map((item, index) => {
    sum = sum + func(item, index);
  });
  console.log(variable, sum);
}

main('III');
main('IV');
main('IX');
main('LVIII');
main('MCMXCIV');
