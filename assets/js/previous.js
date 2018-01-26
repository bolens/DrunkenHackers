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

function loadFeatured(that) {
  // console.log($(that));
  currentCategoryIndex = parseInt($(that).data('category'));
  displayCategory(currentCategoryIndex);
  calculateVoteTotals();
  getBeerInfo(currentWinnerId);
}
