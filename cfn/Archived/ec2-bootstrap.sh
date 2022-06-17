#!/bin/bash
sudo yum update -y
sudo yum install httpd -y
sudo yum install git -y
sudo git clone https://github.com/ivanbok/gameday-serverless-app.git
sudo cp -a ./gameday-serverless-app/. /var/www/html
sudo systemctl start httpd
sudo systemctl enable httpd