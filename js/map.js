// take parameters from url and add them to object
var wwwMap ={}
wwwMap.params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    wwwMap.params[key] = decodeURIComponent(value);
});

//dodavanje fucnkcije za promijenu boje
wwwMap.highlight = function (layer) {
    layer.setStyle({
        weight: 6,
        color: 'yellow',
        opacity: 0.7,
    });
    layer.bringToFront();
};

//dodavanje objekta za vraćanje boje na staro
wwwMap.dehighlight = {
    hike:function (layer) {
        if (wwwMap.selected === null || wwwMap.selected._leaflet_id !== layer._leaflet_id) {
            wwwMap.overlays.hike.resetStyle(layer);
        }
    },
    wildtrail:function (layer) {
        if (wwwMap.selected === null || wwwMap.selected._leaflet_id !== layer._leaflet_id) {
            wwwMap.overlays.wildtrail.resetStyle(layer);
        }
    },
    bike:function (layer) {
        if (wwwMap.selected === null || wwwMap.selected._leaflet_id !== layer._leaflet_id) {
           wwwMap.overlays.bike.resetStyle(layer);
        }
    }
};

wwwMap.selected = null;
wwwMap.select = function(layer) {
    // See if there is already a selection
    if (wwwMap.selected !== null) {
        // Store for now
        var previous = wwwMap.selected;
    }
    // Set new selection
    wwwMap.selected = layer;
    // If there was a previous selection
    if (previous) {
        // Dehighlight previous
        wwwMap.dehighlight(previous);
    }
};

wwwMap.html = {
	name: function (feature,width) {
		return'<div style="text-align:center;'+width+'"><h3>'+feature.properties['name']+'</h3></div>';
	},
	img: function (source,feature,activity,picNum) {
		return '<div class="image '+activity+'">'+
                    '<img class="imgShadow" src="photo/'+source + feature.properties['photo'] + picNum+'.jpg" />' +
                '</div>';
	},
	tableRow: function (title,value) {
		return '<tr><th class="letterSpaceing"scope="row">'+title+'</th><td>'+ value+'</td></tr><tr>';
	},
	button: function (title,value) {
		return '</div><button href="#" class="prev">&laquo;</button><button href="#" class="next">&raquo;</button></div>';
	}
};

// dodavanje objekta oneachFeature
wwwMap.onEachFeature = {
    mhouse:function (feature, marker) {
        marker.on({"click": function (e) {
            // Create custom popup content
            if (wwwMap.params.lang=='eng') {
                var popupContent =  wwwMap.html.name(feature)+wwwMap.html.img('mhouse/',feature,'','')+
                                '<table style="width:256px;margin:auto">'+wwwMap.html.tableRow('Elevation',feature.properties['ele'])+wwwMap.html.tableRow('House type',feature.properties['tip_eng'])+wwwMap.html.tableRow('Number of beds',feature.properties['bed'])+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
            else {
                var popupContent =  wwwMap.html.name(feature)+wwwMap.html.img('mhouse/',feature,'','')+
                                '<table style="width:256px;margin:auto">'+wwwMap.html.tableRow('Nadmorska visina',feature.properties['ele'])+wwwMap.html.tableRow('Tip kuće',feature.properties['tip'])+wwwMap.html.tableRow('Broj kreveta',feature.properties['bed'])+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
        }
        })
        marker._leaflet_id=feature.properties.name;
    },
    poi:function (feature, marker) {
        var popupContent = wwwMap.html.name(feature);
        marker.bindPopup(popupContent);
    },
    opg:function (feature, marker) {
        marker.on({"click": function (e) {
            if (feature.properties['photo']){
                var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                wwwMap.html.img('opg/',feature,'active','')+
                                                wwwMap.html.img('opg/',feature,'','2')+
                                                wwwMap.html.img('opg/',feature,'','3')+
                                            	wwwMap.html.button()+
                                        '</div>';
            }
            else {
                var sliderContent='';
            }
            // Create custom popup content
            if (wwwMap.params.lang=='eng') {
                var popupContent =  wwwMap.html.name(feature)+sliderContent+
                                '<table style="width:256px;margin:auto">'+wwwMap.html.tableRow('Adress',feature.properties['addr'])+wwwMap.html.tableRow('Products',feature.properties['prod2'])+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
            else {
                var popupContent = wwwMap.html.name(feature)+sliderContent+
                                '<table style="width:256px;margin:auto">'+wwwMap.html.tableRow('Adresa',feature.properties['addr'])+wwwMap.html.tableRow('Proizvodi',feature.properties['prod'])+'</table>';
                var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            }
        }
        })
        marker._leaflet_id=feature.properties.name;
    },
    hike:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                wwwMap.highlight(e.target);
            },
            'mouseout': function (e) {
                wwwMap.dehighlight.hike(e.target);
            },
            'click tap': function (e) {
                wwwMap.highlight(e.target);
                wwwMap.select(e.target);
                wwwMap.el.clear();
                wwwMap.el.addData(feature);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.overlays.hike.resetStyle(layer);
            }
        });
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature)+
                            '</div><table style="margin:auto">'+wwwMap.html.tableRow('Trail length',feature.properties['len'])+wwwMap.html.tableRow('Trail duration',feature.properties['time'])+wwwMap.html.tableRow('Trail difficulty',feature.properties['tez_eng'])+'</table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = wwwMap.html.name(feature)+
                            '</div><table style="margin:auto">'+wwwMap.html.tableRow('Dužina staze',feature.properties['len'])+wwwMap.html.tableRow('Trajanje staze',feature.properties['time'])+wwwMap.html.tableRow('Težina staze',feature.properties['tez'])+'</table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    },
    wildtrail:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                wwwMap.highlight(e.target);
            },
            'mouseout': function (e) {
                wwwMap.dehighlight.wildtrail(e.target);
            },
            'click tap': function (e) {
                wwwMap.highlight(e.target);
                wwwMap.select(e.target);
                wwwMap.el.clear();
               wwwMap.el.addData(feature);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.overlays.wildtrail.resetStyle(layer);
            }
        });
        if (feature.properties['photo']){
            var sliderContent='<div class="popup">' +
                                        '<div class="cycle">' +
                                            '<div class="slideshow">' +
                                                wwwMap.html.img('wildtrail/',feature,'active','')+
                                                wwwMap.html.img('wildtrail/',feature,'','2')+
                                                wwwMap.html.img('wildtrail/',feature,'','3')+
		                                        wwwMap.html.button()+
		                                 '</div>';
        }
        else {
            var sliderContent='';
        }
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature,'width:256px;')+sliderContent+
                                    '</div><table style="margin:auto">'+wwwMap.html.tableRow('Trail length',feature.properties['len'])+wwwMap.html.tableRow('Trail duration',feature.properties['time'])+'</table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = wwwMap.html.name(feature,'width:256px;')+sliderContent+
                                    '</div><table style="margin:auto">'+wwwMap.html.tableRow('Dužina staze',feature.properties['len'])+wwwMap.html.tableRow('Trajanje staze',feature.properties['time'])+'</table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    },
    bike:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                wwwMap.highlight(e.target);
            },
            'mouseout': function (e) {
                wwwMap.dehighlight.bike(e.target);
            },
            'click tap': function (e) {
                wwwMap.highlight(e.target);
                wwwMap.select(e.target);
                wwwMap.el.clear();
                wwwMap.el.addData(feature);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.overlays.bike.resetStyle(layer);
            }
        });
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature)+
                            '</div><table style="margin:auto">'+wwwMap.html.tableRow('Trail length',feature.properties['len'])+wwwMap.html.tableRow('Trail duration',feature.properties['time'])+wwwMap.html.tableRow('Surface',feature.properties['pod_eng'])+'</table>';
            layer.bindPopup(popupContent);
        }
        else {
            var popupContent = wwwMap.html.name(feature)+
                            '</div><table style="margin:auto">'+wwwMap.html.tableRow('Dužina staze',feature.properties['len'])+wwwMap.html.tableRow('Trajanje staze',feature.properties['time'])+wwwMap.html.tableRow('Podloga',feature.properties['pod'])+'</table>';
            layer.bindPopup(popupContent);
        }
        layer._leaflet_id=feature.properties.name;
    }
};

wwwMap.stylePresets = {
	styleLine:function (weight,color) {
		var styleReturn = {
			weight: weight,
			color: color,
			opacity: 0.8,
			fillOpacity: 1.0
		}
		return styleReturn;
	},
	styleMarker:function (icon,color) {
		var styleReturn = L.MakiMarkers.icon({
		    icon: icon,
		    color: color,
		    size: "m"
		})
		return styleReturn;
	}
};

wwwMap.doStyle = {
    hike: function (feature) {
        switch (feature.properties.desc) {
        case 1:
            return wwwMap.stylePresets.styleLine('2.3','#525252');
            break;
        case 2:
            return wwwMap.stylePresets.styleLine('2.3','#525252');
        case 3:
            return wwwMap.stylePresets.styleLine('4.3','#525252');
            break;
        default:
        }
    },
    wildtrail:function (feature) {
        return wwwMap.stylePresets.styleLine('3.3','#009245');
    },
    bike:function (feature) {
        switch (feature.properties.c) {
        case 1:
            return wwwMap.stylePresets.styleLine('2.5','#c1272d');
            break;
        case 2:
            return wwwMap.stylePresets.styleLine('3.5','#c1272d');
            break;
        case 3:
            return wwwMap.stylePresets.styleLine('4.5','#c1272d');
            break;
        default:
        }
    },
    mhouse:wwwMap.stylePresets.styleMarker('campsite','#FDB913'),
    accommodation:wwwMap.stylePresets.styleMarker('building','#0072BC'),
    scenery:wwwMap.stylePresets.styleMarker('camera','#B3B3B3'),
    opg:wwwMap.stylePresets.styleMarker('farm','#c1272d'),
};

wwwMap.overlays = {
    hike:L.geoJson(exp_hike,{
        onEachFeature: wwwMap.onEachFeature.hike,
        style: wwwMap.doStyle.hike
    }),
    bike:L.geoJson(exp_bike,{
        onEachFeature: wwwMap.onEachFeature.bike,
        style: wwwMap.doStyle.bike
    }),
    mhouse:L.geoJson(exp_mhouse,{
        onEachFeature: wwwMap.onEachFeature.mhouse,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: wwwMap.doStyle.mhouse,
                riseOnHover: true
            });
        }
    }),
    accommodation:L.geoJson(exp_accommodation,{
        onEachFeature: wwwMap.onEachFeature.poi,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: wwwMap.doStyle.accommodation,
                riseOnHover: true
            });
        }
    }),
    scenery:L.geoJson(exp_scenery,{
        onEachFeature: wwwMap.onEachFeature.poi,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: wwwMap.doStyle.scenery,
                riseOnHover: true
            });
        }
    }),
    wildtrail:L.geoJson(exp_wildTrail,{
        onEachFeature: wwwMap.onEachFeature.wildtrail,
        style: wwwMap.doStyle.wildtrail
    }),
    opg:L.geoJson(exp_opg,{
        onEachFeature: wwwMap.onEachFeature.opg,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: wwwMap.doStyle.opg,
                riseOnHover: true
            });
        }
    })
};

wwwMap.additional_attrib = 'Created as part of Wildlife Watch project, funded by European Union';
wwwMap.additional_attrib2 = 'Created as part of Wildlife Watch project, funded by European Union, imagery prvided by <a href="http://www.dgu.hr/">Državna Geodetska uprava</a>';
wwwMap.basemaps ={
    basemap_0:L.tileLayer.wms('http://geoportal.dgu.hr/wms', {
        layers: 'DOF',
        format: 'image/jpeg',
        attribution: wwwMap.additional_attrib2
    }),
    basemap_1:L.tileLayer.wms('http://geoportal.dgu.hr/wms', {
        layers: 'TK25',
        format: 'image/jpeg',
        attribution: wwwMap.additional_attrib2
    }),
    basemap_2:L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
        attribution: wwwMap.additional_attrib
    })
};

if (wwwMap.params.lang=='eng') {
    wwwMap.baseMaps = [
        { 
            groupName : "Basemaps",
            expanded : true,
            layers    : {
                'Thunderforest Landscape': wwwMap.basemaps.basemap_2,
                'Topographic map':wwwMap.basemaps.basemap_1,
                'Digital orthophoto':wwwMap.basemaps.basemap_0
            }
        }
    ]; 
    wwwMap.overlays2 = [
        {
        groupName : "Trails",
        expanded  : true,
        layers    : { 
            "Wildlife trails": wwwMap.overlays.wildtrail,
            "Hiking trails": wwwMap.overlays.hike,
            "Biking trails": wwwMap.overlays.bike,
        }
        },
        {
        groupName : "POI",
        expanded  : true,
        layers    : { 
            "Family farms":wwwMap.overlays.opg,
            "Mountain shelters": wwwMap.overlays.mhouse,
            "Scenery": wwwMap.overlays.scenery,
            "Accommodation": wwwMap.overlays.accommodation
        }
        }
    ];
}
else {
    wwwMap.baseMaps = [
        { 
            groupName : "Pozadinske karte",
            expanded : true,
            layers    : {
                'Thunderforest Landscape': wwwMap.basemaps.basemap_2,
                'Topografska karta':wwwMap.basemaps.basemap_1,
                'Digitalni ortofoto':wwwMap.basemaps.basemap_0
            }
        }
    ]; 
    wwwMap.overlays2 = [
        {
        groupName : "Staze",
        expanded  : true,
        layers    : { 
            "Staze u prirodi": wwwMap.overlays.wildtrail,
            "Planinarske staze": wwwMap.overlays.hike,
            "Biciklističke staze": wwwMap.overlays.bike,
        }
        },
        {
        groupName : "POI",
        expanded  : true,
        layers    : { 
            "OPG":wwwMap.overlays.opg,
            "Planinarske kuće": wwwMap.overlays.mhouse,
            "Vidikovci": wwwMap.overlays.scenery,
            "Smještaj": wwwMap.overlays.accommodation
        }
        }
    ];
}

if (wwwMap.params.layers) {
    wwwMap.layers = wwwMap.params.layers.split(',').map(function(item) { 
        return wwwMap.overlays[item]; 
    });
}

var map = L.map('map', {scrollWheelZoom:false,center: [wwwMap.params.lat || 44.59, wwwMap.params.lng || 15.36], zoom: wwwMap.params.zoom || 9, fullscreenControl: true,layers: wwwMap.layers || wwwMap.overlays.hike});
wwwMap.basemaps.basemap_2.addTo(map);

// enable scrolling only after you click on map
map.once('focus', function() { map.scrollWheelZoom.enable(); });
map.on('click', function() {
    map.scrollWheelZoom.enable();
});

wwwMap.init=function (parameter) {
    wwwMap.el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: parameter,
    });
    wwwMap.el.addTo(map);
    L.Control.styledLayerControl(wwwMap.baseMaps, wwwMap.overlays2, {collapsed:parameter}).addTo(map);

    if(wwwMap.params.layers && wwwMap.params.feat){
        if(wwwMap.params.layers=='opg' || wwwMap.params.layers=='scenery' || wwwMap.params.layers=='mhouse' || wwwMap.params.layers=='accommodation') {
            wwwMap.layers[0]._layers[wwwMap.params.feat].fire('click', {latlng:wwwMap.layers[0]._layers[wwwMap.params.feat]._latlng});
            
        }
        else {
            //change max zoom for fitBounds if requested
            if (wwwMap.params.zoom && wwwMap.params.padding){
                wwwMap.boundsParams={maxZoom:wwwMap.params.zoom,paddingTopLeft:[0,wwwMap.params.padding]};
            }
            else if (wwwMap.params.zoom){
                wwwMap.boundsParams={maxZoom:wwwMap.params.zoom};
            }
            else {
                wwwMap.boundsParams={maxZoom:18};
            }
            var featureCoordinates=wwwMap.layers[0]._layers[wwwMap.params.feat]._latlngs;
            wwwMap.layers[0]._layers[wwwMap.params.feat].fire('click', {latlng:featureCoordinates[Math.round((featureCoordinates.length - 50) / 2)]});
            map.fitBounds(wwwMap.layers[0]._layers[wwwMap.params.feat].getBounds(),wwwMap.boundsParams);
        }
    }
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.getElementById("map").offsetWidth<1025) {
    wwwMap.init(true);
}
else {
    wwwMap.init(false);
}

// locate control
L.control.locate().addTo(map);
// scale control
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);
