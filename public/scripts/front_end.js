//When creating accordian. If list is in the users favorites add i with class "fas fa-star". This will make it a solid star. Add to style sheet that fas fa-star will be #FFC107
//If not in favorites create with "far fa-star"

//Add event listener that will add/remove the list from the user's favorites and reload list so that it has correct star.

$(document).ready(function() {
  $("#new-list").slideUp();
  $(".fas.fa-plus").on("click", function() {
    $("#new-list").slideToggle();
  });
  $(".far.fa-star").on("click", function() {
    console.log("add to favorites");
  });
  $(".fas.fa-star").on("click", function() {
    console.log("remove from favorites");
  });
  $(".far.fa-edit").on("click", function() {
    console.log("edit map");
  });
});

function renderLists(lists) {
  $("#accordion").empty();
  for (const listObj of lists) {
    const $list = createListElement(listObj);
    $("#accordion").append($list);
  }
}

function createListElement(list) {
  //create card
  const $list = $("<div>").addClass("card");
  const $cardHeader = $("<div>").addClass("card-header");
  const $button = $("<div>").addClass("button");

  $("<h2>")
    .text(list.title)
    .appendTo($button);
  $button.appendTo($cardHeader);

  const $icons = $("<div>").addClass("icons");

  $("<i>")
    .addClass("far fa-star")
    .appendTo($icons);
  $("<i>")
    .addClass("far fa-edit")
    .appendTo($icons);

  $icons.appendTo($cardHeader);
  $cardHeader.appendTo($list);

  const $cardBody = $("<div>").addClass("card-body");

  $("<p>")
    .attr("id", "description")
    .text(list.description)
    .appendTo($cardBody);
  $("<p>")
    .attr("id", "created_by")
    .text(list.created_by)
    .appendTo($cardBody);
  $("<p>")
    .attr("id", "collaborators")
    .text(list.collaborators)
    .appendTo($cardBody);

  $cardBody.appendTo($list);

  return $list;
}

const request = (options, cb) => {
  $.ajax(options)
    .done(response => {
      cb(response);
    })

    .fail(error => {
      console.log(`Error: ${error}`);
    })

    .always(() => {
      console.log("Request completed");
    });
};

const loadLists = () => {
  $(document).ready(function() {
    const url = "/lists/";

    const requestOptions = {
      method: "GET",
      url: url,
      dataType: "json"
    };

    request(requestOptions, function(response) {
      renderTweets(response);
    });
  });
};
