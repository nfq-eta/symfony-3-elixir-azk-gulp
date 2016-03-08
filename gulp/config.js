module.exports = new function () {
  var config = {
    base: {
      input: './resources/public/',
      output: './web/public/',
      tmp: './.tmp'
    },
    scss: {
      input: 'scss/**/*.scss',
      output: 'styles',
      structure: true //.pipe(rename({dirname: ''}))
    },
    js: {
      input: 'js/**/*.js',
      output: 'scripts',
      structure: true
    },
    images: {
      input: 'images/**/*.{png,jpeg,jpg,gif,svg}',  //Unsupported files are ignored.
      output: 'images'
    },
    fonts: {
      input: '**/*.{eot,svg,ttf,woff,woff2}',
      output: 'fonts'
    },
    assets: {
      input: './src/Nfq/Bundle/OgminaBundle/Resources/views/layout.html.twig',
      output: './src/Nfq/Bundle/OgminaBundle/Resources/views',
      compress: false
    },

    // plugins
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    },

    imagemin: {
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    },
    browserSync: {
      notify: false,
      port: 9011,
      proxy: "eshop.ogmina.nfq"
      /*
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
       */
    },

    // used browserSync
    test: {
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
    }
  };

  // Prepare config
  config.scss.input = config.base.input + config.scss.input;
  config.scss.output = config.base.output + config.scss.output;

  config.js.input = config.base.input + config.js.input;
  config.js.output = config.base.output + config.js.output;

  config.fonts.input = config.base.input + config.fonts.input;
  config.fonts.output = config.base.output + config.fonts.output;

  config.images.input = config.base.input + config.images.input;
  config.images.output = config.base.output + config.images.output;

  config.test.server.baseDir = config.base.input + config.test.server.baseDir;

  return config;
};
