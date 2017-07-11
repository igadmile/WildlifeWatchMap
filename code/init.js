wwwMap.init = function (parameter) {
    'use strict';
    wwwMap.el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: parameter
    });
    wwwMap.el.addTo(map);
    L.Control.styledLayerControl(wwwMap.baseMaps, wwwMap.overlays2, {
        collapsed: parameter
    }).addTo(map);

    if (wwwMap.params.layers && wwwMap.params.feat) {
        if (wwwMap.params.layers === 'opg' || wwwMap.params.layers === 'scenery' || wwwMap.params.layers === 'mhouse' || wwwMap.params.layers === 'accommodation') {
            wwwMap.layers[0]._layers[wwwMap.params.feat].fire('click', {
                latlng: wwwMap.layers[0]._layers[wwwMap.params.feat]._latlng
            });

        } else {
            //change max zoom for fitBounds if requested
            if (wwwMap.params.zoom && wwwMap.params.padding) {
                wwwMap.boundsParams = {
                    maxZoom: wwwMap.params.zoom,
                    paddingTopLeft: [0, wwwMap.params.padding]
                };
            } else if (wwwMap.params.zoom) {
                wwwMap.boundsParams = {
                    maxZoom: wwwMap.params.zoom
                };
            }
            var featureCoordinates = wwwMap.layers[0]._layers[wwwMap.params.feat]._latlngs;
            wwwMap.layers[0]._layers[wwwMap.params.feat].fire('click', {
                latlng: featureCoordinates[Math.round((featureCoordinates.length - 50) / 2)]
            });
            map.fitBounds(wwwMap.layers[0]._layers[wwwMap.params.feat].getBounds(), wwwMap.boundsParams);
        }
    }
    if (parameter === false) {
        L.control.sidebar('sidebar').addTo(map);
    }
};

if (document.getElementById("map").offsetWidth < 1025) {
    wwwMap.init(true);
} else {
    wwwMap.init(false);
}
