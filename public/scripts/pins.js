// Print particular pin
function printPin(id) {
  $("#selected_pin").empty();
    const $pin = createPinElement(id);
    $("#selected_pin").append($pin);
}

//create pin
function createPinElement(id) {
  const $pin = $("<div>").addClass("selected_pin").attr("id", pin.id)
  $("<img>").attr("id", "selected_pin_image").attr("src", pin.image).appendTo($pin)
  const $header = $("<header>").attr("id", "pin_header")
  $("<h3>").text(pin.title).appendTo($header)
  $header.appendTo($pin)
  const $pinBody = $("<div>").attr("id", "pin_info")
  $("<p>").text(pin.description).appendTo($pinBody)
  $pinBody.appendTo($pin)

  return $pin;
}

// Need to add a get and route for particular pin


// List of pins
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

const loadPins = () => {
  $(document).ready(function() {
    const url = "/api/pinpoints";

    const requestOptions = {
      method: "GET",
      url: url,
      dataType: "json"
    };

    request(requestOptions, function(response) {
      // console.log(response)
      renderPins(response);
    });
  });
};

/loadPins();
