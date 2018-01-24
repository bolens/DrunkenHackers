var prevWinners = ["qbsiWU","thTbY7"];

function renderPrevWinners() {
  $(prevWinners).each(function(index, el) {
    var queryURL = "http://api.brewerydb.com/v2//beer/";
    console.log(prevWinners[index]);
    queryURL = queryURL + prevWinners[index] + "?withBreweries=y&key=" + apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      response = response.data;
      console.log(response);
      var newListItem = $('<li>');
      var newLink = $('<a>');
      newLink.addClass('prevBeer')
        .attr({
          href: "#",
          "data-beer-id": response.id
        })
        .text(response.name);
      newListItem.append(newLink);
      $("#prevWinner").append(newListItem);
    });
  });
}

renderPrevWinners();

$('#prevWinner').on('click', '.prevBeer', function(e) {
  e.preventDefault();
  loadFeatured(this);
  $('html, body').animate({
    scrollTop: $("#featured").offset().top - 64
  }, 1000);
});

function loadFeatured(that) {
  console.log($(that));
  var beerID = $(that).data('beer-id');
  getBeerInfo(beerID);
}
