function initMap() {
  var myLatLng = {lat: featuredBeer.location.lat, lng: featuredBeer.location.lon};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
