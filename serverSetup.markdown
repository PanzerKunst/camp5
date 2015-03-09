# Basic Nginx configuration

`$ sudo cp /etc/nginx/sites-available/hoffice /etc/nginx/sites-available/camp5`
`$ sudo ln -s /etc/nginx/sites-available/camp5 /etc/nginx/sites-enabled/camp5`

Modify the Nginx config file to enable PHP:
`$ sudo vi /etc/nginx/sites-available/camp5`

Modify those lines:

- `root /home/play/hoffice;` -> `root /home/play/camp5;`
- `server_name hoffice.nu www.hoffice.nu;` -> `server_name camp5.8b.nu;`

`$ sudo service nginx reload`


# Add hostname to /etc/hosts

`$ sudo vi /etc/hosts`
`188.40.99.15 camp5.8b.nu`


# Raise the upload limit

`$ sudo vi /etc/nginx/nginx.conf`

Add `client_max_body_size 8M;` at the bottom of the Basic Settings section.

`$ sudo service nginx reload`

`$ sudo vi /etc/php5/fpm/php.ini`

Update to `upload_max_filesize = 7M`

`$ sudo service php5-fpm restart`


# File permissions

`$ sudo chown -R www-data /home/play/camp5`
