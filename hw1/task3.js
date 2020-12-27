'use strict';

function main(variable) {
  /*проверяем что б число открытых равнялось числу закрытых (сумма = 0) */
  function matchValue(value) {
    switch (value) {
      case '(':
        return 1;
      case ')':
        return -1;
      case '[':
        return 2;
      case ']':
        return -2;
      case '{':
        return 3;
      case '}':
        return -3;
    }
  }
  let sum = 0;
  variable.split('').map((item) => {
    sum = sum + matchValue(item);
  });

  /* проверяем что б все открытые были правильно закрыты*/
  /* Переводим в числовой массив */
  let newArr = [];
  variable.split('').map((item) => {
    newArr.push(matchValue(item));
  });

  function func(z, index) {
    /* если следующее значение больше нуля, то скобка открывается и такое допустимо*/
    if (newArr[index + 1] > 0) {
      return 0;
    } /* если следующее значение меньше нуля, и текущее значение значение равно следующему по модулю => открылась и закрылась скобка*/ else if (
      newArr[index + 1] < 0 &&
      Math.abs(newArr[index + 1]) == z
    ) {
      return 0;
    } /* если две закрывающиеся нужно определить правильность. Суммируем значения в обратном порядке, пока не станет ноль. если Нуля не будет значит закрывающихся больше*/ else {
      let sum = 0;
      for (let j = index; j >= 0; j--) {
        sum = sum + newArr[j];
        if (sum == 0) {
          return 0;
        }
      }
      return 1;
    }
  }
  let boo = 0; /* должна быть ноль, тогда открывающиеся равны закрывающимся*/
  newArr.map((arg, i) => {
    if (newArr.length - 1 != i) {
      boo = boo + func(arg, i);
    }
  });

  sum === 0 && boo == 0
    ? console.log(variable, 'true')
    : console.log(variable, 'false');
}

main('()');
main('()[]{}');
main('(]');
main('([)]');
main('{[]}');
main('(({[]}))');
main('(({[(]})))');
