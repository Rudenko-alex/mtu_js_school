const fs = require('fs');

const insertScore = function (path, player, score) {
  let json = JSON.parse(fs.readFileSync(path, 'utf8'));
  json.push({ player: player, score: score });

  let newJson = JSON.stringify(json);

  fs.writeFile(path, newJson, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

module.exports = insertScore;
