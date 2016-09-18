module.exports = function (router) {
  var _config = {
        GLOBAL: {},
        sidebar: {
            links: [],
            basePath: '',
            baseUrl: '',
            path: ''
        },
        name:'lisi',
        sex:'man'
  };
  var newConfig = Object.create(_config);
  router.get('/',function (req, res) {
    res.render('home',newConfig);
  })
}
