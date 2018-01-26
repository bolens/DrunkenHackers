function renderPrevWinners() {
  $(categoryArray).each(function(categoryIndex, el) {
    var newListItem = $('<li>');
    var newLink = $('<a>');
    newLink.addClass('category')
      .attr({
        href: "#",
        "data-category": categoryIndex
      })
      .text(categoryArray[categoryIndex]);
    newListItem.append(newLink);
    $("#category-list").append(newListItem);
  });
}

renderPrevWinners();

$('#category-list').on('click', '.category', function(e) {
  e.preventDefault();
  loadFeatured(this);
  $('html, body').animate({
    scrollTop: $("#voting").offset().top - 64
  }, 1000);
});

function loadFeatured(that) {
  // console.log($(that));
  currentCategoryIndex = $(that).data('category');
  displayCategory(currentCategoryIndex);
  calculateVoteTotals();
  getBeerInfo(currentWinnerId);
}
