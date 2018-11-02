#!/bin/bash
sizes=('72' '96' '128' '144' '152' '192' '384' '512')

cp logo.png ./src/favicon.png
cd src/assets/favicon
for i in "${sizes[@]}"; do
  echo "convert ../../../logo.png -resize "$ix$i" "icon-$i"x"$i.png""
  convert ../../../logo.png -resize "$ix$i" "icon-$i"x"$i.png"
done

