var featuredBeer = {
  location: {
    lat: "",
    lon: ""
  }
}

var beerID = ["qbsiWU","thTbY7"]

function renderPrevWinners() {
  var beerID = ["qbsiWU","thTbY7"]
  for (i=0;i<beerID.length;i++){
  var queryURL = "http://api.brewerydb.com/v2//beer/";
  queryURL = queryURL + beerID[i] + "?withBreweries=y&key=" + apikey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response)
    $("#prevWinner").append("<li> <a href='#' class='prevBeer'>" + response.data.name + "</a> </li>")
    click()
    })
  }
}

renderPrevWinners()

function click() {
 $(".prevBeer").on("click", function(event) {
 	var click = $(this).text()
 	console.log(click)
 	var queryURL = "http://api.brewerydb.com/v2//beers?name=" + click + "&key=" + apikey + "&withBreweries=y"
 	console.log(queryURL)

 $.ajax({
 	url: queryURL,
 	method: "GET"
 	}).done(function(response){
     featuredBeer.location.lat = response.data[0].breweries[0].locations[0].latitude;
     featuredBeer.location.lon = response.data[0].breweries[0].locations[0].longitude;
     console.log(response)
     $("#featured-name").text(response.data[0].name)
     $('#featured-brewery').text(response.data[0].breweries[0].name);
     $('#featured-location').text(response.data[0].breweries[0].locations[0].locality + ", " + response.data[0].breweries[0].locations[0].region);
     $('#featured-description').text(response.data[0].description);
     $('#featured-glass').text(response.data[0].glass);
     $('#featured-abv').text(response.data[0].abv);
     $('#featured-ibu').text(response.data[0].ibu);
     initMap()
     $('.featured-label').each(function(index, el) {
     $(this).attr({
        src: response.data[0].labels.large,
        alt: response.data[0].name
        })
      })
    })
  })
}
