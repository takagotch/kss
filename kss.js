var gulp = require('gulp');
var kss = require('kss');
var config = require('../config.js');

var kssConfig = {
  source: config.scss,
  homepage: '../styleguide/README.md',
  title: 'STYLE GUIDE',
  destination: config.build + '/styleguide',
  css: '../assets/css/style.css',
  builder: config.styleguide
};

gulp.task('kss', function(){
  return kss(kssConfig);
});

