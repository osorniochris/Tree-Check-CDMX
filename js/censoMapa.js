let map;
let markers = [];

function initMap() {
    const cdmx = { lat: 19.419697, lng: -99.191041 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: cdmx,
    mapTypeId: "satellite",
  });
  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
  // Adds a marker at the center of the map.
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  deleteMarkers();
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  markers.push(marker);
  document.getElementById("lat").value = marker.getPosition().lat();
  document.getElementById("lon").value = marker.getPosition().lng();
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
