var database = firebase.database();
var currentWinnerId;
var currentWinnerVotes = 0;
var voteTotal;
var cardsVotes = [];
var $card1 = $('#resultscard1'),
   $card2 = $('#resultscard2'),
   $card3 = $('#resultscard3');

function calculateVoteTotals() {
  $('.card').each(function(cardIndex, val) {
    var currentVotes = categories[currentCategoryIndex];
    var votesId = categories[currentCategoryIndex];
    if (cardIndex == 0) {
      currentVotes = currentVotes.beerOne.votes;
      votesId = votesId.beerOne.id;
    } else if (cardIndex == 1) {
      currentVotes = currentVotes.beerTwo.votes;
      votesId = votesId.beerTwo.id;
    } else if (cardIndex == 2) {
      currentVotes = currentVotes.beerThree.votes;
      votesId = votesId.beerThree.id;
    }

    if (currentVotes > currentWinnerVotes) {
      currentWinnerVotes = currentVotes;
      currentWinnerId = votesId;
    }
  });
  updateVotes();
}

function pushVotes() {
  database.ref("beerCandidates/" + candidateArray[currentCategoryIndex]).update(categories[currentCategoryIndex]);
}

function updateVotes() {
  if (typeof(cardsVotes[0]) == 'undefined') {
    $('#resultscard1').children('.votes').text(0);
  } else {
    $('#resultscard1').children('.votes').text(cardsVotes[0]);
  }
  if (typeof(cardsVotes[1]) == 'undefined') {
    $('#resultscard2').children('.votes').text(0);
  } else {
    $('#resultscard2').children('.votes').text(cardsVotes[1]);
  }
  if (typeof(cardsVotes[2]) == 'undefined') {
    $('#resultscard3').children('.votes').text(0);
  } else {
    $('#resultscard3').children('.votes').text(cardsVotes[2]);
  }
  pushVotes();
}

$(".card").on("click", function (e) {
  cardsVotes[0] = categories[currentCategoryIndex].beerOne.votes;
  cardsVotes[1] = categories[currentCategoryIndex].beerTwo.votes;
  cardsVotes[2] = categories[currentCategoryIndex].beerThree.votes;

  var selectedCard = parseInt($(this).data("card"));
  var currentVotes = parseInt(cardsVotes[selectedCard]);
  currentVotes++;

  var beerObj = {};
  beerObj = categories[currentCategoryIndex];

  console.log(beerObj);
  if (selectedCard == 0) {
    beerObj.beerOne.votes = currentVotes;
  } else if (selectedCard == 1) {
    beerObj.beerTwo.votes = currentVotes;
  } else if (selectedCard == 2) {
    beerObj.beerThree.votes = currentVotes;
  }

  calculateVoteTotals();

  // displayCategory(currentWinnerId);
  getBeerInfo(currentWinnerId);
  if (currentCategoryIndex < categoryArray.length) {
    // currentCategoryIndex++;
  } else {
    currentCategoryIndex = 0;
  }

});
