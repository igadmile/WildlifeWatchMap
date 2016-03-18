#!/bin/bash
mkdir dist;
cp -r . ./dist;
rm -r ./dist/dist;
cat ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css > ./dist/css/includes.css;
rm ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css;
cat ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.min.js ./dist/data/data.js ./dist/js/map.js ./dist/js/slider.js > ./dist/js/include.js;
rm ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.min.js ./dist/data/data.js ./dist/js/map.js ./dist/js/slider.js;
rm  -r ./dist/data;
uglifyjs ./dist/js/include.js > ./dist/js/includes.js;
rm ./dist/js/include.js;