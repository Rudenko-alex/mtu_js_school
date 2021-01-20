const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var serveStatic = require('serve-static');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const first10 = require('./utilities/first10.js');
const insertScore = require('./utilities/insertScore.js');
const user = require('./utilities/users');

const app = express();
const port = 3000;

const pathRes = __dirname + '/results.json';

/*-------вытягиваем роутер--------------------------*/

const auth = require('./routes/auth');

/*--------------------------------------------------*/

app.use(serveStatic(path.join(__dirname, 'static'), { index: false }));
app.use(cookieParser());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function isUserAuth(req) {
  return req.cookies.isAuth === 'yes';
}

app.use((req, res, next) => {
  if (isUserAuth(req)) {
    req.userAuth = true;
  }
  return next();
});

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Use Routes

app.use('/api/login', auth);

/*-----------------------------------------*/

app.get('/', (req, res) => {
  if (req.userAuth) {
    console.log(path.join(__dirname, 'static') + '/index.html');
    // res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'static') + '/index.html');
  } else {
    console.log(path.join(__dirname, 'static') + '/login.html');
    res.sendFile(path.join(__dirname, 'static') + '/login.html');
  }
});

app.get('/results', (req, res) => {
  if (req.userAuth) {
    /*-отправляем новый массив во фронт-*/
    res.send(first10(pathRes));
  }
  res.redirect('/');
});

// app.post('/results', (req, res) => {
//   insertScore(pathRes, req.body.player, req.body.score);
//   res.send('I am ok');
// });

app.get('/logout', (req, res) => {
  res.clearCookie('isAuth');
  res.clearCookie('nameUser');
  res.redirect('/');
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'static') + '/registration.html');
});

app.get('*', (req, res) => {
  res.statusCode = 404;
  res.send('<h1>Страница не найдена</h1>');
});

app.use(function (err, req, res, next) {
  res.status(400).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
