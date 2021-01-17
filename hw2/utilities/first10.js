const fs = require('fs');

const first10 = function (path) {
  /*-получаем результат-*/
  let json = JSON.parse(fs.readFileSync(path, 'utf8'));
  /*-сортируем-*/
  json.sort(function (a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  });
  /*-оставляем первые 10-*/
  return json.slice(0, 10);
};

module.exports = first10;
