// Gulp.js configuration
'use strict';

const

  // source and build folders
  dir = {
    src         : '',
    build       : 'dist'
  },

  // Gulp and plugins
  gulp          = require('gulp'),
  gutil         = require('gulp-util'),
  newer         = require('gulp-newer'),
  imagemin      = require('gulp-imagemin'),
  sass          = require('gulp-sass'),
  postcss       = require('gulp-postcss'),
  sourcemaps    = require('gulp-sourcemaps'),
  autoprefixer  = require('gulp-autoprefixer'),
  deporder      = require('gulp-deporder'),
  concat        = require('gulp-concat'),
  stripdebug    = require('gulp-strip-debug'),
  uglify        = require('gulp-uglify')
;

// Browser-sync
var browsersync = false;


// HTML settings
const html = {
  src           : dir.src + '**/*.html',
  build         : dir.build
};

// copy HTML files
gulp.task('html', () => {
  return gulp.src(html.src)
    .pipe(newer(html.build))
    .pipe(gulp.dest(html.build));
});

// image settings
const images = {
  src         : dir.src + 'src/css/images/**/*',
  build       : dir.build + 'css/images/'
};

// image processing
gulp.task('images', () => {
  return gulp.src(images.src)
    .pipe(newer(images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(images.build));
});

// CSS settings
var css = {
  src         : dir.src + 'src/css/**/*',
  watch       : dir.src + 'src/css/**/*',
  build       : dir.build + 'css/',
  sassOpts: {
    outputStyle     : 'nested',
    imagePath       : images.build,
    precision       : 3,
    errLogToConsole : true
  },
  processors: [
    require('postcss-assets')({
      loadPaths: ['images/'],
      basePath: dir.build,
      baseUrl: './'
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 2%']
    }),
    require('css-mqpacker'),
    require('cssnano')
  ]
};

// CSS processing
gulp.task('css', ['images'], () => {
  return gulp.src(css.src)
    .pipe(sass(css.sassOpts))

    .pipe(sourcemaps.init())
    .pipe(postcss(css.processors))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(css.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// JavaScript settings
const js = {
  src         : dir.src + 'js/**/*',
  build       : dir.build + 'js/',
  filename    : 'all.min.js'
};

// JavaScript processing
gulp.task('js', () => {

  return gulp.src(js.src)
    .pipe(deporder())
    .pipe(concat(js.filename))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(js.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// run all tasks
gulp.task('build', ['html', 'css', 'js']);


// Browsersync options
const syncOpts = {
  server: {
    baseDir: './'
  },
  files       : dir.build + '**/*',
  open        : false,
  notify      : false,
  ghostMode   : false,
};


// browser-sync
gulp.task('browsersync', () => {
  if (browsersync === false) {
    browsersync = require('browser-sync').create();
    browsersync.init(syncOpts);
  }
});

// watch for file changes
gulp.task('watch', ['browsersync'], () => {

  // page changes
  gulp.watch(html.src, ['html'], browsersync ? browsersync.reload : {});

  // image changes
  gulp.watch(images.src, ['images']);

  // CSS changes
  gulp.watch(css.watch, ['css']);

  // JavaScript main changes
  gulp.watch(js.src, ['js']);

});

// default task
gulp.task('default', ['build', 'watch']);