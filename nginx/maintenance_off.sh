#!/bin/bash

echo "Setting comparehelper in working mode"

sudo rm /etc/nginx/sites-enabled/maintenance.comparehelper.conf

sudo ln -s /etc/nginx/sites-available/test.comparehelper.conf /etc/nginx/sites-enabled/

sudo systemctl restart nginx
