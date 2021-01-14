const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');

const app = express();
const port = 3000;

const path = __dirname + '/results.json';

function first10(path) {
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
}

function insertScore(path, player, score) {
  let json = JSON.parse(fs.readFileSync(path, 'utf8'));
  json.push({ player: player, score: score });

  let newJson = JSON.stringify(json);

  fs.writeFile(path, newJson, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

app.use(serveStatic('static', { index: ['index.html', 'default.htm'] }));

app.use(express.json());

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.sendFile('index.html');
});

app.get('/results', (req, res) => {
  res.statusCode = 200;
  /*-отправляем новый массив во фронт-*/
  res.send(first10(path));
});

app.post('/results', (req, res) => {
  insertScore(path, req.body.player, req.body.score);
  res.send('I am ok');
});

app.get('*', (req, res) => {
  res.statusCode = 404;
  /*-отправляем новый массив во фронт-*/
  res.send('<h1>Страница не найдена</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
