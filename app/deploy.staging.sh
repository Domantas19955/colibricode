#!/bin/bash

npm run build
scp -r dist/* root@185.80.130.57:/var/www/app.staging