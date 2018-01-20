
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});
const categoryArray = ['dog', 'bear', 'witch']
let labelDiscardArray = [];
let testArray = [];
let labelsArray = [];
let beerIdArray = [];
let label = [];
let page = 1;
function labelExtractor() {
  const queryURL = "http://api.brewerydb.com/v2/beers?&hasLabels=Y&withBreweries=Y&key=" + apikey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    numberOfPages = response.numberOfPages;
    console.log('Number of pages: ' + numberOfPages);
    console.log('Total results: ' + response.totalResults);

/*    for ( page ; page < numberOfPages; page++) {

      if (this.hasOwnProperty("labels") && this.hasOwnProperty("style")){
        testArray.push(page);
        console.log(testArray);
      }
    }*/


    let $container = $('.card-image');
    let $name = $('.card-title');
    $container.empty();
    $name.empty();
/*    $(response.data).each(function(index, val) {
      if (this.hasOwnProperty("labels") && this.hasOwnProperty("style")){
        labelsArray.push(val);
      }
    });*/
    labelsArray.push(response.data);

    results = labelsArray[0].length;
    console.log('Results with labels: ' + results);
    console.log(labelsArray);
  //  labelsArray = shuffle(labelsArray);

    renderLabels(labelsArray);
    renderLabels(labelsArray);
  });

}



labelExtractor();



function renderLabels(array) {
  let $container = $('.card-image');
  let $name = $('.card-title');
  $container.empty();
  $name.empty();

  console.log(array);

   label = array[0].splice(0, 3);
   console.log(label);
   labelDiscardArray.push(label);
   console.log(labelDiscardArray);
   console.log(array);

   $(label).each(function(i, val) {
     let newImage = $('<img>');
     let newTitle = $('<h5>' + label[i].name + '</h5>');
     let newStyle = $('<h6>Style: ' + label[i].style.shortName + '</h6>');
     newImage.attr('src', label[i].labels.medium);
     $('#img-' + i).append(newImage);
     $('#name-' + i).append(newTitle);
     $('#name-' + i).append(newStyle);
   })
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
