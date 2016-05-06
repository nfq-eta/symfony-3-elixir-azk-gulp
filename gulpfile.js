var del = require('del');
var elixir = require('laravel-elixir');

// Plugins
require('laravel-elixir-fonts');
require('laravel-elixir-imagemin');
require('laravel-elixir-livereload');
require('laravel-elixir-spritesmith');
require('laravel-elixir-svg-symbols');
require('laravel-elixir-del');

/**
 * Add clean functionality
 */

// TODO: optimize
elixir(function (mix) {
    mix
        // Cleanup dist
        .del([
            elixir.config.publicPath + '/css',
            elixir.config.publicPath + '/fonts',
            elixir.config.publicPath + '/img',
            elixir.config.publicPath + '/js'
        ])

        // Copy bootstrap fonts
        .copy('node_modules/bootstrap-sass/assets/fonts', 'web/fonts')

        // Generate custom fonts
        .fonts([elixir.config.assetsPath + '/svg/**/*.svg'], elixir.config.publicPath + '/fonts/', { font: { fontName: '_icon_font' } })

        // Compress images
        .imagemin()

        // Generate svg sprites
        .svgSprite(elixir.config.assetsPath + '/svg/', elixir.config.publicPath + '/img', elixir.config.svgSprite)

        // Generate image sprite
        .spritesmith(null, {
            imgOutput: elixir.config.publicPath + '/img',
            cssOutput: elixir.config.assetsPath + '/' + elixir.config.css.sass.folder,
            cssName: '_sprite.scss'
        })

        // Process css
        .sass('app.scss')
        .browserify('main.js')

        // Process javascript
        .browserify('app.js')

        // Reload browser
        .browserSync({"files": ["resources/**/*", "src/**/*.twig", "app/Resources/**/*.twig"]})
        .livereload()
    ;
});
