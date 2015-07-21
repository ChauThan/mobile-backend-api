#Installation instruction

## Install nodejs
1. Update package  
```sudo apt-get update```
2. Install nodejs  
```sudo apt-get install nodejs```  
3. Install npm - Node.js package manager  
```sudo apt-get install npm```

## Install and config mariaDB
1. Install  
```sudo apt-get install mariadb-server```
2. Input password for root : ```chau@mobileapi```
3. Check port of mariadb  
```sudo ss -ltnp|grep mysql```  
Result is ```3306```
4. (Optional)   
    1. If you use a virtual machine:
        1. Comment `bind-address`  
`sudo nano /etc/mysql/my.cnf`  
Find `bind-address`, comment and save it.
        2. Assign host ip to user(for example, my ip is ``192.168.33.1``)  
Login into mysql  ``mysql -u root -p``   
and then `use mysql`  
and then `GRANT ALL ON *.* to root@'192.168.33.1' IDENTIFIED BY 'chau@mobileapi'; `  
and then `FLUSH PRIVILEGES;`  
Login by MySql Management such as Heidi, MySQL Workbench to manage your database  
    2. If you use a real machine, please install phpMyAdmin.

## Install Reverse Proxy Server - nginx
1. Install   
`sudo apt-get install nginx`

2. Config  
`sudo vi /etc/nginx/sites-available/default`

  Clear all text and copy below text


        server {

          listen 80;

          server_name example.com;

          location / {
              proxy_pass http://127.0.0.1:8080;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
        }
3. Restart 
`sudo service nginx restart`

4. Use ssl
    1. Make certificate files. Please follow url to make certificate files  
https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-nginx-for-ubuntu-12-04
    2. Edit `sudo vi /etc/nginx/sites-available/default`


        server {
          listen 443 ssl;

          ssl on;
          ssl_certificate /etc/nginx/ssl/server.crt;
          ssl_certificate_key /etc/nginx/ssl/server.key;

          server_name example.com;

          location / {
              proxy_pass http://127.0.0.1:8080;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
        }
        server {
          listen      80;
          server_name example.com;
          rewrite     ^   https://$server_name$request_uri? permanent;
        }   

    3. Restart  
`sudo service nginx restart`

