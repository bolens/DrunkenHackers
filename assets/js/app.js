// ***** Don't Forget to change the databaseOne reference below
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

const categoryArray = ['dog', 'bear', 'witch', 'cat', 'devil', 'angel', 'city']
let labelsArray = [];
let label = [];
let currentCanditate;
let databaseOne = firebase.database();
/*
function beerCategoryData(category) {
  let queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&withBreweries=Y&q=" + category + "&type=beer&key=" + apikey;
//  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    numberOfPages = response.numberOfPages;
//    console.log('Number of pages: ' + (numberOfPages));
    if (numberOfPages > 1){
      for (var i = 1; i < numberOfPages + 1; i++) {
        var page = [i];
        queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&p=" + page + "&key=" + apikey;
          $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
//            console.log(response);
            $(response.data).each(function(index, val) {
              if (this.hasOwnProperty("labels") && this.hasOwnProperty("style") ) {
                labelsArray = labelsArray.concat(val);
              }
            })
          }).done(function(){
            shuffle(labelsArray);
            labelsDisplay(labelsArray);
          })
      }
    }
  })
};
*/

function beerCategoryData(category) {
  let queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // change to for
    for(var i = 0; i < 4; i++) {
      if (this.hasOwnProperty("labels") && this.hasOwnProperty("style") ) {
        labelsArray.push(val);
      }
    //  shuffle(labelsArray);
    }
    labelsDisplay(labelsArray);
  })
  console.log(labelsArray);
};

//beerCategoryData(newCategory);
$(categoryArray).each(function(index, val){
  newCategory = categoryArray[index];
  beerCategoryData(newCategory);
})
/*
 let clearId = setInterval(function(){
   console.log(labelsArray);
 }, 10000);

function display() {
  if (labelsArray.length > 2) {
    labelsDisplay(labelsArray);
  } else {
    clearInterval(clearId);
  }
};
*/
function labelsDisplay(array) {
//  console.log(labelsArray);
  let $container = $('.card-image');
  let $name = $('.card-title');
  $container.empty();
  $name.empty();

  $('#current-category').empty();
//  console.log(array);
  label = array.splice(0, 3);
//  console.log(label);
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
console.log(database.ref('beerCandidates/').length);
console.log(categoryArray.length);
if(database.ref('beerCandidates/').length < categoryArray.length){
  writeBeerLabelData(newCategory, beerIdOne, beerIdTwo, beerIdThree);
}
};

function writeBeerLabelData(category, beerIdOne, beerIdTwo, beerIdThree) {
  currentCanditate = databaseOne.ref('beerCandidates/').push({
    category: category,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
    beerId: {
      one: {
        id: beerIdOne,
        votes: 0
      },
      two: {
        id: beerIdTwo,
        votes: 0
      },
      three: {
        id: beerIdThree,
        votes: 0
      }
    }
  }).key;
console.log(currentCanditate);
};

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
