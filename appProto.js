let tracking = false;
let watchId;
let map;
let marker;

// Initialize the map
window.onload = () => {
  map = L.map("map").setView([20, 78], 5); // Center on India

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
};

function startTracking() {
  if (tracking) return;
  tracking = true;

  document.getElementById("log").innerHTML = "Tracking started...";

  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        document.getElementById("log").innerHTML += `<br>Lat: ${latitude}, Lng: ${longitude}`;

        // Update map
        const latlng = [latitude, longitude];
        if (!marker) {
          marker = L.marker(latlng).addTo(map).bindPopup("You are here").openPopup();
        } else {
          marker.setLatLng(latlng);
        }
        map.setView(latlng, 15);
        
      },
      (error) => {
        document.getElementById("log").innerHTML += `<br>Error: ${error.message}`;
      },
      { enableHighAccuracy: true }
    );
  } else {
    document.getElementById("log").innerHTML = "Geolocation not supported.";
  }
}

function stopTracking() {
  if (!tracking) return;
  tracking = false;

  navigator.geolocation.clearWatch(watchId);
  document.getElementById("log").innerHTML += "<br>Tracking stopped.";
}
