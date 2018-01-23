var queryURL = "http://api.brewerydb.com/v2//beer/";
queryURL = queryURL + beerID + "?withBreweries=y&key=" + apikey;
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  console.log(response)
})
