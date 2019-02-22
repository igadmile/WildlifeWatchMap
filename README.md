Interactive map built as part of the Wildlife Watch project.

The scope of the project was to collect and provide a way to explore hiking, biking and wildlife trails as well as points of interests in the wider Velebit mountain area in Croatia.

It is part of the [GoVelebit](http://www.govelebit.com/) website. Standalone map is hosted [here](http://wildlifewatch.biom.hr/).

# Technologies
- leafletjs
- angular
- angular-animate
- angular-ui-bootstrap
- leaflet-elevation leaflet plugin
- styledLayerControl leaflet plugin

# Feature overview
![map overview](../screenshots/map-overview_2.jpg)

## Layer control
- Choose which base map (Pozadinske karte) will be shown.
- Choose which trails or POIs will be displayed.

## Elevation profile control
When a feature of any of the line layers is clicked, the elevation profile for that feature is shown.
Hoverng the part of the elevation profile will highlight the corresponding part of the feature on the map.

## Filter feature sidebar
![sidebar overview](../screenshots/sidebar.jpg)

In the sidebar the user can:
- Choose the base map (Odaberite pozadnsku kartu)
- Select the layer (Odaberite sloj) from which it's the possible to search for and choose Feature (Odaberite stazu/točku)

Based on the selection it is possible to:
- Show, highlight and focus to the selected feature (Prikaži na karti).
- Generate permalink which will open the map and show, highlight and focus on the selected feature. It is useful for embedding in the iframe (Prikaži link). (eg. [http://wildlifewatch.biom.hr/?layers=bike&base=osm&feat=Gra%C4%8Dac%E2%80%93Tulove%20grede](http://wildlifewatch.biom.hr/?layers=bike&base=osm&feat=Gra%C4%8Dac%E2%80%93Tulove%20grede))
- Download the selected feature as GPX (Preuzmi GPX) or KML (Preuzmi KML).
