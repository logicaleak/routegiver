var express = require('express');
var logger = require('morgan');
var gutil = require('gulp-util');
var path = require('path');
var gulp = require('gulp');
var compression = require('compression')

var port = process.argv[4];

//Inspired from gulp-starter project in github
var settings = {
  root: path.resolve(process.cwd(), './build'),
  port: port,
  logLevel: 'dev',
  staticOptions: {
    extensions: ['html', 'css', 'js'],
    maxAge: '31556926'
  }
};

var executeServer = function() {
	express()
	    .use(compression())
	    .use(logger())
	    .use('/', express.static(settings.root, settings.staticOptions))
	    .listen(settings.port);	

    gutil.log('production server started on port : ' + settings.port);
};

gulp.task('prod-server', executeServer);



