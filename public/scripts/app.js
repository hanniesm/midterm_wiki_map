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

// function renderList(data) {
//   $("#testTable").empty();
//   data.forEach(item => {
//     let rendered = createListRow(item);
//     $("#testTable").append(rendered);
//   });
// }

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
    for (var i = 0; i < pinpoints.length; i++) {
      // if (pinpoints[i].list_id === 1) {
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
  // code snippet to remove a pin rezoom the map
  $("#test2").on("click", function() {
    markerArray[markerArray.length - 1].setMap(null);
    markerArray.pop();
    placedMarkerCounter--;
    $("#map").empty();
    initMap();
  });
});
