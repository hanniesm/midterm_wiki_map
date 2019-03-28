const markerArray = [];
const labelString = "ABCDEFGHIJKLMNOPQRSTUVYZ";
let placedMarkerCounter = 0;

// function createListRow(listItem) {
//   const $tableRow = $("<tr>").append(
//     $("<td>").text(listItem.label),
//     $("<td>").text(listItem.title)
//   );
//   return $tableRow;
// }

// function renderList(data) {
//   $("#testTable").empty();
//   data.forEach(item => {
//     let rendered = createListRow(item);
//     $("#testTable").append(rendered);
//   });
// }

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 45.5017, lng: -73.5673 }
  });
  let bounds = new google.maps.LatLngBounds();
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
          label: elem.label,
          map: map
        });
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
      }

      $("<div>")
        .text(pinpoints[i].title)
        .appendTo($("#listDisplay"));
      // }
    }
  });
}

$(document).ready({});
