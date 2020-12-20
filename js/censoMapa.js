function initMap() {
    const cdmx = { lat: 19.42847, lng: -99.12766 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: cdmx,
        mapTypeId: 'satellite'
    });

    document.getElementById("btnmap").onclick = function addmarker() {
        const latlng = new google.maps.LatLng(document.getElementById("lat").value, document.getElementById("lon").value);
        const marker = new google.maps.Marker({
            position: latlng,
            title: 'Árbol nuevo',
            draggable: false,
            map: map
        });
        map.setCenter(marker.getPosition())
        map.setZoom(25)
    }  
} 


