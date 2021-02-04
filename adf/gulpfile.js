const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sequence = require('run-sequence');
const params = require('./tasks/params')();
const gnf = require('gulp-npm-files');
const webserver = require('gulp-webserver');

gulp.task('clean', () => gulp.src(['dist', `${params.project}/forms/**/*.*`, `${params.project}/datasets/**/*.*`, `${params.project}/wcm/widget/**/*.*`])
  .pipe($.rimraf({
    force: true
  })));

gulp.task('forms', require('./tasks/forms'));
gulp.task('datasets', require('./tasks/datasets'));
gulp.task('widgets', require('./tasks/widgets'));
gulp.task('webserver', function () {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      proxies: [
        { source: '/portal', target: params.cliServer + '/portal' },
        { source: '/adf_lib', target: params.cliServer + '/adf_lib' },
        { source: '/webdesk', target: params.cliServer + '/webdesk' }
      ]
    }));
});

gulp.task('build', (done) => {
  const tasks = [
    'forms', 'datasets', 'widgets', 'webserver'
  ];
  gulp.src(gnf(), { base: './' })
    .pipe(gulp.dest('./build'));

  sequence('clean', tasks, done);
});
gulp.task('default', ['build'], () => {
  if (params.watch) {
    gulp.watch(['src/forms/**/*'], ['forms']);
    gulp.watch(['src/datasets/**/*'], ['datasets']);
    gulp.watch(['src/widgets/**/*'], ['widgets']);
  }
});
