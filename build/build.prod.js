var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('css:base', function () {
    gulp.src('../src/styles/base.less')
        .pipe(require('gulp-less')())
        .pipe(cleanCss())
        .pipe(rename('vmui.base.css'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('css:vmui', function () {
    gulp.src('../dist/vmui.rem.css')
        .pipe(require('ydcss-rem2px')(50))
        .pipe(cleanCss())
        .pipe(rename('vmui.px.css'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('flexible', function () {
    gulp.src('../src/vmui.flexible.js')
        .pipe(require('gulp-uglify')())
        .pipe(gulp.dest('../dist'));
});

gulp.task('default', ['css:base', 'css:vmui', 'flexible']);
