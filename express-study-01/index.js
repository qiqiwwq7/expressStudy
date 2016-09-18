  var express = require('express');
  var exphbs = require('express-handlebars');
  var app = express();
  var path = require('path');
  var bodyParser = require('body-parser');
  var formidable = require('formidable');
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


  /// dynamically include routers
  app.use(enrouten({directory: 'routers'}));

  app.get('/contest/vacation-photo', function (req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
      year: now.getFullYear(),month: now.getMonth()
    })
  })

  app.post('/contest/vacation-photo/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if(err){
        return res.redirect(303, '/error');
      }
      console.log('received fields:');
      console.log(fields);
      console.log('received files:');
      console.log(files);
      res.redirect(303, '/thank-you');
    })
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
