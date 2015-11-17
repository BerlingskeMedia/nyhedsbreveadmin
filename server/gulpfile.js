var gulp = require('gulp');
    spawn = require('child_process').spawn,
    path = require('path');

gulp.task('default', ['server']);

var node;

gulp.task('start_server', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
});

gulp.task('server', ['start_server'], function () {
  gulp.watch(['./**.js'], ['start_server']);
});
