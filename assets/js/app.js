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
var $cards = [];

let labelsArray = [];
let label = [];
var currentCanditate;

database.ref().once('value').then(function(snap) {
  //console.log(snap.val());
  if (snap.val() == null) {
    console.log('Firebase is empty, generating categories.');
    buildCategories(categoryArray);
    // getBeerFromCategories();
  } else {
    console.log('Found firebase data, populating local variables.');
    $.each(snap.val().beerCandidates, function(index, el) {
      // console.log(this);
      categories.push(this);
      candidateArray.push(this.uid);
      // console.log(candidateArray);
    });
    $cards[0] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerOne.votes;
    $cards[1] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerTwo.votes;
    $cards[2] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerThree.votes;
    console.log($cards);
    console.log('Firebase data was not populated, fetching data.');

    getBeerFromCategories();

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
  getBeerFromCategories();
}

function getBeerFromCategories() {
  var count = $(categories).length
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
      var lastPosition = categories[categoryIndex].lastPosition;
      var newPosition = lastPosition + 3;
      // console.log(lastPosition);
      // console.log(newPosition);

      for (var i = lastPosition; i < categories[categoryIndex].numberOfBeers; i++) {
        // console.log(categories[categoryIndex].responses[i]);
        // console.log(categories[categoryIndex].responses[i].id);
        if (i == categories[categoryIndex].lastPosition) {
          categories[categoryIndex].beerOne.id = categories[categoryIndex].responses[i].id;
        } else if (i == categories[categoryIndex].lastPosition + 1) {
          categories[categoryIndex].beerTwo.id = categories[categoryIndex].responses[i].id;
        } else if (i == categories[categoryIndex].lastPosition + 2) {
          categories[categoryIndex].beerThree.id = categories[categoryIndex].responses[i].id;
        } else {}
      }
      categories[categoryIndex].lastPosition = 3;

      if (!--count) {
        displayCategory(currentCategoryIndex);
        updateCategories();
      }
      // console.log(categories);
    });
  });
}
function displayCategory(categoryIndex) {
  $('#current-category').text(categories[categoryIndex].category);
  $('.card').each(function(cardIndex, val) {
    var $card = $(this);
    var $newImage = $('<img>');
    var $newTitle = $('<div>');
    var $newName = $('<h5>');
    var $newStyle = $('<h6>');

    // console.log(categories[categoryIndex]);
    // console.log(categories[categoryIndex].responses[index + categories[categoryIndex].lastPosition - 3]);
    var response = categories[categoryIndex].responses[cardIndex + categories[categoryIndex].lastPosition - 3];
    // console.log(response);
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

    if (cardIndex == 0) {
      $('#resultscard1').children('.name').text(response.name + ":");
    } else if (cardIndex == 1) {
      $('#resultscard2').children('.name').text(response.name + ":");
    } else if (cardIndex == 2) {
      $('#resultscard3').children('.name').text(response.name + ":");
    }
  });

  calculateVoteTotals();
  updateVotes();
  getBeerInfo(currentWinnerId);
}
function updateCategories() {
  console.log(categories);
  $(categories).each(function(categoryIndex, val) {
    console.log("Category " + categoryIndex + ": ");
    console.log(candidateArray[categoryIndex]);
    console.log(this);

    database.ref('beerCandidates/' + candidateArray[categoryIndex]).update(this);
  });
  console.log('Firebase data populated.');
  // database.ref().once('value').then(function(snap) {
  //   console.log(snap.val());
  // }, function(errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });
}
