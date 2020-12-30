'use strict';

function main(variable) {
  /*проверяем что б число открытых равнялось числу закрытых (сумма = 0) */
  const BracketTranslator = {
    '(': 1,
    ')': -1,
    '[': 2,
    ']': -2,
    '{': 3,
    '}': -3,
  };
  function matchValue(key) {
    return BracketTranslator[key];
  }

  let sum = variable.split('').reduce((acc, item) => acc + matchValue(item), 0);

  /* проверяем что б все открытые были правильно закрыты*/
  function definesSequencesOfBrackets(item, index, arr) {
    let funcArr = [...arr];
    /* если следующее значение больше нуля, то скобка открывается и такое допустимо*/
    if (funcArr[index + 1] > 0) {
      return 0;
    } /* если следующее значение меньше нуля, и текущее значение значение равно следующему по модулю => открылась и закрылась скобка*/ else if (
      funcArr[index + 1] < 0 &&
      Math.abs(funcArr[index + 1]) === item
    ) {
      return 0;
    } /* если две закрывающиеся нужно определить правильность. Суммируем значения в обратном порядке, пока не станет ноль. если Нуля не будет значит закрывающихся больше*/ else {
      let sum = 0;
      for (let j = index; j >= 0; j--) {
        sum = sum + funcArr[j];
        if (sum === 0) {
          return 0;
        }
      }
      return 1;
    }
  }
  /* Переводим в числовой массив */
  let newArr = variable.split('').map((item) => matchValue(item));
  /* должна быть ноль, тогда открывающиеся равны закрывающимся*/
  let boo = newArr.reduce(
    (acc, arg, index) => acc + definesSequencesOfBrackets(arg, index, newArr),
    0
  );

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
