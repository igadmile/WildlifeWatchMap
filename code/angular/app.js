angular.module('chooseLayers', ['ngAnimate', 'ui.bootstrap']);

angular.module('chooseLayers').controller('select', ['$scope', function ($scope) {
    'use strict';
    $scope.urlReady = undefined;
    $scope.layers = {
        hike: 'Planinarske staze',
        bike: 'Biciklističke staze',
        wildtrail: 'Staze u prirodi',
        mhouse: 'Planinarske kuće',
        opg: 'OPG',
        scenery: 'Vidikovci',
        accommodation: 'Smještaj'
    };
    $scope.baseLayers = {
        osm: 'Thunderforest Landscape',
        tk25: 'TK25',
        dof: 'Digitalni ortofoto'
    };
    $scope.features = {
        hike: exp_hike.features,
        bike: exp_bike.features,
        wildtrail: exp_wildTrail.features,
        mhouse: exp_mhouse.features,
        opg: exp_opg.features,
        scenery: exp_scenery.features,
        accommodation: exp_accommodation.features
    };
    $scope.selectedLayer = 'hike';
    $scope.selectedBase = 'osm';
    $scope.selectedFeature = undefined;

    if (document.getElementById('map').offsetWidth < 1025) {
        $scope.smallScreen = true;
    }

    $scope.searchExpression = function (selectedLayer, selectedBase, selectedFeature) {
        // remove all layers
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        wwwMap.overlays[selectedLayer].addTo(map);
        wwwMap.basemaps[selectedBase].addTo(map);

        var boundsParams = {
            maxZoom: 17
        };

        if (selectedLayer === 'opg' || selectedLayer === 'scenery' || selectedLayer === 'mhouse' || selectedLayer === 'accommodation') {
            wwwMap.el.clear();
            wwwMap.overlays[selectedLayer]._layers[selectedFeature].fire('click', {
                latlng: wwwMap.overlays[selectedLayer]._layers[selectedFeature]._latlng
            });
        } else {
            var featureCoordinates = wwwMap.overlays[selectedLayer]._layers[selectedFeature]._latlngs;
            wwwMap.overlays[selectedLayer]._layers[selectedFeature].fire('click', {
                latlng: featureCoordinates[Math.round((featureCoordinates.length - 50) / 2)]
            });
            map.fitBounds(wwwMap.overlays[selectedLayer]._layers[selectedFeature].getBounds(), wwwMap.boundsParams);
        }
    };

    $scope.genUrl = function (selectedLayer, selectedBase, selectedFeature) {
        if (!selectedFeature) {
            $scope.urlReady = 'http://wildlifewatch.biom.hr?layers=' + selectedLayer + '&base=' + selectedBase;
        } else {
            $scope.urlReady = 'http://wildlifewatch.biom.hr?layers=' + selectedLayer + '&base=' + selectedBase + '&feat=' + selectedFeature;
        }
    };

    $scope.getFiles = function (selectedLayer, selectedFeature) {
        if (selectedLayer === 'scenery' && selectedFeature === 'Oltari') {
            $scope.kml = 'data/tracks/Oltari2.kml';
            $scope.gpx = 'data/tracks/Oltari2.gpx';
        } else {
            $scope.kml = 'data/tracks/' + selectedFeature + '.kml';
            $scope.gpx = 'data/tracks/' + selectedFeature + '.gpx';
        }
    };

    $scope.resetFeature = function () {
        $scope.selectedFeature = undefined;
    };
}]);
