let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    cleanCSS = require('gulp-clean-css');

// prepross scss
gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// reload page
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// uglify & minify
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('app/js/*.js', uglify()))
        .pipe(gulpif('app/css/*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});

// watch task
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});
