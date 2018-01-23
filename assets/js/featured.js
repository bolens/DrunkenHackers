var featuredBeer = {
  id: "oeGSxs",
  name: "",
  style: "",
  brewery: "",
  location: {
    lat: "",
    lon: "",
    city: "",
    state: ""
  },
  description: "",
  glass: "",
  abv: "",
  ibu: "",
  category: "",
  label: ""
};

function getBeerInfo(beerID) {
  var queryURL = "http://api.brewerydb.com/v2//beer/";
  queryURL = queryURL + beerID + "?withBreweries=y&key=" + apikey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    response = response.data;
    //console.log(response);
    featuredBeer.name = response.name;
    featuredBeer.style = response.style.name;
    featuredBeer.brewery = response.breweries[0].name;
    featuredBeer.location.lat = response.breweries[0].locations[0].latitude;
    featuredBeer.location.lon = response.breweries[0].locations[0].longitude;
    featuredBeer.location.city = response.breweries[0].locations[0].locality;
    featuredBeer.location.state = response.breweries[0].locations[0].region;
    featuredBeer.description = response.description;
    featuredBeer.glass = response.glass.name;
    featuredBeer.abv = response.abv;
    featuredBeer.ibu = response.ibu;
    featuredBeer.label = response.labels.large;

    updateFeaturedBeer();

    // TODO: Add category
    //console.log(featuredBeer);
  });
}

function updateFeaturedBeer() {
  $('#featured-name').text(featuredBeer.name);
  $('#featured-brewery').text(featuredBeer.brewery);
  $('#featured-location').text(featuredBeer.location.city + ", " + featuredBeer.location.state);
  $('#featured-description').text(featuredBeer.description);
  $('#featured-glass').text(featuredBeer.glass);
  $('#featured-abv').text(featuredBeer.abv);
  $('#featured-ibu').text(featuredBeer.ibu);
  initMap()

  $('.featured-label').each(function(index, el) {
    $(this).attr({
      src: featuredBeer.label,
      alt: featuredBeer.name
    });
  });

}

getBeerInfo(featuredBeer.id);
