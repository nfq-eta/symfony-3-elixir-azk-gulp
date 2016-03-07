var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'path']
});

var conf = {
  path: {
    app: 'app/Resources',
    bower_components: './bower_components',
    dist: 'web',
    temp: '.tmp'
  },
  filters: {
    html: $.filter('*.html', { restore: true }),
    js: $.filter('**/*.js', { restore: true }),
    css: $.filter('**/*.css', { restore: true }),
    fonts: $.filter('**/*.{ttf,woff,eof,svg,eot}', { restore: true }),
  }
};

gulp.task('copy', function() {
    gulp.src([conf.path.bower_components + '/**/*.{ttf,woff,eof,svg,eot}'])
      .pipe(conf.filters.fonts)
      .pipe($.rename({dirname: ''}))  // Skip file structure
      .pipe(gulp.dest($.path.join(conf.path.dest, '/fonts/')));
});

/**
* gulp-ruby-sass
* @see https://www.npmjs.com/package/gulp-ruby-sass
*
* Compile Sass to CSS using Compass.
*/
gulp.task('sass', function() {

  return $.rubySass(conf.path.app + '/scss', { compass: true, style: 'compressed', sourcemap: true })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe($.util.env.type === 'production' ? $.minifyCss({keepSpecialComments:0}) : $.util.noop())
    .pipe($.sourcemaps.write())
    .pipe($.util.env.type === 'production' ? $.rename({suffix: '.min'}) : $.util.noop())
    .pipe(gulp.dest('web/css/'));
});

/**
* gulp-concat && gulp-uglify
* @see https://www.npmjs.com/package/gulp-concat
* @see https://www.npmjs.com/package/gulp-uglify
*
* Compile and minify js vendor (bower_components).
*/
gulp.task('vendor_js', function() {
    return gulp.src($.mainBowerFiles())
    .pipe(conf.filters.js)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    .pipe($.util.env.type === 'production' ? $.uglify({mangle: true}) : $.util.noop())
    .pipe($.util.env.type === 'production' ? $.rename({suffix: '.min'}) : $.util.noop())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.write('maps') : $.util.noop())
    .pipe(conf.filters.js.restore)
    .pipe(gulp.dest($.path.join(conf.path.dest, '/js/')));
});
gulp.task('vendor_scss', function() {
    return gulp.src($.mainBowerFiles())
    .pipe(conf.filters.scss)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.css'))
    .pipe($.util.env.type === 'production' ? $.uglify({mangle: true}) : $.util.noop())
    .pipe($.util.env.type === 'production' ? $.rename({suffix: '.min'}) : $.util.noop())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.write('maps') : $.util.noop())
    .pipe(conf.filters.scss.restore)
    .pipe(gulp.dest($.path.join(conf.path.temp, '/')));
});
gulp.task('vendor_css', function() {
    return gulp.src($.mainBowerFiles())
    .pipe(conf.filters.css)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendors_temp.css'))
    .pipe($.util.env.type === 'production' ? $.uglify({mangle: true}) : $.util.noop())
    .pipe($.util.env.type === 'production' ? $.rename({suffix: '.min'}) : $.util.noop())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.write('maps') : $.util.noop())
    .pipe(conf.filters.css.restore)
    .pipe(gulp.dest($.path.join(conf.path.dest, '/css/')));
});

/**
* gulp-concat && gulp-uglify
* @see https://www.npmjs.com/package/gulp-concat
* @see https://www.npmjs.com/package/gulp-uglify
* @see https://www.npmjs.com/package/gulp-babel
*
* Compile and minify js App (app/Resources/js).
*/
gulp.task('app', function() {
    return gulp.src(conf.path.app + '/js/**/*.js')
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.init() : $.util.noop())
    .pipe($.concat('app.js'))
    .pipe($.babel())
    .pipe($.util.env.type === 'production' ? $.uglify({mangle: true}).on('error', $.util.log) : $.util.noop())
    .pipe($.util.env.type === 'production' ? $.rename({suffix: '.min'}) : $.util.noop())
    .pipe($.util.env.type !== 'production' ? $.sourcemaps.write() : $.util.noop())
    .pipe(gulp.dest($.path.join(conf.path.dest, '/js/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dest, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('vendor', [
  'vendor_js',
  'vendor_css'
]);

gulp.task('default', [
  'copy',
  'vendor',
  'app',
  'sass'
]);
