var database = firebase.database();
var selectedCard;
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
}

function pushVotes() {
  database.ref("beerCandidates/" + candidateArray[currentCategoryIndex]).update(categories[currentCategoryIndex]);
}

function updateVotes() {
  $('#resultscard1 .votes').text(cardsVotes[0]);
  $('#resultscard2 .votes').text(cardsVotes[1]);
  $('#resultscard3 .votes').text(cardsVotes[2]);
  pushVotes();
}

$(".card").on("click", function (e) {
  // console.log($cards[$(this).data("card")]);
  cardsVotes[0] = categories[currentCategoryIndex].beerOne.votes;
  cardsVotes[1] = categories[currentCategoryIndex].beerTwo.votes;
  cardsVotes[2] = categories[currentCategoryIndex].beerThree.votes;

  var currentVotes = parseInt(cardsVotes[$(this).data("card")]);
  currentVotes++;
  // console.log(currentVotes);
  selectedCard = parseInt($(this).data("card"));
  var beerObj = {};
  beerObj = categories[currentCategoryIndex];
  // console.log(categories[currentCategoryIndex]);
  console.log(beerObj);
  if (selectedCard == 0) {
    beerObj.beerOne.votes = currentVotes;
  } else if (selectedCard == 1) {
    beerObj.beerTwo.votes = currentVotes;
  } else if (selectedCard == 2) {
    beerObj.beerThree.votes = currentVotes;
  }
  database.ref("beerCandidates/" + candidateArray[currentCategoryIndex]).update(beerObj);
  calculateVoteTotals();
  updateVotes();
  // displayCategory(currentWinnerId);
  getBeerInfo(currentWinnerId);
  if (currentCategoryIndex < categoryArray.length) {
    currentCategoryIndex++;
  } else {
    currentCategoryIndex = 0;
  }

});
