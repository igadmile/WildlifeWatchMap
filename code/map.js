if (wwwMap.params.layers) {
    wwwMap.layers = wwwMap.params.layers.split(',').map(function(item) { 
        return wwwMap.overlays[item]; 
    });
}

var map = L.map('map', {scrollWheelZoom:false,center: [wwwMap.params.lat || 44.59, wwwMap.params.lng || 15.36], zoom: wwwMap.params.zoom || 9, fullscreenControl: true,layers: wwwMap.layers || wwwMap.overlays.hike});
wwwMap.basemaps.basemap_2.addTo(map);

// locate control
L.control.locate().addTo(map);
// scale control
L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);

// enable scrolling only after you click on map
map.once('focus', function() { map.scrollWheelZoom.enable(); });
map.on('click', function() {
    map.scrollWheelZoom.enable();
});