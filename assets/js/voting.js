var database = firebase.database();
var currentWinnerVotes = 0;
var cardsVotes = [];

function calculateVoteTotals(cardIndex) {
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

  if (currentVotes >= currentWinnerVotes) {
    currentWinnerVotes = currentVotes;
    categories[currentCategoryIndex].featured = votesId;
  }
  updateVotes();
}

function pushVotes() {
  database.ref("beerCandidates/" + candidateArray[currentCategoryIndex]).update(categories[currentCategoryIndex]);
}

function updateVotes() {
  $('#resultscard1').children('.votes').text(categories[currentCategoryIndex].beerOne.votes);
  $('#resultscard2').children('.votes').text(categories[currentCategoryIndex].beerTwo.votes);
  $('#resultscard3').children('.votes').text(categories[currentCategoryIndex].beerThree.votes);

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

  // console.log(beerObj);

  if (selectedCard == 0) {
    beerObj.beerOne.votes = currentVotes;
  } else if (selectedCard == 1) {
    beerObj.beerTwo.votes = currentVotes;
  } else if (selectedCard == 2) {
    beerObj.beerThree.votes = currentVotes;
  }

  calculateVoteTotals(selectedCard);

  getBeerInfo(categories[currentCategoryIndex].featured);
  if (currentCategoryIndex < categoryArray.length) {
    // currentCategoryIndex++;
  } else {
    // currentCategoryIndex = 0;
  }

});
