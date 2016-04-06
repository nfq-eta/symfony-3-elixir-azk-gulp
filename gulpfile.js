var elixir = require('laravel-elixir');

// Plugins
require('laravel-elixir-fonts');
require('laravel-elixir-livereload');
require('laravel-elixir-spritesmith');
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

elixir(function (mix) {
    mix
        // Copy bootstrap fonts
        .copy('node_modules/bootstrap-sass/assets/fonts', 'web/fonts')
        // Generate custom fonts
        .fonts([elixir.config.assetsPath + '/svg/**/*.svg'], elixir.config.publicPath + '/fonts/')
        // Process css
        .sass('app.scss')
        .browserify('app.js')
        .spritesmith(null, {
            imgOutput: elixir.config.publicPath + '/img',
            cssOutput: elixir.config.assetsPath + '/' + elixir.config.css.sass.folder,
            cssName: '_sprite.scss'
        })
        .browserSync()
            .livereload();
});
