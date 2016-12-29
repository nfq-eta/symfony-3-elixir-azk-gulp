import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const config = require('./gulp/config.js');

gulp.task('styles', () => {
  return gulp.src(config.scss.input)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.scss.output))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src(config.js.input)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.js.output))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint(config.js.input));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src(config.assets.input)
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    // .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(config.assets.output));
});

gulp.task('images', () => {
  return gulp.src(config.images.input)
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest(config.images.output));
});

gulp.task('fonts', ['copy-fonts']);

gulp.task('copy-fonts', ['generate-fonts'], () => {
  return gulp.src(
      require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
      .concat(config.fonts.input)
    )
    .pipe(gulp.dest(config.fonts.output));
});

gulp.task('generate-fonts', () => {
  return gulp.src(config.icons.input)
    .pipe($.fontcustom({
      font_name: config.icons.name,
      'css-selector': '.icon-{{glyph}}',
      templates: ['scss', 'preview'],
      autowidth: true
    }))
    .pipe(gulp.dest(config.icons.output))
});

gulp.task('extras', () => {
  return gulp.src([
    config.base.input + '*.*',
    `!${config.base.input}*.html`
  ], {
    dot: true
  }).pipe(gulp.dest(config.base.output));
});

gulp.task('clean', del.bind(null, [
  config.scss.output,
  config.fonts.output,
  config.js.output,
  config.images.output
]));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9011,
    proxy: process.env.SERVER_NAME + ".dev",
    /*server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }*/
  });

  gulp.watch([
    config.scss.input,
    config.fonts.input,
    config.js.input,
    config.images.input,
    config.assets.input,
  ]).on('change', reload);

  gulp.watch(config.scss.input, ['styles']);
  gulp.watch(config.js.input, ['scripts']);
  gulp.watch(config.fonts.input, ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(config.js.input, ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src(config.scss.input)
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest(config.scss.output));

  gulp.src(config.assets.input)
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(config.assets.output));
});

// gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
gulp.task('build', ['lint', 'scripts', 'styles', 'images', 'fonts', 'extras'], () => {
  return gulp.src(config.base.output + '**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
