'use strict';


var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var watch = require('gulp-watch');

gulp.task('watch', function () {
  nodemon({
    script: 'index.js',
    nodeArgs: ['--debug', '--harmony'],
    ext: 'js',
    watch: [
      'app.js',
      'views/',
      'public/common/angular/'
    ]
  })
})
