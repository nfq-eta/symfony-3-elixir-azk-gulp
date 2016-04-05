var elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    Task = elixir.Task,
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    runTimestamp = Math.round(Date.now()/1000),
    fontName = 'icons';

require('laravel-elixir-livereload');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.extend('fonts', function(src, output) {

    new Task('fonts', function() {
        return gulp.src(src)
            .pipe(iconfontCss({
                fontName: fontName,
                // path: elixir.config.assetsPath + '/' + elixir.config.css.sass.folder + '/_' + fontName + '.scss',
                targetPath: '../css/' + fontName + '.css',
                fontPath: '../fonts/'
            }))
            .pipe(iconfont({
                fontName: fontName, // required
                prependUnicode: false, // recommended option
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
                timestamp: runTimestamp // recommended to get consistent builds when watching files
            }))
            .pipe(gulp.dest(output));
    }).watch(src);

});

elixir(function (mix) {
    mix
        // Copy bootstrap fonts
        .copy('node_modules/bootstrap-sass/assets/fonts', 'web/fonts')
        // Generate custom fonts
        .fonts([elixir.config.assetsPath + '/svg/**/*.svg'], elixir.config.publicPath + '/fonts/')
        // Process css
        .sass('app.scss')
        .browserify('app.js')
        .browserSync()
            .livereload()
    ;
});
