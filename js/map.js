var additional_attrib = 'Created as part of Wildlife Watch project, supported by European Union';
var additional_attrib2 = 'Created as part of Wildlife Watch project, supported by European Union, imagery prvided by <a href="http://www.dgu.hr/">Državna Geodetska uprava</a>';

// // home icon
// var zoomHome = L.Control.zoomHome({position: 'topleft'});
// zoomHome.addTo(map);

var basemap_0 = L.tileLayer.wms('http://geoportal.dgu.hr/wms', {
    layers: 'DOF',
    format: 'image/jpeg',
    attribution: additional_attrib2
});

var basemap_1 = L.tileLayer.wms('http://geoportal.dgu.hr/wms', {
    layers: 'TK25',
    format: 'image/jpeg',
    attribution: additional_attrib2
});

var basemap_2 = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
    attribution: additional_attrib
});

var basemap_3 = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: additional_attrib
});

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

//dodavanje fucnkcije za vraćanje boje na staro
function dehighlightHike (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        hike.resetStyle(layer);
    }
}

function dehighlightwildTrail (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        wildTrail.resetStyle(layer);
    }
}

function dehighlightBike (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        bike.resetStyle(layer);
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
        dehighlight(previous);
    }
}

//dodavanje popupa za mhouse
function onEachFeaturemhouse(feature, marker) {
    var popupContent = '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</h4></div>';
    marker.bindPopup(popupContent);
}

function onEachFeatureOpg(feature, marker) {
    marker.on({"click": function (e) {
         // Create custom popup content
        var popupContent =  '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</div>'+
                            '<div class="popup">' +
                            '<div class="cycle">' +
                                '<div class="slideshow">' +
                                    '<div class="image' + ' active' + '">' +
                                        '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '.jpg" />' +
                                    '</div>'+
                                    '<div class="image' + '">' +
                                        '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '2.jpg" />' +
                                    '</div>'+
                                    '<div class="image' + '">' +
                                        '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '3.jpg" />' +
                                    '</div>'+
                                '</div>' +
                                    '<button href="#" class="prev">&laquo;</button>' +
                                    '<button href="#" class="next">&raquo;</button>' +
                                '</div>'+
                            '</div>'+
                        '<table style="width:256px"><tr><th class="letterSpaceing"scope="row">Adresa</th><td>'+ Autolinker.link(String(feature.properties['addr']))+'</td></tr><tr><th class="letterSpaceing"scope="row">Proizvodi</th><td>'+Autolinker.link(String(feature.properties['prod']));
        var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
        }
    })
}
// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

//sklapanje gornjih funkcija u oneachfeature za biciklističke i planinarske staze
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
            el.clear();
            el.addData(feature);
        },
        'popupclose':function (e) {
            selected=null;
            hike.resetStyle(layer);
        }
    });
    var popupContent = '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</h4></div>';
    layer.bindPopup(popupContent);
}

function onEachFeaturewildTrail(feature, layer) {
    layer.on({
        'mouseover': function (e) {
            highlight(e.target);
        },
        'mouseout': function (e) {
            dehighlightwildTrail(e.target);
        },
        'click': function (e) {
            select(e.target);
            el.clear();
            el.addData(feature);
        },
        'popupclose':function (e) {
            selected=null;
            wildTrail.resetStyle(layer);
        }
    });
    var popupContent = '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</h4></div>'+'<table><tr><th class="letterSpaceing"scope="row">Trajanje ture</th><td>'+ Autolinker.link(String(feature.properties['time'])) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

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
            el.clear();
            el.addData(feature);
        },
        'popupclose':function (e) {
            selected=null;
            bike.resetStyle(layer);
        }
    });
    var popupContent = '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</h4></div>';
    layer.bindPopup(popupContent);
}

function doStylehike(feature) {
    return {
            weight: 3.3,
            color: '#525252',
            dashArray: '',
            opacity: 1.0,
            fillOpacity: 1.0
    };
}

var hike = new L.geoJson(exp_hike,{
    onEachFeature: onEachFeatureHike,
    style: doStylehike
    });

function doStylewildTrail(feature) {
    return {
            weight: 3.3,
            color: '#c1272d',
            dashArray: '',
            opacity: 1.0,
            fillOpacity: 1.0
    };
}

var wildTrail = new L.geoJson(exp_wildTrail,{
    onEachFeature: onEachFeaturewildTrail,
    style: doStylewildTrail
    });

function doStylebike(feature) {
    return {
            weight: 3.3,
            color: '#df824f',
            dashArray: '',
            opacity: 1.0,
            fillOpacity: 1.0
    };
}

var bike = new L.geoJson(exp_bike,{
    onEachFeature: onEachFeatureBike,
    style: doStylebike
});

var mhouseMarker = L.MakiMarkers.icon({
    icon: "campsite",
    color: "#969559",
    size: "m"
});

var mhouse = new L.geoJson(exp_mhouse,{
    onEachFeature: onEachFeaturemhouse,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: mhouseMarker,
            riseOnHover: true
        });
    }
});

var accommodationMarker = L.MakiMarkers.icon({
    icon: "building",
    color: "#004e9e",
    size: "m"
});

var accommodation = new L.geoJson(exp_accommodation,{
    onEachFeature: onEachFeaturemhouse,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: accommodationMarker,
            riseOnHover: true
        });
    }
});

var sceneryMarker = L.MakiMarkers.icon({
    icon: "camera",
    color: "#009e4e",
    size: "m"
});

var scenery = new L.geoJson(exp_scenery,{
    onEachFeature: onEachFeaturemhouse,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: sceneryMarker,
            riseOnHover: true
        });
    }
});

var opgMarker = L.MakiMarkers.icon({
    icon: "farm",
    color: "#c1272d",
    size: "m"
});

var opg = new L.geoJson(exp_opg,{
    onEachFeature: onEachFeatureOpg,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: opgMarker,
            riseOnHover: true
        });
    }
});

var baseMaps = [
    { 
        groupName : "Pozadinske karte",
        expanded : true,
        layers    : {
            'Thunderforest Landscape': basemap_2,
            'ESRI':basemap_3,
            'TK25':basemap_1,
            'Digitalni ortofoto':basemap_0
        }
    }
]; 

var overlays2 = [
    {
    groupName : "Staze",
    expanded  : true,
    layers    : { 
        "Wildlife ture": wildTrail,
        "Planinarske staze": hike,
        "Biciklističke staze": bike,
    }
    },
    {
    groupName : "POI",
    expanded  : true,
    layers    : { 
        "OPG":opg,
        "Planinarske kuće": mhouse,
        "Vidikovci": scenery,
        "Smještaj": accommodation
    }
    }
];

var params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
  params[key] = decodeURIComponent(value);
});

if (params.layers) {
    var overlays = {
    "hike":hike,
    "bike":bike,
    "mhouse":mhouse,
    "accommodation":accommodation,
    "scenery":scenery,
    "wildtrail":wildTrail,
    "opg":opg
    };
    var layers = params.layers.split(',').map(function(item) { 
    return overlays[item]; 
    });
}

var map = L.map('map', { center: [params.lat || 44.26, params.lng || 14.76], zoom: 7, fullscreenControl: true,layers: layers || hike});

basemap_2.addTo(map);

// check if mobile or desktop and load elevation profile and controls accordingly
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.getElementById("map").offsetWidth<1025) {
    if (map.hasLayer(hike)||map.hasLayer(bike)||map.hasLayer(wildTrail)) {
        el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: true,
        });
        el.addTo(map);
    }
    L.Control.styledLayerControl(baseMaps, overlays2, {collapsed:true}).addTo(map);
}
else {
    if (map.hasLayer(hike)||map.hasLayer(bike)||map.hasLayer(wildTrail)) {
        var el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: false,
        });
        el.addTo(map);
    }
    L.Control.styledLayerControl(baseMaps, overlays2, {collapsed:false}).addTo(map);
}

// locate control
L.control.locate().addTo(map);
// scale control
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);