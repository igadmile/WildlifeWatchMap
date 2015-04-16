var map = L.map('map', { fullscreenControl: true,zoomControl:false }).fitBounds([[43.83511132,14.2488295908],[45.22224532,16.5379539508]]);
var hash = new L.Hash(map); //add hashes to html address to easy share locations
var additional_attrib = 'created as part of Wildlife Watch project, supported by European Union';

// home icon
var zoomHome = L.Control.zoomHome({position: 'topleft'});
zoomHome.addTo(map);	

var feature_group = new L.featureGroup([]);

var raster_group = new L.LayerGroup([]);

var basemap_0 = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', { 
	attribution: additional_attrib});	
basemap_0.addTo(map);	

// var basemap_1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
// 	attribution: additional_attrib});	
// basemap_1.addTo(map);

var layerOrder=new Array();

//dodavanje fucnkcije za promijenu boje
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 6,
        color: 'yellow',
		fillColor:'yellow',
        opacity: 0.7,
        fillOpacity: 0.7
    });
}

//dodavanje funkcije za vraćanje boje na staro
function resetHighlight(e) {
    exp_stazeJSON.resetStyle(e.target);
}	

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
//sklapanje gornjih funkcija u ineachfeature
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
		click:zoomToFeature
    })
	var popupContent = '<table><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
};

var exp_stazeJSON = new L.geoJson(exp_staze,{
	onEachFeature: onEachFeature,
	style: function (feature) {
		return {weight: feature.properties.radius_qgis2leaf,
				color: feature.properties.color_qgis2leaf,
				opacity: feature.properties.transp_qgis2leaf,
				fillOpacity: feature.properties.transp_qgis2leaf};
		}
	});

feature_group.addLayer(exp_stazeJSON);

// layerOrder[layerOrder.length] = exp_stazeJSON;
// 	for (index = 0; index < layerOrder.length; index++) {
// 		feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }

//add comment sign to hide this layer on the map in the initial view.
exp_stazeJSON.addTo(map);
					
var exp_gospicJSON = new L.geoJson(exp_sredenestaze,{
	onEachFeature: onEachFeature,
	style: function (feature) {
		return {weight: feature.properties.radius_qgis2leaf,
				color: feature.properties.color_qgis2leaf,
				opacity: feature.properties.transp_qgis2leaf,
				fillOpacity: feature.properties.transp_qgis2leaf};
		}
	});
feature_group.addLayer(exp_gospicJSON);

// layerOrder[layerOrder.length] = exp_gospicJSON;
// for (index = 0; index < layerOrder.length; index++) {
// 	feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }
			
//add comment sign to hide this layer on the map in the initial view.
exp_gospicJSON.addTo(map);


var redMarker = L.MakiMarkers.icon({
    icon: "building", 
	color: "#969559", 
	size: "m"
});		

function onEachFeature2(feature, marker) {
	var popupContent = '<table><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr></table>';
	marker.bindPopup(popupContent);
};

var exp_planinarskekueJSON = new L.geoJson(exp_planinarskekue,{
	onEachFeature: onEachFeature2,
	pointToLayer: function (feature, latlng) {  
		return L.marker(latlng, {
			icon: redMarker,
			riseOnHover: true
			})
	}
});

feature_group.addLayer(exp_planinarskekueJSON);

// layerOrder[layerOrder.length] = exp_planinarskekueJSON;
// 
// for (index = 0; index < layerOrder.length; index++) {
// 	feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }

//add comment sign to hide this layer on the map in the initial view.
exp_planinarskekueJSON.addTo(map);

var baseMaps = {
// 	'openstreetmap':basemap_1,
	'Thunderforest Landscape': basemap_0
};

// locate control
L.control.locate().addTo(map);

// search control
map.addControl( new L.Control.Search({layer: exp_planinarskekueJSON, propertyName: 'name'}) );

L.control.layers(baseMaps,{"Planinarske kuće": exp_planinarskekueJSON,"Biciklističke staze": exp_gospicJSON,"Planinarske staze": exp_stazeJSON},{collapsed:false}).addTo(map);
	
// map.locate({setView: true, maxZoom: 16});
// 	
// function onLocationFound(e) {
// 	var radius = e.accuracy / 2;
// 	L.marker(e.latlng).addTo(map)
// 	.bindPopup("You are within " + radius + " meters from this point").openPopup();
// 	L.circle(e.latlng, radius).addTo(map);
// }
// 
// map.on('locationfound', onLocationFound);
	
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);