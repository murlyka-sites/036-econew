var gulp = require('gulp'),
	jade = require('gulp-pug'),
	stylus = require('gulp-stylus'),
	imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
    babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var outputDir = 'public';
var assetDir = 'assets';


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        },
        reloadDelay: 1500
    });
});
	// �������� Stylus
// �������� Stylus
gulp.task('stylus', function() {
    gulp.src('./assets/stylus/*.styl')
        .pipe(stylus()) // �������� stylus
    .on('error', console.log) // ���� ���� ������, ������� � ����������
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputDir+'/css/')) // ���������� css
    .pipe(browserSync.stream()); // ���� ������� �� ������������ css
});
// �������� css
gulp.task('csstouse', function() {
    gulp.src('./assets/stylus/*.css')
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(outputDir+'/css/')) // ���������� css
    .pipe(browserSync.stream()); // ���� ������� �� ������������ css
});
//�������� ������
gulp.task('fonts', function() {
    gulp.src('./assets/fonts/*.*')
    .pipe(gulp.dest(outputDir+'/fonts/')) // ���������� css
    .pipe(browserSync.stream()); // ���� ������� �� ������������ css
});
// �������� html �� Jade

gulp.task('jade', function() {
    gulp.src([assetDir+'/template/*.pug', '!'+assetDir+'/template/_*.pug'])
        .pipe(jade({
            pretty: true
        }))  // �������� Jade ������ � ����� ./assets/template/ �������� ����� � _*
        .on('error', console.log) // ���� ���� ������, ������� � ����������
    .pipe(gulp.dest(outputDir)) // ���������� ��������� �����
    .pipe(browserSync.stream()); // ���� ������� �� ������������ ��������
});

// �������� JS
gulp.task('js', function() {
    gulp.src([assetDir+'/js/**/*.js', '!'+assetDir+'/js/vendor/**/*.js'])
        .pipe(concat('index.js'))
        .pipe(babel({
           presets: ['@babel/env']
        })) // �������� ��� JS, ����� ��� ������� ��������� � ./assets/js/vendor/**
        .pipe(gulp.dest(outputDir+'/js'))
        .pipe(browserSync.stream()); // ���� ������� �� ������������ ��������
});

gulp.task('images', function() {
    gulp.src(assetDir+'/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir+'/images'))
});

 /*   gulp.task('connect', function() {
      connect.server({
          root: outputDir,
          livereload: true
      });
    }); */

// ������ ������� ���������� gulp watch
gulp.task('watch', function() {
    // ��������������� ������ �������
    gulp.watch(assetDir+'/stylus/**/*.styl', ['stylus']);
    gulp.watch(assetDir+'/stylus/**/*.css', ['csstouse']);
    gulp.watch(assetDir+'/template/**/*.pug', ['jade']);
    gulp.watch(assetDir+'/img/**/*', ['images']);
    gulp.watch(assetDir+'/js/**/*', ['js']);
    gulp.watch(outputDir+'/*.html').on('change', browserSync.reload);
});

gulp.task ('default',['stylus','csstouse','jade','images','js','fonts','watch','browser-sync']);
