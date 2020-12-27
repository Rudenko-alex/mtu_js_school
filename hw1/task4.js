'use strict';

let arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19, 22, 12, 5];
let arr2 = [2, 1, 4, 3, 9, 6];

function sortArr(arr1, arr2) {
  let newArr = [];
  let newArr1 = [];
  /* отбираем по второму массиву */
  for (let item of arr2) {
    for (let item2 of arr1) {
      if (item2 == item) {
        newArr.push(item2);
      }
    }
  }
  /* находим те которых нет во втором массиве*/
  for (let item of arr1) {
    if (!arr2.includes(item)) {
      newArr1.push(item);
    }
  }
  /* сортируем вторую часть */
  newArr1.sort(function (a, b) {
    return a - b;
  });

  console.log('отсортированный массив', newArr.concat(newArr1));
}

sortArr(arr1, arr2);
