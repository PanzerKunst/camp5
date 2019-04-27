# PHP installation

Download the x86 non-TS distro of PHP for windows, from [windows.php.net](http://windows.php.net/download/).

Extract it to `c:\ProgramFiles\php-7.2.2`.

Download and install the VC redist for x86 platform mentioned on the same PHP download page.

Run `C:\ProgramFiles\php-7.2.2>php-cgi.exe -b 127.0.0.1:9000` and check that it works.


# Nginx installation

Download and extract to `c:\ProgramFiles\nginx-1.12.2`.

Open `conf/nginx.conf` and do the following changes:
  - Uncomment lines in section `# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000`
  - Update the `fastcgi_param` line with: `fastcgi_param  SCRIPT_FILENAME  c:/ProgramFiles/nginx-1.12.2/html/$fastcgi_script_name;`
  - Update the `location /` block nested in the uncommented `server {` line from `index  index.html index.htm;` to `index  index.php index.html index.htm;`

Launch the Nginx server (C:\ProgramFiles\nginx-1.12.2> nginx) and check that there are no errors in `c:\ProgramFiles\nginx-1.12.2\logs\error.log`.
        
        
# Testing PHP

Create `c:\ProgramFiles\nginx-1.12.2\html\test.php` with content:

    <?php
        phpinfo();
    ?>

Restart Nginx: `nginx -s reload`.

Access [http://localhost/test.php](http://localhost/test.php) and check that the page loads correctly.


# XDebug installation

Download the x86 non-TS version of XDebug, from [www.xdebug.org/download.php](http://www.xdebug.org/download.php).

Extract the DLL to `c:\ProgramFiles\php-7.2.2\ext`.

Copy `php.ini-development` to `php.ini`. Open `php.ini`, and add the following below the extensions section:

    [XDebug]
    zend_extension = "php_xdebug-2.2.6-5.6-vc11-nts.dll"
    xdebug.remote_enable = 1
    xdebug.remote_port = 9001

In that same file, update `extension_dir` to `"C:/ProgramFiles/php-7.2.2/ext"`.

Restart PHP, open the test.php page in a browser and check that the XDebug extension is loaded.

Have a look at [the IntelliJ IDEA documentation on how to integrate XDebug](https://www.jetbrains.com/idea/help/configuring-xdebug.html). Make sure that the port is the same as indicated in `php.ini`.

As part of the above procedure, don't forget to install the XDebug browser extension!

In the menu, click on `Run > Start Listen for PHP Debug Connections`.


# Wordpress installation

Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows), as it's necessary for Bedrock.

[Install Roots Bedrock](https://roots.io/bedrock/docs/installing-bedrock/): `composer create-project roots/bedrock`.

Compare the created directory with c:\Pro\camp5\wordpress, and merge.

Update camp5/wordpress/.env to:

    DB_NAME=wp_camp5
    DB_USER=root
    DB_PASSWORD=********
    
Follow the reste of the Bedrock installation.

Update Nginx config:
  - Change the `root` directive inside the `location /` block to `root   c:/Pro/camp5/wordpress/web;`
  - Change the `root` directive inside the `location ~ \.php$` block to `root           c:/Pro/camp5/wordpress/web;`
  - Change the `fastcgi_param` directive inside the `location ~ \.php$` block to `SCRIPT_FILENAME  c:/Pro/camp5/wordpress/web/$fastcgi_script_name;`
    
Activate the MySQL extension for PHP: open `php.ini` and uncomment line `extension=mysqli`.

Increase the max size for file uploads:
  - Edit `php.ini` and set `upload_max_filesize = 7M`
  - Edit `nginx.conf` and add `client_max_body_size 8m;` (same as PHP's `post_max_size`) in the `http` section.
        
Restart PHP: `php-cgi.exe -b 127.0.0.1:9000` and Nginx: `nginx -s reload`.

Create DB on server and allow external access:

    $ mysql -u root -p
    > CREATE DATABASE `wp_camp5` CHARACTER SET utf8 COLLATE utf8_swedish_ci;
    > GRANT ALL ON `wp_camp5`.* TO `root`@'%' IDENTIFIED BY 'AcB65oRo!F';
    > FLUSH PRIVILEGES;

Update `my.cnf` to allow remote access: `sudo vi /etc/mysql/my.cnf` then add a new `bind-address` line: `bind-address = 188.40.99.15`.

`sudo service mysql restart`.

Run Wordpress installation by accessing [http://localhost](http://localhost).


# Wordpress settings

Inside the Wordpress admin UI, click on `Settings > General` and update the following fields:
  - "Tagline" to `A gathering of climbers, acro/yogis, and flow artists`
  - "Time Format" to "HH:mm"

In `Settings > Discussion`, uncheck `Allow people to post comments on new articles`, then save.

In `Appearance > Widgets`, drag all widgets of the "Primary" panel back to the "Available widgets".


# Permalinks

In the Wordpress admin interface, navigate to `Settings > Permalinks` and enable permalinks ("Post name").

Open `conf/nginx.conf` and add the following lines to the `location /` block:
 
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ /index.php?$args;

Restart Nginx: `nginx -s reload`.

Test that permalinks work, for example by loading http://localhost/event-principles.


# Plugins

Search and install the following plugins:
  - JP Markdown
    
Add the Visual Editor Global Disabler plugin by uploading the zip file.

Activate all, and take the opportunity to delete `Akismet` and `Hello Dolly`.


# Camp5 theme

Create a zip file containing the source code of the Camp5 theme. At the root of that zip file should be the `camp5` folder (and inside it all the files).

`Add New > Upload Theme` and upload the zip file.

Activate it.


# Stripe

Enable the Curl extension for PHP: open `php.ini`, uncomment line `extension=curl`, restart PHP.

Inside dir `themes/camp5`, run `composer require stripe/stripe-php`. Check that `themes/camp5/composer.json` is updated accordingly.
