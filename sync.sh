#!/bin/sh
# Asosiy index.html ni www/ ga ko'chiradi (favicon qo'shiladi)
cp ../pos/index.html www/index.html
sed -i 's|<meta name="theme-color" content="#070b14">|<meta name="theme-color" content="#070b14">\n<link rel="icon" type="image/png" href="icons/favicon-32.png">|' www/index.html
