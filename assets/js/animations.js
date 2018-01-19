$(document).ready(function() {
  // Init ScrollMagic
  var controller = new ScrollMagic.Controller();

  // Scroll to functions
  $("#featured-link").click(function() {
    $('html, body').animate({
      scrollTop: $("#featured").offset().top - 64
    }, 1000);
  });
  $("#voting-link").click(function() {
    $('html, body').animate({
      scrollTop: $("#voting").offset().top - 64
    }, 1000);
  });
  $("#previous-link").click(function() {
    $('html, body').animate({
      scrollTop: $("#previous").offset().top - 64
    }, 1000);
  });

  // Function to hide intro title
  function hideTitle() {
    var $panel = $('#hacker-hero');
    var hidePanel = new TimelineMax({delay:1.5});
    hidePanel.to($panel, 0.5, {opacity:0})
      .to($panel, 1, {height:0, minHeight:0, className:"+=hidden"});

  }

  // Create new timeline
  var tl = new TimelineMax({delay:1, onComplete:hideTitle});
  var $titles = $('#title');
  var $title = [];
  $title[0] = $('#title-row-1');
  $title[1] = $('#title-row-2');
  $title[2] = $('#title-row-3');

  tl.from($title[0], 1, {opacity:0, left:-500})
    .from($title[1], 1, {opacity:0, left:500})
    .from($title[2], 1, {opacity:0, left:500});

  var $cards = [];
  $('.card').each(function(index, el) {
    $cards[index] = this;
    console.log($cards[index]);
  });

  var cardMove = new TimelineMax({});
  cardMove.from($cards[0], 0.5, {top: 100})
    .from($cards[1], 0.5, {top: 100})
    .from($cards[2], 0.5, {top: 100});

  new ScrollMagic.Scene({triggerElement: "#voting", duration: 250, tweenChanges: true})
    .setTween()
    .addIndicators({name: "Voting Section"})
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#card-container", duration: 10, tweenChanges: true})
    .setTween(cardMove)
    .addIndicators({name: "Voting Cards"})
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#featured", duration: 250, tweenChanges: true})
    .setTween()
    .addIndicators({name: "Featured Section"})
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#previous", duration: 250, tweenChanges: true})
    .setTween()
    .addIndicators({name: "Previous Section"})
    .addTo(controller);
});
