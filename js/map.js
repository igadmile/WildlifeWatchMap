// take parameters from url and add them to object
var wwwMap ={};
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
wwwMap.dehighlight = function (layer,overlay) {
    if (wwwMap.selected === null || wwwMap.selected._leaflet_id !== layer._leaflet_id) {
        overlay.resetStyle(layer);
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
        return '<div style="text-align:center;'+width+'"><h3>'+feature.properties['name']+'</h3></div>';
    },
    img: function (source,feature,activity,picNum) {
        return '<div class="image '+activity+'"><img class="imgShadow" src="photo/'+source + feature.properties['photo'] + picNum+'.jpg" /></div>';
    },
    table: function (title,value) {
        var rows = ['<table style="width:256px;margin:auto">'];
        for (i = 0; i < title.length; i++) {
            rows.push('<tr><th class="letterSpaceing"scope="row">'+title[i]+'</th><td>'+ value[i]+'</td></tr>');
        }
        rows.push('</table>');
        return rows.join('');
    },
    button: function (title,value) {
        return '</div><button href="#" class="prev">&laquo;</button><button href="#" class="next">&raquo;</button></div></div>';
    },
    slideshow: '<div class="popup"><div class="cycle"><div class="slideshow">'
};

wwwMap.oneachFeatureEvents = {
    lineClick: function (feature,e) {
        wwwMap.highlight(e.target);
        wwwMap.select(e.target);
        wwwMap.el.clear();
        wwwMap.el.addData(feature);
    },
    photoSlide: function (feature,type) {
        return wwwMap.html.slideshow+wwwMap.html.img(type,feature,'active','')+wwwMap.html.img(type,feature,'','2')+wwwMap.html.img(type,feature,'','3')+wwwMap.html.button();
    }
};

// dodavanje objekta oneachFeature
wwwMap.onEachFeature = {
    mhouse:function (feature, marker) {
        marker.on({"click": function (e) {
            // Create custom popup content
            if (wwwMap.params.lang=='eng') {
                var popupContent =  wwwMap.html.name(feature)+wwwMap.html.img('mhouse/',feature,'','')+wwwMap.html.table(['Elevation','House type','Number of beds'],[feature.properties['ele'],feature.properties['tip_eng'],feature.properties['bed']]);
            }
            else {
                var popupContent =  wwwMap.html.name(feature)+wwwMap.html.img('mhouse/',feature,'','')+wwwMap.html.table(['Nadmorska visina','Tip kuće','Broj kreveta'],[feature.properties['ele'],feature.properties['tip'],feature.properties['bed']]);
            }
            var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
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
                var sliderContent=wwwMap.oneachFeatureEvents.photoSlide(feature,'opg/');
            }
            else {
                var sliderContent='';
            }
            // Create custom popup content
            if (wwwMap.params.lang=='eng') {
                var popupContent =  wwwMap.html.name(feature)+sliderContent+wwwMap.html.table(['Adress','Products'],[feature.properties['addr'],feature.properties['prod2']]);
            }
            else {
                var popupContent = wwwMap.html.name(feature)+sliderContent+wwwMap.html.table(['Adresa','Proizvodi'],[feature.properties['addr'],feature.properties['prod']]);
            }
            var popup = L.popup({"maxWidth":256, "minWidth":256}).setLatLng(e.latlng).setContent(popupContent).openOn(map);
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
                wwwMap.dehighlight(e.target,wwwMap.overlays.hike);
            },
            'click tap': function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature,e);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.dehighlight(e.target,wwwMap.overlays.hike);
            }
        });
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature)+wwwMap.html.table(['Trail length','Trail duration','Trail difficulty'],[feature.properties['len'],feature.properties['time'],feature.properties['tez_eng']]);
        }
        else {
            var popupContent = wwwMap.html.name(feature)+wwwMap.html.table(['Dužina staze','Trajanje staze','Težina staze'],[feature.properties['len'],feature.properties['time'],feature.properties['tez']]);
        }
        layer.bindPopup(popupContent);
        layer._leaflet_id=feature.properties.name;
    },
    wildtrail:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                wwwMap.highlight(e.target);
            },
            'mouseout': function (e) {
                wwwMap.dehighlight(e.target,wwwMap.overlays.wildtrail);
            },
            'click tap': function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature,e);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.dehighlight(e.target,wwwMap.overlays.wildtrail);
            }
        });
        if (feature.properties['photo']){
            var sliderContent=wwwMap.oneachFeatureEvents.photoSlide(feature,'wildtrail/');
        }
        else {
            var sliderContent='';
        }
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature,'width:256px;')+sliderContent+wwwMap.html.table(['Trail length','Trail duration'],[feature.properties['len'],feature.properties['time']]);
        }
        else {
            var popupContent = wwwMap.html.name(feature,'width:256px;')+sliderContent+wwwMap.html.table(['Dužina staze','Trajanje staze'],[feature.properties['len'],feature.properties['time']]);
        }
        layer.bindPopup(popupContent);
        layer._leaflet_id=feature.properties.name;
    },
    bike:function (feature, layer) {
        layer.on({
            'mouseover': function (e) {
                wwwMap.highlight(e.target);
            },
            'mouseout': function (e) {
                wwwMap.dehighlight(e.target,wwwMap.overlays.bike);
            },
            'click tap': function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature,e);
            },
            'popupclose':function (e) {
                wwwMap.selected=null;
                wwwMap.dehighlight(e.target,wwwMap.overlays.bike);
            }
        });
        if (wwwMap.params.lang=='eng') {
            var popupContent = wwwMap.html.name(feature)+wwwMap.html.table(['Trail length','Trail duration','Surface'],[feature.properties['len'],feature.properties['time'],feature.properties['pod_eng']]);
        }
        else {
            var popupContent = wwwMap.html.name(feature)+wwwMap.html.table(['Dužina staze','Trajanje staze','Podloga'],[feature.properties['len'],feature.properties['time'],feature.properties['pod']]);
        }
        layer.bindPopup(popupContent);
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
        };
        return styleReturn;
    },
    styleMarker:function (icon,color) {
        var styleReturn = L.MakiMarkers.icon({
            icon: icon,
            color: color,
            size: "m"
        });
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
wwwMap.basemaps = {
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