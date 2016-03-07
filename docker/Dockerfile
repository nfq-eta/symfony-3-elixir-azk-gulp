FROM php:5.6-apache

RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -

RUN apt-get update && \
    apt-get install -y \
    openjdk-7-jre-headless \
    zlib1g-dev \
    libpng-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libmcrypt-dev \
    git \
    nodejs \
    imagemagick \
    fontforge \
    unzip \
    rubygems \
    ruby-dev && \
    docker-php-ext-install mbstring pdo_mysql zip gd curl intl mcrypt && \
    curl -sS https://getcomposer.org/installer | php -- --filename=composer --install-dir=/usr/local/bin && \
    apt-get clean && rm -r /var/lib/apt/lists/*

RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

RUN curl -sLO http://people.mozilla.com/~jkew/woff/woff-code-latest.zip && \
   unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make -B && mv sfnt2woff /usr/local/bin/

COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
COPY php.ini /usr/local/etc/php/php.ini
COPY vhost.conf /etc/apache2/sites-enabled/
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN a2enmod rewrite

RUN usermod -u 1000 www-data

RUN chown 1000:1000 /var/www
RUN mkdir -p /var/www/html/app/cache
RUN chown -R 1000:1000 /var/www/html/app/cache
VOLUME ["/var/www/html/app/cache"]

RUN sed -i 's/host = uri.host/host = "http:\/\/rubygems.org"/g' /usr/lib/ruby/2.1.0/rubygems/remote_fetcher.rb
RUN gem install --no-ri --no-rdoc fontcustom sass
RUN gem install --no-ri --no-rdoc --pre sass-css-importer
RUN npm install -g gulp bower

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["apache2-foreground"]
