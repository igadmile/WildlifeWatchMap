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
function highlight (layer) {
    layer.setStyle({
        weight: 6,
        color: 'yellow',
        fillColor:'yellow',
        opacity: 0.7,
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function dehighlightBike (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        bike.resetStyle(layer);
    }
}

function dehighlightHike (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        hike.resetStyle(layer);
    }
}

var selected = null;

function select (layer) {
    // See if there is already a selection
    if (selected !== null) {
        // Store for now
        var previous = selected;
    }
    // Set new selection
    selected = layer;
    // If there was a previous selection
    if (previous) {
        // Dehighlight previous
        dehighlightBike(previous);
        dehighlightHike(previous);
    }
}

//sklapanje gornjih funkcija u oneachfeature za plninarske staze
function onEachFeatureMhouse(feature, marker) {
	var popupContent = '<table><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr></table>';
	marker.bindPopup(popupContent);
};

//sklapanje gornjih funkcija u oneachfeature za biciklističke staze
function onEachFeatureBike(feature, layer) {
    layer.on({
        'mouseover': function (e) {
                highlight(e.target);
        },
        'mouseout': function (e) {
            dehighlightBike(e.target);
        },
        'click': function (e) {
            select(e.target);
        }
    })
	var popupContent = '<table><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
};

function onEachFeatureHike(feature, layer) {
    layer.on({
        'mouseover': function (e) {
                highlight(e.target);
        },
        'mouseout': function (e) {
            dehighlightHike(e.target);
        },
        'click': function (e) {
            select(e.target);
        }
    })
	var popupContent = '<table><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
};

var hike = new L.geoJson(exp_staze,{
	onEachFeature: onEachFeatureHike,
	style: function (feature) {
		return {weight: feature.properties.radius_qgis2leaf,
                        color: feature.properties.color_qgis2leaf,
                        opacity: feature.properties.transp_qgis2leaf,
                        fillOpacity: feature.properties.transp_qgis2leaf};
		}
	});

feature_group.addLayer(hike);

// layerOrder[layerOrder.length] = hike;
// 	for (index = 0; index < layerOrder.length; index++) {
// 		feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }

//add comment sign to hide this layer on the map in the initial view.
hike.addTo(map);

function styleBike(feature) {
        return {
                weight: 3.3,
                color: '#33a02c',
                dashArray: '',
                opacity: 0.8,
                fillOpacity: 0.9
        };
}					
var bike = new L.geoJson(exp_sredenestaze,{
	onEachFeature: onEachFeatureBike,
	style: styleBike
});
feature_group.addLayer(bike);

// layerOrder[layerOrder.length] = bike;
// for (index = 0; index < layerOrder.length; index++) {
// 	feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }
			
//add comment sign to hide this layer on the map in the initial view.
bike.addTo(map);


var redMarker = L.MakiMarkers.icon({
    icon: "building", 
    color: "#969559", 
    size: "m"
});		

var Mhouse = new L.geoJson(exp_planinarskekue,{
	onEachFeature: onEachFeatureMhouse,
	pointToLayer: function (feature, latlng) {  
		return L.marker(latlng, {
			icon: redMarker,
			riseOnHover: true
			})
	}
});

feature_group.addLayer(Mhouse);

// layerOrder[layerOrder.length] = Mhouse;
// 
// for (index = 0; index < layerOrder.length; index++) {
// 	feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
// }

//add comment sign to hide this layer on the map in the initial view.
Mhouse.addTo(map);

var baseMaps = {
// 	'openstreetmap':basemap_1,
	'Thunderforest Landscape': basemap_0
};

// locate control
L.control.locate().addTo(map);

// search control
map.addControl( new L.Control.Search({layer: Mhouse, propertyName: 'name'}) );

L.control.layers(baseMaps,{"Planinarske kuće": Mhouse,"Biciklističke staze": bike,"Planinarske staze": hike},{collapsed:false}).addTo(map);
	
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);