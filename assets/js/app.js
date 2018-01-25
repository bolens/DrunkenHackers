// ***** Don't Forget to change the databaseOne reference below
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});
var database = firebase.database();
const categoryArray = ['dog', 'bear', 'witch', 'cat', 'devil', 'angel', 'city'];
var candidateArray = [];
var categories = [];
var currentCategoryIndex = 0;

let labelsArray = [];
let label = [];
var currentCanditate;

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
database.ref().once('value').then(function(snap) {
  console.log(snap.val());
  if (snap.val() == null) {
    console.log('Firebase is empty, generating categories.');
    buildCategories(categoryArray);
    //getBeerFromCategories();
  } else {
    console.log('Found firebase data, populating local variables.');
    $.each(snap.val().beerCandidates, function(index, el) {
      categories.push(this);
      candidateArray.push(this.uid);
    });
    if (typeof(categories[0].numberOfBeers) == 'undefined' || categories[0].numberOfBeers == '') {
      console.log('Firebase data was not populated, fetching data.');
      getBeerFromCategories();
    }
    console.log(categories);
  }
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

database.ref().on('child_changed', function(snap) {

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function buildCategories(categoriesArray) {
  $(categoriesArray).each(function(index, val) {
    var uid;
    var newCategoryObj = {
      category: categoriesArray[index],
      responses: [],
      beerOne: {
        id: "",
        votes: 0
      },
      beerTwo: {
        id: "",
        votes: 0
      },
      beerThree: {
        id: "",
        votes: 0
      },
      numberOfBeers: "",
      lastPosition: 0,
      uid: ""
    };
    categories.push(newCategoryObj);
    uid = database.ref('beerCandidates/').push(newCategoryObj).key;
    newCategoryObj.uid = uid;
    database.ref('beerCandidates/' + uid).set(newCategoryObj);
    candidateArray.push(uid);
  });
}

function getBeerFromCategories() {
  $(categories).each(function(categoryIndex) {
    var queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + categories[categoryIndex].category + "&type=beer&key=" + apikey;
    //console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      response = response.data;
      // console.log(response);
      var newResponses = [];
      $(response).each(function(responseIndex) {
        if (typeof(this.labels) != "undefined" && typeof(this.style) != "undefined") {
          newResponses.push(this);
        }
      });
      // console.log(newResponses);

      categories[categoryIndex].responses = newResponses;
      categories[categoryIndex].numberOfBeers = newResponses.length;
      var lastPosition = categories[categoryIndex].lastPosition
      var newPosition = lastPosition + 3;
      console.log(lastPosition);
      console.log(newPosition);

      for (var i = lastPosition; i < newPosition; i++) {
        console.log(categories[categoryIndex].responses[i]);

        if (i == categories[categoryIndex].lastPosition) {
          categories[categoryIndex].beerOne.id = categories[categoryIndex].responses[i].id;
        } else if (i == categories[categoryIndex].lastPosition + 1) {
          categories[categoryIndex].beerTwo.id = categories[categoryIndex].responses[i].id;
        } else if (i == categories[categoryIndex].lastPosition + 2) {
          categories[categoryIndex].beerThree.id = categories[categoryIndex].responses[i].id;
        } else {}

        categories[categoryIndex].lastPosition++;
        console.log(categories[categoryIndex].lastPosition);
      }

      if (categories[currentCategoryIndex].beerOne.id != "" &&
        categories[currentCategoryIndex].beerTwo.id != "" &&
        categories[currentCategoryIndex].beerThree.id != "") {
          displayCategory(currentCategoryIndex);
      }
      console.log(categories);
    });
  });
  updateCategories();
}
function displayCategory(categoryIndex) {
  $('#current-category').text(categories[categoryIndex].category);
  $('.card').each(function(index, val) {
    var $card = $(this);
    var $newImage = $('<img>');
    var $newTitle = $('<div>');
    var $newName = $('<h5>');
    var $newStyle = $('<h6>');
    //console.log(categories[categoryIndex]);
    //console.log(categories[categoryIndex].responses[index + categories[categoryIndex].lastPosition - 3]);
    var response = categories[categoryIndex].responses[index + categories[categoryIndex].lastPosition - 3];
    console.log(response);
    $newImage.attr({
      src: response.labels.medium,
      alt: response.name
    });
    $newName.text(response.name);
    $newStyle.text(response.style.name);
    $newTitle.append($newName);
    $newTitle.append($newStyle);
    $newTitle.addClass('card-title');
    //console.log(this);
    $card.children('.card-image').html($newImage);
    $card.children('.card-content').html($newTitle);
  });
}
function updateCategories() {
  //console.log(categories);
  $(candidateArray).each(function(index, val) {
    //console.log(categories[index]);
    //database.ref('beerCandidates/' + candidateArray[index]).set(categories[index]);
  });
}
// $(document).ready(function() {
//   displayCategory(currentCategoryIndex);
// });
//buildCategories(categoryArray);

// function beerCategoryData(category) {
//   let queryURL = "http://api.brewerydb.com/v2/search?withLocations=Y&q=" + category + "&type=beer&key=" + apikey;
//   //console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).done(function(response) {
//     // change to for
//     for(var i = 0; i < 4; i++) {
//       if (this.hasOwnProperty("labels") && this.hasOwnProperty("style") ) {
//         labelsArray.push(val);
//       }
//     //  shuffle(labelsArray);
//     }
//     labelsDisplay(labelsArray);
//   });
//   console.log(labelsArray);
// }

//beerCategoryData(newCategory);
// $(categoryArray).each(function(index, val){
//   newCategory = categoryArray[index];
//   beerCategoryData(newCategory);
// });
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
  });
  $('#current-category').append(newCategory + 's');
  console.log(database.ref('beerCandidates/').length);
  console.log(categoryArray.length);
  if(database.ref('beerCandidates/').length < categoryArray.length){
    writeBeerLabelData(newCategory, beerIdOne, beerIdTwo, beerIdThree);
  }
}

function writeBeerLabelData() {
  currentCanditate = databaseOne.ref('beerCandidates/').push({categories}).key;
  console.log(currentCanditate);
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
