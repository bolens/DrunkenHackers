var featuredBeer = {
  id: "",
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
  srm: "",
  og: "",
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
    featuredBeer.id = response.id;
    featuredBeer.name = response.name;
    featuredBeer.style = response.style.name;
    featuredBeer.brewery = response.breweries[0].name;
    featuredBeer.location.lat = response.breweries[0].locations[0].latitude;
    featuredBeer.location.lon = response.breweries[0].locations[0].longitude;
    featuredBeer.location.city = response.breweries[0].locations[0].locality;
    featuredBeer.location.state = response.breweries[0].locations[0].region;
    featuredBeer.description = response.description;
    if (response.glass) {
      featuredBeer.glass = response.glass.name;
    }
    featuredBeer.abv = response.abv;
    featuredBeer.ibu = response.ibu;
    featuredBeer.srm = response.srm;
    featuredBeer.og = response.og;
    featuredBeer.label = response.labels.large;

    updateFeaturedBeer();

    // TODO: Add category
    //console.log(featuredBeer);
  });
}

function updateFeaturedBeer() {
  //console.log(featuredBeer);
  $('#featured-name').text(featuredBeer.name);
  $('#featured-category').text(categoryArray[currentCategoryIndex]);
  $('#featured-brewery').text(featuredBeer.brewery);
  $('#featured-location').text(featuredBeer.location.city + ", " + featuredBeer.location.state);

  if (typeof(featuredBeer.description) == "undefined") {
    if(!$("#featured-description").hasClass("hidden")) {
      $('#featured-description').toggleClass('hidden');
    }
  } else {
    $('#featured-description').text(featuredBeer.description).removeClass('hidden');
  }

  if (featuredBeer.glass == '') {
    if(!$("#featured-glass").parent().hasClass("hidden")) {
      $('#featured-glass').parent().toggleClass('hidden');
    }
  } else {
    $('#featured-glass').text(featuredBeer.glass).parent().removeClass('hidden');
  }

  if (typeof(featuredBeer.abv) != "undefined") {
    $('.featured-abv').each(function(index, el) {
      $(this).text(featuredBeer.abv);
    });
  } else {
    $('.featured-abv').each(function(index, el) {
      $(this).text("N/A");
    });
  }

  if(typeof(featuredBeer.ibu) != "undefined") {
    $('.featured-ibu').each(function(index, el) {
      $(this).text(featuredBeer.ibu);
    });
  } else {
    $('.featured-ibu').each(function(index, el) {
      $(this).text("N/A");
    });
  }

  if(typeof(featuredBeer.srm) != "undefined") {
    $('.featured-srm').each(function(index, el) {
      $(this).text(featuredBeer.srm);
    });
  } else {
    $('.featured-srm').each(function(index, el) {
      $(this).text("N/A");
    });
  }

  if(typeof(featuredBeer.og) != "undefined") {
    $('.featured-og').each(function(index, el) {
      $(this).text(featuredBeer.og);
    });
  } else {
    $('.featured-og').each(function(index, el) {
      $(this).text("N/A");
    });
  }

  $('.featured-label').each(function(index, el) {
    $(this).attr({
      src: featuredBeer.label,
      alt: featuredBeer.name
    });
  });

  initMap();
}
