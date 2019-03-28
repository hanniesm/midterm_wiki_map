//When creating accordian. If list is in the users favorites add i with class "fas fa-star". This will make it a solid star. Add to style sheet that fas fa-star will be #FFC107
//If not in favorites create with "far fa-star"

//Add event listener that will add/remove the list from the user's favorites and reload list so that it has correct star.

$(document).ready(function(){
  $( ".fas.fa-plus" ).on("click", function() {
    console.log("create new map")
  });
  $( ".far.fa-star" ).on("click", function() {
    console.log("add to favorites")
  });
  $( ".fas.fa-star" ).on("click", function() {
    console.log("remove from favorites")
  });
  $( ".far.fa-edit" ).on("click", function() {
    console.log("edit map")
  });
});
