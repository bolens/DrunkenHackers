var featuredBeer = {
  location: {
    lat: "",
    lon: ""
  }
}

var beerID = "qbsiWU"

var queryURL = "http://api.brewerydb.com/v2//beer/";
queryURL = queryURL + beerID + "?withBreweries=y&key=" + apikey;
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  console.log(response)
  $("#prevWinner").html("<a href='#' id='prevBeer'>" + response.data.name + "</a>")
  featuredBeer.location.lat = response.data.breweries[0].locations[0].latitude;
  featuredBeer.location.lon = response.data.breweries[0].locations[0].longitude;
  $("#prevBeer").on("click", function(event){
      $("#featured-name").text(response.data.name)
      $('#featured-brewery').text(response.data.breweries[0].name);
      $('#featured-location').text(response.data.breweries[0].locations[0].locality + ", " + response.data.breweries[0].locations[0].region);
      $('#featured-description').text(response.data.description);
      $('#featured-glass').text(response.data.glass);
      $('#featured-abv').text(response.data.abv);
      $('#featured-ibu').text(response.data.ibu);
      $('#featured-label').text(response.data.labels.large);
      initMap()
      $('.featured-label').each(function(index, el) {
        $(this).attr({
          src: response.data.labels.large,
          alt: response.data.name
        })
      })
    })
})
