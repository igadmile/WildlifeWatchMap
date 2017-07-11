if (wwwMap.params.layers) {
    wwwMap.layers = wwwMap.params.layers.split(',').map(function (item) {
        'use strict';
        return wwwMap.overlays[item];
    });
}
var baseLayer = wwwMap.params.base ? wwwMap.basemaps[wwwMap.params.base] : wwwMap.basemaps.osm,
    map = L.map('map', {
        center: [wwwMap.params.lat || 44.59, wwwMap.params.lng || 15.36],
        zoom: wwwMap.params.zoom || 9,
        fullscreenControl: true,
        layers: wwwMap.layers || wwwMap.overlays.hike
    });
if (document.getElementById('map').offsetHeight < 810) {
    map.scrollWheelZoom.disable();
}
baseLayer.addTo(map);

// locate control
L.control.locate().addTo(map);
// scale control
L.control.scale({
    options: {
        position: 'bottomleft',
        maxWidth: 100,
        metric: true,
        imperial: false,
        updateWhenIdle: false
    }
}).addTo(map);

// enable scrolling only after you click on map
map.once('focus', function () {
    'use strict';
    map.scrollWheelZoom.enable();
});
map.on('click', function () {
    'use strict';
    map.scrollWheelZoom.enable();
});
