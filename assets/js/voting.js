var database = firebase.database();
var selectedCard;

var voteTotal;
var $card1 = $('#resultscard1'),
   $card2 = $('#resultscard2'),
   $card3 = $('#resultscard3');

function updateVotes() {
  database.ref().once('value').then(function(snap) {
    // console.log(snap.val());
    $cards[0] = snap.val()[candidateArray[currentCategoryIndex]].beerOne.votes;
    $cards[1] = snap.val()[candidateArray[currentCategoryIndex]].beerTwo.votes;
    $cards[2] = snap.val()[candidateArray[currentCategoryIndex]].beerThree.votes;
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
  });
}


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

  updateVotes();
  if (currentCategoryIndex < categoryArray.length) {
    currentCategoryIndex++;
  } else {
    currentCategoryIndex = 0;
  }
  // displayCategory(currentCategoryIndex);
});
