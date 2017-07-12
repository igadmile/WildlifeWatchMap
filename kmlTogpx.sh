#!/bin/bash

for i in *.kml; do
    ogr2ogr -f GPX -nlt POINT "${i::-4}".gpx "${i::-4}".kml
done
