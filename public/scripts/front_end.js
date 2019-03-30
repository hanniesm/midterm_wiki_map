
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


const getFavorites = (userid, listid) => {
  $(document).ready(function() {
    const url = "/api/users/" + userid + "/favorites";
    const requestOptions = {
      method: "GET",
      url: url,
      dataType: "json"
    };

    request(requestOptions, function(response) {
      for (list of response) {
        if (list.list_id === listid && list.user_id === userid) {
          favoriteStatus = true;
        } else {
          favoriteStatus = false;
        }
        return favoriteStatus;
      }

      // .done(console.log(favoriteStatus))
    }).done(console.log(favoriteStatus));
  });
};

// console.log("this is " + getFavorites(3, 1));

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
      // console.log("Request completed");
    });

  // .always(() => {
  //   console.log("Request completed");
  // });
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


const newPinForms = function() {
  let $div = $("<form>")
    .attr("id", "inputForms")
    .append(
      $("<p>").text("New Pin:"),
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
        .attr("id", "image")
        .attr("type", "text")
        .attr("placeholder", "Image link")
        .attr("name", "longitude"),
      $("<input>")
        .attr("id", "marker_adder")
        .attr("type", "submit")
        .attr("value", "Submit")
    );
  $(".selected_list").append($div);
  $("#inputForms").slideUp();
};

const editList = function() {
  let $form = $("<form>")
    .attr("id", "editForms")
    .append(
      $("<p>").text("Edit List Details:"),
      $("<input>")
        .attr("id", "edited_title")
        .attr("type", "text")
        .attr("placeholder", "Title")
        .attr("name", "edited_title"),
      $("<input>")
        .attr("id", "edited_description")
        .attr("type", "text")
        .attr("placeholder", "Description")
        .attr("name", "edited_description"),
      $("<input>")
        .attr("id", "list_editor")
        .attr("type", "submit")
        .attr("value", "Submit")
    );
  $(".selected_list").append($form);
  $("#editForms").slideUp();
};

$(document).ready(function() {
  /////// Load a couple HTML elements - List creator, editor
  newPinForms();
  loadLists();
  editList();

  /////// Adds a new marker
  $("#new_pin").on("click", function() {
    const listID = $("#list_header").attr("list-id");
    console.log(listID);
    $("#inputForms").slideToggle();
    $("#marker_adder").on("click", function() {
      $.ajax({
        method: "POST",
        url: "api/pinpoints",
        data: {
          list_id: $("#list_header").attr("list-id"),
          title: $("#title").val(),
          description: $("#description").val(),
          latitude: $("#latitude").val(),
          longitude: $("#longitude").val(),
          image: $("#image").val()
        }
      }).done(function() {
        $("#map").empty();
        initMap();
      });
    });
  });

  /////// Edit a list details
  $("#edit_list").on("click", function() {
    const listID = $("#list_header").attr("list-id");
    $("#editForms").slideToggle();
    $("#list_editor").on("click", function() {
      $.ajax({
        method: "POST",
        url: "api/lists/" + listID + "/modify/",
        data: {
          title: $("#edited_title").val(),
          description: $("#edited_description").val()
        }
      });
    });
  });

  /////// Delete a list
  $("#delete_list").on("click", function() {
    const listID = $("#list_header").attr("list-id");
    $.ajax({
      method: "POST",
      url: "/api/lists/" + listID + "/delete"
    }).done(function() {
      loadLists();
    });
  });
});
