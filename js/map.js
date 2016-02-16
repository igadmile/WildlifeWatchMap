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

var basemap_2 = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
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

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

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
            zoomToFeature(e);
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
            zoomToFeature(e);
        },
        'popupclose':function (e) {
            selected=null;
            wildTrail.resetStyle(layer);
        }
    });
    var popupContent = '<div style="text-align:center"><h4>'+Autolinker.link(String(feature.properties['name']))+'</h4></div>'+'<table><tr><th scope="row">Trajanje ture</th><td>'+ Autolinker.link(String(feature.properties['time'])) + '</td></tr></table>';
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
            zoomToFeature(e);
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
            color: '#7b8db2',
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
            color: '#64a5a5',
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

var baseMaps = {
    'Thunderforest Landscape': basemap_2,
    'TK25':basemap_1,
    'Digital Ortofoto':basemap_0
};

var overlays = {
    "hike":hike,
    "bike":bike,
    "mhouse":mhouse,
    "accommodation":accommodation,
    "scenery":scenery,
    "wildtrail":wildTrail
};

var params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
  params[key] = decodeURIComponent(value);
});

if (params.layers) {
    var layers = params.layers.split(',').map(function(item) { 
    return overlays[item]; 
    });
}

var map = L.map('map', { center: [params.lat || 44.26, params.lng || 14.76], zoom: 7, fullscreenControl: true,layers: layers || hike});
// var map = L.map('map', { fullscreenControl: true,zoomControl:false }).fitBounds([[44.2626173655,14.7660291146],[44.9415644853,16.2414966344]]);

basemap_2.addTo(map);

// map.on('viewreset', onZoomend);
// function onZoomend(){
//     if(map.getZoom()<12)
//      {map.removeLayer(scenery);
//       map.removeLayer(mhouse);
//     }
//     if(map.getZoom()>=12)
//      {map.addLayer(scenery);
//       map.addLayer(mhouse);
//     }
// }

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
    L.control.layers(baseMaps,{"Smještaj": accommodation,"Planinarske kuće": mhouse,"Vidikovci": scenery,"Wildlife ture":wildTrail,"Biciklističke staze": bike,"Planinarske staze": hike},{collapsed:true}).addTo(map);
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
    L.control.layers(baseMaps,{"Smještaj": accommodation,"Planinarske kuće": mhouse,"Vidikovci": scenery,"Wildlife ture":wildTrail,"Biciklističke staze": bike,"Planinarske staze": hike},{collapsed:false}).addTo(map);
}

// locate control
L.control.locate().addTo(map);

L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);