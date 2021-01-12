$(document).ready(function(){
    $.ajax({
        method:"post",
        url:"php/obtenerArboles.php",
        cache:false,
        success:function(resp){
            var Jresp= JSON.parse(JSON.stringify(resp));
            if(Jresp.isSuccess == true){
                //aqui se inicializa el mapa
                //esta es toda la response
                document.getElementById("contenido").append(JSON.stringify(Jresp.data));

                //ejemplos de acceso
                //latitud y longitud del primer arbol
                alert("lat:"+Jresp.data[0]["latitud"] + ", lon: " + Jresp.data[0]["longitud"]);

                //nombre comun arbol 2
                alert("Nombre común arbol 2: "+Jresp.data[1]["nombre_comun"]);
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
    