const thisArray = [];
let map;
const labelString = "ABCDEFGHIJKLMNOPQRSTUV";
let counter = 0;

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

const myArray = [
  { position: { lat: 45.558, lng: -73.5519 }, label: "A", title: "Olympic" },
  {
    position: { lat: 38.8718568, lng: -77.0562669 },
    label: "B",
    title: "Pentagon"
  }
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 45.5017, lng: -73.5673 }
  });
  // const localCopy = thisArray;
  // console.log("hey");
  $.ajax({
    method: "GET",
    url: "/api/pinpoints"
  }).done(pinpoints => {
    for (var i = 0; i < pinpoints.length; i++) {
      if (pinpoints[i].list_id === 2) {
        thisArray.push({
          label: labelString[counter],
          position: {
            lat: pinpoints[i].latitude,
            lng: pinpoints[i].longitude
          }
        });
        counter++;
        // labelString = labelString.slice(1, labelString.length);
        for (var elem of thisArray) {
          var marker = new google.maps.Marker({
            position: elem.position,
            label: elem.label,
            map: map
          });
        }

        $("<div>")
          .text(pinpoints[i].title)
          .appendTo($("#listDisplay"));
      }
    }
  });
}

$(document).ready({});
