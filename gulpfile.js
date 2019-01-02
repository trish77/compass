/**
 * Gulp task runner
 *
 * Does the following tasks:
 * 1. Task: Compile sass to css + minified version (main scss & plugin scss)
 * 2. Task: Clean up script.js & minified version
 * 3. Task: compress theme images
 *
 * @usage
 * 1. Install nodejs & npm: https://docs.npmjs.com/getting-started/installing-node
 * 2. Install gulp: npm install --global gulp-cli
 * 3. Install theme packages: npm install --save-dev gulp
 * 4. Run gulp: gulp OR gulp watch (polls for file changes)
 *
 *
 */

// ---------------------------
// gulp requires
// ---------------------------
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var copy = require('gulp-copy');
var cssmin = require('gulp-cssmin');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var prettify = require('gulp-jsbeautifier');
var purify = require('gulp-purifycss');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var uglify = composer(uglifyes, console);

var browserSync = require('browser-sync').create();

// ---------------------------
// vars
// ---------------------------

var scssDir = './scss';
var cssWatchedFiles = [cssDir + '/*.css', cssDir + '/**/*.css'];
var targetCSSDir = './css';
var targetJSDir = './js';
var JSDir = './src';
var cssDir = JSDir + '/css';


var cssSourceFiles = [
  cssDir + '/bootstrap.css',
  cssDir + '/all.css',
  cssDir + '/datatables.min.css',
  cssDir + '/custom-checkbox.css',
  cssDir + '/themain.css'
];
var JSSource =  JSDir + '/js';
var JSSourceFiles = [
  JSSource + '/jquery.js',
  JSSource + '/bootstrap.bundle.js',
  JSSource + '/datatables.min.js',
  JSSource + '/themain.js',
];

// ---------------------------
// Tasks
// ---------------------------

gulp.task('css-concat', function () {
  return gulp.src(cssSourceFiles)
    .pipe(concatCss('style.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(targetCSSDir))

});

// Task compile JS
// ---------------------------
gulp.task('compile-js', function() {
  gulp.src(JSSourceFiles)
    .pipe(concat('script.js'))
  //  .pipe(jshint())
  //  .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(targetJSDir))
    .pipe(notify('JS concat done'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'Gulp',
        message: '<%= error.message %>',
      })
    }))
    // Min version
    .pipe(uglify())

    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(targetJSDir))
    .pipe(notify('JS minified'));
});

gulp.task('copy', function () {
  gulp.src('./src/css/images/*')
    .pipe(gulp.dest('./css/images'));
});

// Task prettify
// ---------------------------
gulp.task('prettify', function() {
  gulp.src([targetCSSDir + '/*.css', '*.html', JSDir + '/script.js'])
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});


// ---------------------------
// Production
// Tools to clean up your site for production use
// ---------------------------

// Remove unused CSS - optionally
// Command: gulp unused-css
// Steps:
// 1. Remove any unsued .html files
// 2. Run command: gulp unused-css
//
// Your css files in /assets/css will be scanned
// and have any unused CSS removed then saved
// ---------------------------
gulp.task('unused-css', function() {
  var htmlFiles = ['*.html'];
  return gulp.src(targetCSSDir + '/*.css')
    .pipe(purify(htmlFiles))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})


// ---------------------------
// Watch
// ---------------------------
gulp.task('watch', ['browserSync', 'css-concat', 'copy', 'compile-js'], function() {
  gulp.watch(cssWatchedFiles, ['css-concat'], browserSync.reload);
  gulp.watch(cssDir + '/*.css',  ['css-concat'],  browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch(JSDir + '/**/*.js', ['compile-js', browserSync.reload]);
});

gulp.task('watch-dev', function() {
  gulp.watch(scssWatchedFiles, ['compile-scss-dev', browserSync.reload]);
  gulp.watch(JSDir + '/src/**/*.js', ['compile-js', browserSync.reload]);
});


// Default tasks
gulp.task('default', ['compile-js', 'browserSync', 'css-concat',  'prettify'/*, 'watch'*/]);
