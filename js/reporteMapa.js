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
                        '<img src='+Jresp.data[i]["foto"]+' alt="Imagen">'+
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
                        document.getElementById("nombre").value =Jresp.data[i]["nombre_comun"];
                        document.getElementById("especie").value = Jresp.data[i]["nombre_taxonomico"];
                        document.getElementById("lat").value = Jresp.data[i]["latitud"];
                        document.getElementById("lon").value = Jresp.data[i]["longitud"];
                        document.getElementById("id").value = Jresp.data[i]["id_arbol"];
                    });
                }

                const geocoder = new google.maps.Geocoder();
                document.getElementById("bdir").addEventListener("click", () => {
                    geocodeAddress(geocoder, map);
                });
                function geocodeAddress(geocoder, resultsMap) {
                    const address = document.getElementById("address").value;
                    geocoder.geocode({ address: address }, (results, status) => {
                      if (status === "OK") {
                        resultsMap.setCenter(results[0].geometry.location);
                      } else {
                        alert("Geocode was not successful for the following reason: " + status);
                      }
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
