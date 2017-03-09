# Add missing packages for Wordpress

`$ sudo apt-get install mysql-client mysql-server nginx php-fpm php-mysql`


# Secure the database server

`$ mysql_secure_installation`


# Basic Nginx configuration

`$ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/camp5`

`$ sudo rm /etc/nginx/sites-enabled/default`

`$ sudo vi /etc/nginx/sites-available/camp5`

Set the `root` to `/home/play/camp5/web`

Add `index.php` at the end of the following line: `index index.html index.htm index.nginx-debian.html;`

To enable permalinks, in the `location /` section, update the `try_files` declaration to that defined in [General Wordpress rules for Nginx](https://codex.wordpress.org/Nginx#General_WordPress_rules).

Below that section, uncomment section `location ~ \.php$`

Keep line `fastcgi_pass 127.0.0.1:9000;` commented, but uncomment `fastcgi_pass unix:/run/php/php7.0-fpm.sock;`

Uncomment section `location ~ /\.ht`


`$ sudo ln -s /etc/nginx/sites-available/camp5 /etc/nginx/sites-enabled/camp5`

`$ sudo service nginx reload`


# Add hostname to /etc/hosts

`$ sudo vi /etc/hosts`

    176.9.140.42 camp5.se


# Raise the upload limit

`$ sudo vi /etc/nginx/nginx.conf`

Add `client_max_body_size 8M;` at the bottom of the Basic Settings section.

`$ sudo service nginx reload`

`$ sudo vi /etc/php/7.0/fpm/php.ini`

    upload_max_filesize = 7M
    cgi.fix_pathinfo=0

`$ sudo service php7.0-fpm restart`


# MySQL

Open access to remote connections

`$ sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf`

Replace the `bind-address` line to `bind-address = 0.0.0.0`

    $ mysql -u root -p
    > CREATE DATABASE `wp_camp5` CHARACTER SET utf8 COLLATE utf8_swedish_ci;
    > GRANT ALL ON *.* TO `root`@'%' IDENTIFIED BY 'AcB65oRo!F';
    > FLUSH PRIVILEGES;
    > quit

`$ sudo service mysql restart`


# File permissions & security

    $ cd /home/play/camp5
    $ sudo chown -R www-data:www-data .
    $ sudo find . -type d -exec chmod 775 {} \;
    $ sudo find . -type f -exec chmod 664 {} \;

