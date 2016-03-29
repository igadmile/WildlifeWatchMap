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