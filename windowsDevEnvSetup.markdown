# PHP installation

1. Download the x86 non-TS distro of PHP for windows, from [windows.php.net](http://windows.php.net/download/)
2. Extract it to `c:\ProgramFiles\php-7.2.2`
3. Download and install the VC redist for x86 platform mentioned on the same PHP download page
4. Run `C:\ProgramFiles\php-7.2.2>php-cgi.exe -b 127.0.0.1:9000` and check that it works


# Nginx installation

1. Download and extract to `c:\ProgramFiles\nginx-1.12.2`

2. Open `conf/nginx.conf` and do the following changes:
    1. Uncomment lines in section `# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000`
    2. Update the `fastcgi_param` line with: `fastcgi_param  SCRIPT_FILENAME  c:/ProgramFiles/nginx-1.12.2/html/$fastcgi_script_name;`
    3. Update the `location /` block nested in the uncommented `server {` line from `index  index.html index.htm;` to `index  index.php index.html index.htm;`

3. Launch the Nginx server (C:\ProgramFiles\nginx-1.12.2> nginx) and check that there are no errors in `c:\ProgramFiles\nginx-1.12.2\logs\error.log`
        
        
# Testing PHP

1. Create `c:\ProgramFiles\nginx-1.12.2\html\test.php` with content:

        <?php
            phpinfo();
        ?>

3. Restart Nginx: `nginx -s reload`
4. Access [http://localhost/test.php](http://localhost/test.php) and check that the page loads correctly


# XDebug installation

1. Download the x86 non-TS version of XDebug, from [www.xdebug.org/download.php](http://www.xdebug.org/download.php)
2. Extract the DLL to `c:\ProgramFiles\php-7.2.2\ext`

3. Copy `php.ini-development` to `php.ini`. Open `php.ini`, and add the following below the extensions section:

        [XDebug]
        zend_extension = "php_xdebug-2.2.6-5.6-vc11-nts.dll"
        xdebug.remote_enable = 1
        xdebug.remote_port = 9001

4. In that same file, update `extension_dir` to `"C:/ProgramFiles/php-7.2.2/ext"`

5. Restart PHP, open the test.php page in a browser and check that the XDebug extension is loaded.

6. Have a look at [the IntelliJ IDEA documentation on how to integrate XDebug](https://www.jetbrains.com/idea/help/configuring-xdebug.html).
   Make sure that the port is the same as indicated in `php.ini`.

7. In the menu, click on `Run > Start Listen for PHP Debug Connections`


# Wordpress installation

1. Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-windows), as it's necessary for Bedrock.

2. [Install Roots Bedrock](https://roots.io/bedrock/docs/installing-bedrock/): `composer create-project roots/bedrock`

3. Compare the created directory with c:\Pro\camp5\wordpress, and merge

4. Update camp5/wordpress/.env to:

    DB_NAME=wp_camp5
    DB_USER=root
    DB_PASSWORD=********
    
5. Follow the reste of the Bedrock installation

6. Update Nginx config:
    * Change the `root` directive inside the `location /` block to `root   c:/Pro/camp5/wordpress/web;`
    * Change the `root` directive inside the `location ~ \.php$` block to `root           c:/Pro/camp5/wordpress/web;`
    * Change the `fastcgi_param` directive inside the `location ~ \.php$` block to `SCRIPT_FILENAME  c:/Pro/camp5/wordpress/web/$fastcgi_script_name;`
    
7. Activate the MySQL extension for PHP: open `php.ini` and uncomment line `extension=mysqli`.

8. Increase the max size for file uploads:
    * Edit `php.ini` and set `upload_max_filesize = 7M`
    * Edit `nginx.conf` and add `client_max_body_size 8m;` (same as PHP's `post_max_size`) in the `http` section.
        
9. Restart PHP: `php-cgi.exe -b 127.0.0.1:9000` and Nginx: `nginx -s reload`

10. Create DB on server and allow external access:

        $ mysql -u root -p
        > CREATE DATABASE `wp_camp5` CHARACTER SET utf8 COLLATE utf8_swedish_ci;
        > GRANT ALL ON `wp_camp5`.* TO `root`@'%' IDENTIFIED BY 'AcB65oRo!F';
        > FLUSH PRIVILEGES;

11. Update `my.cnf` to allow remote access: `sudo vi /etc/mysql/my.cnf` then add a new `bind-address` line: `bind-address = 188.40.99.15`.
12. `sudo service mysql restart`
13. Run Wordpress installation by accessing [http://localhost](http://localhost)


# Wordpress settings

1. Inside the Wordpress admin UI, click on `Settings > General` and update the following fields:
    * "Tagline" to `A gathering of climbers, acro/yogis, and flow artists`
    * "Time Format" to "HH:mm"

2. In `Settings > Discussion`, uncheck `Allow people to post comments on new articles`, then save.


# Permalinks

1. In the Wordpress admin interface, navigate to `Settings > Permalinks` and enable permalinks ("Post name").
2. Test that permalinks work by clicking on a post title.


# Plugins

1. Search and install the following plugins:
    * JP Markdown
    
2. Add the Visual Editor Global Disabler plugin by uploading the zip file.

3. Activate all, and take the opportunity to delete `Akismet` and `Hello Dolly`.


# Camp5 theme

1. Create a zip file containing the source code of the Camp5 theme. At the root of that zip file should be the `camp5` folder (and inside it all the files).
2. `Add New > Upload Theme` and upload the zip file.
3. Activate it.
