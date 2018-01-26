var database = firebase.database();
var selectedCard;
var currentWinnerId;
var currentWinnerVotes = 0;
var voteTotal;
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
  // console.log(snap.val());
  $cards[0] = categories[currentCategoryIndex].beerOne.votes;
  $cards[1] = categories[currentCategoryIndex].beerTwo.votes;
  $cards[2] = categories[currentCategoryIndex].beerThree.votes;
  //console.log(snap.val());

  voteTotal = $cards[0] + $cards[1] + $cards[2];
  //console.log(voteTotal);
  //console.log((($cards[0] / voteTotal) * 100));
  $card1.css({
   'width': (($cards[0] / voteTotal) * 100) + "%"
  });
   //.text(label[0].name);
  $card2.css({
   'width': (($cards[1] / voteTotal) * 100) + "%"
  });
   //.text(label[0].name);
  $card3.css({
   'width': (($cards[2] / voteTotal) * 100) + "%"
  });
   //.text(label[0].name);

   pushVotes();
}

updateVotes();

$(".card").on("click", function (event) {
  console.log($cards[$(this).data("card")]);
  var currentVotes = parseInt($cards[$(this).data("card")]);
  console.log(currentVotes);
  selectedCard = parseInt($(this).data("card"));
  var beerObj = {};
  beerObj = categories[currentCategoryIndex];
  console.log(categories[currentCategoryIndex]);
  console.log(beerObj);
  if (selectedCard === 0) {
    beerObj.beerOne.votes = currentVotes;
  } else if (selectedCard === 1) {
    beerObj.beerTwo.votes = currentVotes;
  } else if (selectedCard === 2) {
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
