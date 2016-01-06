/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    path = require('path');
var wrench = require('wrench');
var node;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['server']);

gulp.task('start_server', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['server/server.js'], {stdio: 'inherit'});
});

gulp.task('server', ['start_server'], function () {
  gulp.watch(['./server/**.js'], ['start_server']);
});
