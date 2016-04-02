var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');


gulp.task('minifyjs', function() {
    return gulp.src('js/framework7.js','my-app.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('min/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('min/js'));  //输出
});
//
//gulp.task('clean', function(cb) {
//    del(['min/css', 'min/js'], cb)
//});
//
//gulp.task('default', ['clean'], function() {
//    gulp.start( 'minifyjs');
//});