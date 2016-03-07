systems({
    // Project name
    gulp: {
        depends: ["mysql"],
        image: {
            dockerfile: './docker/Dockerfile'
        },
        provision: [
            "npm install",
            "composer update",
            "composer install",
            'php bin/console security:check',
            'gulp'
        ],
        workdir: "/var/www/html",
        shell: "/bin/bash",
        wait: 20,
        mounts: {
            '/var/www/html': sync("."),
            '/var/www/html/vendor': persistent("./vendor"),
            '/var/www/html/composer.phar': persistent("./composer.phar"),
            '/var/www/html/composer.lock': path("./composer.lock"),
            '/var/www/html/app/bootstrap.php.cache': path("./app/bootstrap.php.cache"),
            '/var/www/html/bootstrap/compiled.php': path("./bootstrap/compiled.php"),
            '/var/www/html/node_modules': persistent("./node_modules")
        },
        scalable: {"default": 1},
        http: {
            domains: ["#{manifest.dir}.#{azk.default_domain}"]
        },
        ports: {
            http: "80/tcp"
        },
        envs: {
            APP_DIR: "/var/www/html/web",
            SYMFONY_ENV: 'dev'
        }
    },
    mysql: {
        // More info about mysql image: http://images.azk.io/#/mysql?from=docs-full_example
        image: {"docker": "azukiapp/mysql:5.7"},
        shell: "/bin/bash",
        wait: 25,
        mounts: {
            '/var/lib/mysql': persistent("mysql_data"),
            // to clean mysql data, run:
            // $ azk shell mysql -c "rm -rf /var/lib/mysql/*"
        },
        ports: {
            // exports global variables: "#{net.port.data}"
            data: "3306/tcp"
        },
        envs: {
            // set instances variables
            MYSQL_USER: "root",
            MYSQL_PASSWORD: "root",
            MYSQL_DATABASE: "#{manifest.dir}", // same as directory name
            MYSQL_ROOT_PASSWORD: "root"
        },
        export_envs: {
            MYSQL_USER: "#{envs.MYSQL_USER}",
            MYSQL_PASSWORD: "#{envs.MYSQL_PASSWORD}",
            MYSQL_HOST: "#{net.host}",
            MYSQL_PORT: "#{net.port.data}",
            MYSQL_DATABASE: "#{envs.MYSQL_DATABASE}"
        }
    },
    "phpmyadmin": {
        depends: ["mysql"],
        image: {docker: "reduto/phpmyadmin"},
        wait: {retry: 20, timeout: 1000},
        scalable: {default: 0, limit: 1},
        http: {
            domains: ["#{system.name}.#{azk.default_domain}"]
        },
        ports: {
            http: "80/tcp"
        }
    }

});

// Sets a default system (to use: start, stop, status, scale)
setDefault("gulp");
