'use strict';

function indexArr(arr, number) {
  let proba;
  /* если число включено в массив*/
  if (arr.includes(number)) {
    for (let item in arr) {
      if (arr[item] == number) {
        console.log(item);
      }
    }
  } else {
    /* если меньше первого элемента*/
    if (number < arr[0]) {
      console.log(0);
    } /* если больше последнего элемента*/ else if (
      number > arr[arr.length - 1]
    ) {
      console.log(arr.length);
    } /* если в промежутке между элементами*/ else {
      for (let i = 0; i < arr.length; ++i) {
        if (arr[i] >= number) {
          proba = i;
          if (proba) {
            break;
          }
        }
      }
      console.log(proba);
    }
  }
}

indexArr([1, 3, 5, 6], 5);
indexArr([1, 3, 5, 6], 2);
indexArr([1, 3, 5, 6], 7);
indexArr([1, 3, 5, 6], 0);
indexArr([1], 0);
