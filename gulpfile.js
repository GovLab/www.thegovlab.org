var
    gulp            = require('gulp'),
    imageResize     = require('gulp-image-resize'),
    changed         = require('gulp-changed')
;

// must include trailing '/'
// change this to whatever you want to convert before you run, because i'm too lazy to do cli options right now
var baseImageFolder = 'templates/static/img/smarterstate/';
var outputSubFolder = 'sm/'

gulp.task('thumbs', function () {
  gulp.src(baseImageFolder + '*.{png,jpg,jpeg}')
    .pipe(changed(baseImageFolder + outputSubFolder))
    .pipe(imageResize({ width : 600 }))
    .pipe(gulp.dest(baseImageFolder + outputSubFolder));
});

gulp.task('2k', function () {
  gulp.src(baseImageFolder + '*.{png,jpg,jpeg}')
    .pipe(changed(baseImageFolder + outputSubFolder))
    .pipe(imageResize({ width : 2000 }))
    .pipe(gulp.dest(baseImageFolder + outputSubFolder));
});