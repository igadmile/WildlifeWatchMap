#!/bin/bash
rsync -auv . dist

# download included files
wget https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css -P ./dist/css;
wget http://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css -P ./dist/css;
wget https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css -P ./dist/css;
wget https://domoritz.github.io/leaflet-locatecontrol/dist/L.Control.Locate.min.css -P ./dist/css;

wget https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js -P ./dist/js;
wget https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js -P ./dist/js;
wget https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js -P ./dist/js;
wget https://code.jquery.com/jquery-2.2.0.min.js -P ./dist/js;
wget http://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js -P ./dist/js;
wget https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js -P ./dist/js;
wget https://domoritz.github.io/leaflet-locatecontrol/src/L.Control.Locate.js -P ./dist/js;
wget http://d3js.org/d3.v3.min.js -P ./dist/js;
wget http://fontawesome.io/assets/font-awesome-4.7.0.zip -P ./dist;

unzip ./dist/font-awesome-4.7.0.zip -d ./dist;
cp ./dist/font-awesome-4.7.0/css/font-awesome.min.css ./dist/css;
cp -r ./dist/font-awesome-4.7.0/fonts ./dist;
rm -r ./dist/font-awesome-4.7.0;
rm -r ./dist/font-awesome-4.7.0.zip;

cat ./dist/css/bootstrap.min.css ./dist/css/font-awesome.min.css ./dist/css/leaflet.css  ./dist/css/leaflet-sidebar.min.css ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css > ./dist/css/include.css;
rm ./dist/css/bootstrap.min.css ./dist/css/font-awesome.min.css ./dist/css/leaflet.css ./dist/css/leaflet-sidebar.min.css ./dist/css/leaflet.fullscreen.css ./dist/css/L.Control.Locate.min.css ./dist/css/leaflet.elevation-0.0.4.css ./dist/css/styledLayerControl.css ./dist/css/own_style.css;
uglifycss ./dist/css/include.css > ./dist/css/includes.css;
rm ./dist/css/include.css;

cat ./dist/js/angular.min.js ./dist/js/angular-animate.min.js ./dist/js/ui-bootstrap-tpls.min.js ./dist/js/jquery-2.2.0.min.js ./dist/js/leaflet.js ./dist/js/leaflet-sidebar.min.js ./dist/js/Leaflet.fullscreen.min.js ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.js ./dist/js/d3.v3.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.js ./dist/code/angular/app.js ./dist/data/data.js ./dist/code/params.js ./dist/code/events.js ./dist/code/layers.js ./dist/code/map.js ./dist/code/init.js ./dist/code/slider.js > ./dist/js/include.js;
rm  ./dist/js/angular.min.js ./dist/js/angular-animate.min.js  ./dist/js/ui-bootstrap-tpls.min.js  ./dist/js/jquery-2.2.0.min.js ./dist/js/leaflet.js  ./dist/js/leaflet-sidebar.min.js ./dist/js/Leaflet.fullscreen.min.js ./dist/js/Leaflet.MakiMarkers.js ./dist/js/L.Control.Locate.js  ./dist/js/d3.v3.min.js ./dist/js/leaflet.elevation-0.0.4.min.js ./dist/js/styledLayerControl.js ./dist/code/angular/app.js ./dist/data/data.js ./dist/code/params.js ./dist/code/events.js ./dist/code/layers.js ./dist/code/map.js ./dist/code/init.js ./dist/code/slider.js;
rm  -r ./dist/data ./dist/code;
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
sed -i '/^\s*$/d' ./dist/index.html;

rm ./dist/kmlTogpx.sh ./dist/LICENSE ./dist/qgis.py
