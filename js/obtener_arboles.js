$(document).ready(function(){
    $.ajax({
        method:"post",
        url:"php/obtenerArboles.php",
        cache:false,
        success:function(resp){
            var Jresp= JSON.parse(JSON.stringify(resp));
            if(Jresp.isSuccess == true){
                //aqui se inicializa el mapa
                const cdmx = { lat: parseFloat(Jresp.data[0]["latitud"]), lng: parseFloat(Jresp.data[0]["longitud"]) };
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 18,
                    center: cdmx,
                    mapTypeId: 'satellite'
                });

                // Create the search box and link it to the UI element.
                var input = document.getElementById('pac-input');
                var searchBox = new google.maps.places.SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function() {
                    searchBox.setBounds(map.getBounds());
                });

                var markers = [];
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function() {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                    return;
                    }

                    // Clear out the old markers.
                    markers.forEach(function(marker) {
                    marker.setMap(null);
                    });
                    markers = [];

                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    /*
                    * Para fines de minimizar las adecuaciones debido a que es este una demostración de adaptación mínima de código, se reemplaza forEach por some.
                    */ 
                    // places.forEach(function(place) {
                    places.some(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                    // some interrumpe su ejecución en cuanto devuelve un valor verdadero (true)
                    return true;
                    });
                    map.fitBounds(bounds);
                });
                
                for(var i in Jresp.data){
                    const marker = new google.maps.Marker({
                        position: {lat: parseFloat(Jresp.data[i]["latitud"]), lng: parseFloat(Jresp.data[i]["longitud"])},
                        title: Jresp.data[i]["nombre_comun"],
                        draggable: false,
                        map: map
                    });
                    const contentString =
                        '<h2>' + Jresp.data[i]["nombre_comun"]+'</h2>'+
                        '<h6>Especie: '+Jresp.data[i]["nombre_taxonomico"]+'</h6>'+
                        '<img src='+ Jresp.data[i]["foto"]+' alt="Imagen">'+
                        '<br>'+ Jresp.data[i]["referencias_ubicacion"]+
                        '<br>Di&aacute;metro de tronco: '+ Jresp.data[i]["diametro_tronco"]+
                        '<br>Almac&eacute;n de carbono: '+ Jresp.data[i]["almacen_carbono"]+
                        '<br>Captura de carbono: '+ Jresp.data[i]["captura_carbono"]+
                        '<br>Beneficios $MXN: $'+ Jresp.data[i]["beneficios_mnx"]
                        ;
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        });
                    marker.addListener("click", () => {
                        infowindow.open(map, marker);
                    });
                }

                document.getElementById("btnlat").onclick = function buscarLat() {
                    const latlng = new google.maps.LatLng(document.getElementById("lat").value, document.getElementById("lon").value);
                    map.setCenter(latlng)
                    map.setZoom(25)
                }  
            }
            else if(Jresp.isSuccess == false){
                $.alert({
                    title: 'Informaci&oacute;n',
                    content: Jresp.msg,
                    icon: 'fas fa-globe',
                    theme: 'material',
                    useBootstrap: false,
                    boxWidth: '400px',
                    buttons: {
                        Ok:{
                            text: 'Ok',
                            btnClass: 'btn-green',
                        },
                    }
                });
            }
        },
        error:function(){
            $.alert({
                title: 'Error en el servidor, int&eacute;ntelo m&aacute;s tarde',
                content: '',
                boxWidth: '400px',
                theme: 'material',
                useBootstrap: false,
                buttons: {
                    Entendido:{
                        text: 'Entendido',
                        btnClass: 'btn-red',
                    },
                }
            });
        }
    });
});




    