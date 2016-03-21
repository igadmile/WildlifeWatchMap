#!/bin/bash
mkdir dist;
cp -r . ./dist;
rm -r ./dist/dist;

# download included files
wget http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css -P ./dist/css;
wget https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css -P ./dist/css;
wget https://domoritz.github.io/leaflet-locatecontrol/dist/L.Control.Locate.min.css -P ./dist/css;
wget https://code.jquery.com/jquery-2.2.0.min.js -P ./dist/js;
wget http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js -P ./dist/js;
wget https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js -P ./dist/js;
wget https://domoritz.github.io/leaflet-locatecontrol/src/L.Control.Locate.js -P ./dist/js;
wget http://d3js.org/d3.v3.min.js -P ./dist/js;


cat ./dist/css/leaflet.css ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css > ./dist/css/include.css;
rm ./dist/css/leaflet.css ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css;
uglifycss ./dist/css/include.css > ./dist/css/includes.css;
rm ./dist/css/include.css;

cat ./dist/js/jquery-2.2.0.min.js ./dist/js/leaflet.js ./dist/js/Leaflet.fullscreen.min.js ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.js ./dist/js/d3.v3.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.js ./dist/data/data.js ./dist/js/map.js ./dist/js/slider.js > ./dist/js/include.js;
rm  ./dist/js/jquery-2.2.0.min.js ./dist/js/leaflet.js  ./dist/js/Leaflet.fullscreen.min.js ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.js  ./dist/js/d3.v3.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.js ./dist/data/data.js ./dist/js/map.js ./dist/js/slider.js;
rm  -r ./dist/data;
uglifyjs ./dist/js/include.js > ./dist/js/includes.js;
rm ./dist/js/include.js;

wget http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.zip -P ./dist/css;
unzip ./dist/css/leaflet.zip -d ./dist/css
rm ./dist/css/leaflet-src.js ./dist/css/leaflet.css ./dist/css/leaflet.js ./dist/css/leaflet.zip

sed -i 's/<!--include-->.*<!--include end-->//g' ./dist/index.html;
sed -i 's/<!--include final css-->/<link rel="stylesheet" type="text\/css" href="css\/includes.css">/g' ./dist/index.html;
sed -i 's/<!--include final js-->/<script src="js\/includes.js" ><\/script>/g' ./dist/index.html;
sed -i 's/<!--css-->//g' ./dist/index.html;
sed -i 's/<!--javascript-->//g' ./dist/index.html;
sed -i 's/<!--data-->//g' ./dist/index.html;
sed -i 's/<!--	<script>L_PREFER_CANVAS = true;<\/script>-->//g' ./dist/index.html;
sed -i '/^\s*$/d' ./dist/index.html;