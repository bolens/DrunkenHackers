var database = firebase.database();
var selectedCard;

var $cards = [];
var voteTotal;

database.ref('beerCandidates').on('child_changed', function(snap){
 let $card1 = $('#resultscard1'),
     $card2 = $('#resultscard2'),
     $card3 = $('#resultscard3');

 $cards[0] = snap.val().beerId.one.votes;
 $cards[1] = snap.val().beerId.two.votes;
 $cards[2] = snap.val().beerId.three.votes;
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

})

$(".card").on("click", function (event) {
  var currentCard = $cards[parseInt($(this).data("votes"))];
  currentCard++;
  selectedCard = parseInt($(this).data("votes"));
  var beerObj = {};
  if (selectedCard === 0) {
    beerObj = database.ref("/beerCandidates/" + currentCanditate).val();
    console.log(beerObj);
    database.ref("/beerCandidates/" + currentCanditate).set({
      beerId: {
        one: {
          votes: currentCard
        }
      }
    })
  } else if (selectedCard === 1) {
    database.ref("/beerCandidates/" + currentCanditate).set({
        beerId: {
          two: {
            votes: currentCard
          }
        }
      })

  } else if (selectedCard === 2) {
    database.ref("/beerCandidates/" + currentCanditate).set({
        beerId: {
          three: {
            votes: currentCard
          }
        }
      })
  }
});
