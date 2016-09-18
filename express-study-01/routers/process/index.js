'use strict';

module.exports = function (router) {

  router.post('/',function (req, res) {
    console.log('Form (form querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._crsf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visibel form field): ' + req.body.email);
    res.redirect(303,'/thank-you');
  })

  router.post('/contact',function (req,res) {
    console.log('Received contact from ' + req.body.name + ' <' + req.body.email + '>');
    try {
      return res.xhr ? res.render({success : true}) : res.redirect(303,'/thank-you');
    } catch(ex){
      return res.xhr ? res.json({ error : 'Database error.' }) : res.redirect(303,'/thank');
    }
  })

  router.post('/ajax',function (req, res) {
    if(req.xhr || req.accepts('json,html')==='json'){
      //如果发生错误，应该发送{error : 'error description'}
      res.send({success: true});
    }else{
      //如果发生错误，应该重定向到错误页面
      res.redirect(303, '/thank-you');
    }
  })
}
