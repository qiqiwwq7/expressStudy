var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var credentials = require('./credentials');
var enrouten = require('express-enrouten');

var juicer = require('juicer');
var juicerExpressAdapter = require('juicer-express-adapter');

app.set('view engine', 'html');
app.engine('html', juicerExpressAdapter);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());
app.use(require('cookie-parser')(credentials.cookieSerect));
app.use(require('express-session')());

/// dynamically include routers
app.use(enrouten({directory: 'routers'}));

app.use(function (req, res, next) {
  //如果有即显消息，把它传到上下文，然后清楚它
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
})

app.use(function (req,res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

module.exports = app;
