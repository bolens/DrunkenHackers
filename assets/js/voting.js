var database = firebase.database();
var selectedCard;

var $cards = [];
var voteTotal;
var cardVotes = [];

database.ref('beerCandidates').on('child_changed', function(snap){
  cardVotes[0] = snap.val().beerId.1.votes;
 console.log('cardVotes: ' + cardVotes[0]);
})

database.ref("/votes").on("value", function(snap){
  let $card1 = $('#resultscard1'),
      $card2 = $('#resultscard2'),
      $card3 = $('#resultscard3');

  $cards[0] = snap.val().card1;
  $cards[1] = snap.val().card2;
  $cards[2] = snap.val().card3;
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

$(".card").on("click", function (event) {
  var currentCard = $cards[parseInt($(this).data("votes"))];
  currentCard++;
  selectedCard = parseInt($(this).data("votes"));

  if (selectedCard === 0) {
    database.ref("/beerCandidates/" + currentCanditate).set({
      beerId: {
        1: {
          votes: currentCard
        }
      }
    })
  } else if (selectedCard === 1) {
    database.ref("/beerCandidates/" + currentCanditate).set({
        beerId: {
          2: {
            votes: currentCard
          }
        }
      })

  } else if (selectedCard === 2) {
    database.ref("/beerCandidates/" + currentCanditate).set({
        beerId: {
          3: {
            votes: currentCard
          }
        }
      })
  }
});
