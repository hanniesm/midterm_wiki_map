
//Add event listener that will add/remove the list from the user's favorites and reload list so that it has correct star.

// const addFavorite = () => {
//   $(document).ready(function() {
//     $("#accordion").on("click", ".fa-star", function(event) {
//       $(this).css({ color: "#FFC107" });
//       const url = "/api/favorites";
//         const requestOptions = {
//           method: "POST",
//           url: url,
//           data:
//           dataType: "json"
//         };

//       request(requestOptions, function(response) {
//         loadLists();
//       });
//     });
//   };
// }


//   $("#accordion").on("click", ".fa-edit", function(event) {
//     $(this).css({ color: "#FFC107" });
//     console.log("edit");
//     //Need to add
//   });
//   // $("#accordion").on("click", ".card", function(event) {
//   //   $(this)
//   //     .find("button")
//   //     .removeClass("btn btn-link collapsed")
//   //     .addClass("btn btn-link")
//   //     .attr("aria-expanded", "true");
//   //   $(this)
//   //     .find("button")
//   //     .removeClass("btn btn-link collapsed")
//   //     .addClass("btn btn-link")
//   //     .attr("aria-expanded", "true");
//   // console.log(this.id);
//   //Need to add
//   // });

$(document).ready(function() {
  $("#new-list").slideUp();
  $(".fas.fa-plus").on("click", function() {
    $("#new-list").slideToggle();
  });

//   $(".fas.fa-star").on("click", function() {
//     console.log("remove from favorites");
//   });
//   $(".far.fa-edit").on("click", function() {
//     console.log("edit map");
//   });
});



function renderLists(lists) {
  $("#accordion").empty();
  for (const listObj of lists) {
    const $list = createListElement(listObj, false);
    // const $favorite = getFavorites(3, listObj.id);
    // console.log($favorite);
    $("#accordion").append($list);
  }
}


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
          if (list.list_id   === listid && list.user_id === userid) {
            return true
          } else {
            return false
          }
        }
      });
  });
};

// console.log(getFavorites("3"))

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
      // console.log(response)
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
