'use strict';

var gulp = require('gulp'),
    spawn = require('child_process').spawn;
var node;

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
