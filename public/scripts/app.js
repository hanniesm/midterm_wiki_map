const markerArray = [];
const labelString = "ABCDEFGHIJKLMNOPQRSTUVYZ";
let placedMarkerCounter = 0;
let map;
let bounds;

function createListRow(listItem) {
  const $tableRow = $("<tr>").append(
    $("<td>").text(listItem.label),
    $("<td>").text(listItem.title)
  );
  return $tableRow;
}

function renderList(data) {
  $("#testTable").empty();
  data.forEach(item => {
    let rendered = createListRow(item);
    $("#testTable").append(rendered);
  });
}

function renderPins(pins) {
  $("#pinList").empty();
  for (const pinObj of pins) {
    const $pin = createPinList(pinObj);
    $("#pinList").append($pin);
  }
}

function createPinList(pin) {
  const $pin = $("<p>").text(pin.title)
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
    renderPins(pinpoints);
    for (var i = 0; i < pinpoints.length; i++) {
      markerArray.push({
        label: labelString[placedMarkerCounter],
        position: {
          lat: pinpoints[i].latitude,
          lng: pinpoints[i].longitude
        }
      });
      placedMarkerCounter++;
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
  });
}

$(document).ready(function() {
  // code snippet to add another pin and viewing it on the map
  $("#marker_adder").on("click", function() {
    var newMarker = new google.maps.Marker({
      position: {
        lat: $("#latitude").val(),
        lng: $("#longitude").val()
      },
      label: labelString[placedMarkerCounter]
    });
    placedMarkerCounter++;
    markerArray.push(newMarker);
    newMarker.setMap(map);
    bounds.extend(newMarker.getPosition());
    map.fitBounds(bounds);
  });
  $(".card").on("click", function(e) {
    const myID = event.target.data("id");
    console.log(myID);
  });
  $("#accordion").on("click", ".card", function(event) {
    const myID = this.id;
    const myURL = "/api/lists/" + myID;
    $.ajax({
      method: "GET",
      url: myURL
    })
      .done(results => {
        $("#list_header").text(results[0].title);
        $("#list_info").text(results[0].description);
      })
      .then(function() {
        for (var marker of markerArray) {
          if (marker.list_id === 1) {
            console.log(marker);
          }
        }
      });
  });
  // code snippet to remove a pin rezoom the map
  $("#test2").on("click", function() {
    markerArray[markerArray.length - 1].setMap(null);
    markerArray.pop();
    placedMarkerCounter--;
    $("#map").empty();
    initMap();
  });
});
