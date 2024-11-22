#!/usr/bin/env bash
# Place in .platform/hooks/postdeploy directory
sudo certbot -n -d bakery.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email ryguy32@byu.edu