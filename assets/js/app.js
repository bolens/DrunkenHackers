// ***** Don't Forget to change the databaseOne reference below
// CORS client work around
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});
var database = firebase.database();
const categoryArray = ['dog', 'bear', 'witch', 'cat', 'devil', 'angel', 'city' , 'dark' , 'light' , 'American' , 'German' , 'Stone' , 'Mountain' , 'Strawberry' , 'Candy'];
var candidateArray = [];
var categories = [];
var currentCategoryIndex = 0;

database.ref().once('value').then(function(snap) {
  if (snap.val() == null) {
    console.log('Firebase is empty, generating categories...');
    buildCategories(categoryArray);
  } else {
    console.log('Found firebase data, populating local categories...');
    $.each(snap.val().beerCandidates, function() {
      categories.push(this);
      candidateArray.push(this.uid);
    });
    console.log('Local categories populated.');
    console.log(categories);

    cardsVotes[0] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerOne.votes;
    cardsVotes[1] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerTwo.votes;
    cardsVotes[2] = snap.val().beerCandidates[candidateArray[currentCategoryIndex]].beerThree.votes;

    displayCategory(currentCategoryIndex);
    calculateVoteTotals();
  }
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
      uid: "",
      featured: ""
    };
    categories.push(newCategoryObj);
    uid = database.ref('beerCandidates/').push(newCategoryObj).key;
    newCategoryObj.uid = uid;
    database.ref('beerCandidates/' + uid).set(newCategoryObj);
    candidateArray.push(uid);
  });
  console.log('Categories generated.');
  getBeerFromCategories();
}

function getBeerFromCategories() {
  console.log('Fetching beer category data...');
  var count = $(categories).length;
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

      categories[categoryIndex].featured = categories[categoryIndex].responses[0].id;

      if (!--count) {
        console.log('Beer category data fetched.');
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
  getBeerInfo(categories[currentCategoryIndex].featured);
}
function updateCategories() {
  console.log('Populating firebase data.');
  $(categories).each(function(categoryIndex, val) {
    database.ref('beerCandidates/' + candidateArray[categoryIndex]).update(this);
  });
  console.log('Firebase data populated.');
  console.log(categories);
}
