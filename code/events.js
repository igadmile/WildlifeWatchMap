//dodavanje fucnkcije za promijenu boje
wwwMap.highlight = function (layer) {
    'use strict';
    layer.setStyle({
        weight: 6,
        color: 'yellow',
        opacity: 0.7
    });
    layer.bringToFront();
};

//dodavanje objekta za vraćanje boje na staro
wwwMap.dehighlight = function (layer, layerName) {
    'use strict';
    if (wwwMap.selected === null || wwwMap.selected._leaflet_id !== layer._leaflet_id) {
        layer.setStyle(layerName);
    }
};

wwwMap.selected = null;
wwwMap.select = function (layer) {
    'use strict';
    wwwMap.selected = layer;
};

wwwMap.html = {
    name: function (feature, width) {
        'use strict';
        return '<div style="text-align:center;' + width + '"><h3>' + feature.properties.name + '</h3></div>';
    },
    img: function (source, feature, activity, picNum) {
        'use strict';
        return '<div class="image ' + activity + '"><img class="imgShadow" src="photo/' + source + feature.properties.photo + picNum + '.jpg" /></div>';
    },
    table: function (title, value) {
        'use strict';
        var rows = ['<table style="width:256px;margin:auto">'];
        for (var i = 0; i < title.length; i++) {
            rows.push('<tr><th class="letterSpaceing"scope="row">' + title[i] + '</th><td>' + value[i] + '</td></tr>');
        }
        rows.push('</table>');
        return rows.join('');
    },
    button: function (title, value) {
        'use strict';
        return '</div><button href="#" class="prev">&laquo;</button><button href="#" class="next">&raquo;</button></div></div>';
    },
    slideshow: '<div class="popup"><div class="cycle"><div class="slideshow">'
};

wwwMap.oneachFeatureEvents = {
    lineClick: function (feature, e) {
        'use strict';
        wwwMap.select(e.target);
        wwwMap.highlight(e.target);
        wwwMap.el.clear();
        wwwMap.el.addData(feature);
    },
    photoSlide: function (feature, type) {
        'use strict';
        return wwwMap.html.slideshow + wwwMap.html.img(type, feature, 'active', '') + wwwMap.html.img(type, feature, '', '2') + wwwMap.html.img(type, feature, '', '3') + wwwMap.html.button();
    }
};

// dodavanje objekta oneachFeature
wwwMap.onEachFeature = {
    mhouse: function (feature, marker) {
        'use strict';
        marker.on({
            click: function (e) {
                // Create custom popup content
                var popupContent = '',
                    popup = '';
                if (wwwMap.params.lang === 'eng') {
                    popupContent = wwwMap.html.name(feature) + wwwMap.html.img('mhouse/', feature, '', '') + wwwMap.html.table(['Elevation', 'House type', 'Number of beds'], [feature.properties.ele, feature.properties.tip_eng, feature.properties.bed]);
                } else {
                    popupContent = wwwMap.html.name(feature) + wwwMap.html.img('mhouse/', feature, '', '') + wwwMap.html.table(['Nadmorska visina', 'Tip kuće', 'Broj kreveta'], [feature.properties.ele, feature.properties.tip, feature.properties.bed]);
                }
                popup = L.popup({
                    maxWidth: 256,
                    minWidth: 256
                }).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            },
            popupclose: function (e) {
                wwwMap.el.clear();
            }
        });
        marker._leaflet_id = feature.properties.name;
    },
    poi: function (feature, marker) {
        'use strict';
        marker.on({
            popupclose: function (e) {
                wwwMap.el.clear();
            }
        })
        var popupContent = wwwMap.html.name(feature);
        marker.bindPopup(popupContent);
    },
    opg: function (feature, marker) {
        'use strict';
        marker.on({
            click: function (e) {
                var sliderContent = '',
                    popupContent = '',
                    popup = '';
                if (feature.properties.photo) {
                    sliderContent = wwwMap.oneachFeatureEvents.photoSlide(feature, 'opg/');
                } else {
                    sliderContent = '';
                }
                // Create custom popup content
                if (wwwMap.params.lang === 'eng') {
                    popupContent = wwwMap.html.name(feature) + sliderContent + wwwMap.html.table(['Adress', 'Products'], [feature.properties.addr, feature.properties.prod2]);
                } else {
                    popupContent = wwwMap.html.name(feature) + sliderContent + wwwMap.html.table(['Adresa', 'Proizvodi'], [feature.properties.addr, feature.properties.prod]);
                }
                popup = L.popup({
                    maxWidth: 256,
                    minWidth: 256
                }).setLatLng(e.latlng).setContent(popupContent).openOn(map);
            },
            popupclose: function (e) {
                wwwMap.el.clear();
            }
        });
        marker._leaflet_id = feature.properties.name;
    },
    hike: function (feature, layer) {
        'use strict';
        var popupContent = '';
        layer.on({
            mouseover: function (e) {
                wwwMap.highlight(e.target);
            },
            mouseout: function (e) {
                wwwMap.dehighlight(e.target, wwwMap.doStyle.hike(feature));
            },
            click: function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature, e);
            },
            popupclose: function (e) {
                wwwMap.el.clear();
                wwwMap.selected = null;
                wwwMap.dehighlight(e.target, wwwMap.doStyle.hike(feature));
            }
        });
        if (wwwMap.params.lang === 'eng') {
            popupContent = wwwMap.html.name(feature) + wwwMap.html.table(['Trail length', 'Trail duration', 'Trail difficulty'], [feature.properties.len, feature.properties.time, feature.properties.tez_eng]);
        } else {
            popupContent = wwwMap.html.name(feature) + wwwMap.html.table(['Dužina staze', 'Trajanje staze', 'Težina staze'], [feature.properties.len, feature.properties.time, feature.properties.tez]);
        }
        layer.bindPopup(popupContent);
        layer._leaflet_id = feature.properties.name;
    },
    wildtrail: function (feature, layer) {
        'use strict';
        var sliderContent = '',
            popupContent = '';
        layer.on({
            mouseover: function (e) {
                wwwMap.highlight(e.target);
            },
            mouseout: function (e) {
                wwwMap.dehighlight(e.target, wwwMap.doStyle.wildtrail(feature));
            },
            click: function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature, e);
            },
            popupclose: function (e) {
                wwwMap.el.clear();
                wwwMap.selected = null;
                wwwMap.dehighlight(e.target, wwwMap.doStyle.wildtrail(feature));
            }
        });
        if (feature.properties.photo) {
            sliderContent = wwwMap.oneachFeatureEvents.photoSlide(feature, 'wildtrail/');
        } else {
            sliderContent = '';
        }
        if (wwwMap.params.lang === 'eng') {
            popupContent = wwwMap.html.name(feature, 'width:256px;') + sliderContent + wwwMap.html.table(['Trail length', 'Trail duration'], [feature.properties.len, feature.properties.time]);
        } else {
            popupContent = wwwMap.html.name(feature, 'width:256px;') + sliderContent + wwwMap.html.table(['Dužina staze', 'Trajanje staze'], [feature.properties.len, feature.properties.time]);
        }
        layer.bindPopup(popupContent);
        layer._leaflet_id = feature.properties.name;
    },
    bike: function (feature, layer) {
        'use strict';
        var popupContent = '';
        layer.on({
            mouseover: function (e) {
                wwwMap.highlight(e.target);
            },
            mouseout: function (e) {
                wwwMap.dehighlight(e.target, wwwMap.doStyle.bike(feature));
            },
            click: function (e) {
                wwwMap.oneachFeatureEvents.lineClick(feature, e);
            },
            popupclose: function (e) {
                wwwMap.el.clear();
                wwwMap.selected = null;
                wwwMap.dehighlight(e.target, wwwMap.doStyle.bike(feature));
            }
        });
        if (wwwMap.params.lang === 'eng') {
            popupContent = wwwMap.html.name(feature) + wwwMap.html.table(['Trail length', 'Trail duration', 'Surface'], [feature.properties.len, feature.properties.time, feature.properties.pod_eng]);
        } else {
            popupContent = wwwMap.html.name(feature) + wwwMap.html.table(['Dužina staze', 'Trajanje staze', 'Podloga'], [feature.properties.len, feature.properties.time, feature.properties.pod]);
        }
        layer.bindPopup(popupContent);
        layer._leaflet_id = feature.properties.name;
    }
};
