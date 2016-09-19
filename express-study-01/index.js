'use strict';

var app = require('./app');


app.set('port',process.env.PORT || 3000);
app.set('env', 'production');

var server = app.listen(app.get('port'),function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})
