var foodData;

var styles = {
  'icon': new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: 'images/pushpin_with_shadow.png'
    })
  })
};

var render = function() {
  var icon = new ol.Feature({
    type: 'icon',
    geometry: new ol.geom.Point(ol.proj.fromLonLat([13.455590, 52.511801]))
  });

  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [icon]
    }),
    style: function(feature) {
      return styles[feature.get('type')];
    }
  });

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([13.455590, 52.511801]), // (EPSG:4326)
      zoom: 16
    })
  });
};

$.getJSON('db/data.json', function(data) {
  foodData = data;
  render();
});
