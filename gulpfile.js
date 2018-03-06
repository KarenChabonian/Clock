const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autopref = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');


gulp.task('css', function() {
    return gulp.src('src/**/*.+(scss|sass)')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autopref(['last 15 versions', '> 1%', 'ie 8', 'ie 9', 'ie 10'], { cascade: true }))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('slick-css', function() {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.css',
            'node_modules/slick-carousel/slick/slick-theme.css'
        ])
        .pipe(plumber())
        .pipe(concat('slick.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('slick', function() {
    return gulp.src('node_modules/slick-carousel/slick/slick.js')
        .pipe(plumber())
        .pipe(concat('slick.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});


gulp.task('watch', ['browser-sync', 'css', 'js'], function() {
    gulp.watch('src/**/*.scss', ['css']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('dist/**/*.js', browserSync.reload);
    gulp.watch('dist/**/*.css', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
});