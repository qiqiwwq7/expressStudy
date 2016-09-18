'use strict';

var formidable = require('formidable');

module.exports = function (router) {
  router.get('/', function (req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
      year: now.getFullYear(),month: now.getMonth()
    })
  })

  router.post('/:year/:month', function (req, res) {
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
}
