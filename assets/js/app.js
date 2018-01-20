
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

let labelsArray = [];
var label = [];
function renderLabels() {
  const queryURL = "http://api.brewerydb.com/v2/search?q=magic&p=3&type=beer&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    let $container = $('.card-image');
    let $name = $('.card-title');
    $container.empty();
    $name.empty();
    $(response.data).each(function(index, val) {
      if (this.hasOwnProperty("labels")){
        labelsArray.push(val);
      }
    });
    labelsArray = shuffle(labelsArray);
    label = labelsArray.splice(1, 3);
    $(label).each(function(i, val) {
      let newImage = $('<img>');
      let newTitle = $('<h5>' + label[i].name + '</h5>');
      newImage.attr('src', label[i].labels.medium);
      $('#img-' + i).append(newImage);
      $('#name-' + i).append(newTitle);
    })
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
