  var express = require('express');
  var exphbs = require('express-handlebars');
  var app = express();
  var bodyParser = require('body-parser');
  var formidable = require('formidable');
  var credentials = require('./credentials');

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

  app.set('port',process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));

  app.use(bodyParser());
  app.use(require('cookie-parser')(credentials.cookieSerect));

  var _config = {
        GLOBAL: {},
        sidebar: {
            links: [],
            basePath: '',
            baseUrl: '',
            path: ''
        },
        name:'zhangsan',
        sex:'man'
  };
  var newConfig = Object.create(_config);
  console.log(newConfig);
  app.get('/',function (req, res) {
    res.render('home',newConfig);
  })

  app.get('/about',function (req, res) {
    res.render('about');
  })

  app.get('/newsletter',function (req, res) {
    res.render('newsletter', { csrf: 'CSRF token goes here'});
  })

  app.get('/thank-you',function (req,res) {
    res.render('thanks');
  })

  app.post('/process',function (req, res) {
    console.log('Form (form querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._crsf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visibel form field): ' + req.body.email);
    res.redirect(303,'/thank-you');
  })

  app.post('/process/ajax',function (req, res) {
    if(req.xhr || req.accepts('json,html')==='json'){
      //如果发生错误，应该发送{error : 'error description'}
      res.send({success: true});
    }else{
      //如果发生错误，应该重定向到错误页面
      res.redirect(303, '/thank-you');
    }
  })

  app.post('/process-contact',function (req,res) {
    console.log('Received contact from ' + req.body.name + ' <' + req.body.email + '>');
    try {
      return res.xhr ? res.render({success : true}) : res.redirect(303,'/thank-you');
    } catch(ex){
      return res.xhr ? res.json({ error : 'Database error.' }) : res.redirect(303,'/thank');
    }
  })

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
