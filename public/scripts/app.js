let markerArray = [];
let map;
let bounds;

function renderPins(pins) {
  $("#pinList").empty();
  for (const pinObj of pins) {
    const $pin = createPinList(pinObj);
    $("#pinList").append($pin);
  }
}

function createPinList(pin) {
  const $pin = $("<p>").text(pin.title);
  return $pin;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 45.5017, lng: -73.5673 }
  });
  bounds = new google.maps.LatLngBounds();
  $.ajax({
    method: "GET",
    url: "/api/pinpoints"
  }).done(pinpoints => {
    // renderPins(pinpoints);
    pinPlacer(pinpoints);
  });
}

function pinPlacer(pinpoints) {
  for (var i = 0; i < pinpoints.length; i++) {
    for (var elem of markerArray) {
      var marker = new google.maps.Marker({
        position: elem.position,
        label: elem.label
      });
      marker.setMap(map);
      bounds.extend(marker.getPosition());
      map.fitBounds(bounds);
    }
  }
}

function printPin(pin) {
  $("#selected_pin").empty();
  const $pin = createPinElement(pin);
  $("#selected_pin").append($pin);
}

//create pin
function createPinElement(pin) {
  const $pinObject = pin[0];

  const $pin = $("<div>").attr("id", $pinObject.id);
    $("<img>")
      .attr("id", "selected_pin_image")
      .attr("src", $pinObject.image)
      .appendTo($pin);
  const $header = $("<header>").attr("id", "pin_header");
  $("<h3>")
    .text($pinObject.title)
    .appendTo($header);
  $header.appendTo($pin);
  const $pinBody = $("<div>").attr("id", "pin_info");
  $("<p>")
    .text($pinObject.description)
    .appendTo($pinBody);
  $pinBody.appendTo($pin);

  return $pin;
}

const loadPin = id => {
  const url = "/api/pinpoints/" + id;
  const requestOptions = {
    method: "GET",
    url: url,
    dataType: "json"
  };

  request(requestOptions, function(response) {
    printPin(response);
  });
};

$(document).ready(function() {
  $("#accordion").on("click", ".card", function(event) {
    initMap();
    let myID = this.id;
    let myURL = "/api/lists/" + myID;
    let myPinpoints = myURL + "/pinpoints";
    $.ajax({
      method: "GET",
      url: myURL
    })
      .then(results => {
        $("#list_header")
          .text(results[0].title)
          .attr("list-id", results[0].id);
        $("#list_info").text(results[0].description);
      })
      .then(
        $.ajax({
          method: "GET",
          url: myPinpoints
        }).then(results => {
          const listPinpoints = results;
          $("#pinListInfo").empty();
          initMap();
          markerArray = [];
          for (var point of listPinpoints) {
            var newMarker = new google.maps.Marker({
              position: {
                lat: point.latitude,
                lng: point.longitude
              }
            });
            markerArray.push(newMarker);
            newMarker.setMap(map);
            bounds.extend(newMarker.getPosition());
            map.fitBounds(bounds);

            initMap();
            $("#pinListInfo").append(
              $("<tr>")
                .addClass("list_row")
                .append(
                  $("<td>")
                    .addClass("row_title")
                    .text(point.title)
                    .attr("pinid", point.id),
                  $("<td>").append(
                    $("<button>")
                      .attr("pin-id", point.id)
                      .addClass("deleter")
                      .text("🗑")
                  )
                )
            );
          }
          /////// Delete list item from front-end and database;
          $(".deleter").on("click", function(event) {
            const pinID = $(this)
              .parent()
              .prev()
              .attr("pinid");
            const reqURL = "api/pinpoints/" + pinID + "/delete";

            $.ajax({ method: "POST", url: reqURL })
              .done(results => {
                $("#map").empty();
                initMap();
              })
              .done(results => {
                $(this)
                  .parent()
                  .parent()
                  .remove();
              });
          });

          $(".row_title").on("click", function(event) {
            loadPin($(this).attr("pinid"));
          });
        })
      );
  });
});
