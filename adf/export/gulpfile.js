const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sequence = require('run-sequence');

// gulp.task('forms', require('./tasks/forms'));
gulp.task('datasets', require('./datasets'));
// gulp.task('widgets', require('./tasks/widgets'));

gulp.task('build', (done) => {
  const tasks = [
    'datasets'
  ];

  sequence(tasks, done);
});
gulp.task('default', ['build'], () => {
  console.log('Done!');
});
