
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

function renderLabels() {
    const queryURL = "http://api.brewerydb.com/v2/search?q=rock&key=" + apikey;
    console.log("This is queryURL: " + queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log("This is queryURL: " + queryURL);
      console.log(response);
      let labelsArray = [];
      let $container = $('.card-image');
      let $name = $('.card-title');
      $container.empty();
      $(response.data).each(function(index, val) {
        if (this.hasOwnProperty("labels")){
          labelsArray.push(val);
          console.log(labelsArray);
          labelsArray = shuffle(labelsArray);
          console.log(labelsArray);

          let newImage = $('<img>');
          let newTitle = $('<span>' + this.name + '</span>');

          newImage.attr({
            'src': this.labels.large,
            'alt': this.name,

        });
        $container.append(newImage);
        $name.append(newTitle);
      }
      });
    });

  }
    renderLabels();

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Used like so
/*var arr = [2, 11, 37, 42];
arr = shuffle(arr);
console.log(arr);
*/
