// const myArray = [
//   { position: { lat: 45.558, lng: -73.5519 }, label: "A", title: "Olympic" },
//   {
//     position: { lat: 38.8718568, lng: -77.0562669 },
//     label: "B",
//     title: "Pentagon"
//   }
// ];

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 45.5017, lng: -73.5673 }
  });
  // const localCopy = myArray;
  // for (var i = 0; i < localCopy.length; i++) {
  //   var marker = new google.maps.Marker({
  //     position: localCopy[i].position,
  //     map: map,
  //     label: localCopy[i].label
  //   });
  // }
}

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

$(() => {
  // renderList(myArray);
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done(users => {
  //   console.log(users);
  //   for (user of users) {
  //     $("<div>")
  //       .text(user.name)
  //       .appendTo($("#listDisplay"));
  //   }
  // });
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(lists => {
    console.log(lists);
    for (row of lists) {
      $("<div>")
        .text(row.title)
        .appendTo($("#listDisplay"));
    }
  });
});
