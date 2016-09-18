  var express = require('express');
  var exphbs = require('express-handlebars');
  var app = express();
  var path = require('path');
  var bodyParser = require('body-parser');

  var credentials = require('./credentials');
  var enrouten = require('express-enrouten');

  var hbs = exphbs.create({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
      section:function (name, options) {
        if(!this._sections){
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });

  app.engine('.hbs',hbs.engine);
  app.set('view engine','.hbs');
  app.set('views', path.join(__dirname, 'views'));
  app.set('port',process.env.PORT || 3000);
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

  app.listen(app.get('port'),function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  })
