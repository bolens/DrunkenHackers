
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});
const categoryArray = ['dog', 'bear', 'witch', 'angel']
let labelDiscardArray = [];
let testArray = [];
let labelsArray = [];
let beerIdArray = [];
let label = [];
let page = 1;
let bigArray = [];

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
  });
}

function beerCategoryData(category) {
  let queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&p=" + page + "&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    numberOfPages = response.numberOfPages;
//    console.log('Number of pages: ' + (numberOfPages));
//    console.log('Total results: ' + response.totalResults);
    if (numberOfPages > 1){
      for (var i = 1; i < numberOfPages + 1; i++) {
         var page = [i];
         queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&p=" + page + "&key=" + apikey;

         $.ajax({
           url: queryURL,
           method: "GET"
         }).done(function(response) {
//           console.log(response);

           labelsArray = labelsArray.concat(response.data);
           console.log('labelsArray', labelsArray);
         });

      }
    }


    let $container = $('.card-image');
    let $name = $('.card-title');
    $container.empty();
    $name.empty();


    $(response.data).each(function(index, val) {
      if (this.hasOwnProperty("labels") && this.hasOwnProperty("style") ) {
      labelsArray.push(val);
      }
    })

/*
labelsArray = labelsArray.filter((labelsArray, index, self) => self.findIndex(t => t.id === labelsArray.id) === index);
*/
    results = labelsArray.length;
//    console.log('Results with labels: ' + results);
    labelsArray = shuffle(labelsArray);
    labelsDisplay(labelsArray);


// console.log('Results with labels: ' + results);

  });
}
newCategory = categoryArray[0];
beerCategoryData(newCategory);
// beerData();


function labelsDisplay(array) {
  let $container = $('.card-image');
  let $name = $('.card-title');
  $container.empty();
  $name.empty();
  $('#current-category').empty();

//  console.log(array);

   label = array.splice(0, 3);
   let beerId = label.id;
   database.ref("/category").push(newCategory);
   label.forEach(function(id) {
      database.ref("/category/beerId").push(beerId);
   })

//   console.log(label);
   labelDiscardArray.push(label);
//   console.log(labelDiscardArray);
//   console.log(array);
//   console.log(labelsArray);

   $(label).each(function(i, val) {
     let newImage = $('<img>');
     let newName = $('<h5>' + label[i].name + '</h5>');
     let newStyle = $('<h6>Style: ' + label[i].style.shortName + '</h6>');
     newImage.attr('src', label[i].labels.medium);
     $('#img-' + i).append(newImage);
     $('#name-' + i).append(newName);
     $('#name-' + i).append(newStyle);
   })
   $('#current-category').append(newCategory + 's');
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
