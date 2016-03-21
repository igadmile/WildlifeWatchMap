var additional_attrib = 'Created as part of Wildlife Watch project, funded by European Union';
var additional_attrib2 = 'Created as part of Wildlife Watch project, funded by European Union, imagery prvided by <a href="http://www.dgu.hr/">Državna Geodetska uprava</a>';

// take parameters from url and add them to object
var params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    params[key] = decodeURIComponent(value);
});

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
};

//dodavanje objekta za vraćanje boje na staro
var dehighlight = {
    hike:function (layer) {
        if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
            overlays.hike.resetStyle(layer);
        }
    },
    wildtrail:function (layer) {
        if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
            overlays.wildtrail.resetStyle(layer);
        }
    },
    bike:function (layer) {
        if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
            overlays.bike.resetStyle(layer);
        }
    }
};

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
};
// dodavanje objekta oneachFeature
var onEachFeature = {
    mhouse:function (feature, marker) {
        marker.on({"click": function (e) {
            // Create custom popup content
            if (params.lang=='eng') {
                var popupContent =  '<div style="text-align:center;width:256px;"><h3>'+feature.properties['name']+'</div>'+
                                        '<div>'+
                                            '<img class="imgShadow" src="photo/mhouse/' + feature.properties['photo'] + '.jpg" />' +
                                        '</div>'+
                                    '</div>'+
                                '<table style="width:256px;margin:auto"><tr><th class="letterSpaceing"scope="row">Elevation</th><td>'+ feature.properties['ele']+'</td></tr><tr><th class="letterSpaceing"scope="row">House type</th><td>'+feature.properties['tip_eng']+'<tr><th class="letterSpaceing"scope="row">Number of beds</th><td>'+ feature.properties['bed']+'</td></tr></table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
            else {
                var popupContent =  '<div style="text-align:center;width:256px;"><h3>'+feature.properties['name']+'</div>'+
                                        '<div>'+
                                            '<img class="imgShadow" src="photo/mhouse/' + feature.properties['photo'] + '.jpg" />' +
                                        '</div>'+
                                    '</div>'+
                                '<table style="width:256px;margin:auto"><tr><th class="letterSpaceing"scope="row">Nadmorska visina</th><td>'+ feature.properties['ele']+'</td></tr><tr><th class="letterSpaceing"scope="row">Tip kuće</th><td>'+feature.properties['tip']+'<tr><th class="letterSpaceing"scope="row">Broj kreveta</th><td>'+ feature.properties['bed']+'</td></tr></table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
        }
        })
        marker._leaflet_id=feature.properties.name;
    },
    poi:function (feature, marker) {
        var popupContent = '<div style="text-align:center"><h3>'+feature.properties['name']+'</h3></div>';
        marker.bindPopup(popupContent);
    },
    opg:function (feature, marker) {
        marker.on({"click": function (e) {
            if (feature.properties['name']=='OPG Marin Bušljeta') {
                var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                '<div class="image active">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '.jpg" />' +
                                                '</div>'+
                                                '<div class="image">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '2.jpg" />' +
                                                '</div>'+
                                            '</div>' +
                                                '<button href="#" class="prev">&laquo;</button>' +
                                                '<button href="#" class="next">&raquo;</button>' +
                                            '</div>'+
                                        '</div>';
            }
            else if (feature.properties['name']=='OPG Anić') {
                var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                '<div class="image active">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '.jpg" />' +
                                                '</div>'+
                                        '</div>';
            }
            else if (feature.properties['photo']){
                var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                '<div class="image active">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '.jpg" />' +
                                                '</div>'+
                                                '<div class="image">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '2.jpg" />' +
                                                '</div>'+
                                                '<div class="image">' +
                                                    '<img class="imgShadow" src="photo/opg/' + feature.properties['photo'] + '3.jpg" />' +
                                                '</div>'+
                                            '</div>' +
                                                '<button href="#" class="prev">&laquo;</button>' +
                                                '<button href="#" class="next">&raquo;</button>' +
                                            '</div>'+
                                        '</div>';
            }
            else {
                var sliderContent='';
            }
            // Create custom popup content
            if (params.lang=='eng') {
                var popupContent =  '<div style="text-align:center;width:256px;"><h3>'+feature.properties['name']+'</div>'+sliderContent+
                                '<table style="width:256px;margin:auto"><tr><th class="letterSpaceing"scope="row">Adress</th><td>'+ feature.properties['addr']+'</td></tr><tr><th class="letterSpaceing"scope="row">Products</th><td>'+feature.properties['prod2']+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
            else {
                var popupContent =  '<div style="text-align:center;width:256px;"><h3>'+feature.properties['name']+'</div>'+sliderContent+
                                '<table style="width:256px;margin:auto"><tr><th class="letterSpaceing"scope="row">Adresa</th><td>'+ feature.properties['addr']+'</td></tr><tr><th class="letterSpaceing"scope="row">Proizvodi</th><td>'+feature.properties['prod']+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
        }
        })
        marker._leaflet_id=feature.properties.name;
    },
    hike:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                highlight(e.target);
            },
            'mouseout': function (e) {
                dehighlight.hike(e.target);
            },
            'click tap': function (e) {
                highlight(e.target);
                select(e.target);
                el.clear();
                el.addData(feature);
            },
            'popupclose':function (e) {
                selected=null;
                overlays.hike.resetStyle(layer);
            }
        });
        if (params.lang=='eng') {
            var popupContent = '<div style="text-align:center"><h3>'+feature.properties['name']+'</h3></div>'+
                            '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Trail length</th><td>'+ feature.properties['len'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Trail duration</th><td>'+ feature.properties['time'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Trail difficulty</th><td>'+ feature.properties['tez_eng'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = '<div style="text-align:center"><h3>'+feature.properties['name']+'</h3></div>'+
                            '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Dužina staze</th><td>'+ feature.properties['len'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Trajanje staze</th><td>'+ feature.properties['time'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Težina staze</th><td>'+ feature.properties['tez'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    },
    wildtrail:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                highlight(e.target);
            },
            'mouseout': function (e) {
                dehighlight.wildtrail(e.target);
            },
            'click tap': function (e) {
                highlight(e.target);
                select(e.target);
                el.clear();
                el.addData(feature);
            },
            'popupclose':function (e) {
                selected=null;
                overlays.wildtrail.resetStyle(layer);
            }
        });
        if (feature.properties['photo']){
            var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                '<div class="image active">' +
                                                    '<img class="imgShadow" src="photo/wildtrail/' + feature.properties['photo'] + '.jpg" />' +
                                                '</div>'+
                                                '<div class="image">' +
                                                    '<img class="imgShadow" src="photo/wildtrail/' + feature.properties['photo'] + '2.jpg" />' +
                                                '</div>'+
                                                '<div class="image">' +
                                                    '<img class="imgShadow" src="photo/wildtrail/' + feature.properties['photo'] + '3.jpg" />' +
                                                '</div>'+
                                            '</div>' +
                                                '<button href="#" class="prev">&laquo;</button>' +
                                                '<button href="#" class="next">&raquo;</button>' +
                                            '</div>';
        }
        else {
            var sliderContent='';
        }
        if (params.lang=='eng') {
            var popupContent = '<div style="text-align:center;width:256px"><h3>'+feature.properties['name']+'</div>'+sliderContent+
                                    '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Trail length</th><td>'+ feature.properties['len'] + '</td></tr>'+
                                    '<tr><th class="letterSpaceing"scope="row">Trail duration</th><td>'+ feature.properties['time'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = '<div style="text-align:center;width:256px"><h3>'+feature.properties['name']+'</div>'+sliderContent+
                                    '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Dužina staze</th><td>'+ feature.properties['len'] + '</td></tr>'+
                                    '<tr><th class="letterSpaceing"scope="row">Trajanje staze</th><td>'+ feature.properties['time'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    },
    bike:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                highlight(e.target);
            },
            'mouseout': function (e) {
                dehighlight.bike(e.target);
            },
            'click tap': function (e) {
                highlight(e.target);
                select(e.target);
                el.clear();
                el.addData(feature);
            },
            'popupclose':function (e) {
                selected=null;
                overlays.bike.resetStyle(layer);
            }
        });
        if (params.lang=='eng') {
            var popupContent = '<div style="text-align:center"><h3>'+feature.properties['name']+'</h3></div>'+
                            '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Trail length</th><td>'+ feature.properties['len'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Trail duration</th><td>'+ feature.properties['time'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Surface</th><td>'+ feature.properties['pod_eng'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = '<div style="text-align:center"><h3>'+feature.properties['name']+'</h3></div>'+
                            '</div><table style="margin:auto"><tr><th class="letterSpaceing"scope="row">Dužina staze</th><td>'+ feature.properties['len'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Trajanje staze</th><td>'+ feature.properties['time'] + '</td></tr>'+
                            '<tr><th class="letterSpaceing"scope="row">Podloga</th><td>'+ feature.properties['pod'] + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    }
};

var doStyle = {
    hike:function (feature) {
        switch (feature.properties.desc) {
        case 1:
            return {
                weight: '2.3',
                color: '#525252',
                dashArray: '',
                opacity: 0.8,
                fillOpacity: 1.0
            };
            break;
        case 2:
            return {
                weight: '3.3',
                color: '#525252',
                dashArray: '',
                opacity: 0.8,
                fillOpacity: 1.0
            };
            break;
        case 3:
            return {
                weight: '4.3',
                color: '#525252',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
            };
            break;
        default:
        }
    },
    wildtrail:function (feature) {
        return {
                weight: 3.3,
                color: '#009245',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
        };
    },
    bike:function (feature) {
        switch (feature.properties.c) {
        case 1:
            return {
                weight: '2.5',
                color: '#c1272d',
                dashArray: '',
                opacity: 0.8,
                fillOpacity: 1.0
            };
            break;
        case 2:
            return {
                weight: '3.5',
                color: '#c1272d',
                dashArray: '',
                opacity: 0.8,
                fillOpacity: 1.0
            };
            break;
        case 3:
            return {
                weight: '4.5',
                color: '#c1272d',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
            };
            break;
        default:
        }
    },
    mhouse:L.MakiMarkers.icon({
        icon: "campsite",
        color: "#FDB913",
        size: "m"
    }),
    accommodation:L.MakiMarkers.icon({
        icon: "building",
        color: "#0072BC",
        size: "m"
    }),
    scenery:L.MakiMarkers.icon({
        icon: "camera",
        color: "#B3B3B3",
        size: "m"
    }),
    opg:L.MakiMarkers.icon({
        icon: "farm",
        color: "#c1272d",
        size: "m"
    })
};

var overlays = {
    hike:new L.geoJson(exp_hike,{
        onEachFeature: onEachFeature.hike,
        style: doStyle.hike
    }),
    bike:new L.geoJson(exp_bike,{
        onEachFeature: onEachFeature.bike,
        style: doStyle.bike
    }),
    mhouse:new L.geoJson(exp_mhouse,{
        onEachFeature: onEachFeature.mhouse,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: doStyle.mhouse,
                riseOnHover: true
            });
        }
    }),
    accommodation:new L.geoJson(exp_accommodation,{
        onEachFeature: onEachFeature.poi,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: doStyle.accommodation,
                riseOnHover: true
            });
        }
    }),
    scenery:new L.geoJson(exp_scenery,{
        onEachFeature: onEachFeature.poi,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: doStyle.scenery,
                riseOnHover: true
            });
        }
    }),
    wildtrail:new L.geoJson(exp_wildTrail,{
        onEachFeature: onEachFeature.wildtrail,
        style: doStyle.wildtrail
    }),
    opg:new L.geoJson(exp_opg,{
        onEachFeature: onEachFeature.opg,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: doStyle.opg,
                riseOnHover: true
            });
        }
    })
};

if (params.lang=='eng') {
    var baseMaps = [
        { 
            groupName : "Basemaps",
            expanded : true,
            layers    : {
                'Thunderforest Landscape': basemap_2,
                'Topographic map':basemap_1,
                'Digital orthophoto':basemap_0
            }
        }
    ]; 
    var overlays2 = [
        {
        groupName : "Trails",
        expanded  : true,
        layers    : { 
            "Wildlife trails": overlays.wildtrail,
            "Hiking trails": overlays.hike,
            "Biking trails": overlays.bike,
        }
        },
        {
        groupName : "POI",
        expanded  : true,
        layers    : { 
            "Family farms":overlays.opg,
            "Mountain shelters": overlays.mhouse,
            "Scenery": overlays.scenery,
            "Accommodation": overlays.accommodation
        }
        }
    ];
}
else {
    var baseMaps = [
        { 
            groupName : "Pozadinske karte",
            expanded : true,
            layers    : {
                'Thunderforest Landscape': basemap_2,
                'Topografska karta':basemap_1,
                'Digitalni ortofoto':basemap_0
            }
        }
    ]; 
    var overlays2 = [
        {
        groupName : "Staze",
        expanded  : true,
        layers    : { 
            "Staze u prirodi": overlays.wildtrail,
            "Planinarske staze": overlays.hike,
            "Biciklističke staze": overlays.bike,
        }
        },
        {
        groupName : "POI",
        expanded  : true,
        layers    : { 
            "OPG":overlays.opg,
            "Planinarske kuće": overlays.mhouse,
            "Vidikovci": overlays.scenery,
            "Smještaj": overlays.accommodation
        }
        }
    ];
}

if (params.layers) {
    var layers = params.layers.split(',').map(function(item) { 
        return overlays[item]; 
    });
}

var map = L.map('map', {scrollWheelZoom:false,center: [params.lat || 44.59, params.lng || 15.36], zoom: params.zoom || 9, fullscreenControl: true,layers: layers || overlays.hike});
basemap_2.addTo(map);

// enable scrolling only after you click on map
map.once('focus', function() { map.scrollWheelZoom.enable(); });
map.on('click', function() {
    map.scrollWheelZoom.enable();
});

function init (parameter) {
    el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: parameter,
    });
    el.addTo(map);
    L.Control.styledLayerControl(baseMaps, overlays2, {collapsed:parameter}).addTo(map);

    if(params.layers && params.feat){
        if(params.layers=='opg' || params.layers=='scenery' || params.layers=='mhouse' || params.layers=='accommodation') {
            layers[0]._layers[params.feat].fire('click', {latlng:layers[0]._layers[params.feat]._latlng});
            
        }
        else {
            //change max zoom for fitBounds if requested
            if (params.zoom && params.padding){
                var boundsParams={maxZoom:params.zoom,paddingTopLeft:[0,params.padding]};
            }
            else if (params.zoom){
                var boundsParams={maxZoom:params.zoom};
            }
            else {
                var boundsParams={maxZoom:18};
            }
            var featureCoordinates=layers[0]._layers[params.feat]._latlngs;
            layers[0]._layers[params.feat].fire('click', {latlng:featureCoordinates[Math.round((featureCoordinates.length - 50) / 2)]});
            map.fitBounds(layers[0]._layers[params.feat].getBounds(),boundsParams);
        }
    }
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.getElementById("map").offsetWidth<1025) {
    init(true);
}
else {
    init(false);
}

// locate control
L.control.locate().addTo(map);
// scale control
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);