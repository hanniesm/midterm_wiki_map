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

$(document).ready(function() {
  $("#favorite").on("click", function() {
    event.preventDefault();
    console.log("Button clicked, performing ajax call...");

    // const data = $(this).serialize();

    // const requestOptions = {
    //   type: "POST",
    //   url: "/tweets/",
    //   data,
    // };

    // request(requestOptions, function(response) {
    // //   loadTweets();
    // });
  });
});

$(document).ready(function() {
  $("#accordion").on("click", ".fa-star", function(event) {
    $(this).css({ color: "#FFC107" });
    console.log("add to favorites");

    //Need to add
  });
  $("#accordion").on("click", ".fa-edit", function(event) {
    $(this).css({ color: "#FFC107" });
    console.log("edit");
    //Need to add
  });
  // $("#accordion").on("click", ".card", function(event) {
  //   $(this)
  //     .find("button")
  //     .removeClass("btn btn-link collapsed")
  //     .addClass("btn btn-link")
  //     .attr("aria-expanded", "true");
  //   $(this)
  //     .find("button")
  //     .removeClass("btn btn-link collapsed")
  //     .addClass("btn btn-link")
  //     .attr("aria-expanded", "true");
  // console.log(this.id);
  //Need to add
  // });
});

function renderLists(lists) {
  $("#accordion").empty();
  for (const listObj of lists) {
    const $list = createListElement(listObj, false);
    // console.log(getFavorites(3));
    // console.log($favorite);
    $("#accordion").append($list);
  }
}

// const getFavorites = (userid, listid) => {
//   $(document).ready(function() {
//     const url = "/api/users/" + userid + "/favorites";
//     const requestOptions = {
//       method: "GET",
//       url: url,
//       dataType: "json"
//     };

//     request(requestOptions, function(response) {
//       for (list of response) {
//         if (list.list_id === listid && list.user_id === userid) {
//           favoriteStatus = true;
//         } else {
//           favoriteStatus = false;
//         }
//         return favoriteStatus;
//       }

//       // .done(console.log(favoriteStatus))
//     }).done(console.log(favoriteStatus));
//   });
// };

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
    // .attr("data-toggle", "collapse")
    // .attr("data-target", "#collapseTwo")
    // .attr("aria-expanded", "false")
    // .attr("aria-controls", "collapseTwo")
    .text(list.title)
    .appendTo($h);

  $h.appendTo($button);

  $button.appendTo($cardHeader);

  const $icons = $("<div>").attr("id", "icons");
  // const $favorite = getFavorites("3");
  // console.log($favorite);
  // if (getFavorites(list)) {
  $("<i>")
    .addClass("fas fa-star")
    .attr("id", "favorite")
    .appendTo($icons);
  // } else {
  $("<i>")
    .addClass("far fa-star")
    .attr("id", "favorite")
    .appendTo($icons);
  // }
  // $("<i>")
  //   .addClass("far fa-edit")
  //   .appendTo($icons);

  $icons.appendTo($cardHeader);
  $cardHeader.appendTo($list);

  // const $cardBodyData = $("<div>")
  //   // .addClass("collapse")
  //   // .attr("aria-labelledby", "headingTwo")
  //   // .attr("data-parent", "#accordion");
  // const $cardBody = $("<div>").addClass("card-body");

  // $("<p>")
  //   .attr("id", "description")
  //   .text(list.description)
  //   .appendTo($cardBody);
  // $("<p>")
  //   .attr("id", "created_by")
  //   .text(list.created_by_id)
  //   .appendTo($cardBody);
  // $("<p>")
  //   .attr("id", "collaborators")
  //   .text(list.collaborators)
  //   .appendTo($cardBody);

  // $cardBody.appendTo($cardBodyData);
  // $cardBodyData.appendTo($list);

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
      // console.log(response)
      renderLists(response);
    });
  });
};

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
    $("#inputForms").slideToggle();
    $("#marker_adder  ").on("click", function() {
      const listID = $("#list_header").attr("list-id");
      const markertitle = $("#title").val();
      const markerdesc = $("#description").val();
      const lat = $("#latitude").val();
      const lng = $("#longitude").val();
      const image = $("#image").val();
      $.ajax({
        method: "POST",
        url: "api/pinpoints",
        data: {
          list_id: listID,
          title: markertitle,
          description: markerdesc,
          latitude: lat,
          longitude: lng,
          image: image
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

  /////// Delete a list and it's elements from the database
  $("#delete_list").on("click", function() {
    const listID = $("#list_header").attr("list-id");
    $.ajax({
      method: "POST",
      url: "/api/lists/" + listID + "/delete"
    })
      .then(function() {
        $.ajax({
          method: "POST",
          url: "/api/pinpoints/listdelete/" + listID
        });
      })
      .done(function() {
        loadLists();
      });
  });
});
