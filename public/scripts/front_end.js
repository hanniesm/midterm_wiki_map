
//Add event listener that will add/remove the list from the user's favorites and reload list so that it has correct star.



$(document).ready(function() {
  $("#new-list").slideUp();
  $(".fas.fa-plus").on("click", function() {
    $("#new-list").slideToggle();
  });
});



function renderLists(lists) {
  $("#accordion").empty();

  for (const listObj of lists) {
    let listID = listObj.list_id
    const $isFavorite = (listID) => {
      $(document).ready(function() {

      const url = "/api/users/3/favorites/";
        const requestOptions = {
          method: "GET",
          url: url,
          dataType: "json"
        };

        request(requestOptions, function(response) {
            return response[0].list_id === list_id
        });
    });
  };

    console.log($isFavorite);
    const $list = createListElement(listObj, $isFavorite);
    $("#accordion").append($list);
  }
}


// let favoriteLists = [];

// function renderFavorites(favorites) {
//   $(document).ready(function() {
//     const $favorites = favorites[0]
//     favoriteLists.push($favorites.list_id);
//   });
// }

// console.log(favoriteLists)


function createListElement(list, favorite) {
  //create card
  const $list = $("<div>")
    .addClass("card")
    .attr("id", list.id);
  const $cardHeader = $("<div>").addClass("card-header");
  const $button = $("<div>").attr("id", "button");
  const $h = $("<h5>").addClass("mb-0");

  $("<button>")
    .addClass("btn btn-link collapsed")
    .text(list.title)
    .appendTo($h);

  $h.appendTo($button);

  $button.appendTo($cardHeader);

  const $icons = $("<div>").attr("id", "icons");
  if (favorite === true) {
    $("<i>")
      .addClass("fas fa-star")
      .attr("id", "favorite")
      .appendTo($icons);
  } else {
    $("<i>")
      .addClass("far fa-star")
      .attr("id", "favorite")
      .appendTo($icons);
  }

  $icons.appendTo($cardHeader);
  $cardHeader.appendTo($list);


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
    const url = "/api/lists/";

    const requestOptions = {
      method: "GET",
      url: url,
      dataType: "json"
    };

    request(requestOptions, function(response) {
      renderLists(response);
    });
  });
};

loadLists();


function infobox() {
  let $div = $("<div>")
    .attr("id", "inputForms")
    .append(
      $("<form>")
        .attr("action", "/api/pinpoints")
        .attr("method", "POST")
        .append(
          $("<input>")
            .attr("id", "title")
            .attr("type", "text")
            .attr("placeholder", "Title")
            .attr("name", "title"),
          $("<input>")
            .attr("id", "description")
            .attr("type", "text")
            .attr("placeholder", "Description")
            .attr("name", "description"),
          $("<input>")
            .attr("id", "latitude")
            .attr("type", "text")
            .attr("placeholder", "Latitude")
            .attr("name", "latitude"),
          $("<input>")
            .attr("id", "longitude")
            .attr("type", "text")
            .attr("placeholder", "Longitude")
            .attr("name", "longitude"),
          $("<input>")
            .attr("id", "marker_adder")
            .attr("type", "submit")
            .attr("value", "Submit")
        )
    );
  $("#selected_pin").append($div);
}

// infobox();

$(document).ready(function() {
  infobox();
  $("#selected_pin").on("click", function() {
    $("#inputForms").slideToggle();
  });
});
