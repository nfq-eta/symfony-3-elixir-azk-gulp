var elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    Task = elixir.Task,
    fontcustom = require('gulp-fontcustom');
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

    console.log(src, output);
    new Task('fonts', function() {
        return gulp.src(src)
            .pipe(
                fontcustom({
                    font_name: 'icons',  // defaults to 'fontcustom',
                    'css-selector': '.icon-{{glyph}}'
                })
            )
            .pipe(gulp.dest(output));
    });

});

elixir(function (mix) {
    mix
        .sass('app.scss')

        // Copy bootstrap fonts
        .copy('node_modules/bootstrap-sass/assets/fonts', 'web/fonts')
        .fonts(elixir.config.assetsPath + '/svg/**/*.svg', elixir.config.publicPath + '/assets/fonts/')
        .browserify('app.js')
        .browserSync();
});
