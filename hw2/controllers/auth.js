const bcrypt = require('bcryptjs');
const path = require('path');

const User = require('../models/User.js');

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ login: req.body.login });

  if (candidate) {
    res.status(409);
    res.send('Такой login уже занят, попробуйте другой');
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      login: req.body.login,
      name: req.body.name,
      password: bcrypt.hashSync(password, salt),
      ip: req.ip,
    });
    try {
      await user.save();
      res.cookie('isAuth', 'yes', { maxAge: 15 * 60 * 1000, httpOnly: true });
      res.cookie('nameUser', req.body.login);
      res.redirect('/');
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ login: req.body.login });

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const user = new User({
    login: req.body.login,
    password: bcrypt.hashSync(password, salt),
  });
  console.log(
    'candidate.password = ',
    candidate.password,
    'user.password = ',
    user.password
  );
  if (
    candidate &&
    candidate.login === user.login &&
    candidate.password === user.password
  ) {
    res.cookie('isAuth', 'yes', { maxAge: 15 * 60 * 1000, httpOnly: true });
    res.cookie('nameUser', req.body.login);
    res.redirect('/');
  } else {
    res.status(401);
    res.send('Не правильно ввели логи или пароль');
  }
};
