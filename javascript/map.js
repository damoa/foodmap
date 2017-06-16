function initMap() {
  var filterCategories;
  var globalKeywords = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 52.511801, lng: 13.455590}
  });
  var markers = [];

  var render = function(filterParams) {
    if (markers.length > 0) {
      for(var i=0; i < markers.length; i++) {
        if (markers && markers[i]) {
          markers[i].setMap(null);
        }
      }
    }

    var filterCategories = filterParams ? $.map(filterParams.match(/\S+\s*/g), function(val, index) { return val.trim(); }) : ['all'];
    var foodData;
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();

    var addMarker = function(restaurant, i) {
      if (markers[i]) {
        markers[i].setMap(map);
      } else {
        geocoder.geocode( { 'address': restaurant.address }, function(results, status) {
          if (results && results[0]) {
            markers[i] = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map
            });


            google.maps.event.addListener(markers[i], 'click', function() {
              infowindow.setContent(restaurant.name);
              infowindow.open(map, markers[i]);
            });
            markers.push(markers[i]);
          } else {
          }
        });
      }
    };

    $.getJSON('db/data.json', function(data) {
      foodData = data;

      for (i=0; i < data.restaurants.length; i++) {
        var keywords = foodData.restaurants[i].keywords.match(/\S+\s*/g);
        for (k=0; k < keywords.length; k++) {
          var keyword = keywords[k].trim();
          if (globalKeywords.indexOf(keyword) == -1) {
            globalKeywords.push(keyword);

            $('#controls ul').append("<li><input class='js-keyword-checkbox' type='checkbox' id='js-asian'>" + keyword + "</li>");
          }
          if (filterCategories.indexOf('all') == -1 && filterCategories.indexOf(keyword) > -1) {
              addMarker(foodData.restaurants[i], i);
          } else {
            if (filterCategories.indexOf('all') > -1) {
              console.log('add unfiltered');
                addMarker(foodData.restaurants[i], i);
            }
          }
        }
      }
    });

    $('.food-map').on('change', ':checkbox', function(){
      var filterParams = '';
      $('.js-keyword-checkbox:checked').each(function(index, element){
        filterParams = filterParams.trim() + ' ' + $(this).parent().text();
      });
      render(filterParams);
    });
  };

  render();
}
