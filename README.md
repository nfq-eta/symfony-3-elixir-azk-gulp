Gulp Standard Edition
========================

Welcome to the Gulp NFQ Edition - a fully-functional Gulp
environment that you can use as the skeleton for your new Symfony applications.

For details on how to download and get started with Symfony, see the
[Installation][1] chapter of the Symfony Documentation.

What's inside?
--------------

The Gulp NFQ Edition is configured with the following defaults:
  * [**gulp-ruby-sass**][2] you can use to scss for style coding;
  * [**gulp-sourcemaps**][3] generates source map for minimized versions of css and js;
  * [**gulp-minify-css**][4] minifyes the css files;
  * [**gulp-watch**][5] wathes the files js and scss for janges and recompiles them;
  * [**gulp-rename**][6] enables the renaming functionality of files;
  * [**gulp-concat**][7] combines multiple files to one;
  * [**gulp-uglify**][8] compress the js files;
  * [**gulp-babel**][9] ECMAScript 6 to ECMAScript 5 compiler;
  * [**gulp-util**][10] Some useful tools for gulp;
  * [**gulp-bower**][11] Returns all bower files with dependencies;
  * [**gulp-load-plugins**][12] Loads all plugins in to the gulp file;
  * [**gulp-inject**][13] Injects css and js files in to the layout;
  
Development environment
-------------
Gulp has multiple tasks. All tasks can be executed individualy all performed multitask.
Here is defaults:
  * **copy** copy all fonts to the `web` directory
  * **vendor** collects all bower dependencies and concats to `vendor.js` and `vendor.css` files
  * **app** collects all app specific js files and concats it to `app.js`
  * **babel** converts ECMAScript 6 to ECMAScript 5
  * **sass**

Production environment
----------------------
The gulp is configured and optimized for speed and easier development.
To use this in **production** you need to pass the environment variable.

```gulp --type production```

By passing type `production` the additional tasks will be performed:
  * will compress css and js
  * adds a suffix `.min` to the file name of js and css

[1]:  https://symfony.com/doc/2.8/book/installation.html
[2]:  https://www.npmjs.com/package/gulp-ruby-sass
[3]:  https://www.npmjs.com/package/gulp-sourcemaps
[4]:  https://www.npmjs.com/package/gulp-minify-css
[5]:  https://www.npmjs.com/package/gulp-watch
[6]: https://www.npmjs.com/package/gulp-rename
[7]: https://www.npmjs.com/package/gulp-concat
[8]: https://www.npmjs.com/package/gulp-uglify
[9]: https://www.npmjs.com/package/gulp-babel
[10]: https://www.npmjs.com/package/gulp-util
[11]: https://www.npmjs.com/package/gulp-bower
