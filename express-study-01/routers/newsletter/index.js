'use strict';

module.exports = function (router) {
  router.get('/',function (req, res) {
    res.render('newsletter', { csrf: 'CSRF token goes here'});
  })
}
