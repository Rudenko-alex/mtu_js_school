'use strict';

function main(variable) {
  const TimeTranslator = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  function matchValue(key) {
    return TimeTranslator[key];
  }

  function checkDischarge(item, index, arr) {
    /* Проверяем есть ли меньший разряд перед крупным для вычитания*/
    let result = item;
    let functionArr = [...arr];

    if (index === 0) {
      return result;
    }
    if (item > functionArr[index - 1]) {
      for (let j = index; j >= 0; j--) {
        if (item > functionArr[j - 1]) {
          result = result - functionArr[j - 1] - functionArr[j - 1];
        } else {
          return result;
        }
      }
    } else {
      return result;
    }
  }
  /*- Переводим в массив чисел-*/
  let newArr = variable.split('').map((el) => matchValue(el));

  /*- вычисляем сумму чисел-*/
  let sum = newArr.reduce(
    (acc, item, index) => acc + checkDischarge(item, index, newArr),
    0
  );

  console.log(variable, sum);
}

main('III');
main('IV');
main('IX');
main('LVIII');
main('MCMXCIV');
