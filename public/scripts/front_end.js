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
  $("#accordion").on("click", ".card", function(event) {
    $(this)
      .find("button")
      .removeClass("btn btn-link collapsed")
      .addClass("btn btn-link")
      .attr("aria-expanded", "true");
    $(this)
      .find("button")
      .removeClass("btn btn-link collapsed")
      .addClass("btn btn-link")
      .attr("aria-expanded", "true");
    console.log("collapse");
    //Need to add
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
  const $list = $("<div>")
    .addClass("card")
    .attr("id", list.id);
  const $cardHeader = $("<div>").addClass("card-header");
  const $button = $("<div>").attr("id", "button");
  const $h = $("<h5>").addClass("mb-0");

  $("<button>")
    .addClass("btn btn-link collapsed")
    .attr("data-toggle", "collapse")
    .attr("data-target", "#collapseTwo")
    .attr("aria-expanded", "false")
    .attr("aria-controls", "collapseTwo")
    .text(list.title)
    .appendTo($h);

  $h.appendTo($button);

  $button.appendTo($cardHeader);

  const $icons = $("<div>").attr("id", "icons");

  $("<i>")
    .addClass("far fa-star")
    .attr("id", "favorite")
    .appendTo($icons);
  $("<i>")
    .addClass("far fa-edit")
    .appendTo($icons);

  $icons.appendTo($cardHeader);
  $cardHeader.appendTo($list);

  const $cardBodyData = $("<div>")
    .addClass("collapse")
    .attr("aria-labelledby", "headingTwo")
    .attr("data-parent", "#accordion");
  const $cardBody = $("<div>").addClass("card-body");

  $("<p>")
    .attr("id", "description")
    .text(list.description)
    .appendTo($cardBody);
  $("<p>")
    .attr("id", "created_by")
    .text(list.created_by_id)
    .appendTo($cardBody);
  $("<p>")
    .attr("id", "collaborators")
    .text(list.collaborators)
    .appendTo($cardBody);

  $cardBody.appendTo($cardBodyData);
  $cardBodyData.appendTo($list);

  return $list;
}

// <div class="card">
//    <div class="card-header" id="headingTwo">
//      <div id="button">
//        <h5 class="mb-0">
//          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//            My overseas holiday
//          </button>
//        </h5>
//      </div>
//      <div id="icons">
//        <i class="fas fa-star" id="favorite"></i>
//        <i class="far fa-edit"></i>
//      </div>
//    </div>
//    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
//      <div class="card-body">
//        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//      </div>
//    </div>
//  </div>

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
  console.log($div);
  $("#selected_pin").append($div);
}

// infobox();

$(document).ready(function() {
  infobox();
  $("#selected_pin").on("click", function() {
    $("#inputForms").slideToggle();
  });
});
