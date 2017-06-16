function initMap() {
  var render = function() {
    var foodData;
    var geocoder = new google.maps.Geocoder();
    var categories = [];
    var markers = [];
    var infowindow = new google.maps.InfoWindow();

    var uluru = {lat: 52.511801, lng: 13.455590};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru
    });

    var addMarker = function(restaurant) {
      geocoder.geocode( { 'address': restaurant.address }, function(results, status) {
        markers[i] = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map
        });

        var marker = markers[i];

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(restaurant.name);
          infowindow.open(map, marker);
        });
      });
    };

    $.getJSON('db/data.json', function(data) {
      foodData = data;

      for (i=0; i < data.restaurants.length; i++) {
        if (categories.indexOf(foodData.restaurants[i].category) == -1) {
          categories.push(foodData.restaurants[i].category);

          $('#controls ul').append("<li><input type='checkbox' id='js-asian'>" + foodData.restaurants[i].category + "</li>");
        }
        addMarker(foodData.restaurants[i]);
      }
    });
  };
  render();
}
