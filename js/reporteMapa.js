function initMap() {
    const cdmx = { lat: 19.42847, lng: -99.12766 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: cdmx,
        mapTypeId: 'satellite'
    });

    const marker = new google.maps.Marker({
        position: cdmx,
        title: 'Árbol de prueba',
        draggable: false,
        map: map
    });
    map.setCenter(marker.getPosition())
    map.setZoom(25)

    marker.addListener("click", () => {
        document.getElementById("nombre").value = "Nombre prueba";
        document.getElementById("especie").value = "Especie prueba";
        document.getElementById("lat").value = cdmx.lat;
        document.getElementById("lon").value = cdmx.lng;
    });
} 


