function initMap() {
  var myLatLng = {lat: parseFloat(featuredBeer.location.lat), lng: parseFloat(featuredBeer.location.lon)};

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
