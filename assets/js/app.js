// ***** Don't Forget to change the databaseOne reference below
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

var beerCandidates = {
  category: "",
  beerId: {
    beerIdOne: "",
    beerIdTwo: "",
    beerIdThree: "",
  }
};

const categoryArray = ['dog', 'bear', 'witch', 'cat', 'heaven', 'angel']
let labelDiscardArray = [];
let testArray = [];
let labelsArray = [];
let beerIdArray = [];
let label = [];
let databaseOne = firebase.database();

function beerData() {
  const queryURL = "http://api.brewerydb.com/v2/beers?&hasLabels=Y&withBreweries=Y&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    numberOfPages = response.numberOfPages;
    console.log('Number of pages: ' + numberOfPages);
    console.log('Total results: ' + response.totalResults);

    let $container = $('.card-image');
    let $name = $('.card-title');
    $container.empty();
    $name.empty();

    labelsArray.push(response.data);
    labelsArray = labelsArray[0];
    results = labelsArray.length;
    console.log('Results with labels: ' + results);

    labelsArray = shuffle(labelsArray);
    console.log(labelsArray);
    labelsDisplay(labelsArray);
    labelsDisplay(labelsArray);
    labelsDisplay(labelsArray);
  })
};

function beerCategoryData(category) {
  let queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    $(response.data).each(function(index, val) {
      if (this.hasOwnProperty("labels") && this.hasOwnProperty("style") ) {
      labelsArray.push(val);
      }
      shuffle(labelsArray);
    })
    labelsDisplay(labelsArray);
  })
  console.log(labelsArray);
};

newCategory = categoryArray[1];
beerCategoryData(newCategory);

function labelsDisplay(array) {
  let $container = $('.card-image');
  let $name = $('.card-title');
  $container.empty();
  $name.empty();
  $('#current-category').empty();
  console.log(array);

  label = array.splice(0, 3);
  console.log(label);
  $(label).each(function(i, val) {
    beerIdOne = label[0].id;

    beerIdTwo = label[1].id;

    beerIdThree = label[2].id;
    let newImage = $('<img>');
    let newTitle = $('<h5>' + label[i].name + '</h5>');
    let newStyle = $('<h6>Style: ' + label[i].style.shortName + '</h6>');
   newImage.attr('src', label[i].labels.medium);
   $('#img-' + i).append(newImage);
   $('#name-' + i).append(newTitle);
   $('#name-' + i).append(newStyle);
  })
  $('#current-category').append(newCategory + 's');
  writeBeerLabelData(newCategory, beerIdOne, beerIdTwo, beerIdThree);
};

function writeBeerLabelData(category, beerIdOne, beerIdTwo, beerIdThree) {
  databaseOne.ref('beerCandidates/').push({
    category: category,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
    beerId: {
      1: beerIdOne,
      2: beerIdTwo,
      3: beerIdThree
    }
  });
}

// Fisher-Yates Shuffle
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
