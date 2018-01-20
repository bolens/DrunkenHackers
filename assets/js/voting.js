// Initialize Firebase
 var config = {
   apiKey: "AIzaSyAN2lk-iYh75EbChp-CSdw-tXTqK1TsvtM",
   authDomain: "drunkenhackers-e9a1c.firebaseapp.com",
   databaseURL: "https://drunkenhackers-e9a1c.firebaseio.com",
   projectId: "drunkenhackers-e9a1c",
   storageBucket: "",
   messagingSenderId: "484595228418"
 };
 firebase.initializeApp(config);

var database = firebase.database();
var selectedCard;

var $cards = [];
var voteTotal;

database.ref("/votes").on("value", function(snap){
  let $card1 = $('#resultscard1'),
      $card2 = $('#resultscard2'),
      $card3 = $('#resultscard3');

  $cards[0] = snap.val().card1;
  $cards[1] = snap.val().card2;
  $cards[2] = snap.val().card3;
  console.log(snap.val());

  voteTotal = $cards[0] + $cards[1] + $cards[2];
  console.log(voteTotal);
  console.log((($cards[0] / voteTotal) * 100));
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
  var currentCard = $cards[parseInt($(this).data("card"))];
  currentCard++;
  selectedCard = parseInt($(this).data("card"));

  if (selectedCard === 0) {
    database.ref("/votes").set({
      card1: currentCard,
      card2: $cards[1],
      card3: $cards[2]
    })
  } else if (selectedCard === 1) {
    database.ref("/votes").set({
      card2: currentCard,
      card1: $cards[0],
      card3: $cards[2]
    })
  } else if (selectedCard === 2) {
    database.ref("/votes").set({
      card3: currentCard,
      card1: $cards[0],
      card2: $cards[1]
    })
  }
})
