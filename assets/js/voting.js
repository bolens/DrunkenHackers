var database = firebase.database();
var selectedCard;

var $cards = [];

database.ref("/votes").on("value", function(snap){
  $cards[0] = snap.val().card1
  $cards[1] = snap.val().card2
  $cards[2] = snap.val().card3

  console.log(snap.val())
})

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
