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