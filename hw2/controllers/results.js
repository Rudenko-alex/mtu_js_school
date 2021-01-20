const Results = require('../models/Results');
const mongoose = require('mongoose');

exports.addResult = (req, res, next) => {
  console.log('!!!!!!!!!!add result!!!!!!!!!!!!!');
  console.log('!!!!!!!!!!req.body.player!!!!!!!!!!!!!', req.body.player);
  console.log('!!!!!!!!!!req.body.score!!!!!!!!!!!!!', req.body.score);
  console.log('!!!!!!!!!!Results!!!!!!!!!!!!!', Results);

  const newResult = {
    name: 'tet',
    points: 133,
  };

  console.log('!!!!!!!!!!newResult!!!!!!!!!!!!!', newResult);
  newResult.save().then((res) => {
    console.log('res', res);
  });
};
